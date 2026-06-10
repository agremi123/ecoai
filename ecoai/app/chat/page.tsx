"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLang, LanguagePicker } from "../i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const { t } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.error) throw new Error(typeof data.error === "string" ? data.error : "API error");
      const reply = data.choices?.[0]?.message?.content ?? "(no response)";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMessages([...next, { role: "assistant", content: `⚠️ Error: ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen bg-green-50 flex flex-col overflow-hidden">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-green-200 bg-white/70 backdrop-blur shrink-0">
        <Link href="/" className="text-xl font-bold text-green-800">🌿 Green AI</Link>
        <div className="flex items-center gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hover:text-green-900 transition-colors">{t("nav_leaderboard")}</Link>
          <Link href="/chat" className="text-green-900 font-semibold underline underline-offset-4">{t("nav_chat")}</Link>
          <LanguagePicker />
        </div>
      </nav>

      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full px-4 pb-6 pt-6 gap-4 min-h-0">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          <span className="text-sm font-semibold text-green-800">Mistral Small</span>
          <span className="text-xs text-green-500 ml-1">{t("chat_status")}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 min-h-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16 text-center text-green-500">
              <span className="text-5xl">🌿</span>
              <p className="text-base font-medium text-green-700">{t("chat_empty_title")}</p>
              <p className="text-sm">{t("chat_empty_sub")}</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-green-700 text-white rounded-br-sm"
                    : "bg-white border border-green-200 text-green-900 rounded-bl-sm shadow-sm"
                }`}
              >
                {m.content}
              </div>
              {m.role === "assistant" && (
                <span className="mt-1 ml-1 text-xs text-green-600 bg-green-100 border border-green-200 rounded-full px-2.5 py-0.5 font-medium">
                  {t("co2_saved").replace("{{amount}}", ((Math.round(m.content.length / 4)) * 0.029).toFixed(1))}
                </span>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-green-200 text-green-400 rounded-2xl rounded-bl-sm px-4 py-3 text-sm shadow-sm">
                <span className="animate-pulse">{t("chat_thinking")}</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex gap-2 bg-white border border-green-200 rounded-2xl shadow-sm p-2 shrink-0"
        >
          <input
            className="flex-1 bg-transparent outline-none px-3 py-2 text-sm text-green-900 placeholder-green-400"
            placeholder={t("chat_placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 disabled:opacity-40 transition-colors"
          >
            {t("chat_send")}
          </button>
        </form>
      </div>
    </main>
  );
}
