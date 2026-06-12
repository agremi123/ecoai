import Link from "next/link";

const models = [
  {
    rank: 1,
    name: "Mistral Small",
    provider: "Mistral AI",
    co2PerQuery: 0.0012,
    energyPerQuery: 0.0003,
    params: "7B",
    badge: "🥇 Greenest",
    color: "bg-green-100 border-green-400",
    badgeColor: "bg-green-600",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    co2PerQuery: 0.0018,
    energyPerQuery: 0.00045,
    params: "~20B",
    badge: "🥈 Efficient",
    color: "bg-emerald-50 border-emerald-300",
    badgeColor: "bg-emerald-600",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    co2PerQuery: 0.0025,
    energyPerQuery: 0.00062,
    params: "~20B",
    badge: "🥉 Good",
    color: "bg-teal-50 border-teal-300",
    badgeColor: "bg-teal-600",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    co2PerQuery: 0.0041,
    energyPerQuery: 0.001,
    params: "~8B",
    badge: "⚡ Moderate",
    color: "bg-yellow-50 border-yellow-300",
    badgeColor: "bg-yellow-600",
  },
];

const maxCO2 = Math.max(...models.map((m) => m.co2PerQuery));

export default function Leaderboard() {
  return (
    <main className="min-h-screen bg-green-50">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-green-200 bg-white/70 backdrop-blur sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold text-green-800">🌿 GreenGPT</Link>
        <div className="flex gap-6 text-sm font-medium text-green-700">
          <Link href="/leaderboard" className="hidden sm:inline text-green-900 font-semibold underline underline-offset-4">Leaderboard</Link>
          <Link href="/chat" className="hidden sm:inline hover:text-green-900 transition-colors">Chat</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-green-900 mb-2">AI Green Leaderboard</h1>
        <p className="text-green-600 mb-10 text-base">
          Models ranked by estimated CO₂ emitted per average query (lower = greener). Data is approximate and based on public research.
        </p>

        <div className="flex flex-col gap-4">
          {models.map((model) => (
            <div
              key={model.name}
              className={`rounded-2xl border-2 p-5 ${model.color} flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-green-900 w-6">{model.rank}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-900 text-lg">{model.name}</span>
                      <span className={`text-xs text-white px-2 py-0.5 rounded-full font-medium ${model.badgeColor}`}>
                        {model.badge}
                      </span>
                    </div>
                    <span className="text-xs text-green-600">{model.provider} · ~{model.params} params</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-900">
                    {(model.co2PerQuery * 1000).toFixed(2)} mg CO₂
                  </div>
                  <div className="text-xs text-green-600">per query</div>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full bg-green-200/60 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${(model.co2PerQuery / maxCO2) * 100}%` }}
                />
              </div>

              <div className="flex gap-6 text-xs text-green-700">
                <span>⚡ {(model.energyPerQuery * 1000).toFixed(2)} mWh/query</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-green-500 mt-8">
          * Estimates based on published research and model architecture comparisons. Actual emissions vary by datacenter, query length, and load.
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/chat"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors shadow-md inline-block"
          >
            Chat with Mistral Small →
          </Link>
        </div>
      </div>
    </main>
  );
}
