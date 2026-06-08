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
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
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
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
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
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
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
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
    impact: "🟠 Higher",
    smarts: "122",
    smartsLabel: "IQ",
    url: "https://chatgpt.com",
  },
];

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden relative">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-trees-in-the-wind-1164-large.mp4" type="video/mp4" />
      </video>
      {/* Dark green overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-3 border-b border-white/20 bg-black/20 backdrop-blur shrink-0">
        <span className="text-lg font-bold text-white">🌿 EcoAI</span>
        <div className="flex gap-6 text-sm font-medium text-white/80">
          <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
          <Link href="/chat" className="hover:text-white transition-colors">Chat</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 gap-4 min-h-0">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30 backdrop-blur">
            🌍 AI with a smaller footprint
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
            The Greenest AI, at Your Fingertips
          </h1>
          <p className="text-xs text-white/80 max-w-md drop-shadow">
            Every AI chatbot uses electricity — and some use way more than others. Click one below to start chatting with the cleanest one.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-lg flex flex-col gap-1.5">
          <h2 className="text-sm font-bold text-white text-center drop-shadow">🏆 Which AI pollutes the least?</h2>
          <p className="text-xs text-white/70 text-center mb-0.5">When you send a one-line question to the AI and the AI answers in 2–3 sentences</p>
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
                    <span className="text-sm font-bold text-white">{m.smarts}</span>
                    <span className="text-[10px] text-white/60">{m.smartsLabel}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-white text-sm">{m.name}</span>
                    <span className="text-xs text-white/60 ml-1.5 hidden sm:inline">{m.blurb}</span>
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

      <footer className="text-center py-2 text-xs text-green-400 border-t border-green-200 shrink-0">
        EcoAI — making AI choices greener, one query at a time.
      </footer>
    </main>
  );
}
