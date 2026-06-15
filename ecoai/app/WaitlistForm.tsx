"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { useLang } from "./i18n";

// Formspree endpoint (free, no backend needed). Public by design — safe to hardcode.
// Can be overridden via NEXT_PUBLIC_FORMSPREE_ENDPOINT env var.
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mqeongbn";

export default function WaitlistForm() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // No endpoint configured → don't show a broken form.
  if (!ENDPOINT) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-xs text-green-200 text-center font-medium">
        {t("waitlist_success")}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm mx-auto flex flex-col gap-1.5">
      <p className="text-xs text-white/70 text-center">{t("waitlist_prompt")}</p>
      <div className="flex gap-2 bg-white/20 backdrop-blur border border-white/40 rounded-xl p-1.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("waitlist_placeholder")}
          className="flex-1 bg-transparent outline-none px-2.5 py-1 text-sm text-white placeholder-white/50"
        />
        <button
          type="submit"
          disabled={status === "sending" || !email.trim()}
          className="bg-green-500 hover:bg-green-400 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50 shrink-0"
        >
          {t("waitlist_button")}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-300 text-center">{t("waitlist_error")}</p>
      )}
    </form>
  );
}
