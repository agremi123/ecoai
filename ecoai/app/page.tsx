"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang, LanguagePicker } from "./i18n";
import WaitlistForm from "./WaitlistForm";

const activityRankings: Record<string, string[]> = {
  write:     ["Mistral Small", "Claude Haiku", "Gemini Flash", "GPT-4o Mini"],
  chat:      ["Mistral Small", "Claude Haiku", "Gemini Flash", "GPT-4o Mini"],
  translate: ["Mistral Small", "Gemini Flash", "Claude Haiku", "GPT-4o Mini"],
  summarize: ["Mistral Small", "Claude Haiku", "Gemini Flash", "GPT-4o Mini"],
  advice:    ["Mistral Small", "Claude Haiku", "Gemini Flash", "GPT-4o Mini"],
  create:    ["Mistral Small", "Claude Haiku", "Gemini Flash", "GPT-4o Mini"],
};

const rankBadges = ["🥇", "🥈", "🥉", "⚡"];

const activities = [
  { id: "write",     icon: "✍️", key: "activity_write" },
  { id: "chat",      icon: "💬", key: "activity_chat" },
  { id: "translate", icon: "🌍", key: "activity_translate" },
  { id: "summarize", icon: "📝", key: "activity_summarize" },
  { id: "advice",    icon: "💡", key: "activity_advice" },
  { id: "create",    icon: "🎨", key: "activity_create" },
];

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
  const [activity, setActivity] = useState<string | null>(null);

  const ranked = activity
    ? activityRankings[activity].map((name) => models.find((m) => m.name === name)!)
    : models;
  const top = ranked[0];

  return (
    <main className="h-screen flex flex-col overflow-hidden relative bg-green-900">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/bg-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-[3]" />

      {/* Nav */}
      <nav className="relative z-[10] flex items-center justify-between px-8 py-3 border-b border-white/20 bg-black/20 backdrop-blur shrink-0">
        <span className="text-lg font-bold text-white">🌿 GreenGPT</span>
        <div className="flex items-center gap-6 text-sm font-medium text-white/80">
          <Link href="/leaderboard" className="hidden sm:inline hover:text-white transition-colors">{t("nav_leaderboard")}</Link>
          <Link href="/chat" className="hidden sm:inline hover:text-white transition-colors">{t("nav_chat")}</Link>
          <LanguagePicker light />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-[10] flex flex-1 flex-col items-center justify-center px-6 gap-6 sm:gap-3 min-h-0">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30 backdrop-blur">
            {t("badge")}
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
            {t("title")}
          </h1>
        </div>

        {activity === null ? (
          /* Step 1 — Activity picker */
          <div className="w-full max-w-lg flex flex-col gap-4 sm:gap-2">
            <h2 className="text-sm font-bold text-white text-center drop-shadow">{t("activity_prompt")}</h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-2">
              {activities.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActivity(a.id)}
                  className="flex flex-col items-center gap-1 bg-white/20 backdrop-blur border border-white/40 hover:bg-white/30 active:bg-white/40 rounded-xl px-3 py-3 transition-all cursor-pointer"
                >
                  <span className="text-2xl leading-none">{a.icon}</span>
                  <span className="text-xs font-medium text-white text-center leading-tight">{t(a.key)}</span>
                </button>
              ))}
            </div>
            {/* Ranking preview */}
            <div className="w-full flex flex-col gap-2 sm:gap-1 mt-2 sm:mt-1">
              {models.map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target={m.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`rounded-xl border px-3 py-1.5 flex items-center gap-2 bg-white/20 backdrop-blur hover:bg-white/30 transition-all cursor-pointer ${m.rank === 1 ? "border-green-400/60" : "border-white/25"}`}
                >
                  <span className="text-sm leading-none shrink-0">{m.badge}</span>
                  <span className="font-semibold text-white text-xs flex-1">{m.name}</span>
                  <div className="w-16 bg-green-200/30 rounded-full h-1 shrink-0">
                    <div className={`bg-green-400 h-1 rounded-full ${m.bar}`} />
                  </div>
                  <span className="text-xs text-white/55 shrink-0">{(m.co2PerQuery * 1000).toFixed(1)} mg CO₂ →</span>
                </a>
              ))}
            </div>
            <WaitlistForm />
            <p className="text-xs text-white/50 text-center">
              <Link href="/leaderboard" className="underline hover:text-white transition-colors">{t("full_details")}</Link>
            </p>
          </div>
        ) : (
          /* Step 2 — Recommendation + leaderboard */
          <>
            {/* Recommendation card */}
            <div className="w-full max-w-lg bg-green-500/25 backdrop-blur border border-green-400/50 rounded-xl px-4 py-3 flex flex-col gap-1">
              <p className="text-xs text-white/60">{t("recommend_intro")}</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">🥇</span>
                  <div>
                    <span className="text-base font-bold text-white">{top.name}</span>
                    <span className="text-xs text-white/50 ml-1.5">· {top.provider}</span>
                  </div>
                </div>
                <a
                  href={top.url}
                  target={top.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-400 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {t("try_it")} →
                </a>
              </div>
              <p className="text-xs text-white/75">{t(`proof_${activity}`)}</p>
              <button
                onClick={() => setActivity(null)}
                className="text-xs text-white/40 hover:text-white/70 transition-colors text-left mt-0.5"
              >
                ← {t("activity_reset")}
              </button>
            </div>

            {/* Leaderboard */}
            <div className="w-full max-w-lg flex flex-col gap-1.5">
              {ranked.map((m, i) => (
                <a
                  key={m.name}
                  href={m.url}
                  target={m.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`rounded-xl border-2 px-4 py-2 flex flex-col gap-1 cursor-pointer transition-all ${m.color} ${i === 0 ? "border-green-400/60" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base leading-none shrink-0">{rankBadges[i]}</span>
                      <div className="min-w-0">
                        <span className="font-semibold text-white text-sm">{m.name}</span>
                        {i === 0 && (
                          <span className="text-xs font-semibold text-green-300 ml-2">{t("best_for_you")}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white/80 shrink-0">
                      {t(m.impactKey)} <span className="text-white/60 font-normal">· {(m.co2PerQuery * 1000).toFixed(1)} mg CO₂</span> →
                    </span>
                  </div>
                  <div className="w-full bg-green-200/60 rounded-full h-1">
                    <div className={`bg-green-600 h-1 rounded-full ${m.bar}`} />
                  </div>
                </a>
              ))}
              <p className="text-xs text-white/50 text-center mt-0.5">
                <Link href="/leaderboard" className="underline hover:text-white transition-colors">{t("full_details")}</Link>
              </p>
            </div>
          </>
        )}
      </div>

      <footer className="relative z-[10] text-center py-2 text-xs text-white/50 border-t border-white/20 bg-black/20 backdrop-blur shrink-0">
        {t("footer")}
      </footer>
    </main>
  );
}
