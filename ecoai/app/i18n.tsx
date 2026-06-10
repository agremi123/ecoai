"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const languages = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "pt", flag: "🇵🇹", name: "Português" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
] as const;

export type LangCode = (typeof languages)[number]["code"];

const translations: Record<LangCode, Record<string, string>> = {
  en: {
    nav_leaderboard: "Leaderboard",
    nav_chat: "Chat",
    badge: "🌍 AI with a smaller footprint",
    title: "The Greenest AI, at Your Fingertips",
    subtitle: "Every AI chatbot uses electricity — and some use way more than others. Click one below to start chatting with the cleanest one.",
    ranking_title: "🏆 Which AI pollutes the least?",
    ranking_subtitle: "When you send a one-line question to the AI and the AI answers in 2–3 sentences",
    full_details: "Full details →",
    footer: "Green AI — making AI choices greener, one query at a time.",
    impact_verylow: "🟢 Very low",
    impact_low: "🟢 Low",
    impact_moderate: "🟡 Moderate",
    impact_higher: "🟠 Higher",
    blurb_mistral: "Like sending a text message",
    blurb_claude: "Like leaving a light on for 2 seconds",
    blurb_gemini: "Like a Google search × 2",
    blurb_gpt: "Like watching 3 seconds of YouTube",
    chat_status: "🥇 The greenest AI — like sending a text message",
    chat_empty_title: "Ask anything — with a clear conscience.",
    chat_empty_sub: "You're chatting with the most energy-efficient AI available.",
    chat_placeholder: "Send a message…",
    chat_send: "Send",
    chat_thinking: "Thinking…",
  },
  fr: {
    nav_leaderboard: "Classement",
    nav_chat: "Chat",
    badge: "🌍 L'IA avec une empreinte réduite",
    title: "L'IA la plus verte, à portée de main",
    subtitle: "Chaque chatbot IA consomme de l'électricité — et certains bien plus que d'autres. Cliquez ci-dessous pour discuter avec le plus propre.",
    ranking_title: "🏆 Quelle IA pollue le moins ?",
    ranking_subtitle: "Quand vous envoyez une question d'une ligne à l'IA et qu'elle répond en 2–3 phrases",
    full_details: "Tous les détails →",
    footer: "Green AI — des choix d'IA plus verts, une question à la fois.",
    impact_verylow: "🟢 Très faible",
    impact_low: "🟢 Faible",
    impact_moderate: "🟡 Modéré",
    impact_higher: "🟠 Plus élevé",
    blurb_mistral: "Comme envoyer un SMS",
    blurb_claude: "Comme laisser une lampe allumée 2 secondes",
    blurb_gemini: "Comme 2 recherches Google",
    blurb_gpt: "Comme regarder 3 secondes de YouTube",
    chat_status: "🥇 L'IA la plus verte — comme envoyer un SMS",
    chat_empty_title: "Demandez ce que vous voulez — la conscience tranquille.",
    chat_empty_sub: "Vous discutez avec l'IA la plus économe en énergie disponible.",
    chat_placeholder: "Envoyez un message…",
    chat_send: "Envoyer",
    chat_thinking: "Réflexion…",
  },
  es: {
    nav_leaderboard: "Clasificación",
    nav_chat: "Chat",
    badge: "🌍 IA con una huella más pequeña",
    title: "La IA más verde, a tu alcance",
    subtitle: "Cada chatbot de IA usa electricidad — y algunos mucho más que otros. Haz clic abajo para chatear con el más limpio.",
    ranking_title: "🏆 ¿Qué IA contamina menos?",
    ranking_subtitle: "Cuando envías una pregunta de una línea y la IA responde en 2–3 frases",
    full_details: "Ver detalles →",
    footer: "Green AI — decisiones de IA más verdes, una consulta a la vez.",
    impact_verylow: "🟢 Muy bajo",
    impact_low: "🟢 Bajo",
    impact_moderate: "🟡 Moderado",
    impact_higher: "🟠 Más alto",
    blurb_mistral: "Como enviar un SMS",
    blurb_claude: "Como dejar una luz encendida 2 segundos",
    blurb_gemini: "Como 2 búsquedas en Google",
    blurb_gpt: "Como ver 3 segundos de YouTube",
    chat_status: "🥇 La IA más verde — como enviar un SMS",
    chat_empty_title: "Pregunta lo que quieras — con la conciencia tranquila.",
    chat_empty_sub: "Estás chateando con la IA más eficiente disponible.",
    chat_placeholder: "Envía un mensaje…",
    chat_send: "Enviar",
    chat_thinking: "Pensando…",
  },
  de: {
    nav_leaderboard: "Rangliste",
    nav_chat: "Chat",
    badge: "🌍 KI mit kleinerem Fußabdruck",
    title: "Die grünste KI, direkt zur Hand",
    subtitle: "Jeder KI-Chatbot verbraucht Strom — manche viel mehr als andere. Klicke unten, um mit der saubersten zu chatten.",
    ranking_title: "🏆 Welche KI verschmutzt am wenigsten?",
    ranking_subtitle: "Wenn du eine einzeilige Frage stellst und die KI in 2–3 Sätzen antwortet",
    full_details: "Alle Details →",
    footer: "Green AI — grünere KI-Entscheidungen, eine Anfrage nach der anderen.",
    impact_verylow: "🟢 Sehr niedrig",
    impact_low: "🟢 Niedrig",
    impact_moderate: "🟡 Mittel",
    impact_higher: "🟠 Höher",
    blurb_mistral: "Wie eine SMS senden",
    blurb_claude: "Wie eine Lampe 2 Sekunden brennen lassen",
    blurb_gemini: "Wie 2 Google-Suchen",
    blurb_gpt: "Wie 3 Sekunden YouTube schauen",
    chat_status: "🥇 Die grünste KI — wie eine SMS senden",
    chat_empty_title: "Frag alles — mit gutem Gewissen.",
    chat_empty_sub: "Du chattest mit der energieeffizientesten verfügbaren KI.",
    chat_placeholder: "Nachricht senden…",
    chat_send: "Senden",
    chat_thinking: "Denke nach…",
  },
  it: {
    nav_leaderboard: "Classifica",
    nav_chat: "Chat",
    badge: "🌍 IA con un'impronta più piccola",
    title: "L'IA più verde, a portata di mano",
    subtitle: "Ogni chatbot IA consuma elettricità — e alcuni molto più di altri. Clicca qui sotto per chattare con il più pulito.",
    ranking_title: "🏆 Quale IA inquina meno?",
    ranking_subtitle: "Quando invii una domanda di una riga e l'IA risponde in 2–3 frasi",
    full_details: "Tutti i dettagli →",
    footer: "Green AI — scelte di IA più verdi, una domanda alla volta.",
    impact_verylow: "🟢 Molto basso",
    impact_low: "🟢 Basso",
    impact_moderate: "🟡 Moderato",
    impact_higher: "🟠 Più alto",
    blurb_mistral: "Come inviare un SMS",
    blurb_claude: "Come lasciare una luce accesa per 2 secondi",
    blurb_gemini: "Come 2 ricerche su Google",
    blurb_gpt: "Come guardare 3 secondi di YouTube",
    chat_status: "🥇 L'IA più verde — come inviare un SMS",
    chat_empty_title: "Chiedi qualsiasi cosa — con la coscienza pulita.",
    chat_empty_sub: "Stai chattando con l'IA più efficiente disponibile.",
    chat_placeholder: "Invia un messaggio…",
    chat_send: "Invia",
    chat_thinking: "Sto pensando…",
  },
  pt: {
    nav_leaderboard: "Classificação",
    nav_chat: "Chat",
    badge: "🌍 IA com uma pegada menor",
    title: "A IA mais verde, ao seu alcance",
    subtitle: "Todo chatbot de IA usa eletricidade — e alguns usam muito mais que outros. Clique abaixo para conversar com o mais limpo.",
    ranking_title: "🏆 Qual IA polui menos?",
    ranking_subtitle: "Quando você envia uma pergunta de uma linha e a IA responde em 2–3 frases",
    full_details: "Ver detalhes →",
    footer: "Green AI — escolhas de IA mais verdes, uma pergunta de cada vez.",
    impact_verylow: "🟢 Muito baixo",
    impact_low: "🟢 Baixo",
    impact_moderate: "🟡 Moderado",
    impact_higher: "🟠 Mais alto",
    blurb_mistral: "Como enviar um SMS",
    blurb_claude: "Como deixar uma luz acesa por 2 segundos",
    blurb_gemini: "Como 2 pesquisas no Google",
    blurb_gpt: "Como assistir 3 segundos de YouTube",
    chat_status: "🥇 A IA mais verde — como enviar um SMS",
    chat_empty_title: "Pergunte qualquer coisa — com a consciência limpa.",
    chat_empty_sub: "Você está conversando com a IA mais eficiente disponível.",
    chat_placeholder: "Envie uma mensagem…",
    chat_send: "Enviar",
    chat_thinking: "Pensando…",
  },
  zh: {
    nav_leaderboard: "排行榜",
    nav_chat: "聊天",
    badge: "🌍 更低碳的人工智能",
    title: "最环保的 AI，触手可及",
    subtitle: "每个 AI 聊天机器人都耗电——有些耗电量远超其他。点击下方，与最清洁的 AI 聊天。",
    ranking_title: "🏆 哪个 AI 污染最少？",
    ranking_subtitle: "当你发送一行问题，AI 用 2–3 句话回答时",
    full_details: "查看详情 →",
    footer: "Green AI — 让每一次 AI 选择更环保。",
    impact_verylow: "🟢 极低",
    impact_low: "🟢 低",
    impact_moderate: "🟡 中等",
    impact_higher: "🟠 较高",
    blurb_mistral: "相当于发一条短信",
    blurb_claude: "相当于开灯 2 秒",
    blurb_gemini: "相当于 2 次谷歌搜索",
    blurb_gpt: "相当于看 3 秒 YouTube",
    chat_status: "🥇 最环保的 AI——相当于发一条短信",
    chat_empty_title: "想问什么就问——毫无负担。",
    chat_empty_sub: "你正在与目前最节能的 AI 聊天。",
    chat_placeholder: "发送消息…",
    chat_send: "发送",
    chat_thinking: "思考中…",
  },
  ja: {
    nav_leaderboard: "ランキング",
    nav_chat: "チャット",
    badge: "🌍 環境にやさしいAI",
    title: "最もグリーンなAIを、あなたの手に",
    subtitle: "AIチャットボットは電力を消費します。その量はモデルによって大きく異なります。下をクリックして、最もクリーンなAIとチャットしましょう。",
    ranking_title: "🏆 どのAIが最も汚染が少ない？",
    ranking_subtitle: "1行の質問を送り、AIが2〜3文で答える場合",
    full_details: "詳細を見る →",
    footer: "Green AI — AIの選択をもっとグリーンに。",
    impact_verylow: "🟢 非常に低い",
    impact_low: "🟢 低い",
    impact_moderate: "🟡 中程度",
    impact_higher: "🟠 高め",
    blurb_mistral: "メールを1通送るのと同じ",
    blurb_claude: "電気を2秒つけるのと同じ",
    blurb_gemini: "Google検索2回分",
    blurb_gpt: "YouTubeを3秒見るのと同じ",
    chat_status: "🥇 最もグリーンなAI — メール1通分のエネルギー",
    chat_empty_title: "何でも聞いてください — 罪悪感なしで。",
    chat_empty_sub: "最もエネルギー効率の良いAIとチャットしています。",
    chat_placeholder: "メッセージを送信…",
    chat_send: "送信",
    chat_thinking: "考え中…",
  },
};

interface LangContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key] ?? key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as LangCode | null;
    if (saved && translations[saved]) {
      setLangState(saved);
      return;
    }
    const browser = navigator.language.slice(0, 2) as LangCode;
    if (translations[browser]) setLangState(browser);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: string) => translations[lang][key] ?? translations.en[key] ?? key;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function LanguagePicker({ light }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === lang) ?? languages[0];
  const english = languages[0];
  // Second quick flag: the user's current language, or French as default alternative
  const other = current.code === "en" ? languages[1] : current;

  const btnBase = "text-lg leading-none rounded-md px-1.5 py-1 transition-colors";
  const activeCls = light ? "bg-white/30" : "bg-green-200";
  const hoverCls = light ? "hover:bg-white/20" : "hover:bg-green-100";

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={() => setLang(english.code)}
        className={`${btnBase} ${lang === english.code ? activeCls : hoverCls}`}
        title={english.name}
      >
        {english.flag}
      </button>
      <button
        onClick={() => setLang(other.code)}
        className={`${btnBase} ${lang === other.code ? activeCls : hoverCls}`}
        title={other.name}
      >
        {other.flag}
      </button>
      <button
        onClick={() => setOpen(!open)}
        className={`text-xs px-1 py-1 rounded-md ${light ? "text-white/70 hover:bg-white/20" : "text-green-700 hover:bg-green-100"}`}
        title="More languages"
      >
        ▾
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-44 max-h-48 overflow-y-auto rounded-xl border border-green-200 bg-white shadow-lg py-1">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-green-50 ${l.code === lang ? "bg-green-100 font-semibold" : ""} text-green-900`}
              >
                <span className="text-base">{l.flag}</span> {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
