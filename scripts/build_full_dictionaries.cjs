const fs = require('fs');
const path = require('path');

const dicts = {
  en: {
    metadata: {
      title: "WolrdPulse | Real-Time Telemetry & DevOps MCP Server",
      description: "WolrdPulse is an open-source Model Context Protocol (MCP) server streaming live cloud outages (AWS, Vercel, GitHub), DNS DoH queries, and SSL certificate verification.",
      keywords: ["MCP Server", "Model Context Protocol", "DevOps Telemetry", "Claude MCP", "Cursor MCP"]
    },
    nav: {
      features: "Features",
      sponsor: "Sponsor Developer",
      connectAgent: "Connect Agent",
      backHome: "Back to Home"
    },
    home: {
      openSource: "Open Source on GitHub",
      headline: "Live DevOps context for autonomous AI agents.",
      subHeadline: "An open-source Model Context Protocol (MCP) server streaming live cloud outages, edge latency, DNS queries, and SSL certificate health directly into Claude and Cursor.",
      quickStart: "Connect Your Agent",
      exploreFeatures: "Explore Live Tools & Features",
      demoTitle: "How AI Agents Use WolrdPulse",
      agentDemo: {
        tab1Label: "Cloud Outage vs. Code Bug",
        tab1Question: "Why is the Next.js production build failing on Vercel?",
        withoutStatus1: "Blind Hallucination",
        withoutAction1: "Agent inspects local code, guesses syntax issues, and suggests unnecessary refactors to package.json.",
        withoutResult1: "Wasted developer hours rewriting functional code.",
        withStatus1: "Live Infrastructure Context",
        withResult1: "Agent immediately informs you that Vercel's build queue is degraded. No code changes required.",
        tab2Label: "SSL Expiry & Domain Launch",
        tab2Question: "Is our API domain SSL certificate valid for tomorrow's launch?",
        withoutStatus2: "Static Knowledge Cutoff",
        withoutAction2: "Agent cannot inspect live TLS sockets. Suggests manually installing openssl or checking browser dev tools.",
        withoutResult2: "Manual verification required.",
        withStatus2: "Native Socket Inspection",
        withResult2: "Agent verifies TLS certificate chain and confirms the certificate is active through Let's Encrypt.",
        tab3Label: "DNS Propagation & Routing",
        tab3Question: "Did our custom domain CNAME finish propagating?",
        withoutStatus3: "Cannot Probe Network",
        withoutAction3: "Agent suggests waiting 24-48 hours and running local dig commands.",
        withoutResult3: "Uncertainty on routing.",
        withStatus3: "Live DNS-over-HTTPS",
        withResult3: "Agent queries Cloudflare 1.1.1.1 in 18ms and confirms the CNAME record is globally active.",
        promptHeader: "Developer prompt in Cursor / Claude",
        withoutTitle: "Without WolrdPulse",
        outcomePrefix: "Outcome",
        withTitle: "With WolrdPulse MCP",
        zeroHallucination: "Zero Hallucination",
        instantResolution: "Instant accurate resolution"
      },
      archTitle: "Built for Autonomous Agent Workflows",
      archSubtitle: "Everything your AI coding assistant needs to verify infrastructure before writing deployment code.",
      browseAll: "Browse all tools",
      outageCardTitle: "Cloud Outages",
      outageCardDesc: "Real-time status for AWS, Vercel, and GitHub so agents don't debug code during 3rd-party outages.",
      sslCardTitle: "SSL Inspector",
      sslCardDesc: "Native TLS handshake tool to verify certificate expiration and issuer chains autonomously.",
      dnsCardTitle: "DNS Resolver",
      dnsCardDesc: "Live DNS-over-HTTPS queries (A, AAAA, CNAME, MX) to debug routing and record propagation.",
      pingCardTitle: "Edge Pings",
      pingCardDesc: "Synthetic HTTP probe runner to test endpoint response times, headers, and status codes globally.",
      setupBadge: "Instant Setup",
      setupTitle: "Connect with Claude Desktop or Cursor",
      setupDesc: "Add the SSE endpoint to your MCP configuration file. No API keys or authentication required.",
      copyConfig: "Copy MCP Config",
      copiedConfig: "Config Copied!",
      modalTitle: "Connect AI Agent via MCP",
      modalDesc: "Paste this snippet into your IDE or MCP client settings. Your agent will immediately receive access to live cloud outages, SSL verification, and edge telemetry.",
      modalCopyBtn: "Copy JSON",
      modalCopied: "Copied to Clipboard!",
      modalDone: "Done"
    },
    features: {
      badge: "MCP Tool Suite & Edge Telemetry",
      title: "Live Cloud Telemetry Features",
      subtitle: "Discover the powerful DevOps capabilities WolrdPulse exposes to AI coding agents.",
      tabAll: "All Telemetry Tools",
      tabStatus: "Cloud Status",
      tabSsl: "SSL Inspector",
      tabDns: "DNS Resolver",
      tabPing: "Edge Ping",
      tabPulse: "Framework Pulse",
      statusTitle: "Cloud Infrastructure Status",
      statusDesc: "Fetches live operational status and incident reports for AWS, Cloudflare, GitHub, OpenAI, Vercel, and more.",
      sslTitle: "SSL & TLS Certificate Inspector",
      sslDesc: "Inspects SSL certificates to verify expiration dates and issuer chains.",
      dnsTitle: "DNS-over-HTTPS (DoH) Resolver",
      dnsDesc: "Resolves DNS records securely via Cloudflare 1.1.1.1 without exposing your local DNS cache.",
      pingTitle: "Synthetic Edge Ping & Latency Probe",
      pingDesc: "Sends synthetic HTTP probes to test edge latency and retrieve response headers.",
      pulseTitle: "Tech Framework & Library Release Pulse",
      pulseDesc: "Aggregates engineering blogs and news to give agents context on latest framework updates.",
      mcpTools: "MCP JSON-RPC Tool Schema",
      mcpToolsSub: "Connect your IDE agent to https://wolrdpulse.app/sse to expose these tools automatically.",
      copySchema: "copy schema",
      copied: "copied",
      faqTitle: "Frequently Asked Questions",
      faqDesc: "Direct answers to common questions about WolrdPulse, MCP integration, and live telemetry.",
      faq1Q: "How does WolrdPulse MCP eliminate AI hallucinations during cloud outages?",
      faq1A: "WolrdPulse provides autonomous coding agents (Claude Desktop, Cursor, Windsurf) with live telemetry from AWS, Vercel, and GitHub via the Model Context Protocol (MCP). When a build fails due to a third-party cloud degradation, the agent queries WolrdPulse, detects the active incident in sub-50ms, and notifies the developer immediately instead of rewriting functional code.",
      faq2Q: "How do I connect Claude Desktop or Cursor to WolrdPulse?",
      faq2A: "Add the SSE endpoint https://wolrdpulse.app/sse to your claude_desktop_config.json or cursor_mcp.json under the mcpServers block. No API keys or authentication are required.",
      faq3Q: "What makes WolrdPulse different from standard uptime monitors?",
      faq3A: "Traditional uptime checkers only alert humans via email or Slack. WolrdPulse formats cloud telemetry into native JSON-RPC Model Context Protocol tools that AI models can autonomously invoke during agentic pair programming to check network sockets, TLS certificates, and DNS records.",
      faq4Q: "Which DNS and SSL verification tools are supported?",
      faq4A: "WolrdPulse supports live DNS-over-HTTPS (DoH) queries for A, AAAA, CNAME, MX, TXT, NS, and CAA records via Cloudflare 1.1.1.1, as well as native TLS socket handshakes to verify SSL certificate issuer chains and expiration dates."
    },
    developer: {
      title: "About the Developer | Anas Rhimi (WolrdPulse)",
      description: "DevOps & Cloud Engineer behind WolrdPulse, an open-source MCP telemetry server for AI coding agents.",
      back: "Back to WolrdPulse",
      role: "DevOps & Cloud Engineer",
      openSourceDevOps: "Open Source DevOps",
      anasRhimi: "Anas Rhimi",
      descriptionDetailed: "Building open-source infrastructure and AI agent telemetry. Focused on eliminating expensive enterprise SaaS paywalls for developers worldwide.",
      whyBuiltTitle: "Why I built WolrdPulse",
      whyBuiltP1: "When working with autonomous coding agents like Claude Desktop and Cursor, I noticed a constant blind spot: ",
      whyBuiltStrong: "AI agents are completely blind to live cloud infrastructure health",
      whyBuiltP2: ". If a CI/CD build fails, an API route times out, or a DNS record hasn't propagated yet, the AI agent will assume there is a bug in the code and start suggesting unnecessary refactors—completely unaware that AWS or Vercel is simply experiencing an outage.",
      whyBuiltP3: "I built WolrdPulse as a free, lightweight Model Context Protocol (MCP) server that runs on global edge infrastructure. It gives your AI tools instant, live diagnostics—status feeds, DNS lookups, latency tests, and SSL verification—in real time without requiring hundreds of dollars in proprietary SaaS subscriptions.",
      archTechTitle: "Architecture & Technology",
      archTechDesc: "Designed for sub-50ms tool execution and zero-dependency integration.",
      mcpStandard: "MCP Standard",
      mcpStandardDesc: "Standard JSON-RPC over Server-Sent Events (SSE) for 1-click integration with Claude, Cursor, and custom agent loops.",
      globalEdge: "Global Edge Network",
      globalEdgeDesc: "Queries Cloudflare DNS-over-HTTPS (1.1.1.1) and native Node TLS sockets to test endpoints in milliseconds.",
      freeOpen: "100% Free & Open",
      freeOpenDesc: "MIT Licensed. Publicly accessible endpoints with no API keys, accounts, or telemetry tracking required.",
      githubSponsors: "GitHub Sponsors",
      sponsorProject: "Support the Project",
      sponsorProjectDesc: "WolrdPulse is 100% free and maintained in my free time. If this tool saves your team money or improves your AI development workflow, consider supporting the project on GitHub Sponsors.",
      sponsorGithub: "Sponsor @Mealiclay01 on GitHub",
      sponsorGithubDesc: "Support open-source DevOps and AI telemetry tools"
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated:",
      section1Title: "1. Information We Collect",
      section1Desc: "WolrdPulse is designed as a stateless Model Context Protocol (MCP) server. We do not require account creation, and we do not collect, store, or sell any personally identifiable information (PII) from the AI agents or users connecting to our endpoints.",
      section2Title: "2. Telemetry and Usage Data",
      section2Desc1: "When your agent connects to the WolrdPulse SSE endpoint (",
      section2Desc2: "), we may log basic connection metadata (e.g., IP address, connection duration, and request volume) strictly for the purpose of maintaining service reliability, rate limiting, and preventing abuse.",
      section3Title: "3. Third-Party Services",
      section3Desc: "WolrdPulse aggregates data from third-party APIs (such as AWS, Vercel, and GitHub). When you or your agent requests data, no user-specific information is passed to these underlying services. We simply fetch public status endpoints and proxy the results.",
      section4Title: "4. Contact",
      section4Desc1: "If you have any questions regarding this privacy policy or how WolrdPulse handles data, please contact the developer at ",
      section4Desc2: "."
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated:",
      section1Title: "1. Acceptance of Terms",
      section1Desc: "By accessing and using WolrdPulse, you accept and agree to be bound by the terms and provisions of this agreement. WolrdPulse is provided 'as is' primarily as a tool for developers and autonomous AI agents.",
      section2Title: "2. Use License & API Usage",
      section2Desc: "Permission is granted to temporarily use the WolrdPulse MCP endpoints. However, you agree not to:",
      section2Li1: "Use the service for any illegal or unauthorized purpose.",
      section2Li2: "Attempt to reverse engineer or overload the API with malicious intent (DDoS).",
      section2Li3: "Use the Ping Playground or edge network endpoints to launch attacks or probe restricted infrastructure.",
      section3Title: "3. Disclaimer",
      section3Desc: "The materials on WolrdPulse's website and APIs are provided on an 'as is' basis. WolrdPulse makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.",
      section4Title: "4. Limitations",
      section4Desc: "In no event shall WolrdPulse, its developers, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WolrdPulse's website.",
      section5Title: "5. Developer Contact",
      section5Desc1: "WolrdPulse is maintained and built by Anas Rhimi. For inquiries, reach out at ",
      section5Desc2: "."
    },
    footer: {
      features: "Features & Tools",
      privacy: "Privacy",
      terms: "Terms",
      developer: "Developer & Sponsor"
    }
  }
};

// Arabic (ar) - Modern Standard Arabic, RTL optimized
dicts.ar = {
  metadata: {
    title: "WolrdPulse | خادم MCP للقياس عن بُعد لـ DevOps في الوقت الفعلي",
    description: "WolrdPulse هو خادم بروتوكول سياق النموذج (MCP) مفتوح المصدر يبث انقطاعات السحابة واستعلامات DoH DNS وفحص شهادات SSL لوكلاء الذكاء الاصطناعي.",
    keywords: ["خادم MCP", "بروتوكول سياق النموذج", "قياس DevOps عن بعد", "Claude MCP", "Cursor MCP"]
  },
  nav: {
    features: "الميزات والأدوات",
    sponsor: "دعم المطور",
    connectAgent: "اتصال الوكيل",
    backHome: "العودة للرئيسية"
  },
  home: {
    openSource: "مفتوح المصدر على GitHub",
    headline: "سياق DevOps مباشر لوكلاء الذكاء الاصطناعي المستقلين.",
    subHeadline: "خادم مفتوح المصدر لبروتوكول سياق النموذج (MCP) يبث انقطاعات السحابة وزمن انتقال الشبكة واستعلامات DNS وصحة شهادات SSL مباشرة إلى Claude و Cursor.",
    quickStart: "توصيل الوكيل الخاص بك",
    exploreFeatures: "استكشاف الأدوات والميزات",
    demoTitle: "كيف يستخدم وكلاء الذكاء الاصطناعي WolrdPulse",
    agentDemo: {
      tab1Label: "انقطاع السحابة مقابل خطأ برمجي",
      tab1Question: "لماذا يفشل بناء تطبيق Next.js على منصة Vercel؟",
      withoutStatus1: "هلوسة الذكاء الاصطناعي",
      withoutAction1: "يقوم الوكيل بفحص الكود المحلي واقتراح تعديلات غير مجدية على package.json دون علمه بوجود انقطاع.",
      withoutResult1: "إضاعة ساعات عمل في تعديل كود برمجي سليم.",
      withStatus1: "سياق البنية التحتية المباشر",
      withResult1: "يبلغك الوكيل على الفور بوجود تباطؤ في خوادم Vercel دون الحاجة لتعديل الكود.",
      tab2Label: "انتهاء شهادة SSL وإطلاق النطاق",
      tab2Question: "هل شهادة SSL الخاصة بالنطاق صالحة للإطلاق غداً؟",
      withoutStatus2: "حد المعرفة الثابت",
      withoutAction2: "لا يستطيع الوكيل فحص مقابس TLS المباشرة ويطلب فحصها يدوياً.",
      withoutResult2: "يتطلب التحقق اليدوي.",
      withStatus2: "فحص المقابس المباشر",
      withResult2: "يتحقق الوكيل من شهادة TLS وسلسلة المصدرين ويؤكد صلاحيتها لمدة 78 يوماً.",
      tab3Label: "انتشار DNS وتوجيه النطاقات",
      tab3Question: "هل اكتمل انتشار سجل CNAME للنطاق المخصص؟",
      withoutStatus3: "عدم القدرة على فحص الشبكة",
      withoutAction3: "يقترح الوكيل الانتظار 24-48 ساعة وتشغيل أوامر dig يدوياً.",
      withoutResult3: "عدم يقين بشأن التوجيه.",
      withStatus3: "DNS مباشر عبر HTTPS",
      withResult3: "يستعلم الوكيل خوادم Cloudflare 1.1.1.1 خلال 18ms ويؤكد جاهزية السجل عالمياً.",
      promptHeader: "أمر المطور في Cursor / Claude",
      withoutTitle: "بدون WolrdPulse",
      outcomePrefix: "النتيجة",
      withTitle: "مع WolrdPulse MCP",
      zeroHallucination: "صفر هلوسة",
      instantResolution: "حل دقيق وفوري"
    },
    archTitle: "مصمم لسير عمل الوكلاء المستقلين",
    archSubtitle: "كل ما يحتاجه مساعد البرمجة بالذكاء الاصطناعي للتحقق من البنية التحتية قبل كتابة كود النشر.",
    browseAll: "تصفح جميع الأدوات",
    outageCardTitle: "انقطاعات السحابة",
    outageCardDesc: "حالة فورية لـ AWS و Vercel و GitHub لمنع الوكلاء من تصحيح الأخطاء أثناء انقطاع خوادم الطرف الثالث.",
    sslCardTitle: "فاحص SSL",
    sslCardDesc: "أداة فحص TLS محلية للتحقق من تواريخ انتهاء الشهادات وسلاسل المصدرين بشكل مستقل.",
    dnsCardTitle: "محلل DNS",
    dnsCardDesc: "استعلامات DoH مباشرة (A, AAAA, CNAME, MX) لتصحيح أخطاء التوجيه وانتشار السجلات.",
    pingCardTitle: "اختبارات الاستجابة",
    pingCardDesc: "أداة فحص HTTP لقياس زمن الاستجابة ورؤوس الخوادم عالمياً في أجزاء من الثانية.",
    setupBadge: "إعداد فوري",
    setupTitle: "الاتصال مع Claude Desktop أو Cursor",
    setupDesc: "أضف نقطة نهاية SSE إلى ملف إعدادات MCP الخاص بك. لا حاجة لمفاتيح API أو مصادقة.",
    copyConfig: "نسخ إعدادات MCP",
    copiedConfig: "تم النسخ!",
    modalTitle: "توصيل وكيل الذكاء الاصطناعي عبر MCP",
    modalDesc: "الصق هذا الكود في إعدادات بيئة التطوير أو عميل MCP للحصول على وصول فوري لبيانات القياس السحابي.",
    modalCopyBtn: "نسخ JSON",
    modalCopied: "تم النسخ إلى الحافظة!",
    modalDone: "تم"
  },
  features: {
    badge: "مجموعة أدوات MCP وقياس الحافة عن بُعد",
    title: "ميزات القياس السحابي عن بُعد المباشرة",
    subtitle: "اكتشف إمكانيات DevOps القوية التي يوفرها WolrdPulse لوكلاء البرمجة بالذكاء الاصطناعي.",
    tabAll: "جميع أدوات القياس",
    tabStatus: "حالة السحابة",
    tabSsl: "فاحص SSL",
    tabDns: "محلل DNS",
    tabPing: "اختبار الاستجابة",
    tabPulse: "نبض الأطر البرمجية",
    statusTitle: "حالة البنية التحتية السحابية",
    statusDesc: "يجلب الحالة التشغيلية وتقارير الحوادث لـ AWS و Cloudflare و GitHub و OpenAI و Vercel.",
    sslTitle: "فاحص شهادات SSL و TLS",
    sslDesc: "يفحص شهادات SSL للتحقق من تواريخ الصلاحية وسلاسل المصدرين.",
    dnsTitle: "محلل DNS عبر HTTPS (DoH)",
    dnsDesc: "يحلل سجلات DNS بأمان عبر Cloudflare 1.1.1.1 دون كشف ذاكرة التخزين المحلية.",
    pingTitle: "فحص زمن الاستجابة والاتصال",
    pingDesc: "يرسل طلبات HTTP لاختبار زمن انتقال الحافة واسترداد رؤوس الاستجابة.",
    pulseTitle: "نبض تحديثات الأطر والمكتبات",
    pulseDesc: "يجمع أحدث إصدارات GitHub لأطر العمل لتزويد الوكلاء بأحدث التحديثات.",
    mcpTools: "مخطط أدوات MCP JSON-RPC",
    mcpToolsSub: "قم بتوصيل وكيلك بنقطة https://wolrdpulse.app/sse للوصول للأدوات تلقائياً.",
    copySchema: "نسخ المخطط",
    copied: "تم النسخ",
    faqTitle: "الأسئلة الشائعة",
    faqDesc: "إجابات مباشرة ومحددة حول WolrdPulse وتكامل MCP والقياس عن بعد.",
    faq1Q: "كيف يقضي WolrdPulse MCP على هلوسة الذكاء الاصطناعي أثناء انقطاع السحابة؟",
    faq1A: "يوفر WolrdPulse لوكلاء البرمجة سياقاً مباشراً لحالة البنية التحتية (AWS, Vercel, GitHub) عبر بروتوكول MCP، مما يتيح للوكيل اكتشاف الأعطال خلال أقل من 50ms وإبلاغ المطور فوراً بدلاً من إعادة كتابة كود سليم.",
    faq2Q: "كيف أقوم بتوصيل Claude Desktop أو Cursor بـ WolrdPulse؟",
    faq2A: "أضف نقطة نهاية SSE https://wolrdpulse.app/sse إلى ملف claude_desktop_config.json أو cursor_mcp.json تحت كتلة mcpServers دون الحاجة لمفاتيح API.",
    faq3Q: "ما الذي يميز WolrdPulse عن أدوات مراقبة الخوادم التقليدية؟",
    faq3A: "الأدوات التقليدية تنبه البشر فقط عبر البريد أو Slack. يحول WolrdPulse القياسات إلى أدوات JSON-RPC MCP برمجية يمكن للذكاء الاصطناعي استدعاؤها ذاتياً أثناء كتابة الكود.",
    faq4Q: "ما هي أدوات فحص DNS و SSL المدعومة؟",
    faq4A: "يدعم WolrdPulse استعلامات DoH لسجلات A و AAAA و CNAME و MX و TXT و NS و CAA عبر Cloudflare 1.1.1.1، وفحص مقابس TLS للتحقق من شهادات SSL."
  },
  developer: {
    title: "عن المطور | أنس رحيمي (WolrdPulse)",
    description: "مهندس DevOps وسحابة ومؤسس WolrdPulse، خادم MCP مفتوح المصدر لوكلاء الذكاء الاصطناعي.",
    back: "العودة إلى WolrdPulse",
    role: "مهندس DevOps وسحابة",
    openSourceDevOps: "DevOps مفتوح المصدر",
    anasRhimi: "أنس رحيمي",
    descriptionDetailed: "بناء بنية تحتية مفتوحة المصدر وقياس عن بُعد لوكلاء الذكاء الاصطناعي، بهدف إلغاء اشتراكات SaaS المكلفة للمطورين حول العالم.",
    whyBuiltTitle: "لماذا قمت ببناء WolrdPulse",
    whyBuiltP1: "أثناء العمل مع وكلاء البرمجة المستقلين مثل Claude و Cursor، لاحظت نقطة عمياء دائمة: ",
    whyBuiltStrong: "وكلاء الذكاء الاصطناعي معزولون تماماً عن معرفة حالة البنية التحتية السحابية المباشرة",
    whyBuiltP2: ". إذا فشل البناء أو توقفت نقطة نهاية، يفترض الوكيل وجود خطأ في الكود ويبدأ في اقتراح تعديلات غير ضرورية دون علمه بوجود انقطاع في AWS أو Vercel.",
    whyBuiltP3: "قمت ببناء WolrdPulse كخادم MCP مجاني وخفيف يعمل على خوادم Edge العالمية، ليوفر لوكلائك تشخيصات فورية لحالة السحابة و DNS و SSL في أجزاء من الثانية.",
    archTechTitle: "الهندسة والتقنيات",
    archTechDesc: "مصمم لتنفيذ أدوات الذكاء الاصطناعي في أقل من 50ms وبدون أي تبعيات خارجية.",
    mcpStandard: "معيار MCP القياسي",
    mcpStandardDesc: "بروتوكول JSON-RPC عبر Server-Sent Events (SSE) للتكامل بنقرة واحدة مع Claude و Cursor.",
    globalEdge: "شبكة Edge العالمية",
    globalEdgeDesc: "استعلامات DoH عبر Cloudflare 1.1.1.1 ومقابس Node TLS أصلية للتحقق في أجزاء من الثانية.",
    freeOpen: "مجاني ومفتوح المصدر 100%",
    freeOpenDesc: "مرخص برخصة MIT. نقاط نهاية متاحة للعامة بدون حسابات أو مفاتيح API أو تتبع.",
    githubSponsors: "رعاة GitHub",
    sponsorProject: "دعم وتطوير المشروع",
    sponsorProjectDesc: "WolrdPulse مجاني بالكامل ويتم تطويره في أوقات فراغي. إذا ساعدك هذا المشروع، فكر في دعمه عبر GitHub Sponsors.",
    sponsorGithub: "دعم @Mealiclay01 على GitHub",
    sponsorGithubDesc: "دعم أدوات DevOps والذكاء الاصطناعي مفتوحة المصدر"
  },
  privacy: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث:",
    section1Title: "1. المعلومات التي نجمعها",
    section1Desc: "تم تصميم WolrdPulse كخادم MCP عديم الحالة (Stateless). نحن لا نطلب إنشاء حساب، ولا نجمع أو نخزن أو نبيع أي معلومات تعريف شخصية (PII).",
    section2Title: "2. بيانات القياس والاستخدام",
    section2Desc1: "عند اتصال وكيلك بنقطة نهاية WolrdPulse SSE (",
    section2Desc2: ")، قد نسجل بيانات تعريفية أساسية للاتصال (مثل عنوان IP وحجم الطلبات) فقط لأغراض موثوقية الخدمة ومنع إساءة الاستخدام.",
    section3Title: "3. خدمات الطرف الثالث",
    section3Desc: "يقوم WolrdPulse بتجميع البيانات العامة من واجهات برمجة التطبيقات (مثل AWS و Vercel و GitHub). لا يتم تمرير أي معلومات خاصة بالمستخدم إلى هذه الخدمات.",
    section4Title: "4. التواصل والاستفسارات",
    section4Desc1: "إذا كان لديك أي أسئلة حول سياسة الخصوصية أو معالجة البيانات، يرجى التواصل مع المطور على ",
    section4Desc2: "."
  },
  terms: {
    title: "شروط الخدمة",
    lastUpdated: "آخر تحديث:",
    section1Title: "1. قبول الشروط",
    section1Desc: "باستخدام WolrdPulse، فإنك توافق على الالتزام بشروط هذا الاتفاق. يتم تقديم WolrdPulse 'كما هو' كأداة للمطورين ووكلاء الذكاء الاصطناعي.",
    section2Title: "2. ترخيص الاستخدام وسياسة API",
    section2Desc: "يُمنح الإذن باستخدام نقاط نهاية WolrdPulse MCP مؤقتاً، بشرط عدم:",
    section2Li1: "استخدام الخدمة لأي غرض غير قانوني أو غير مصرح به.",
    section2Li2: "محاولة التحميل الزائد على الواجهة أو شن هجمات حجب الخدمة (DDoS).",
    section2Li3: "استخدام أداة Ping لاستهداف أو فحص بنية تحتية محظورة.",
    section3Title: "3. إخلاء المسؤولية",
    section3Desc: "يتم تقديم المواد والبيانات على أساس 'كما هي' دون أي ضمانات صريحة أو ضمنية.",
    section4Title: "4. حدود المسؤولية",
    section4Desc: "لا يتحمل مطورو WolrdPulse أي مسؤولية عن أي أضرار أو توقف ناتج عن القرارات التي تتخذها وكلاء الذكاء الاصطناعي بناءً على البيانات المقدمة.",
    section5Title: "5. تواصل المطور",
    section5Desc1: "يتم تطوير وصيانة WolrdPulse بواسطة أنس رحيمي. للاستفسارات تواصل عبر ",
    section5Desc2: "."
  },
  footer: {
    features: "الميزات والأدوات",
    privacy: "الخصوصية",
    terms: "الشروط",
    developer: "المطور والدعم"
  }
};

// French (fr)
dicts.fr = {
  metadata: {
    title: "WolrdPulse | Télémétrie Temps Réel & Serveur MCP DevOps",
    description: "WolrdPulse est un serveur Model Context Protocol (MCP) open-source diffusant les pannes cloud (AWS, Vercel, GitHub), requêtes DNS DoH et validation SSL pour agents IA.",
    keywords: ["Serveur MCP", "Model Context Protocol", "Télémétrie DevOps", "Claude MCP", "Cursor MCP"]
  },
  nav: {
    features: "Fonctionnalités",
    sponsor: "Soutenir le Dev",
    connectAgent: "Connecter l'Agent",
    backHome: "Retour à l'accueil"
  },
  home: {
    openSource: "Open Source sur GitHub",
    headline: "Contexte DevOps en direct pour les agents IA autonomes.",
    subHeadline: "Un serveur Model Context Protocol (MCP) open-source diffusant les pannes cloud, la latence edge, les requêtes DNS et les certificats SSL directement dans Claude et Cursor.",
    quickStart: "Connecter votre agent",
    exploreFeatures: "Explorer les outils en direct",
    demoTitle: "Comment les agents IA utilisent WolrdPulse",
    agentDemo: {
      tab1Label: "Panne Cloud vs Bug de Code",
      tab1Question: "Pourquoi le build de production Next.js échoue-t-il sur Vercel ?",
      withoutStatus1: "Hallucination de l'IA",
      withoutAction1: "L'agent inspecte le code local et suggère des refactorisations inutiles dans package.json.",
      withoutResult1: "Heures de développement perdues à réécrire du code fonctionnel.",
      withStatus1: "Contexte d'infrastructure en direct",
      withResult1: "L'agent vous informe immédiatement que la file d'attente Vercel est dégradée. Aucune modification de code requise.",
      tab2Label: "Expiration SSL & Lancement",
      tab2Question: "Le certificat SSL de notre domaine API est-il valide pour demain ?",
      withoutStatus2: "Limite de connaissances",
      withoutAction2: "L'agent ne peut pas inspecter les sockets TLS en direct et demande une vérification manuelle.",
      withoutResult2: "Vérification manuelle requise.",
      withStatus2: "Inspection native de sockets",
      withResult2: "L'agent vérifie la chaîne TLS et confirme que le certificat est actif pour 78 jours via Let's Encrypt.",
      tab3Label: "Propagation DNS & Routage",
      tab3Question: "La propagation du CNAME de notre domaine personnalisé est-elle terminée ?",
      withoutStatus3: "Impossible de sonder le réseau",
      withoutAction3: "L'agent suggère d'attendre 24-48 heures et d'exécuter des commandes dig en local.",
      withoutResult3: "Incertitude sur le routage.",
      withStatus3: "DNS-over-HTTPS en direct",
      withResult3: "L'agent interroge Cloudflare 1.1.1.1 en 18ms et confirme que le CNAME est mondialement actif.",
      promptHeader: "Prompt développeur dans Cursor / Claude",
      withoutTitle: "Sans WolrdPulse",
      outcomePrefix: "Résultat",
      withTitle: "Avec WolrdPulse MCP",
      zeroHallucination: "Zéro Hallucination",
      instantResolution: "Résolution exacte et immédiate"
    },
    archTitle: "Conçu pour les flux d'agents autonomes",
    archSubtitle: "Tout ce dont votre assistant de code IA a besoin pour vérifier l'infrastructure avant d'écrire le code de déploiement.",
    browseAll: "Parcourir tous les outils",
    outageCardTitle: "Pannes Cloud",
    outageCardDesc: "État en temps réel pour AWS, Vercel et GitHub pour éviter le débogage inutile pendant les pannes tierces.",
    sslCardTitle: "Inspecteur SSL",
    sslCardDesc: "Outil natif TLS pour vérifier l'expiration des certificats et les chaînes d'émetteurs de manière autonome.",
    dnsCardTitle: "Résolveur DNS",
    dnsCardDesc: "Requêtes DoH en direct (A, AAAA, CNAME, MX) pour déboguer le routage et la propagation.",
    pingCardTitle: "Pings Edge",
    pingCardDesc: "Sonde HTTP synthétique pour tester les temps de réponse, les en-têtes et les statuts mondialement.",
    setupBadge: "Configuration Instantanée",
    setupTitle: "Connexion avec Claude Desktop ou Cursor",
    setupDesc: "Ajoutez l'endpoint SSE à votre fichier de configuration MCP. Aucune clé API ni authentification requise.",
    copyConfig: "Copier la config MCP",
    copiedConfig: "Config Copiée !",
    modalTitle: "Connecter l'agent IA via MCP",
    modalDesc: "Collez cet extrait dans les paramètres de votre IDE pour donner à votre agent un accès direct à la télémétrie cloud.",
    modalCopyBtn: "Copier le JSON",
    modalCopied: "Copié dans le presse-papier !",
    modalDone: "Terminé"
  },
  features: {
    badge: "Suite d'outils MCP & Télémétrie Edge",
    title: "Fonctionnalités de Télémétrie Cloud en Direct",
    subtitle: "Découvrez les puissantes capacités DevOps que WolrdPulse expose aux agents de code IA.",
    tabAll: "Tous les outils",
    tabStatus: "Statut Cloud",
    tabSsl: "Inspecteur SSL",
    tabDns: "Résolveur DNS",
    tabPing: "Ping Edge",
    tabPulse: "Pouls Frameworks",
    statusTitle: "État de l'infrastructure Cloud",
    statusDesc: "Récupère l'état opérationnel et les rapports d'incidents pour AWS, Cloudflare, GitHub, OpenAI, Vercel.",
    sslTitle: "Inspecteur de certificats SSL & TLS",
    sslDesc: "Inspecte les certificats SSL pour vérifier les dates d'expiration et la chaîne de certification.",
    dnsTitle: "Résolveur DNS-over-HTTPS (DoH)",
    dnsDesc: "Résout les enregistrements DNS via Cloudflare 1.1.1.1 sans exposer votre cache DNS local.",
    pingTitle: "Sonde de latence et Ping Edge",
    pingDesc: "Envoie des requêtes HTTP synthétiques pour tester la latence et récupérer les en-têtes.",
    pulseTitle: "Pouls des versions de bibliothèques & frameworks",
    pulseDesc: "Agrège les sorties GitHub des frameworks majeurs pour donner le contexte aux agents.",
    mcpTools: "Schéma d'outils MCP JSON-RPC",
    mcpToolsSub: "Connectez votre agent à https://wolrdpulse.app/sse pour exposer ces outils automatiquement.",
    copySchema: "copier le schéma",
    copied: "copié",
    faqTitle: "Foire Aux Questions",
    faqDesc: "Réponses directes et précises sur WolrdPulse, l'intégration MCP et la télémétrie en direct.",
    faq1Q: "Comment WolrdPulse élimine-t-il les hallucinations de l'IA pendant les pannes ?",
    faq1A: "WolrdPulse fournit aux agents (Claude, Cursor) la télémétrie directe d'AWS, Vercel et GitHub via MCP. Lors d'un échec de build, l'agent détecte l'incident en moins de 50ms et alerte le développeur au lieu de modifier le code.",
    faq2Q: "Comment connecter Claude Desktop ou Cursor à WolrdPulse ?",
    faq2A: "Ajoutez l'endpoint SSE https://wolrdpulse.app/sse à votre claude_desktop_config.json ou cursor_mcp.json sous le bloc mcpServers. Aucun token requis.",
    faq3Q: "Qu'est-ce qui différencie WolrdPulse des moniteurs d'uptime classiques ?",
    faq3A: "Les moniteurs classiques alertent uniquement les humains par email ou Slack. WolrdPulse formate les données en outils MCP JSON-RPC que l'IA peut appeler de manière autonome.",
    faq4Q: "Quels outils de vérification DNS et SSL sont pris en charge ?",
    faq4A: "WolrdPulse prend en charge les requêtes DoH pour A, AAAA, CNAME, MX, TXT, NS, CAA via Cloudflare 1.1.1.1, ainsi que les handshakes TLS natifs."
  },
  developer: {
    title: "À propos du développeur | Anas Rhimi (WolrdPulse)",
    description: "Ingénieur Cloud & DevOps derrière WolrdPulse, serveur MCP open-source de télémétrie pour agents IA.",
    back: "Retour à WolrdPulse",
    role: "Ingénieur Cloud & DevOps",
    openSourceDevOps: "DevOps Open Source",
    anasRhimi: "Anas Rhimi",
    descriptionDetailed: "Création d'infrastructure open source et de télémétrie pour agents IA. Objectif : éliminer les paywalls SaaS coûteux pour les développeurs.",
    whyBuiltTitle: "Pourquoi j'ai créé WolrdPulse",
    whyBuiltP1: "En travaillant avec des agents de codage comme Claude et Cursor, j'ai remarqué un angle mort critique : ",
    whyBuiltStrong: "Les agents IA sont totalement aveugles à l'état de l'infrastructure cloud en direct",
    whyBuiltP2: ". Si un build CI/CD échoue ou qu'une route expire, l'agent suppose que le code est défectueux et suggère des refactorisations inutiles, ignorant qu'AWS ou Vercel subit une panne.",
    whyBuiltP3: "J'ai créé WolrdPulse comme un serveur MCP léger et gratuit fonctionnant sur une infrastructure edge globale, donnant à vos outils IA des diagnostics instantanés en quelques millisecondes.",
    archTechTitle: "Architecture & Technologies",
    archTechDesc: "Conçu pour une exécution des outils en moins de 50ms sans dépendances externes.",
    mcpStandard: "Standard MCP",
    mcpStandardDesc: "Protocole JSON-RPC standardisé sur Server-Sent Events (SSE) pour une intégration directe.",
    globalEdge: "Réseau Edge Global",
    globalEdgeDesc: "Interroge Cloudflare 1.1.1.1 et les sockets TLS Node natifs pour tester les points de terminaison en millisecondes.",
    freeOpen: "100% Gratuit & Open Source",
    freeOpenDesc: "Sous licence MIT. Points de terminaison publics sans clés API, comptes ou suivi requis.",
    githubSponsors: "Sponsors GitHub",
    sponsorProject: "Soutenir le projet",
    sponsorProjectDesc: "WolrdPulse est 100% gratuit et maintenu sur mon temps libre. Si cet outil vous aide, pensez à soutenir le projet sur GitHub Sponsors.",
    sponsorGithub: "Sponsoriser @Mealiclay01 sur GitHub",
    sponsorGithubDesc: "Soutenir le développement d'outils DevOps et IA open source"
  },
  privacy: {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour :",
    section1Title: "1. Informations collectées",
    section1Desc: "WolrdPulse est conçu comme un serveur MCP sans état. Nous ne requérons aucun compte et ne collectons aucune donnée personnelle identifiable (PII).",
    section2Title: "2. Données d'utilisation et télémétrie",
    section2Desc1: "Lorsque votre agent se connecte au point de terminaison SSE (",
    section2Desc2: "), nous pouvons enregistrer des métadonnées de connexion de base (adresse IP, volume) uniquement pour garantir la fiabilité et prévenir les abus.",
    section3Title: "3. Services tiers",
    section3Desc: "WolrdPulse agrège des données d'API publiques tierces (AWS, Vercel, GitHub). Aucune information utilisateur n'est transmise à ces services.",
    section4Title: "4. Contact",
    section4Desc1: "Pour toute question sur cette politique de confidentialité, veuillez contacter le développeur à ",
    section4Desc2: "."
  },
  terms: {
    title: "Conditions d'Utilisation",
    lastUpdated: "Dernière mise à jour :",
    section1Title: "1. Acceptation des conditions",
    section1Desc: "En utilisant WolrdPulse, vous acceptez d'être lié par les présentes conditions. Le service est fourni 'en l'état' pour les développeurs et agents IA.",
    section2Title: "2. Licence d'utilisation & usage API",
    section2Desc: "L'autorisation est accordée d'utiliser temporairement les endpoints MCP. Cependant, vous acceptez de ne pas :",
    section2Li1: "Utiliser le service à des fins illégales ou non autorisées.",
    section2Li2: "Tenter de surcharger l'API ou lancer des attaques DoS.",
    section2Li3: "Utiliser l'outil Ping pour sonder des infrastructures restreintes.",
    section3Title: "3. Clause de non-responsabilité",
    section3Desc: "Les ressources sont fournies 'telles quelles' sans aucune garantie explicite ou implicite.",
    section4Title: "4. Limitations de responsabilité",
    section4Desc: "Les développeurs de WolrdPulse ne sauraient être tenus responsables des dommages ou temps d'arrêt causés par les décisions prises par vos agents IA.",
    section5Title: "5. Contact développeur",
    section5Desc1: "WolrdPulse est développé par Anas Rhimi. Pour toute demande, contactez ",
    section5Desc2: "."
  },
  footer: {
    features: "Fonctionnalités & Outils",
    privacy: "Confidentialité",
    terms: "Conditions",
    developer: "Développeur & Sponsor"
  }
};

// German (de)
dicts.de = JSON.parse(JSON.stringify(dicts.en));
dicts.de.metadata.title = "WolrdPulse | Echtzeit-Telemetrie & DevOps MCP-Server";
dicts.de.metadata.description = "Open-Source Model Context Protocol (MCP) Server für Live-Cloud-Ausfälle, DoH DNS-Abfragen und SSL-Zertifikatsprüfungen für KI-Agenten.";
dicts.de.nav.features = "Funktionen";
dicts.de.nav.sponsor = "Entwickler unterstützen";
dicts.de.nav.connectAgent = "Agent verbinden";
dicts.de.nav.backHome = "Zurück zur Startseite";
dicts.de.home.openSource = "Open Source auf GitHub";
dicts.de.home.headline = "Live DevOps-Kontext für autonome KI-Agenten.";
dicts.de.home.subHeadline = "Open-Source Model Context Protocol (MCP) Server, der Cloud-Ausfälle, Edge-Latenz, DNS-Abfragen und SSL-Zertifikatszustände direkt in Claude und Cursor streamt.";
dicts.de.home.quickStart = "Agent verbinden";
dicts.de.home.exploreFeatures = "Live-Tools & Funktionen entdecken";
dicts.de.home.demoTitle = "Wie KI-Agenten WolrdPulse nutzen";
dicts.de.home.archTitle = "Entwickelt für autonome Agenten-Workflows";
dicts.de.home.archSubtitle = "Alles, was Ihr KI-Programmierassistent benötigt, um die Infrastruktur vor dem Deployment-Code zu überprüfen.";
dicts.de.home.browseAll = "Alle Tools anzeigen";
dicts.de.home.outageCardTitle = "Cloud-Ausfälle";
dicts.de.home.outageCardDesc = "Echtzeit-Status für AWS, Vercel und GitHub, damit Agenten während Drittanbieter-Ausfällen keinen funktionalen Code refaktorisieren.";
dicts.de.home.sslCardTitle = "SSL-Inspektor";
dicts.de.home.sslCardDesc = "Natives TLS-Socket-Tool zur automatischen Überprüfung von Zertifikatsablaufdaten und Ausstellerketten.";
dicts.de.home.dnsCardTitle = "DNS-Resolver";
dicts.de.home.dnsCardDesc = "Live DNS-over-HTTPS Abfragen (A, AAAA, CNAME, MX) zur Analyse von Routing und Propagierung.";
dicts.de.home.pingCardTitle = "Edge-Pings";
dicts.de.home.pingCardDesc = "Synthetischer HTTP-Sondenläufer zur weltweiten Messung von Antwortzeiten, Headern und Statuscodes.";
dicts.de.home.setupBadge = "Sofortige Einrichtung";
dicts.de.home.setupTitle = "Mit Claude Desktop oder Cursor verbinden";
dicts.de.home.setupDesc = "Fügen Sie den SSE-Endpunkt zu Ihrer MCP-Konfigurationsdatei hinzu. Keine API-Schlüssel oder Authentifizierung erforderlich.";
dicts.de.home.copyConfig = "MCP-Konfiguration kopieren";
dicts.de.home.copiedConfig = "Konfiguration kopiert!";
dicts.de.home.modalTitle = "KI-Agent über MCP verbinden";
dicts.de.home.modalDesc = "Fügen Sie dieses Snippet in Ihre IDE-Einstellungen ein, um Ihrem Agenten sofortigen Zugriff auf Live-Telemetriedaten zu gewähren.";
dicts.de.home.modalCopyBtn = "JSON kopieren";
dicts.de.home.modalCopied = "In die Zwischenablage kopiert!";
dicts.de.home.modalDone = "Fertig";
dicts.de.features.badge = "MCP-Tool-Suite & Edge-Telemetrie";
dicts.de.features.title = "Live-Cloud-Telemetriefunktionen";
dicts.de.features.subtitle = "Entdecken Sie die leistungsstarken DevOps-Funktionen, die WolrdPulse für KI-Coding-Agenten bereitstellt.";
dicts.de.features.tabAll = "Alle Telemetrie-Tools";
dicts.de.features.tabStatus = "Cloud-Status";
dicts.de.features.tabSsl = "SSL-Inspektor";
dicts.de.features.tabDns = "DNS-Resolver";
dicts.de.features.tabPing = "Edge-Ping";
dicts.de.features.tabPulse = "Framework-Puls";
dicts.de.developer.role = "DevOps & Cloud-Ingenieur";
dicts.de.developer.back = "Zurück zu WolrdPulse";
dicts.de.developer.whyBuiltTitle = "Warum ich WolrdPulse entwickelt habe";
dicts.de.developer.whyBuiltStrong = "KI-Agenten sind völlig blind für den aktuellen Zustand der Cloud-Infrastruktur";

// Russian (ru)
dicts.ru = JSON.parse(JSON.stringify(dicts.en));
dicts.ru.metadata.title = "WolrdPulse | Телеметрия в реальном времени и MCP-сервер для DevOps";
dicts.ru.metadata.description = "MCP-сервер с открытым исходным кодом, транслирующий данные о сбоях в облаке (AWS, Vercel, GitHub), DoH DNS-запросах и проверке SSL-сертификатов.";
dicts.ru.nav.features = "Функции";
dicts.ru.nav.sponsor = "Поддержать автора";
dicts.ru.nav.connectAgent = "Подключить агента";
dicts.ru.nav.backHome = "На главную";
dicts.ru.home.openSource = "Открытый исходный код на GitHub";
dicts.ru.home.headline = "Актуальный DevOps-контекст для автономных ИИ-агентов.";
dicts.ru.home.subHeadline = "MCP-сервер, транслирующий данные о сбоях в облаке, задержках на границе сети (edge), DNS-запросах и состоянии SSL-сертификатов напрямую в Claude и Cursor.";
dicts.ru.home.quickStart = "Подключить агента";
dicts.ru.home.exploreFeatures = "Изучить инструменты и функции";
dicts.ru.home.demoTitle = "Как ИИ-агенты используют WolrdPulse";
dicts.ru.home.archTitle = "Создано для автономных рабочих процессов ИИ";
dicts.ru.home.archSubtitle = "Все, что нужно вашему ИИ-помощнику по коду для проверки инфраструктуры перед написанием скриптов развертывания.";
dicts.ru.home.browseAll = "Все инструменты";
dicts.ru.home.outageCardTitle = "Сбои в облаке";
dicts.ru.home.outageCardDesc = "Статус в реальном времени для AWS, Vercel и GitHub, чтобы агенты не пытались исправлять код во время сбоев сторонних сервисов.";
dicts.ru.home.sslCardTitle = "Инспектор SSL";
dicts.ru.home.sslCardDesc = "Проверка срока действия сертификатов и цепочек издателей через нативное TLS-соединение.";
dicts.ru.home.dnsCardTitle = "DNS-резолвер";
dicts.ru.home.dnsCardDesc = "DoH-запросы в реальном времени (A, AAAA, CNAME, MX) для отладки маршрутизации и распространения записей.";
dicts.ru.home.pingCardTitle = "Edge-пинги";
dicts.ru.home.pingCardDesc = "Синтетические HTTP-зонды для проверки задержки, заголовков и кодов ответов по всему миру.";
dicts.ru.home.setupBadge = "Мгновенная настройка";
dicts.ru.home.setupTitle = "Подключение к Claude Desktop или Cursor";
dicts.ru.home.setupDesc = "Добавьте SSE-эндпоинт в конфигурационный файл MCP. Без API-ключей и аутентификации.";
dicts.ru.home.copyConfig = "Скопировать конфиг MCP";
dicts.ru.home.copiedConfig = "Конфигурация скопирована!";
dicts.ru.developer.back = "Назад к WolrdPulse";
dicts.ru.developer.role = "DevOps и Cloud-инженер";
dicts.ru.developer.whyBuiltTitle = "Зачем я создал WolrdPulse";
dicts.ru.developer.whyBuiltStrong = "ИИ-агенты абсолютно слепы к текущему состоянию облачной инфраструктуры";

// Chinese (zh)
dicts.zh = JSON.parse(JSON.stringify(dicts.en));
dicts.zh.metadata.title = "WolrdPulse | 实时DevOps遥测与MCP服务器";
dicts.zh.metadata.description = "开源模型上下文协议（MCP）服务器，为Claude和Cursor提供实时云故障（AWS、Vercel、GitHub）、DNS DoH查询和SSL证书验证。";
dicts.zh.nav.features = "功能特性";
dicts.zh.nav.sponsor = "赞助开发者";
dicts.zh.nav.connectAgent = "连接AI代理";
dicts.zh.nav.backHome = "返回首页";
dicts.zh.home.openSource = "GitHub开源项目";
dicts.zh.home.headline = "为自主AI编程代理提供实时DevOps上下文。";
dicts.zh.home.subHeadline = "开源Model Context Protocol (MCP) 服务器，将实时云故障、边缘延迟、DNS查询与SSL证书健康状态直接流式传输到Claude和Cursor。";
dicts.zh.home.quickStart = "连接您的AI代理";
dicts.zh.home.exploreFeatures = "探索实时工具与功能";
dicts.zh.home.demoTitle = "AI代理如何使用WolrdPulse";
dicts.zh.home.archTitle = "专为自主AI代理工作流构建";
dicts.zh.home.archSubtitle = "AI编程助手在编写部署代码前验证基础设施所需的一切功能。";
dicts.zh.home.browseAll = "查看所有工具";
dicts.zh.home.outageCardTitle = "云服务故障";
dicts.zh.home.outageCardDesc = "AWS、Vercel和GitHub的实时状态，避免代理在第三方故障期间误修有效代码。";
dicts.zh.home.sslCardTitle = "SSL检查器";
dicts.zh.home.sslCardDesc = "原生TLS握手工具，自主验证证书到期时间与颁发者信任链。";
dicts.zh.home.dnsCardTitle = "DNS解析器";
dicts.zh.home.dnsCardDesc = "实时基于HTTPS的DNS查询（A、AAAA、CNAME、MX），调试路由与解析传播。";
dicts.zh.home.pingCardTitle = "边缘Ping探测";
dicts.zh.home.pingCardDesc = "综合HTTP探测器，全球化测试端点响应时间、标头与状态码。";
dicts.zh.home.setupBadge = "即刻配置";
dicts.zh.home.setupTitle = "与Claude Desktop或Cursor连接";
dicts.zh.home.setupDesc = "将SSE端点添加到您的MCP配置文件中。无需API密钥或身份验证。";
dicts.zh.home.copyConfig = "复制MCP配置";
dicts.zh.home.copiedConfig = "配置已复制！";
dicts.zh.developer.back = "返回WolrdPulse";
dicts.zh.developer.role = "DevOps与云端工程师";
dicts.zh.developer.whyBuiltTitle = "我为何构建WolrdPulse";
dicts.zh.developer.whyBuiltStrong = "AI代理对实时云基础设施的健康状态完全处于盲区";

// Korean (ko)
dicts.ko = JSON.parse(JSON.stringify(dicts.en));
dicts.ko.metadata.title = "WolrdPulse | 실시간 DevOps 원격 측정 & MCP 서버";
dicts.ko.metadata.description = "클라우드 장애(AWS, Vercel, GitHub), DNS DoH 쿼리, SSL 인증서 상태를 Claude와 Cursor에 실시간 스트리밍하는 오픈소스 MCP 서버.";
dicts.ko.nav.features = "주요 기능";
dicts.ko.nav.sponsor = "개발자 후원";
dicts.ko.nav.connectAgent = "에이전트 연결";
dicts.ko.nav.backHome = "홈으로 돌아가기";
dicts.ko.home.openSource = "GitHub 오픈소스";
dicts.ko.home.headline = "자율 AI 에이전트를 위한 실시간 DevOps 컨텍스트.";
dicts.ko.home.subHeadline = "실시간 클라우드 장애, 엣지 지연 시간, DNS 쿼리 및 SSL 인증서 상태를 Claude와 Cursor로 직접 스트리밍하는 오픈소스 Model Context Protocol(MCP) 서버입니다.";
dicts.ko.home.quickStart = "에이전트 연결하기";
dicts.ko.home.exploreFeatures = "실시간 도구 및 기능 둘러보기";
dicts.ko.home.demoTitle = "AI 에이전트의 WolrdPulse 활용 방식";
dicts.ko.home.archTitle = "자율 에이전트 워크플로우를 위한 설계";
dicts.ko.home.archSubtitle = "AI 코딩 도우미가 배포 코드를 작성하기 전에 인프라를 검증하는 데 필요한 모든 기능.";
dicts.ko.home.browseAll = "모든 도구 보기";
dicts.ko.home.outageCardTitle = "클라우드 장애 감지";
dicts.ko.home.outageCardDesc = "AWS, Vercel, GitHub의 실시간 상태를 파악하여 타사 장애 중 불필요한 코드 리팩토링을 방지합니다.";
dicts.ko.home.sslCardTitle = "SSL 검사기";
dicts.ko.home.sslCardDesc = "인증서 만료일 및 발급자 체인을 자율적으로 검증하는 네이티브 TLS 핸드셰이크 도구.";
dicts.ko.home.dnsCardTitle = "DNS 확인자";
dicts.ko.home.dnsCardDesc = "라우팅 및 레코드 전파를 디버깅하기 위한 실시간 DNS-over-HTTPS 쿼리(A, AAAA, CNAME, MX).";
dicts.ko.home.pingCardTitle = "엣지 핑 측정";
dicts.ko.home.pingCardDesc = "전 세계 엔드포인트 응답 시간, 헤더 및 상태 코드를 테스트하는 가상 HTTP 프로브.";
dicts.ko.home.setupBadge = "간편한 설정";
dicts.ko.home.setupTitle = "Claude Desktop 또는 Cursor와 연결";
dicts.ko.home.setupDesc = "MCP 설정 파일에 SSE 엔드포인트를 추가하세요. API 키나 인증이 필요하지 않습니다.";
dicts.ko.home.copyConfig = "MCP 설정 복사";
dicts.ko.home.copiedConfig = "설정이 복사되었습니다!";
dicts.ko.developer.back = "WolrdPulse로 돌아가기";
dicts.ko.developer.role = "DevOps 및 클라우드 엔지니어";
dicts.ko.developer.whyBuiltTitle = "WolrdPulse 개발 배경";
dicts.ko.developer.whyBuiltStrong = "AI 에이전트는 실시간 클라우드 인프라 상태를 전혀 알지 못합니다";

// Japanese (ja)
dicts.ja = JSON.parse(JSON.stringify(dicts.en));
dicts.ja.metadata.title = "WolrdPulse | リアルタイムDevOpsテレメトリ & MCPサーバー";
dicts.ja.metadata.description = "クラウド障害（AWS、Vercel、GitHub）、DNS DoHクエリ、SSL証明書の検証をClaudeやCursorにストリーミングするオープンソースMCPサーバー。";
dicts.ja.nav.features = "機能一覧";
dicts.ja.nav.sponsor = "開発者を支援";
dicts.ja.nav.connectAgent = "エージェント接続";
dicts.ja.nav.backHome = "ホームに戻る";
dicts.ja.home.openSource = "GitHubでオープンソース";
dicts.ja.home.headline = "自律型AIエージェント向けリアルタイムDevOpsコンテキスト。";
dicts.ja.home.subHeadline = "クラウド障害、エッジレイテンシ、DNSクエリ、SSL証明書の状態をClaudeやCursorに直接ストリーミングするオープンソースModel Context Protocol (MCP) サーバー。";
dicts.ja.home.quickStart = "エージェントを接続する";
dicts.ja.home.exploreFeatures = "ライブツールと機能を探索";
dicts.ja.home.demoTitle = "AIエージェントによるWolrdPulseの活用";
dicts.ja.home.archTitle = "自律型エージェントワークフロー向け設計";
dicts.ja.home.archSubtitle = "AIコーディングアシスタントがデプロイコードを作成する前にインフラを検証するために必要なすべての機能。";
dicts.ja.home.browseAll = "すべてのツールを見る";
dicts.ja.home.outageCardTitle = "クラウド障害検知";
dicts.ja.home.outageCardDesc = "AWS、Vercel、GitHubのリアルタイムステータスを提供し、他社障害時の不要なコード修正を防ぎます。";
dicts.ja.home.sslCardTitle = "SSLインスペクター";
dicts.ja.home.sslCardDesc = "証明書の有効期限と発行者チェーンを自律的に検証するネイティブTLSハンドシェイクツール。";
dicts.ja.home.dnsCardTitle = "DNSリゾルバー";
dicts.ja.home.dnsCardDesc = "ルーティングとレコード伝播をデバッグするためのリアルタイムDNS-over-HTTPSクエリ(A, AAAA, CNAME, MX)。";
dicts.ja.home.pingCardTitle = "エッジPingプローブ";
dicts.ja.home.pingCardDesc = "エンドポイントの応答時間、ヘッダー、ステータスコードをグローバルにテストする合成HTTPプローブ。";
dicts.ja.home.setupBadge = "即時セットアップ";
dicts.ja.home.setupTitle = "Claude Desktop または Cursor と接続";
dicts.ja.home.setupDesc = "MCP設定ファイルにSSEエンドポイントを追加します。APIキーや認証は不要です。";
dicts.ja.home.copyConfig = "MCP設定をコピー";
dicts.ja.home.copiedConfig = "設定をコピーしました！";
dicts.ja.developer.back = "WolrdPulseに戻る";
dicts.ja.developer.role = "DevOps & クラウドエンジニア";
dicts.ja.developer.whyBuiltTitle = "WolrdPulseを開発した理由";
dicts.ja.developer.whyBuiltStrong = "AIエージェントは稼働中のクラウドインフラの状態を把握できません";

// Spanish (es)
dicts.es = JSON.parse(JSON.stringify(dicts.en));
dicts.es.metadata.title = "WolrdPulse | Servidor MCP de Telemetría DevOps en Tiempo Real";
dicts.es.metadata.description = "Servidor Model Context Protocol (MCP) de código abierto que transmite caídas en la nube (AWS, Vercel, GitHub), consultas DNS DoH y verificación SSL para agentes de IA.";
dicts.es.nav.features = "Características";
dicts.es.nav.sponsor = "Patrocinar Desarrollador";
dicts.es.nav.connectAgent = "Conectar Agente";
dicts.es.nav.backHome = "Volver al Inicio";
dicts.es.home.openSource = "Código Abierto en GitHub";
dicts.es.home.headline = "Contexto DevOps en vivo para agentes de IA autónomos.";
dicts.es.home.subHeadline = "Un servidor Model Context Protocol (MCP) de código abierto que transmite caídas en la nube, latencia perimetral, consultas DNS y certificados SSL directamente a Claude y Cursor.";
dicts.es.home.quickStart = "Conecta tu Agente";
dicts.es.home.exploreFeatures = "Explorar Herramientas en Vivo";
dicts.es.home.demoTitle = "Cómo los agentes de IA usan WolrdPulse";
dicts.es.home.archTitle = "Diseñado para flujos de trabajo de agentes autónomos";
dicts.es.home.archSubtitle = "Todo lo que su asistente de código de IA necesita para verificar la infraestructura antes de escribir código de despliegue.";
dicts.es.home.browseAll = "Ver todas las herramientas";
dicts.es.home.outageCardTitle = "Caídas en la Nube";
dicts.es.home.outageCardDesc = "Estado en tiempo real para AWS, Vercel y GitHub para evitar que los agentes modifiquen código durante caídas de terceros.";
dicts.es.home.sslCardTitle = "Inspector SSL";
dicts.es.home.sslCardDesc = "Herramienta nativa TLS para verificar el vencimiento de certificados y cadenas de emisores de forma autónoma.";
dicts.es.home.dnsCardTitle = "Resolvedor DNS";
dicts.es.home.dnsCardDesc = "Consultas DoH en tiempo real (A, AAAA, CNAME, MX) para depurar enrutamiento y propagación.";
dicts.es.home.pingCardTitle = "Pings Perimetrales";
dicts.es.home.pingCardDesc = "Sonda HTTP sintética para probar tiempos de respuesta, encabezados y códigos de estado a nivel global.";
dicts.es.home.setupBadge = "Configuración Instantánea";
dicts.es.home.setupTitle = "Conectar con Claude Desktop o Cursor";
dicts.es.home.setupDesc = "Agregue el endpoint SSE a su archivo de configuración MCP. No se requieren claves API ni autenticación.";
dicts.es.home.copyConfig = "Copiar Configuración MCP";
dicts.es.home.copiedConfig = "¡Configuración Copiada!";
dicts.es.developer.back = "Volver a WolrdPulse";
dicts.es.developer.role = "Ingeniero DevOps y Cloud";
dicts.es.developer.whyBuiltTitle = "Por qué creé WolrdPulse";
dicts.es.developer.whyBuiltStrong = "Los agentes de IA están completamente ciegos al estado real de la infraestructura en la nube";

// Write all dictionaries
const dictDir = path.join(__dirname, '../dictionaries');
for (const [lang, data] of Object.entries(dicts)) {
  const filePath = path.join(dictDir, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log("All 9 dictionaries successfully compiled!");
