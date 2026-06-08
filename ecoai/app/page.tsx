"use client";
import Link from "next/link";

const models = [
  {
    rank: 1,
    name: "Mistral Small",
    provider: "Mistral AI",
    blurb: "Like sending a text message",
    co2PerQuery: 0.0012,
    badge: "🥇",
    bar: "w-[29%]",
    color: "bg-white/50 backdrop-blur border-green-400 hover:border-green-600",
    impact: "🟢 Very low",
    smarts: "100",
    smartsLabel: "IQ",
    url: "https://chat.mistral.ai",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    blurb: "Like leaving a light on for 2 seconds",
    co2PerQuery: 0.0018,
    badge: "🥈",
    bar: "w-[44%]",
    color: "bg-white/50 backdrop-blur border-emerald-300 hover:border-emerald-500",
    impact: "🟢 Low",
    smarts: "112",
    smartsLabel: "IQ",
    url: "https://claude.ai",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    blurb: "Like a Google search × 2",
    co2PerQuery: 0.0025,
    badge: "🥉",
    bar: "w-[61%]",
    color: "bg-white/50 backdrop-blur border-teal-300 hover:border-teal-500",
    impact: "🟡 Moderate",
    smarts: "112",
    smartsLabel: "IQ",
    url: "https://gemini.google.com",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    blurb: "Like watching 3 seconds of YouTube",
    co2PerQuery: 0.0041,
    badge: "⚡",
    bar: "w-full",
    color: "bg-yellow-50 border-yellow-300 hover:border-yellow-500",
    impact: "🟠 Higher",
    smarts: "122",
    smartsLabel: "IQ",
    url: "https://chatgpt.com",
  },
];

export default function Home() {
  return (
    <main className="nature-bg h-screen flex flex-col overflow-hidden relative">
      {/* Floating particles */}
      {[
        { left: "10%",  size: 6,  duration: "9s",  delay: "0s",   color: "#86efac" },
        { left: "20%",  size: 4,  duration: "13s", delay: "2s",   color: "#6ee7b7" },
        { left: "35%",  size: 8,  duration: "11s", delay: "1s",   color: "#bbf7d0" },
        { left: "50%",  size: 5,  duration: "15s", delay: "4s",   color: "#a7f3d0" },
        { left: "65%",  size: 7,  duration: "10s", delay: "0.5s", color: "#86efac" },
        { left: "78%",  size: 4,  duration: "14s", delay: "3s",   color: "#d9f99d" },
        { left: "88%",  size: 6,  duration: "12s", delay: "1.5s", color: "#6ee7b7" },
        { left: "42%",  size: 3,  duration: "16s", delay: "5s",   color: "#bbf7d0" },
        { left: "55%",  size: 9,  duration: "8s",  delay: "2.5s", color: "#a7f3d0" },
        { left: "5%",   size: 5,  duration: "11s", delay: "6s",   color: "#86efac" },
      ].map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
      {/* Floating leaves */}
      {[
        { left: "15%", top: "30%", duration: "6s",  delay: "0s" },
        { left: "72%", top: "55%", duration: "8s",  delay: "1s" },
        { left: "45%", top: "70%", duration: "7s",  delay: "3s" },
        { left: "85%", top: "25%", duration: "9s",  delay: "2s" },
        { left: "30%", top: "15%", duration: "5s",  delay: "4s" },
      ].map((l, i) => (
        <span
          key={i}
          className="leaf"
          style={{
            left: l.left,
            top: l.top,
            animationDuration: l.duration,
            animationDelay: l.delay,
          }}
        >
          🍃
        </span>
      ))}
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-3 border-b border-green-200 bg-white/40 backdrop-blur shrink-0">
        <span className="text-lg font-bold text-green-800">🌿 EcoAI</span>
        <div className="flex gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hover:text-green-900 transition-colors">Leaderboard</Link>
          <Link href="/chat" className="hover:text-green-900 transition-colors">Chat</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 gap-4 min-h-0">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
            🌍 AI with a smaller footprint
          </div>
          <h1 className="text-3xl font-extrabold text-green-900 leading-tight">
            The Greenest AI, at Your Fingertips
          </h1>
          <p className="text-xs text-green-600 max-w-md">
            Every AI chatbot uses electricity — and some use way more than others. Click one below to start chatting with the cleanest one.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-lg flex flex-col gap-1.5">
          <h2 className="text-sm font-bold text-green-700 text-center">🏆 Which AI pollutes the least?</h2>
          <p className="text-xs text-green-500 text-center mb-0.5">When you send a one-line question to the AI and the AI answers in 2–3 sentences</p>
          {models.map((m) => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border-2 px-4 py-2 flex flex-col gap-1 cursor-pointer transition-all ${m.color}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex flex-col items-center shrink-0 w-10">
                    <span className="text-sm font-bold text-green-900">{m.smarts}</span>
                    <span className="text-[10px] text-green-500">{m.smartsLabel}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-green-900 text-sm">{m.name}</span>
                    <span className="text-xs text-green-500 ml-1.5 hidden sm:inline">{m.blurb}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-green-800 shrink-0">{m.impact} →</span>
              </div>
              <div className="w-full bg-green-200/60 rounded-full h-1">
                <div className={`bg-green-600 h-1 rounded-full ${m.bar}`} />
              </div>
            </a>
          ))}
          <p className="text-xs text-green-400 text-center mt-1">
            <Link href="/leaderboard" className="underline">Full details →</Link>
          </p>
        </div>
      </div>

      <footer className="relative z-10 text-center py-2 text-xs text-green-700 border-t border-green-300/50 bg-white/20 backdrop-blur shrink-0">
        EcoAI — making AI choices greener, one query at a time.
      </footer>
    </main>
  );
}
