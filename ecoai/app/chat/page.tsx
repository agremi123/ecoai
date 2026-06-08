import Link from "next/link";

const models = [
  {
    rank: 1,
    name: "Mistral Small",
    provider: "Mistral AI",
    badge: "🥇",
    impact: "🟢 Greenest",
    blurb: "Like sending a text message",
    smarts: "100",
    smartsLabel: "IQ",
    url: "https://chat.mistral.ai",
    color: "bg-green-100 border-green-400",
    btnColor: "bg-green-700 hover:bg-green-800",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    badge: "🥈",
    impact: "🟢 Very low",
    blurb: "Like leaving a light on for 2 seconds",
    smarts: "112",
    smartsLabel: "IQ",
    url: "https://claude.ai",
    color: "bg-emerald-50 border-emerald-300",
    btnColor: "bg-emerald-700 hover:bg-emerald-800",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    badge: "🥉",
    impact: "🟡 Moderate",
    blurb: "Like a Google search × 2",
    smarts: "112",
    smartsLabel: "IQ",
    url: "https://gemini.google.com",
    color: "bg-teal-50 border-teal-300",
    btnColor: "bg-teal-700 hover:bg-teal-800",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    badge: "⚡",
    impact: "🟠 Higher",
    blurb: "Like watching 3 seconds of YouTube",
    smarts: "🧠🧠🧠🧠",
    smartsLabel: "Excellent",
    url: "https://chatgpt.com",
    color: "bg-yellow-50 border-yellow-300",
    btnColor: "bg-yellow-600 hover:bg-yellow-700",
  },
];

export default function Chat() {
  return (
    <main className="min-h-screen bg-green-50">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-green-200 bg-white/70 backdrop-blur sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold text-green-800">🌿 EcoAI</Link>
        <div className="flex gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hover:text-green-900 transition-colors">Leaderboard</Link>
          <Link href="/chat" className="text-green-900 font-semibold underline underline-offset-4">Chat</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-6">
        <div className="text-center flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-extrabold text-green-900">Start chatting</h1>
          <p className="text-green-600 text-sm">Pick the AI you want to use. We recommend starting with the greenest one.</p>
        </div>

        {models.map((m) => (
          <div key={m.name} className={`rounded-2xl border-2 px-5 py-4 flex items-center justify-between gap-4 ${m.color}`}>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center w-12 shrink-0">
                <span className="text-sm">{m.smarts}</span>
                <span className="text-[10px] text-green-500">{m.smartsLabel}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-900">{m.name}</span>
                  <span className="text-xs text-green-500">{m.provider}</span>
                </div>
                <div className="text-xs text-green-600">{m.impact} · {m.blurb}</div>
              </div>
            </div>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors ${m.btnColor}`}
            >
              Open →
            </a>
          </div>
        ))}

        <p className="text-xs text-green-400 text-center mt-2">
          You&apos;ll be taken to each AI&apos;s official website. Free accounts available on all platforms.
        </p>
      </div>
    </main>
  );
}
