import { NextRequest, NextResponse } from "next/server";

// ---- Guard settings ----
const MAX_REQUESTS_PER_WINDOW = 15; // per visitor
const WINDOW_MS = 60_000; // 1 minute
const MAX_MESSAGES_KEPT = 10; // only send recent history to Mistral
const MAX_CHARS_PER_MESSAGE = 4000; // reject absurdly long inputs
const MAX_TOKENS = 800; // cap response length

// Simple in-memory rate limiter (per serverless instance).
// Good enough to block spam/abuse on a small test budget.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "MISTRAL_API_KEY not set" }, { status: 500 });
  }

  // Identify the visitor (best-effort) for rate limiting.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again. 🌱" },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { messages } = body ?? {};

  // Validate input shape.
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Reject oversized messages (cheap abuse guard).
  for (const m of messages) {
    if (typeof m?.content !== "string" || m.content.length > MAX_CHARS_PER_MESSAGE) {
      return NextResponse.json(
        { error: "Message too long. Please shorten it." },
        { status: 400 }
      );
    }
  }

  // Only send the most recent messages to keep token usage bounded.
  const trimmed = messages.slice(-MAX_MESSAGES_KEPT);

  let res;
  try {
    res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: trimmed,
        max_tokens: MAX_TOKENS,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the AI right now. Please try again. 🌱" },
      { status: 502 }
    );
  }

  if (!res.ok) {
    // Friendly message when Mistral itself rate-limits us.
    if (res.status === 429) {
      return NextResponse.json(
        { error: "GreenGPT is very busy right now — please try again in a few seconds. 🌱" },
        { status: 429 }
      );
    }
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
