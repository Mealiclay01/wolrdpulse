const fs = require('fs');
const path = require('path');

const base = {
  "metadata": {
    "title": "WolrdPulse | Real-Time Telemetry & DevOps MCP Server",
    "description": "WolrdPulse is an open-source Model Context Protocol (MCP) server streaming live cloud outages (AWS, Vercel, GitHub), DNS DoH queries, and SSL certificate verification.",
    "keywords": ["MCP Server", "Model Context Protocol", "DevOps Telemetry"]
  },
  "nav": {
    "features": "Features",
    "sponsor": "Sponsor Developer",
    "connectAgent": "Connect Agent",
    "backHome": "Back to Home"
  },
  "home": {
    "openSource": "Open Source on GitHub",
    "headline": "Real-Time Cloud Telemetry for AI Agents",
    "subHeadline": "Stop AI hallucinations. Give Claude and Cursor instant access to global cloud outages, DNS resolution, and SSL verification via Model Context Protocol.",
    "exploreFeatures": "Explore Live Tools & Features",
    "quickStart": "Quick Start"
  },
  "features": {
    "title": "Live Cloud Telemetry Features",
    "subtitle": "Discover the powerful DevOps capabilities WolrdPulse exposes to AI coding agents.",
    "faqTitle": "Frequently Asked Questions",
    "faq1Q": "What is WolrdPulse?",
    "faq1A": "WolrdPulse is an open-source Model Context Protocol (MCP) server that provides real-time DevOps telemetry to AI agents.",
    "faq2Q": "How do I connect Claude Desktop?",
    "faq2A": "Add npx wolrdpulse to your claude_desktop_config.json file to instantly equip Claude with live DevOps context."
  },
  "footer": {
    "terms": "Terms of Service",
    "privacy": "Privacy Policy",
    "developer": "Developer"
  }
};

const dicts = {
  en: base,
  ar: {
    metadata: {
      title: "WolrdPulse | خادم MCP لمراقبة السحابة وأتمتة DevOps",
      description: "خادم Model Context Protocol مفتوح المصدر يوفر تقارير انقطاع الخدمات السحابية (AWS, Vercel) وفحص SSL و DNS لوكلاء الذكاء الاصطناعي.",
      keywords: ["خادم MCP", "بروتوكول سياق النموذج", "مراقبة DevOps", "حالة السحابة"]
    },
    nav: { features: "الميزات", sponsor: "ادعم المطور", connectAgent: "ربط الوكيل", backHome: "العودة للرئيسية" },
    home: { openSource: "مفتوح المصدر على جيت هب", headline: "مراقبة سحابية لحظية لوكلاء الذكاء الاصطناعي", subHeadline: "امنع هلوسة الذكاء الاصطناعي. امنح Claude و Cursor وصولاً فورياً لانقطاعات السحابة العالمية، وفحص DNS و SSL عبر بروتوكول MCP.", exploreFeatures: "استكشف الأدوات اللحظية", quickStart: "البدء السريع" },
    features: { title: "ميزات المراقبة السحابية", subtitle: "اكتشف قدرات DevOps القوية التي يوفرها WolrdPulse لوكلاء الذكاء الاصطناعي.", faqTitle: "الأسئلة الشائعة", faq1Q: "ما هو WolrdPulse؟", faq1A: "هو خادم MCP مفتوح المصدر يزود وكلاء الذكاء الاصطناعي ببيانات DevOps لحظية.", faq2Q: "كيف أربط Claude؟", faq2A: "أضف npx wolrdpulse إلى ملف claude_desktop_config.json الخاص بك." },
    footer: { terms: "شروط الخدمة", privacy: "سياسة الخصوصية", developer: "المطور" }
  },
  fr: {
    metadata: {
      title: "WolrdPulse | Télémétrie en temps réel & Serveur MCP DevOps",
      description: "Serveur MCP open-source diffusant les pannes cloud en direct (AWS, Vercel), requêtes DNS DoH et vérification SSL pour l'IA.",
      keywords: ["Serveur MCP", "Intelligence Artificielle", "Télémétrie DevOps"]
    },
    nav: { features: "Fonctionnalités", sponsor: "Sponsoriser", connectAgent: "Connecter l'Agent", backHome: "Retour à l'accueil" },
    home: { openSource: "Open Source sur GitHub", headline: "Télémétrie Cloud en temps réel pour l'IA", subHeadline: "Arrêtez les hallucinations de l'IA. Donnez à Claude et Cursor un accès instantané aux pannes cloud mondiales via MCP.", exploreFeatures: "Explorer les Outils", quickStart: "Démarrage Rapide" },
    features: { title: "Fonctionnalités de Télémétrie", subtitle: "Découvrez les capacités DevOps puissantes exposées aux agents IA.", faqTitle: "Foire Aux Questions", faq1Q: "Qu'est-ce que WolrdPulse ?", faq1A: "C'est un serveur MCP open-source qui fournit une télémétrie DevOps en temps réel aux agents IA.", faq2Q: "Comment connecter Claude ?", faq2A: "Ajoutez npx wolrdpulse à votre fichier claude_desktop_config.json." },
    footer: { terms: "Conditions d'utilisation", privacy: "Confidentialité", developer: "Développeur" }
  },
  de: {
    metadata: {
      title: "WolrdPulse | Echtzeit-Telemetrie & DevOps MCP Server",
      description: "Open-Source MCP Server für Live-Cloud-Ausfälle, DNS DoH und SSL-Zertifikatsprüfung für KI-Agenten.",
      keywords: ["MCP Server", "Cloud-Ausfall", "DevOps Telemetrie"]
    },
    nav: { features: "Funktionen", sponsor: "Entwickler unterstützen", connectAgent: "Agent verbinden", backHome: "Zurück zur Startseite" },
    home: { openSource: "Open Source auf GitHub", headline: "Echtzeit-Cloud-Telemetrie für KI-Agenten", subHeadline: "Verhindern Sie KI-Halluzinationen. Geben Sie Claude und Cursor sofortigen Zugriff auf globale Cloud-Ausfälle.", exploreFeatures: "Tools erkunden", quickStart: "Schnellstart" },
    features: { title: "Live-Cloud-Telemetrie", subtitle: "Entdecken Sie leistungsstarke DevOps-Funktionen für KI-Agenten.", faqTitle: "Häufig gestellte Fragen", faq1Q: "Was ist WolrdPulse?", faq1A: "Ein Open-Source-MCP-Server, der KI-Agenten mit Echtzeit-DevOps-Daten versorgt.", faq2Q: "Wie verbinde ich Claude?", faq2A: "Fügen Sie npx wolrdpulse zu Ihrer claude_desktop_config.json hinzu." },
    footer: { terms: "Nutzungsbedingungen", privacy: "Datenschutz", developer: "Entwickler" }
  },
  ru: {
    metadata: {
      title: "WolrdPulse | Телеметрия в реальном времени и MCP сервер",
      description: "MCP сервер с открытым исходным кодом для передачи данных о сбоях в облаке, DNS и SSL для ИИ-агентов.",
      keywords: ["MCP сервер", "DevOps", "Телеметрия"]
    },
    nav: { features: "Функции", sponsor: "Спонсировать", connectAgent: "Подключить Агента", backHome: "На главную" },
    home: { openSource: "Open Source на GitHub", headline: "Облачная телеметрия в реальном времени для ИИ", subHeadline: "Предотвратите галлюцинации ИИ. Дайте Claude и Cursor мгновенный доступ к глобальным сбоям облака.", exploreFeatures: "Изучить инструменты", quickStart: "Быстрый старт" },
    features: { title: "Возможности Телеметрии", subtitle: "Узнайте о возможностях DevOps для ИИ-агентов.", faqTitle: "Часто задаваемые вопросы (FAQ)", faq1Q: "Что такое WolrdPulse?", faq1A: "Это MCP сервер с открытым исходным кодом для предоставления DevOps данных ИИ-агентам.", faq2Q: "Как подключить Claude?", faq2A: "Добавьте npx wolrdpulse в ваш claude_desktop_config.json." },
    footer: { terms: "Условия", privacy: "Конфиденциальность", developer: "Разработчик" }
  },
  zh: {
    metadata: {
      title: "WolrdPulse | 实时遥测与 DevOps MCP 服务器",
      description: "开源模型上下文协议 (MCP) 服务器，为 AI 代理提供云中断、DNS 和 SSL 验证的实时数据。",
      keywords: ["MCP 服务器", "DevOps 遥测", "云中断"]
    },
    nav: { features: "功能", sponsor: "赞助开发者", connectAgent: "连接代理", backHome: "返回首页" },
    home: { openSource: "GitHub 开源", headline: "为 AI 代理提供实时云遥测", subHeadline: "消除 AI 幻觉。通过 MCP 为 Claude 和 Cursor 提供全球云中断的即时访问。", exploreFeatures: "探索实时工具", quickStart: "快速开始" },
    features: { title: "实时云遥测功能", subtitle: "探索 WolrdPulse 为 AI 编码代理提供的强大 DevOps 能力。", faqTitle: "常见问题", faq1Q: "什么是 WolrdPulse？", faq1A: "它是一个开源的 MCP 服务器，为 AI 代理提供实时 DevOps 遥测数据。", faq2Q: "如何连接 Claude？", faq2A: "将 npx wolrdpulse 添加到您的 claude_desktop_config.json 文件中。" },
    footer: { terms: "服务条款", privacy: "隐私政策", developer: "开发者" }
  },
  ko: {
    metadata: {
      title: "WolrdPulse | 실시간 텔레메트리 및 DevOps MCP 서버",
      description: "AI 에이전트용 실시간 클라우드 장애, DNS 및 SSL 검증을 제공하는 오픈소스 MCP 서버.",
      keywords: ["MCP 서버", "클라우드 모니터링", "DevOps 텔레메트리"]
    },
    nav: { features: "기능", sponsor: "개발자 후원", connectAgent: "에이전트 연결", backHome: "홈으로" },
    home: { openSource: "GitHub 오픈소스", headline: "AI 에이전트를 위한 실시간 클라우드 텔레메트리", subHeadline: "AI 환각을 방지하세요. Claude와 Cursor에 전 세계 클라우드 장애에 대한 즉각적인 액세스를 제공합니다.", exploreFeatures: "라이브 도구 탐색", quickStart: "빠른 시작" },
    features: { title: "클라우드 텔레메트리 기능", subtitle: "AI 코딩 에이전트에 제공되는 강력한 DevOps 기능을 발견하세요.", faqTitle: "자주 묻는 질문", faq1Q: "WolrdPulse가 무엇인가요?", faq1A: "AI 에이전트에 실시간 DevOps 텔레메트리를 제공하는 오픈소스 MCP 서버입니다.", faq2Q: "Claude를 어떻게 연결하나요?", faq2A: "claude_desktop_config.json에 npx wolrdpulse를 추가하세요." },
    footer: { terms: "이용약관", privacy: "개인정보처리방침", developer: "개발자" }
  },
  ja: {
    metadata: {
      title: "WolrdPulse | リアルタイムテレメトリ & DevOps MCPサーバー",
      description: "AIエージェント向けにライブクラウド障害、DNS、SSL検証を提供するオープンソースMCPサーバー。",
      keywords: ["MCPサーバー", "DevOpsテレメトリ", "クラウド障害"]
    },
    nav: { features: "機能", sponsor: "スポンサー", connectAgent: "エージェントに接続", backHome: "ホームに戻る" },
    home: { openSource: "GitHubでオープンソース", headline: "AIエージェント向けのリアルタイムクラウドテレメトリ", subHeadline: "AIの幻覚を防ぎます。MCPを介してClaudeやCursorにグローバルなクラウド障害への即時アクセスを提供します。", exploreFeatures: "ツールを見る", quickStart: "クイックスタート" },
    features: { title: "ライブクラウドテレメトリ機能", subtitle: "AIコーディングエージェントに公開される強力なDevOps機能をご覧ください。", faqTitle: "よくある質問", faq1Q: "WolrdPulseとは何ですか？", faq1A: "AIエージェントにリアルタイムのDevOpsテレメトリを提供するオープンソースのMCPサーバーです。", faq2Q: "Claudeを接続するには？", faq2A: "claude_desktop_config.jsonにnpx wolrdpulseを追加してください。" },
    footer: { terms: "利用規約", privacy: "プライバシーポリシー", developer: "開発者" }
  },
  es: {
    metadata: {
      title: "WolrdPulse | Telemetría en tiempo real y Servidor MCP DevOps",
      description: "Servidor MCP de código abierto que proporciona interrupciones de nube en vivo, DNS y verificación SSL para agentes de IA.",
      keywords: ["Servidor MCP", "Telemetría DevOps", "Interrupción de nube"]
    },
    nav: { features: "Características", sponsor: "Patrocinar", connectAgent: "Conectar Agente", backHome: "Volver al inicio" },
    home: { openSource: "Código abierto en GitHub", headline: "Telemetría en tiempo real para agentes de IA", subHeadline: "Evite las alucinaciones de la IA. Dé a Claude y Cursor acceso instantáneo a interrupciones globales a través de MCP.", exploreFeatures: "Explorar Herramientas", quickStart: "Inicio Rápido" },
    features: { title: "Funciones de Telemetría", subtitle: "Descubra las poderosas capacidades DevOps que WolrdPulse ofrece a la IA.", faqTitle: "Preguntas Frecuentes", faq1Q: "¿Qué es WolrdPulse?", faq1A: "Es un servidor MCP de código abierto que proporciona datos DevOps en tiempo real.", faq2Q: "¿Cómo conecto Claude?", faq2A: "Agregue npx wolrdpulse a su archivo claude_desktop_config.json." },
    footer: { terms: "Términos", privacy: "Privacidad", developer: "Desarrollador" }
  }
};

for (const [lang, data] of Object.entries(dicts)) {
  fs.writeFileSync(path.join(__dirname, '../dictionaries', `${lang}.json`), JSON.stringify(data, null, 2));
}
console.log('Dictionaries generated.');
