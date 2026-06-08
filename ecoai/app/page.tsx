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
    color: "bg-green-100 border-green-400",
    impact: "🟢 Very low",
    smarts: "🧠🧠",
    smartsLabel: "Good",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    blurb: "Like leaving a light on for 2 seconds",
    co2PerQuery: 0.0018,
    badge: "🥈",
    bar: "w-[44%]",
    color: "bg-emerald-50 border-emerald-300",
    impact: "🟢 Low",
    smarts: "🧠🧠🧠",
    smartsLabel: "Very good",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    blurb: "Like a Google search × 2",
    co2PerQuery: 0.0025,
    badge: "🥉",
    bar: "w-[61%]",
    color: "bg-teal-50 border-teal-300",
    impact: "🟡 Moderate",
    smarts: "🧠🧠🧠",
    smartsLabel: "Very good",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    blurb: "Like watching 3 seconds of YouTube",
    co2PerQuery: 0.0041,
    badge: "⚡",
    bar: "w-full",
    color: "bg-yellow-50 border-yellow-300",
    impact: "🟠 Higher",
    smarts: "🧠🧠🧠🧠",
    smartsLabel: "Excellent",
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
            Every AI chatbot uses electricity — and some use way more than others. We rank them so you can pick the cleanest one.
          </p>
          <Link
            href="/chat"
            className="mt-1 bg-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors shadow-md"
          >
            Pick your AI below →
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          <h2 className="text-sm font-bold text-green-700 text-center">🏆 Which AI pollutes the least?</h2>
          <p className="text-xs text-green-500 text-center mb-1">When you send a one-line question to the AI and the AI answers in 2–3 sentences</p>
          {models.map((m) => (
            <div key={m.name} className={`rounded-xl border-2 px-4 py-2.5 flex flex-col gap-1.5 ${m.color}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex flex-col items-center shrink-0 w-10">
                    <span className="text-xs">{m.smarts}</span>
                    <span className="text-[10px] text-green-500">{m.smartsLabel}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-green-900 text-sm">{m.name}</span>
                    <span className="text-xs text-green-500 ml-1.5 hidden sm:inline">{m.blurb}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-green-800 shrink-0">{m.impact}</span>
              </div>
              <div className="w-full bg-green-200/60 rounded-full h-1">
                <div className={`bg-green-600 h-1 rounded-full ${m.bar}`} />
              </div>
              <p className="text-xs text-green-600 sm:hidden">{m.blurb}</p>
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
