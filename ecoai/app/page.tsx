import Link from "next/link";

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
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full border border-green-200">
          🌍 AI with a smaller footprint
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight max-w-3xl">
          The Greenest AI,<br />at Your Fingertips
        </h1>
        <p className="text-lg text-green-700 max-w-xl">
          Compare AI models by CO₂ per query. Pick the most energy-efficient one and start chatting — without the climate guilt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/leaderboard"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors shadow-md"
          >
            View Leaderboard
          </Link>
          <Link
            href="/chat"
            className="bg-white text-green-800 border border-green-300 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-sm"
          >
            Start Chatting
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-green-200 border-t border-green-200">
        {[
          { label: "Models ranked", value: "4" },
          { label: "CO₂ tracked per query", value: "✓" },
          { label: "Powered by green data", value: "100%" },
        ].map((s) => (
          <div key={s.label} className="bg-white py-8 flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-green-800">{s.value}</span>
            <span className="text-sm text-green-600">{s.label}</span>
          </div>
        ))}
      </section>

      <footer className="text-center py-6 text-xs text-green-500">
        EcoAI — making AI choices greener, one query at a time.
      </footer>
    </main>
  );
}
