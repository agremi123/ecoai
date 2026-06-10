"use client";
import Link from "next/link";
import { useLang, LanguagePicker } from "./i18n";

const models = [
  {
    rank: 1,
    name: "Mistral Small",
    provider: "Mistral AI",
    blurbKey: "blurb_mistral",
    co2PerQuery: 0.0012,
    badge: "🥇",
    bar: "w-[29%]",
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
    impactKey: "impact_verylow",
    url: "/chat",
  },
  {
    rank: 2,
    name: "Claude Haiku",
    provider: "Anthropic",
    blurbKey: "blurb_claude",
    co2PerQuery: 0.0018,
    badge: "🥈",
    bar: "w-[44%]",
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
    impactKey: "impact_low",
    url: "https://claude.ai",
  },
  {
    rank: 3,
    name: "Gemini Flash",
    provider: "Google",
    blurbKey: "blurb_gemini",
    co2PerQuery: 0.0025,
    badge: "🥉",
    bar: "w-[61%]",
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
    impactKey: "impact_moderate",
    url: "https://gemini.google.com",
  },
  {
    rank: 4,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    blurbKey: "blurb_gpt",
    co2PerQuery: 0.0041,
    badge: "⚡",
    bar: "w-full",
    color: "bg-white/20 backdrop-blur border-white/40 hover:bg-white/30",
    impactKey: "impact_higher",
    url: "https://chatgpt.com",
  },
];

export default function Home() {
  const { t } = useLang();
  return (
    <main className="h-screen flex flex-col overflow-hidden relative bg-green-900">
      {/* Thumbnail shown instantly while video loads */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://img.youtube.com/vi/Ul6FvHnaZZc/maxresdefault.jpg')` }}
      />
      {/* YouTube iframe fades in on load */}
      <iframe
        className="absolute z-[1] pointer-events-none transition-opacity duration-1000"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(1.5)", width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.78vh" }}
        src="https://www.youtube.com/embed/Ul6FvHnaZZc?autoplay=1&mute=1&loop=1&playlist=Ul6FvHnaZZc&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&vq=hd2160&hd=1"
        allow="autoplay; encrypted-media"
        title="background"
        loading="eager"
      />
      {/* Blocks all YouTube UI (pause button, logo, etc) */}
      <div className="absolute inset-0 z-[2]" />
      {/* Dark green overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-[3]" />
      {/* Nav */}
      <nav className="relative z-[10] flex items-center justify-between px-8 py-3 border-b border-white/20 bg-black/20 backdrop-blur shrink-0">
        <span className="text-lg font-bold text-white">🌿 Green AI</span>
        <div className="flex items-center gap-6 text-sm font-medium text-white/80">
          <Link href="/leaderboard" className="hover:text-white transition-colors">{t("nav_leaderboard")}</Link>
          <Link href="/chat" className="hover:text-white transition-colors">{t("nav_chat")}</Link>
          <LanguagePicker light />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-[10] flex flex-1 flex-col items-center justify-center px-6 gap-4 min-h-0">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30 backdrop-blur">
            {t("badge")}
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-xs text-white/80 max-w-md drop-shadow">
            {t("subtitle")}
          </p>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-lg flex flex-col gap-1.5">
          <h2 className="text-sm font-bold text-white text-center drop-shadow">{t("ranking_title")}</h2>
          <p className="text-xs text-white/70 text-center mb-0.5">{t("ranking_subtitle")}</p>
          {models.map((m) => (
            <a
              key={m.name}
              href={m.url}
              target={m.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`rounded-xl border-2 px-4 py-2 flex flex-col gap-1 cursor-pointer transition-all ${m.color}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="min-w-0">
                    <span className="font-semibold text-white text-sm">{m.name}</span>
                    <span className="text-xs text-white/60 ml-1.5 hidden sm:inline">{t(m.blurbKey)}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/80 shrink-0">{t(m.impactKey)} →</span>
              </div>
              <div className="w-full bg-green-200/60 rounded-full h-1">
                <div className={`bg-green-600 h-1 rounded-full ${m.bar}`} />
              </div>
            </a>
          ))}
          <p className="text-xs text-white/50 text-center mt-1">
            <Link href="/leaderboard" className="underline hover:text-white transition-colors">{t("full_details")}</Link>
          </p>
        </div>
      </div>

      <footer className="relative z-[10] text-center py-2 text-xs text-white/50 border-t border-white/20 bg-black/20 backdrop-blur shrink-0">
        {t("footer")}
      </footer>
    </main>
  );
}
