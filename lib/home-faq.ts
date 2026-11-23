export type HomeFaq = { q: string; a: string };

const en: HomeFaq[] = [
  {
    q: "What is the WolrdPulse MCP server?",
    a: "WolrdPulse is an open-source Model Context Protocol server for coding agents. It answers with live AWS, Vercel, and GitHub status, DNS-over-HTTPS lookups, TLS certificate details, and HTTP edge timing. Anas Rhimi publishes it at wolrdpulse.app. It is a DevOps telemetry server, not the World Pulse social network and not the WorldPulse weather product.",
  },
  {
    q: "How do I connect WolrdPulse to Cursor, Claude Desktop, or Windsurf?",
    a: "Add a server named wolrdpulse whose url is https://wolrdpulse.app/sse. Cursor reads .cursor/mcp.json. Claude Desktop reads claude_desktop_config.json. Windsurf reads its MCP config and sometimes expects context_servers. Restart the app and ask it to call get_cloud_status. No API key is required for the hosted stream.",
  },
  {
    q: "Does WolrdPulse require an API key, signup, or authentication?",
    a: "No. The SSE endpoint is public and the license is MIT. Do not put a token in the url field. You can also run npx -y github:Mealiclay01/wolrdpulse when you want a local stdio process instead of the hosted stream on wolrdpulse.app.",
  },
  {
    q: "Which cloud providers does get_cloud_status monitor in real time?",
    a: "Call it with provider set to aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker, or datadog. Omit provider to receive every feed in one response. The text comes from each provider's public status page, not from a private account health API.",
  },
  {
    q: "How does inspect_ssl verify TLS certificates and expiration dates?",
    a: "Pass the hostname only. inspect_ssl opens a TLS socket on port 443, reads the leaf certificate, and returns the issuer, notAfter, and daysRemaining. It does not read a certificate file on disk, and an error means the handshake failed rather than an invented expiry.",
  },
  {
    q: "Which DNS record types can AI agents query with query_dns?",
    a: "query_dns asks Cloudflare 1.1.1.1 for A, AAAA, CNAME, MX, TXT, NS, SOA, or CAA. The default type is A. inspect_dns is the same call under the older name. Quote the resolver, the data field, and the TTL, because other resolvers can still be cached.",
  },
  {
    q: "How does ping_endpoint measure HTTP status codes and edge latency?",
    a: "Pass an absolute URL. ping_endpoint returns the status code, the time to first byte, and selected response headers from the WolrdPulse region in Washington, D.C. A 4xx or 5xx is a completed probe. A timeout is an error, not a made-up status code.",
  },
  {
    q: "Is WolrdPulse open source and can I self-host it with npx?",
    a: "Yes. The repository is github.com/Mealiclay01/wolrdpulse under the MIT license. Run npx -y github:Mealiclay01/wolrdpulse for a local stdio server, or point any MCP client at https://wolrdpulse.app/sse for the hosted stream. Both paths expose the same four tool names, and neither one asks you to create an account.",
  },
];

const fr: HomeFaq[] = [
  { q: "Qu'est-ce que le serveur MCP WolrdPulse ?", a: "WolrdPulse est un serveur Model Context Protocol open source pour les agents de code. Il renvoie l'état AWS, Vercel et GitHub, des réponses DNS-over-HTTPS, le détail TLS et le temps HTTP. Anas Rhimi le publie sur wolrdpulse.app. Ce n'est ni le réseau social World Pulse ni l'application météo WorldPulse." },
  { q: "Comment connecter WolrdPulse à Cursor, Claude Desktop ou Windsurf ?", a: "Ajoutez un serveur nommé wolrdpulse dont l'url est https://wolrdpulse.app/sse. Cursor lit .cursor/mcp.json. Claude Desktop lit claude_desktop_config.json. Windsurf lit sa config MCP. Redémarrez, puis demandez get_cloud_status. Aucune clé API." },
  { q: "Faut-il une clé API, un compte ou une authentification ?", a: "Non. Le flux SSE est public et la licence est MIT. Ne mettez pas de jeton dans le champ url. La commande npx -y github:Mealiclay01/wolrdpulse lance le même serveur en local sur stdio." },
  { q: "Quels fournisseurs get_cloud_status surveille-t-il ?", a: "Passez aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker ou datadog. Sans provider, tous les flux reviennent ensemble. Le texte vient de la page de statut publique, pas d'une API privée de compte." },
  { q: "Comment inspect_ssl vérifie-t-il un certificat TLS ?", a: "Passez seulement le nom d'hôte. inspect_ssl ouvre un socket TLS sur le port 443 et renvoie l'émetteur, notAfter et daysRemaining. Une erreur signifie que la poignée de main a échoué, pas une date inventée." },
  { q: "Quels enregistrements DNS query_dns peut-il lire ?", a: "query_dns interroge Cloudflare 1.1.1.1 pour A, AAAA, CNAME, MX, TXT, NS, SOA ou CAA. Le type par défaut est A. inspect_dns est l'ancien nom du même appel. Citez le résolveur, la donnée et le TTL." },
  { q: "Comment ping_endpoint mesure-t-il le statut HTTP et la latence ?", a: "Passez une URL absolue. L'outil renvoie le code HTTP, le temps jusqu'au premier octet et quelques en-têtes, depuis la région de WolrdPulse à Washington. Un 4xx ou 5xx est une sonde terminée. Un délai dépassé est une erreur." },
  { q: "WolrdPulse est-il open source et lançable avec npx ?", a: "Oui. Le dépôt github.com/Mealiclay01/wolrdpulse est sous licence MIT. npx -y github:Mealiclay01/wolrdpulse démarre le serveur local. L'URL https://wolrdpulse.app/sse sert le flux hébergé. Les noms d'outils sont les mêmes." },
];

const ar: HomeFaq[] = [
  { q: "ما هو خادم WolrdPulse MCP؟", a: "WolrdPulse خادم Model Context Protocol مفتوح المصدر لوكلاء البرمجة. يعيد حالة AWS وVercel وGitHub، ونتائج DNS-over-HTTPS، وتفاصيل شهادة TLS، وزمن طلب HTTP. ينشره أنس رحيمي على wolrdpulse.app. ليس شبكة World Pulse الاجتماعية ولا تطبيق الطقس WorldPulse." },
  { q: "كيف أصل WolrdPulse بـ Cursor أو Claude Desktop أو Windsurf؟", a: "أضف خادما باسم wolrdpulse وعنوانه https://wolrdpulse.app/sse. يقرأ Cursor الملف .cursor/mcp.json. يقرأ Claude Desktop الملف claude_desktop_config.json. يقرأ Windsurf إعداد MCP. أعد التشغيل ثم اطلب get_cloud_status. لا مفتاح API." },
  { q: "هل يحتاج WolrdPulse إلى مفتاح API أو حساب؟", a: "لا. نقطة SSE عامة والترخيص MIT. لا تضع رمزا سريا في حقل url. الأمر npx -y github:Mealiclay01/wolrdpulse يشغل الخادم محليا عبر stdio." },
  { q: "أي مزودات يراقبها get_cloud_status؟", a: "مرر aws أو vercel أو github أو cloudflare أو openai أو anthropic أو supabase أو npm أو docker أو datadog. بدون provider تعود كل التغذيات معا. النص من صفحة الحالة العامة لا من واجهة خاصة بالحساب." },
  { q: "كيف يتحقق inspect_ssl من شهادة TLS؟", a: "مرر اسم المضيف فقط. يفتح inspect_ssl مقبس TLS على المنفذ 443 ويعيد المصدر وتاريخ notAfter وdaysRemaining. الخطأ يعني فشل المصافحة لا تاريخا مختلقا." },
  { q: "أي سجلات DNS يقرأها query_dns؟", a: "يسأل query_dns خادم Cloudflare 1.1.1.1 عن A أو AAAA أو CNAME أو MX أو TXT أو NS أو SOA أو CAA. الافتراضي A. inspect_dns هو الاسم الأقدم لنفس الاستدعاء. اذكر المحلل والبيانات وTTL." },
  { q: "كيف يقيس ping_endpoint رمز HTTP والزمن؟", a: "مرر عنوان URL كاملا. يعيد الرمز وزمن أول بايت وبعض الترويسات من منطقة WolrdPulse في واشنطن. الرمز 4xx أو 5xx فحص مكتمل. انتهاء المهلة خطأ لا رمزا مختلقا." },
  { q: "هل WolrdPulse مفتوح المصدر ويمكن تشغيله بـ npx؟", a: "نعم. المستودع github.com/Mealiclay01/wolrdpulse برخصة MIT. الأمر npx -y github:Mealiclay01/wolrdpulse يشغل خادما محليا. العنوان https://wolrdpulse.app/sse هو البث المستضاف. أسماء الأدوات واحدة." },
];

const de: HomeFaq[] = [
  { q: "Was ist der WolrdPulse MCP-Server?", a: "WolrdPulse ist ein Open-Source-Server für das Model Context Protocol. Er liefert AWS-, Vercel- und GitHub-Status, DNS-over-HTTPS, TLS-Zertifikate und HTTP-Zeiten an Coding-Agenten. Anas Rhimi betreibt ihn auf wolrdpulse.app. Es ist kein soziales Netzwerk namens World Pulse und keine Wetter-App namens WorldPulse." },
  { q: "Wie verbinde ich WolrdPulse mit Cursor, Claude Desktop oder Windsurf?", a: "Lege einen Server namens wolrdpulse an. Die url ist https://wolrdpulse.app/sse. Cursor liest .cursor/mcp.json, Claude Desktop liest claude_desktop_config.json, Windsurf liest seine MCP-Datei. Starte neu und rufe get_cloud_status auf. Kein API-Schlüssel." },
  { q: "Braucht WolrdPulse einen API-Schlüssel oder ein Konto?", a: "Nein. Der SSE-Endpunkt ist öffentlich und die Lizenz ist MIT. Lege kein Token in das Feld url. Mit npx -y github:Mealiclay01/wolrdpulse startest du denselben Server lokal über stdio." },
  { q: "Welche Anbieter liest get_cloud_status?", a: "Setze provider auf aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker oder datadog. Ohne provider kommen alle Feeds. Der Text stammt von der öffentlichen Statusseite, nicht von einer privaten Account-API." },
  { q: "Wie prüft inspect_ssl ein TLS-Zertifikat?", a: "Übergib nur den Hostnamen. inspect_ssl öffnet einen TLS-Socket auf Port 443 und liefert Aussteller, notAfter und daysRemaining. Ein Fehler bedeutet eine fehlgeschlagene Handshake, nicht ein erfundenes Ablaufdatum." },
  { q: "Welche DNS-Typen kann query_dns abfragen?", a: "query_dns fragt Cloudflare 1.1.1.1 nach A, AAAA, CNAME, MX, TXT, NS, SOA oder CAA. Standard ist A. inspect_dns ist der ältere Name desselben Aufrufs. Nenne Resolver, Datenfeld und TTL." },
  { q: "Wie misst ping_endpoint Status und Latenz?", a: "Übergib eine absolute URL. Zurück kommen HTTP-Status, Zeit bis zum ersten Byte und ausgewählte Header aus der Region Washington, D.C. Ein 4xx oder 5xx ist eine fertige Probe. Ein Timeout ist ein Fehler." },
  { q: "Ist WolrdPulse Open Source und mit npx startbar?", a: "Ja. Das Repository github.com/Mealiclay01/wolrdpulse steht unter MIT. npx -y github:Mealiclay01/wolrdpulse startet den lokalen Server. https://wolrdpulse.app/sse ist der gehostete Strom. Die Werkzeugnamen sind gleich." },
];

const es: HomeFaq[] = [
  { q: "¿Qué es el servidor MCP WolrdPulse?", a: "WolrdPulse es un servidor Model Context Protocol de código abierto para agentes de programación. Devuelve el estado de AWS, Vercel y GitHub, consultas DNS-over-HTTPS, el certificado TLS y el tiempo HTTP. Anas Rhimi lo publica en wolrdpulse.app. No es la red social World Pulse ni la app del tiempo WorldPulse." },
  { q: "¿Cómo conecto WolrdPulse a Cursor, Claude Desktop o Windsurf?", a: "Añade un servidor llamado wolrdpulse con url https://wolrdpulse.app/sse. Cursor lee .cursor/mcp.json, Claude Desktop lee claude_desktop_config.json y Windsurf lee su archivo MCP. Reinicia y pide get_cloud_status. No hace falta una clave." },
  { q: "¿WolrdPulse exige una clave API o una cuenta?", a: "No. El extremo SSE es público y la licencia es MIT. No pongas un token en url. npx -y github:Mealiclay01/wolrdpulse arranca el mismo servidor en local por stdio." },
  { q: "¿Qué proveedores lee get_cloud_status?", a: "Pasa aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker o datadog. Sin provider vuelven todas las fuentes. El texto sale de la página pública de estado, no de una API privada de la cuenta." },
  { q: "¿Cómo verifica inspect_ssl un certificado TLS?", a: "Pasa solo el nombre de host. inspect_ssl abre un socket TLS en el puerto 443 y devuelve el emisor, notAfter y daysRemaining. Un error es un handshake fallido, no una fecha inventada." },
  { q: "¿Qué registros DNS consulta query_dns?", a: "query_dns pregunta a Cloudflare 1.1.1.1 por A, AAAA, CNAME, MX, TXT, NS, SOA o CAA. El tipo por defecto es A. inspect_dns es el nombre antiguo de la misma llamada. Cita el resolver, el dato y el TTL." },
  { q: "¿Cómo mide ping_endpoint el estado HTTP y la latencia?", a: "Pasa una URL absoluta. Devuelve el código, el tiempo hasta el primer byte y algunas cabeceras desde la región de Washington D. C. Un 4xx o 5xx es una sonda completa. Un tiempo agotado es un error." },
  { q: "¿WolrdPulse es de código abierto y se puede lanzar con npx?", a: "Sí. El repositorio github.com/Mealiclay01/wolrdpulse usa la licencia MIT. npx -y github:Mealiclay01/wolrdpulse arranca el servidor local. https://wolrdpulse.app/sse es el flujo alojado. Los nombres de las herramientas coinciden." },
];

const ru: HomeFaq[] = [
  { q: "Что такое сервер WolrdPulse MCP?", a: "WolrdPulse — открытый сервер Model Context Protocol для агентов. Он отдаёт статус AWS, Vercel и GitHub, ответы DNS-over-HTTPS, данные TLS и время HTTP. Anas Rhimi публикует его на wolrdpulse.app. Это не соцсеть World Pulse и не погодное приложение WorldPulse." },
  { q: "Как подключить WolrdPulse к Cursor, Claude Desktop или Windsurf?", a: "Добавь сервер wolrdpulse с url https://wolrdpulse.app/sse. Cursor читает .cursor/mcp.json, Claude Desktop читает claude_desktop_config.json, Windsurf читает свой файл MCP. Перезапусти и вызови get_cloud_status. Ключ API не нужен." },
  { q: "Нужны ли ключ API, регистрация или вход?", a: "Нет. Адрес SSE публичный, лицензия MIT. Не клади токен в поле url. Команда npx -y github:Mealiclay01/wolrdpulse запускает тот же сервер локально через stdio." },
  { q: "Какие провайдеры читает get_cloud_status?", a: "Передай aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker или datadog. Без provider приходят все ленты. Текст с публичной страницы статуса, не из закрытого API аккаунта." },
  { q: "Как inspect_ssl проверяет сертификат TLS?", a: "Передай только имя хоста. inspect_ssl открывает TLS-сокет на порту 443 и возвращает издателя, notAfter и daysRemaining. Ошибка означает сбой рукопожатия, а не выдуманную дату." },
  { q: "Какие записи DNS доступны в query_dns?", a: "query_dns спрашивает Cloudflare 1.1.1.1 о A, AAAA, CNAME, MX, TXT, NS, SOA или CAA. По умолчанию A. inspect_dns — старое имя того же вызова. Назови резолвер, данные и TTL." },
  { q: "Как ping_endpoint меряет код HTTP и задержку?", a: "Передай абсолютный URL. Вернутся код, время до первого байта и часть заголовков из региона WolrdPulse в Вашингтоне. 4xx или 5xx — завершённый запрос. Таймаут — ошибка, не выдуманный код." },
  { q: "WolrdPulse открыт и запускается через npx?", a: "Да. Репозиторий github.com/Mealiclay01/wolrdpulse под лицензией MIT. npx -y github:Mealiclay01/wolrdpulse поднимает локальный сервер. https://wolrdpulse.app/sse — размещённый поток. Имена инструментов те же." },
];

const zh: HomeFaq[] = [
  { q: "WolrdPulse MCP 服务器是什么？", a: "WolrdPulse 是给编程智能体用的开源 Model Context Protocol 服务器。它返回 AWS、Vercel 和 GitHub 的实时状态、DNS-over-HTTPS 结果、TLS 证书细节和 HTTP 耗时。Anas Rhimi 把它发布在 wolrdpulse.app。它不是 World Pulse 社交网络，也不是 WorldPulse 天气应用。" },
  { q: "如何把 WolrdPulse 接到 Cursor、Claude Desktop 或 Windsurf？", a: "添加名为 wolrdpulse 的服务器，url 为 https://wolrdpulse.app/sse。Cursor 读取 .cursor/mcp.json，Claude Desktop 读取 claude_desktop_config.json，Windsurf 读取自己的 MCP 配置。重启后调用 get_cloud_status。不需要 API 密钥。" },
  { q: "WolrdPulse 需要 API 密钥、注册或登录吗？", a: "不需要。SSE 端点是公开的，许可是 MIT。不要把令牌放进 url。npx -y github:Mealiclay01/wolrdpulse 会在本地用 stdio 启动同一套服务器。" },
  { q: "get_cloud_status 实时查看哪些云厂商？", a: "把 provider 设为 aws、vercel、github、cloudflare、openai、anthropic、supabase、npm、docker 或 datadog。省略 provider 会一次返回全部。文字来自公开状态页，不是账户私有健康接口。" },
  { q: "inspect_ssl 如何检查 TLS 证书和到期时间？", a: "只传主机名。inspect_ssl 在 443 端口打开 TLS 套接字，返回颁发者、notAfter 和 daysRemaining。错误表示握手失败，不是编造的到期日。" },
  { q: "query_dns 可以查询哪些 DNS 记录？", a: "query_dns 向 Cloudflare 1.1.1.1 查询 A、AAAA、CNAME、MX、TXT、NS、SOA 或 CAA。默认是 A。inspect_dns 是同一次调用的旧名称。请写明解析器、数据和 TTL。" },
  { q: "ping_endpoint 如何测量 HTTP 状态和边缘延迟？", a: "传入绝对 URL。它返回状态码、首字节时间和部分响应头，测量点在 WolrdPulse 的华盛顿区域。4xx 或 5xx 是完成的探测。超时是错误，不是编造的状态码。" },
  { q: "WolrdPulse 是开源的吗，能用 npx 自托管吗？", a: "是。仓库 github.com/Mealiclay01/wolrdpulse 使用 MIT 许可。npx -y github:Mealiclay01/wolrdpulse 启动本地服务器。https://wolrdpulse.app/sse 是托管的流。工具名称相同。" },
];

const ja: HomeFaq[] = [
  { q: "WolrdPulse MCP サーバーとは何ですか？", a: "WolrdPulse はコーディングエージェント向けのオープンソース Model Context Protocol サーバーです。AWS、Vercel、GitHub の状態、DNS-over-HTTPS、TLS 証明書、HTTP 時間を返します。Anas Rhimi が wolrdpulse.app で公開しています。World Pulse という SNS でも、WorldPulse という天気アプリでもありません。" },
  { q: "Cursor、Claude Desktop、Windsurf へどう接続しますか？", a: "名前を wolrdpulse、url を https://wolrdpulse.app/sse にします。Cursor は .cursor/mcp.json、Claude Desktop は claude_desktop_config.json、Windsurf は自分の MCP 設定を読みます。再起動して get_cloud_status を呼んでください。API キーは不要です。" },
  { q: "API キー、登録、認証は必要ですか？", a: "不要です。SSE 端点は公開で、ライセンスは MIT です。url にトークンを入れないでください。npx -y github:Mealiclay01/wolrdpulse は同じサーバーをローカルの stdio で起動します。" },
  { q: "get_cloud_status はどの事業者を見ますか？", a: "provider に aws、vercel、github、cloudflare、openai、anthropic、supabase、npm、docker、datadog を渡します。省略すると全フィードが返ります。文章は公開ステータスページのもので、アカウント専用 API ではありません。" },
  { q: "inspect_ssl は TLS 証明書と期限をどう確認しますか？", a: "ホスト名だけを渡します。inspect_ssl はポート 443 で TLS ソケットを開き、発行者、notAfter、daysRemaining を返します。エラーは握手の失敗であり、作った期限ではありません。" },
  { q: "query_dns はどの DNS レコードを引けますか？", a: "query_dns は Cloudflare 1.1.1.1 に A、AAAA、CNAME、MX、TXT、NS、SOA、CAA を尋ねます。既定は A です。inspect_dns は同じ呼び出しの古い名前です。リゾルバ、データ、TTL を書いてください。" },
  { q: "ping_endpoint は HTTP 状態と遅延をどう測りますか？", a: "絶対 URL を渡します。状態コード、最初のバイトまでの時間、一部のヘッダーが、ワシントンの WolrdPulse リージョンから返ります。4xx や 5xx は完了した計測です。タイムアウトはエラーです。" },
  { q: "WolrdPulse はオープンソースで、npx で自分で動かせますか？", a: "はい。リポジトリ github.com/Mealiclay01/wolrdpulse は MIT です。npx -y github:Mealiclay01/wolrdpulse がローカルサーバーを起動します。https://wolrdpulse.app/sse がホストされたストリームです。ツール名は同じです。" },
];

const ko: HomeFaq[] = [
  { q: "WolrdPulse MCP 서버란 무엇인가요?", a: "WolrdPulse는 코딩 에이전트를 위한 오픈소스 Model Context Protocol 서버입니다. AWS, Vercel, GitHub 상태, DNS-over-HTTPS, TLS 인증서, HTTP 시간을 돌려줍니다. Anas Rhimi가 wolrdpulse.app에 올렸습니다. World Pulse 소셜 네트워크도, WorldPulse 날씨 앱도 아닙니다." },
  { q: "Cursor, Claude Desktop, Windsurf에 어떻게 연결하나요?", a: "이름은 wolrdpulse, url은 https://wolrdpulse.app/sse 로 둡니다. Cursor는 .cursor/mcp.json, Claude Desktop은 claude_desktop_config.json, Windsurf는 자신의 MCP 설정을 읽습니다. 다시 시작한 뒤 get_cloud_status를 호출하세요. API 키는 필요 없습니다." },
  { q: "API 키, 가입, 인증이 필요한가요?", a: "아니요. SSE 주소는 공개이고 라이선스는 MIT입니다. url에 토큰을 넣지 마세요. npx -y github:Mealiclay01/wolrdpulse 는 같은 서버를 로컬 stdio로 띄웁니다." },
  { q: "get_cloud_status는 어떤 제공자를 보나요?", a: "provider에 aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker, datadog를 넘깁니다. 생략하면 모든 피드가 옵니다. 글은 공개 상태 페이지에서 오며 계정 전용 API가 아닙니다." },
  { q: "inspect_ssl은 TLS 인증서와 만료를 어떻게 확인하나요?", a: "호스트 이름만 넘깁니다. inspect_ssl은 443 포트에서 TLS 소켓을 열고 발급자, notAfter, daysRemaining을 돌려줍니다. 오류는 핸드셰이크 실패이며 지어낸 날짜가 아닙니다." },
  { q: "query_dns는 어떤 DNS 레코드를 조회하나요?", a: "query_dns는 Cloudflare 1.1.1.1에 A, AAAA, CNAME, MX, TXT, NS, SOA, CAA를 묻습니다. 기본은 A입니다. inspect_dns는 같은 호출의 이전 이름입니다. 리졸버, 데이터, TTL을 적으세요." },
  { q: "ping_endpoint는 HTTP 상태와 지연을 어떻게 재나요?", a: "절대 URL을 넘깁니다. 상태 코드, 첫 바이트까지의 시간, 일부 헤더가 워싱턴의 WolrdPulse 리전에서 옵니다. 4xx나 5xx는 끝난 검사이고, 시간 초과는 오류입니다." },
  { q: "WolrdPulse는 오픈소스이며 npx로 직접 실행할 수 있나요?", a: "예. 저장소 github.com/Mealiclay01/wolrdpulse 는 MIT입니다. npx -y github:Mealiclay01/wolrdpulse 가 로컬 서버를 띄웁니다. https://wolrdpulse.app/sse 가 호스팅된 스트림입니다. 도구 이름은 같습니다." },
];

const byLocale: Record<string, HomeFaq[]> = { en, fr, ar, de, es, ru, zh, ja, ko };

export function homeFaqs(locale: string): HomeFaq[] {
  return byLocale[locale] || en;
}
