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
    title: "The Greenest AI, for the Same Results",
    subtitle: "Every AI chatbot uses electricity — and some use way more than others. Click one below to start chatting with the cleanest one.",
    ranking_title: "🏆 Which AI pollutes the least?",
    ranking_subtitle: "When you send a one-line question to the AI and the AI answers in 2–3 sentences",
    full_details: "Full details →",
    footer: "GreenGPT — making AI choices greener, one query at a time.",
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
    activity_prompt: "What will you use AI for? We'll show you the greenest option — same quality, less energy.",
    activity_write: "Write something",
    activity_chat: "Ask questions",
    activity_translate: "Translate",
    activity_summarize: "Summarize",
    activity_advice: "Get advice",
    activity_create: "Get ideas",
    activity_reset: "Change activity",
    recommend_intro: "For this, we recommend:",
    try_it: "Try it",
    best_for_you: "✅ Best for you",
    proof_write: "Writes emails, essays & posts as well as ChatGPT — using 3× less energy",
    proof_chat: "Answers your questions just as clearly — 3× less energy than ChatGPT",
    proof_translate: "Translates 30+ languages accurately — with a tiny carbon footprint",
    proof_summarize: "Summarizes any text with precision — far greener than alternatives",
    proof_advice: "Gives you clear, thoughtful advice — just like ChatGPT, 3× less energy",
    proof_create: "Sparks creative ideas just as well — at a fraction of the energy",
    co2_saved: "🌱 Saved {{amount}} mg CO₂ vs ChatGPT",
    waitlist_prompt: "Get early access to new green AI tools",
    waitlist_placeholder: "your@email.com",
    waitlist_button: "Join the waitlist",
    waitlist_success: "You're on the list! 🌱 Thanks for joining.",
    waitlist_error: "Hmm, that didn't work. Try again?",
    chat_try_label: "Not sure what to ask? Try one:",
    chat_ex1: "✍️ Write a polite email asking for a deadline extension",
    chat_ex2: "💡 Explain photosynthesis in simple terms",
    chat_ex3: "🍽️ Give me 5 quick dinner ideas with chicken",
  },
  fr: {
    nav_leaderboard: "Classement",
    nav_chat: "Chat",
    badge: "🌍 L'IA avec une empreinte réduite",
    title: "L'IA la plus verte, pour les mêmes résultats",
    subtitle: "Chaque chatbot IA consomme de l'électricité — et certains bien plus que d'autres. Cliquez ci-dessous pour discuter avec le plus propre.",
    ranking_title: "🏆 Quelle IA pollue le moins ?",
    ranking_subtitle: "Quand vous envoyez une question d'une ligne à l'IA et qu'elle répond en 2–3 phrases",
    full_details: "Tous les détails →",
    footer: "GreenGPT — des choix d'IA plus verts, une question à la fois.",
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
    activity_prompt: "Pour quoi utilisez-vous l'IA ? On vous trouve l'option la plus verte — même qualité, moins d'énergie.",
    activity_write: "Écrire",
    activity_chat: "Poser des questions",
    activity_translate: "Traduire",
    activity_summarize: "Résumer",
    activity_advice: "Demander un conseil",
    activity_create: "Trouver des idées",
    activity_reset: "Changer d'activité",
    recommend_intro: "Pour ça, on recommande :",
    try_it: "Essayer",
    best_for_you: "✅ Le mieux pour vous",
    proof_write: "Écrit emails, essais et posts aussi bien que ChatGPT — 3× moins d'énergie",
    proof_chat: "Répond à vos questions tout aussi clairement — 3× moins d'énergie",
    proof_translate: "Traduit en 30+ langues avec précision — empreinte carbone minime",
    proof_summarize: "Résume n'importe quel texte avec précision — bien plus vert",
    proof_advice: "Donne des conseils clairs et réfléchis — comme ChatGPT, 3× moins d'énergie",
    proof_create: "Génère des idées créatives tout aussi bien — à une fraction de l'énergie",
    co2_saved: "🌱 {{amount}} mg CO₂ économisés vs ChatGPT",
    waitlist_prompt: "Accès anticipé aux nouveaux outils d'IA verte",
    waitlist_placeholder: "votre@email.com",
    waitlist_button: "Rejoindre la liste",
    waitlist_success: "Vous êtes inscrit ! 🌱 Merci.",
    waitlist_error: "Oups, ça n'a pas marché. Réessayer ?",
    chat_try_label: "Pas d'idée ? Essayez :",
    chat_ex1: "✍️ Écris un email poli pour demander un délai",
    chat_ex2: "💡 Explique la photosynthèse simplement",
    chat_ex3: "🍽️ Donne-moi 5 idées de dîner rapide au poulet",
  },
  es: {
    nav_leaderboard: "Clasificación",
    nav_chat: "Chat",
    badge: "🌍 IA con una huella más pequeña",
    title: "La IA más verde, con los mismos resultados",
    subtitle: "Cada chatbot de IA usa electricidad — y algunos mucho más que otros. Haz clic abajo para chatear con el más limpio.",
    ranking_title: "🏆 ¿Qué IA contamina menos?",
    ranking_subtitle: "Cuando envías una pregunta de una línea y la IA responde en 2–3 frases",
    full_details: "Ver detalles →",
    footer: "GreenGPT — decisiones de IA más verdes, una consulta a la vez.",
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
    activity_prompt: "¿Para qué usarás la IA? Te mostramos la opción más verde — misma calidad, menos energía.",
    activity_write: "Escribir algo",
    activity_chat: "Hacer preguntas",
    activity_translate: "Traducir",
    activity_summarize: "Resumir",
    activity_advice: "Pedir consejo",
    activity_create: "Conseguir ideas",
    activity_reset: "Cambiar actividad",
    recommend_intro: "Para esto, recomendamos:",
    try_it: "Probar",
    best_for_you: "✅ El mejor para ti",
    proof_write: "Escribe emails, ensayos y posts tan bien como ChatGPT — 3× menos energía",
    proof_chat: "Responde tus preguntas igual de claro — 3× menos energía que ChatGPT",
    proof_translate: "Traduce 30+ idiomas con precisión — huella de carbono mínima",
    proof_summarize: "Resume cualquier texto con precisión — mucho más verde",
    proof_advice: "Da consejos claros y reflexivos — como ChatGPT, 3× menos energía",
    proof_create: "Genera ideas creativas igual de bien — con mucha menos energía",
    co2_saved: "🌱 Ahorraste {{amount}} mg CO₂ vs ChatGPT",
    waitlist_prompt: "Acceso anticipado a nuevas herramientas de IA verde",
    waitlist_placeholder: "tu@email.com",
    waitlist_button: "Unirme a la lista",
    waitlist_success: "¡Estás en la lista! 🌱 Gracias.",
    waitlist_error: "Algo falló. ¿Intentar de nuevo?",
    chat_try_label: "¿No sabes qué preguntar? Prueba:",
    chat_ex1: "✍️ Escribe un email cortés pidiendo una prórroga",
    chat_ex2: "💡 Explica la fotosíntesis de forma sencilla",
    chat_ex3: "🍽️ Dame 5 ideas rápidas de cena con pollo",
  },
  de: {
    nav_leaderboard: "Rangliste",
    nav_chat: "Chat",
    badge: "🌍 KI mit kleinerem Fußabdruck",
    title: "Die grünste KI, mit denselben Ergebnissen",
    subtitle: "Jeder KI-Chatbot verbraucht Strom — manche viel mehr als andere. Klicke unten, um mit der saubersten zu chatten.",
    ranking_title: "🏆 Welche KI verschmutzt am wenigsten?",
    ranking_subtitle: "Wenn du eine einzeilige Frage stellst und die KI in 2–3 Sätzen antwortet",
    full_details: "Alle Details →",
    footer: "GreenGPT — grünere KI-Entscheidungen, eine Anfrage nach der anderen.",
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
    activity_prompt: "Wofür nutzen Sie KI? Wir zeigen Ihnen die grünste Option — gleiche Qualität, weniger Energie.",
    activity_write: "Schreiben",
    activity_chat: "Fragen stellen",
    activity_translate: "Übersetzen",
    activity_summarize: "Zusammenfassen",
    activity_advice: "Ratschläge holen",
    activity_create: "Ideen entwickeln",
    activity_reset: "Aktivität ändern",
    recommend_intro: "Dafür empfehlen wir:",
    try_it: "Ausprobieren",
    best_for_you: "✅ Beste Wahl für Sie",
    proof_write: "Schreibt E-Mails und Texte genauso gut wie ChatGPT — 3× weniger Energie",
    proof_chat: "Beantwortet Fragen genauso klar — 3× weniger Energie als ChatGPT",
    proof_translate: "Übersetzt 30+ Sprachen genau — mit minimalem CO₂-Fußabdruck",
    proof_summarize: "Fasst jeden Text präzise zusammen — viel umweltfreundlicher",
    proof_advice: "Gibt klare, durchdachte Ratschläge — wie ChatGPT, 3× weniger Energie",
    proof_create: "Generiert genauso kreative Ideen — bei einem Bruchteil der Energie",
    co2_saved: "🌱 {{amount}} mg CO₂ gespart vs. ChatGPT",
    waitlist_prompt: "Früher Zugang zu neuen grünen KI-Tools",
    waitlist_placeholder: "deine@email.com",
    waitlist_button: "Auf die Warteliste",
    waitlist_success: "Du bist dabei! 🌱 Danke.",
    waitlist_error: "Hat nicht geklappt. Nochmal versuchen?",
    chat_try_label: "Keine Idee? Probiere:",
    chat_ex1: "✍️ Schreibe eine höfliche E-Mail mit Bitte um Fristverlängerung",
    chat_ex2: "💡 Erkläre Photosynthese einfach",
    chat_ex3: "🍽️ Gib mir 5 schnelle Abendessen-Ideen mit Hähnchen",
  },
  it: {
    nav_leaderboard: "Classifica",
    nav_chat: "Chat",
    badge: "🌍 IA con un'impronta più piccola",
    title: "L'IA più verde, con gli stessi risultati",
    subtitle: "Ogni chatbot IA consuma elettricità — e alcuni molto più di altri. Clicca qui sotto per chattare con il più pulito.",
    ranking_title: "🏆 Quale IA inquina meno?",
    ranking_subtitle: "Quando invii una domanda di una riga e l'IA risponde in 2–3 frasi",
    full_details: "Tutti i dettagli →",
    footer: "GreenGPT — scelte di IA più verdi, una domanda alla volta.",
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
    activity_prompt: "Per cosa userai l'IA? Ti mostriamo l'opzione più verde — stessa qualità, meno energia.",
    activity_write: "Scrivere qualcosa",
    activity_chat: "Fare domande",
    activity_translate: "Tradurre",
    activity_summarize: "Riassumere",
    activity_advice: "Chiedere consiglio",
    activity_create: "Trovare idee",
    activity_reset: "Cambia attività",
    recommend_intro: "Per questo, consigliamo:",
    try_it: "Prova",
    best_for_you: "✅ Il migliore per te",
    proof_write: "Scrive email e testi bene quanto ChatGPT — 3× meno energia",
    proof_chat: "Risponde altrettanto chiaramente — 3× meno energia di ChatGPT",
    proof_translate: "Traduce in 30+ lingue con precisione — impronta minima",
    proof_summarize: "Riassume qualsiasi testo con precisione — molto più verde",
    proof_advice: "Dà consigli chiari e riflessivi — come ChatGPT, 3× meno energia",
    proof_create: "Genera idee creative altrettanto bene — con molta meno energia",
    co2_saved: "🌱 Risparmiati {{amount}} mg CO₂ vs ChatGPT",
    waitlist_prompt: "Accesso anticipato ai nuovi strumenti di IA verde",
    waitlist_placeholder: "tua@email.com",
    waitlist_button: "Unisciti alla lista",
    waitlist_success: "Sei in lista! 🌱 Grazie.",
    waitlist_error: "Qualcosa è andato storto. Riprova?",
  },
  pt: {
    nav_leaderboard: "Classificação",
    nav_chat: "Chat",
    badge: "🌍 IA com uma pegada menor",
    title: "A IA mais verde, com os mesmos resultados",
    subtitle: "Todo chatbot de IA usa eletricidade — e alguns usam muito mais que outros. Clique abaixo para conversar com o mais limpo.",
    ranking_title: "🏆 Qual IA polui menos?",
    ranking_subtitle: "Quando você envia uma pergunta de uma linha e a IA responde em 2–3 frases",
    full_details: "Ver detalhes →",
    footer: "GreenGPT — escolhas de IA mais verdes, uma pergunta de cada vez.",
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
    activity_prompt: "Para que você usará IA? Mostraremos a opção mais verde — mesma qualidade, menos energia.",
    activity_write: "Escrever algo",
    activity_chat: "Fazer perguntas",
    activity_translate: "Traduzir",
    activity_summarize: "Resumir",
    activity_advice: "Pedir conselho",
    activity_create: "Obter ideias",
    activity_reset: "Mudar atividade",
    recommend_intro: "Para isso, recomendamos:",
    try_it: "Experimentar",
    best_for_you: "✅ O melhor para você",
    proof_write: "Escreve emails e textos tão bem quanto ChatGPT — 3× menos energia",
    proof_chat: "Responde às perguntas tão claramente — 3× menos energia",
    proof_translate: "Traduz 30+ idiomas com precisão — pegada de carbono mínima",
    proof_summarize: "Resume qualquer texto com precisão — muito mais verde",
    proof_advice: "Dá conselhos claros e ponderados — como ChatGPT, 3× menos energia",
    proof_create: "Gera ideias criativas tão bem — com muito menos energia",
    co2_saved: "🌱 Economizou {{amount}} mg CO₂ vs ChatGPT",
    waitlist_prompt: "Acesso antecipado a novas ferramentas de IA verde",
    waitlist_placeholder: "seu@email.com",
    waitlist_button: "Entrar na lista",
    waitlist_success: "Você está na lista! 🌱 Obrigado.",
    waitlist_error: "Algo deu errado. Tentar de novo?",
  },
  zh: {
    nav_leaderboard: "排行榜",
    nav_chat: "聊天",
    badge: "🌍 更低碳的人工智能",
    title: "最环保的 AI，同样的效果",
    subtitle: "每个 AI 聊天机器人都耗电——有些耗电量远超其他。点击下方，与最清洁的 AI 聊天。",
    ranking_title: "🏆 哪个 AI 污染最少？",
    ranking_subtitle: "当你发送一行问题，AI 用 2–3 句话回答时",
    full_details: "查看详情 →",
    footer: "GreenGPT — 让每一次 AI 选择更环保。",
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
    activity_prompt: "你想用 AI 做什么？我们为你找到最环保的选项——同等质量，更少能耗。",
    activity_write: "写作",
    activity_chat: "提问",
    activity_translate: "翻译",
    activity_summarize: "总结",
    activity_advice: "寻求建议",
    activity_create: "获取创意",
    activity_reset: "更换活动",
    recommend_intro: "为此，我们推荐：",
    try_it: "立即使用",
    best_for_you: "✅ 最适合您",
    proof_write: "写邮件和文章与 ChatGPT 一样好——能耗减少 3 倍",
    proof_chat: "回答问题同样清晰——比 ChatGPT 少用 3 倍能量",
    proof_translate: "准确翻译 30 多种语言——碳足迹极小",
    proof_summarize: "精确总结任何文本——比其他选择更环保",
    proof_advice: "给出清晰、周到的建议——和 ChatGPT 一样好，能耗减少 3 倍",
    proof_create: "创意想法同样丰富——能耗极低",
    co2_saved: "🌱 与 ChatGPT 相比节省了 {{amount}} mg CO₂",
    waitlist_prompt: "抢先体验全新的环保 AI 工具",
    waitlist_placeholder: "你的@邮箱.com",
    waitlist_button: "加入候补名单",
    waitlist_success: "已加入名单！🌱 感谢。",
    waitlist_error: "出错了，请重试？",
  },
  ja: {
    nav_leaderboard: "ランキング",
    nav_chat: "チャット",
    badge: "🌍 環境にやさしいAI",
    title: "最もグリーンなAI、同じクオリティで",
    subtitle: "AIチャットボットは電力を消費します。その量はモデルによって大きく異なります。下をクリックして、最もクリーンなAIとチャットしましょう。",
    ranking_title: "🏆 どのAIが最も汚染が少ない？",
    ranking_subtitle: "1行の質問を送り、AIが2〜3文で答える場合",
    full_details: "詳細を見る →",
    footer: "GreenGPT — AIの選択をもっとグリーンに。",
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
    activity_prompt: "AIで何をしますか？同じ品質で最もグリーンな選択肢をお見せします。",
    activity_write: "文章を書く",
    activity_chat: "質問する",
    activity_translate: "翻訳する",
    activity_summarize: "要約する",
    activity_advice: "アドバイスをもらう",
    activity_create: "アイデアを出す",
    activity_reset: "活動を変える",
    recommend_intro: "このタスクにはこちらをおすすめします：",
    try_it: "試してみる",
    best_for_you: "✅ あなたに最適",
    proof_write: "ChatGPT と同じ品質でメールや文章を作成 — エネルギーは3倍少ない",
    proof_chat: "同じくらい明確に質問に答えます — ChatGPT より3倍省エネ",
    proof_translate: "30以上の言語を正確に翻訳 — カーボンフットプリントは最小",
    proof_summarize: "どんなテキストも精密に要約 — はるかに環境にやさしい",
    proof_advice: "明確で丁寧なアドバイスを提供 — ChatGPT と同等、エネルギーは3倍少ない",
    proof_create: "同じくらい豊かな創造的アイデア — わずかなエネルギーで",
    co2_saved: "🌱 ChatGPT より {{amount}} mg CO₂ 節約",
    waitlist_prompt: "新しいグリーンAIツールに早期アクセス",
    waitlist_placeholder: "your@email.com",
    waitlist_button: "ウェイトリストに登録",
    waitlist_success: "登録完了！🌱 ありがとう。",
    waitlist_error: "うまくいきませんでした。もう一度お試しを。",
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
