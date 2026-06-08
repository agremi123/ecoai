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
    <main className="flex flex-col min-h-screen bg-green-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-green-200 bg-white/70 backdrop-blur sticky top-0 z-10">
        <span className="text-xl font-bold text-green-800">🌿 EcoAI</span>
        <div className="flex gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hover:text-green-900 transition-colors">Leaderboard</Link>
          <Link href="/chat" className="hover:text-green-900 transition-colors">Chat</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-12 gap-6">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full border border-green-200">
          🌍 AI with a smaller footprint
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight max-w-2xl">
          The Greenest AI,<br />at Your Fingertips
        </h1>
        <p className="text-lg text-green-700 max-w-xl">
          Compare AI models by CO₂ per query. Pick the most energy-efficient one and start chatting — without the climate guilt.
        </p>
        <Link
          href="/chat"
          className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors shadow-md"
        >
          Start Chatting →
        </Link>
      </section>

      {/* Inline leaderboard */}
      <section className="max-w-2xl mx-auto w-full px-6 pb-20">
        <h2 className="text-xl font-bold text-green-800 mb-4 text-center">🏆 Green Ranking</h2>
        <div className="flex flex-col gap-3">
          {models.map((m) => (
            <div key={m.name} className={`rounded-2xl border-2 px-5 py-4 flex flex-col gap-2 ${m.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{m.badge}</span>
                  <div>
                    <span className="font-bold text-green-900">{m.name}</span>
                    <span className="text-xs text-green-600 ml-2">{m.provider}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-900">
                  {(m.co2PerQuery * 1000).toFixed(2)} mg CO₂
                </span>
              </div>
              <div className="w-full bg-green-200/60 rounded-full h-1.5">
                <div className={`bg-green-600 h-1.5 rounded-full ${m.bar}`} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-green-500 mt-4 text-center">
          Estimated CO₂ per average query · <Link href="/leaderboard" className="underline">Full details →</Link>
        </p>
      </section>

      <footer className="text-center py-6 text-xs text-green-500 border-t border-green-200">
        EcoAI — making AI choices greener, one query at a time.
      </footer>
    </main>
  );
}
