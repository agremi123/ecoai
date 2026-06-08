import Link from "next/link";

const models = [
  {
    rank: 1,
    name: "Mistral Small",
    provider: "Mistral AI",
    co2PerQuery: 0.0012,
    badge: "🥇",
    bar: "w-[29%]",
    color: "bg-green-100 border-green-400",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    co2PerQuery: 0.0018,
    badge: "🥈",
    bar: "w-[44%]",
    color: "bg-emerald-50 border-emerald-300",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    co2PerQuery: 0.0025,
    badge: "🥉",
    bar: "w-[61%]",
    color: "bg-teal-50 border-teal-300",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    co2PerQuery: 0.0041,
    badge: "⚡",
    bar: "w-full",
    color: "bg-yellow-50 border-yellow-300",
  },
];

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-green-50 overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-green-200 bg-white/70 backdrop-blur shrink-0">
        <span className="text-lg font-bold text-green-800">🌿 EcoAI</span>
        <div className="flex gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hover:text-green-900 transition-colors">Leaderboard</Link>
          <Link href="/chat" className="hover:text-green-900 transition-colors">Chat</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 gap-6 min-h-0">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
            🌍 AI with a smaller footprint
          </div>
          <h1 className="text-4xl font-extrabold text-green-900 leading-tight">
            The Greenest AI, at Your Fingertips
          </h1>
          <p className="text-sm text-green-600 max-w-md">
            Compare AI models by CO₂ per query. Pick the most energy-efficient one and chat — without the climate guilt.
          </p>
          <Link
            href="/chat"
            className="mt-1 bg-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors shadow-md"
          >
            Start Chatting →
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          <h2 className="text-sm font-bold text-green-700 text-center mb-1">🏆 Green Ranking — CO₂ per query</h2>
          {models.map((m) => (
            <div key={m.name} className={`rounded-xl border-2 px-4 py-2.5 flex flex-col gap-1.5 ${m.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{m.badge}</span>
                  <span className="font-semibold text-green-900 text-sm">{m.name}</span>
                  <span className="text-xs text-green-500">{m.provider}</span>
                </div>
                <span className="text-xs font-bold text-green-900">
                  {(m.co2PerQuery * 1000).toFixed(2)} mg CO₂
                </span>
              </div>
              <div className="w-full bg-green-200/60 rounded-full h-1">
                <div className={`bg-green-600 h-1 rounded-full ${m.bar}`} />
              </div>
            </div>
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
