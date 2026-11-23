import { MCP_SSE_URL, NPX_COMMAND } from "@/lib/site";

export type Faq = { q: string; a: string };
export type InputRow = { name: string; required: string; detail: string };
export type Step = { name: string; text: string };

export type PseoPage = {
  section: "tools" | "integrations" | "status" | "guides";
  slug: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  keywords: string[];
  inputs?: InputRow[];
  sample?: string;
  prompts?: string[];
  notes?: string[];
  steps?: Step[];
  paths?: { os: string; path: string }[];
  faqs: Faq[];
};

const sse = MCP_SSE_URL;

export const toolPages: PseoPage[] = [
  {
    section: "tools",
    slug: "cloud-status",
    title: "Cloud status MCP server for AWS, Vercel and GitHub",
    description: "Call get_cloud_status from Cursor or Claude to read live AWS, Vercel, and GitHub incidents before rewriting a failing build. No API key is required.",
    h1: "Cloud status MCP server",
    lede: "get_cloud_status is the WolrdPulse tool a coding agent calls when a deploy fails. It returns the provider indicator and the incident text from the public status feed, so the agent can tell an outage from a bug in the repository.",
    keywords: ["cloud status MCP server", "get_cloud_status", "AWS outage MCP", "Vercel status MCP"],
    inputs: [
      { name: "provider", required: "No", detail: "aws, vercel, github, cloudflare, openai, anthropic, supabase, npm, docker, datadog. Omit it to read every feed." },
    ],
    sample: `{
  "provider": "vercel",
  "status": "degraded",
  "indicator": "minor",
  "description": "Example only: build queue delays reported on the public status page.",
  "updatedAt": "2026-11-23T09:00:00Z"
}`,
    prompts: [
      "Call get_cloud_status with provider vercel before changing next.config.",
      "Is GitHub Actions down, or is this workflow YAML invalid? Use get_cloud_status.",
      "Summarize get_cloud_status for aws and stop if the indicator is not none.",
    ],
    notes: [
      "An unknown provider returns an error string that lists the supported names. The agent should retry with a listed name, not invent a status.",
      "The payload is the public status page, not a private AWS Health API. Do not treat it as an account-specific incident.",
    ],
    faqs: [
      { q: "What does get_cloud_status return?", a: "It returns the provider name, a status word such as none or degraded, the incident description from that provider's public status page, and the time the feed was read. Omit provider to receive the full set in one call." },
      { q: "Which providers can an agent filter?", a: "Pass aws, github, cloudflare, openai, anthropic, vercel, supabase, npm, docker, or datadog. Any other string returns the supported list instead of a guessed status." },
      { q: "Does this replace the AWS Health dashboard?", a: "No. It reads the public status feed so an agent can avoid rewriting code during a platform incident. Account-specific events still belong in the provider console." },
    ],
  },
  {
    section: "tools",
    slug: "ssl-inspector",
    title: "SSL certificate MCP tool for live TLS expiry checks",
    description: "inspect_ssl opens a TLS socket and returns issuer, expiry, and remaining days so an agent can check a domain before launch. No API key is required.",
    h1: "SSL certificate MCP tool",
    lede: "inspect_ssl connects to port 443 on the hostname you pass and reads the certificate the server presents. The agent gets the issuer, the notAfter date, and the remaining days. It does not change the certificate and it does not need an account.",
    keywords: ["SSL certificate MCP", "inspect_ssl", "TLS expiry AI agent"],
    inputs: [
      { name: "domain", required: "Yes", detail: "Hostname only, such as api.github.com. Do not include https:// or a path." },
    ],
    sample: `{
  "domain": "api.github.com",
  "issuer": "Example issuer from the live handshake",
  "notAfter": "2026-12-31T00:00:00Z",
  "daysRemaining": 38,
  "valid": true
}`,
    prompts: [
      "Call inspect_ssl for api.github.com and tell me if daysRemaining is under 14.",
      "Before we cut DNS, inspect_ssl on the new hostname and quote notAfter.",
      "Compare inspect_ssl on the apex and on www, and flag a mismatch.",
    ],
    notes: [
      "A refused connection or a TLS alert comes back as an error string. That is a reachability result, not a certificate.",
      "The tool reads the certificate the server sends. It does not consult a third-party certificate transparency log.",
    ],
    faqs: [
      { q: "How does inspect_ssl check expiry?", a: "It opens a TLS socket to the hostname on port 443, reads notAfter from the leaf certificate, and reports how many days remain. Pass the hostname alone, without a scheme or a path." },
      { q: "Can it inspect a certificate that is not yet being served?", a: "No. The handshake only sees the certificate the host presents today. A certificate sitting in a file on disk is outside this tool." },
      { q: "What should the agent do when the call errors?", a: "Treat the error as a failed handshake. Check the hostname, confirm port 443 is open, and do not invent an expiry date from the error text." },
    ],
  },
  {
    section: "tools",
    slug: "dns-resolver",
    title: "DNS lookup MCP server for A, CNAME, MX, and TXT records",
    description: "query_dns resolves A, AAAA, CNAME, MX, TXT, NS, SOA, and CAA through Cloudflare 1.1.1.1 for agents debugging propagation. No API key is required.",
    h1: "DNS lookup MCP server",
    lede: "query_dns asks Cloudflare 1.1.1.1 over HTTPS and returns the answers with TTL. inspect_dns is the same call under the older name. Use it when an agent needs to know whether a CNAME or an A record is visible on the public resolver, not on a laptop's cache.",
    keywords: ["DNS lookup MCP server", "query_dns", "DNS-over-HTTPS MCP"],
    inputs: [
      { name: "domain", required: "Yes", detail: "The name to look up, such as wolrdpulse.app." },
      { name: "recordType", required: "No", detail: "A, AAAA, CNAME, MX, TXT, NS, SOA, or CAA. Defaults to A." },
    ],
    sample: `{
  "domain": "wolrdpulse.app",
  "recordType": "A",
  "resolver": "1.1.1.1",
  "answers": [{ "type": "A", "data": "76.76.21.21", "ttl": 300 }]
}`,
    prompts: [
      "query_dns wolrdpulse.app recordType CNAME and quote the target.",
      "Has the MX for the domain appeared on 1.1.1.1 yet? Use query_dns.",
      "Compare query_dns A and AAAA before calling the host healthy.",
    ],
    notes: [
      "An empty answer list means the resolver has no data of that type. It is not a transport failure.",
      "The laptop resolver can still be stale after 1.1.1.1 has the new record. Say which resolver you asked.",
    ],
    faqs: [
      { q: "Which record types does query_dns support?", a: "A, AAAA, CNAME, MX, TXT, NS, SOA, and CAA. The default is A when recordType is omitted. inspect_dns accepts the same arguments and is kept as an alias." },
      { q: "Does a successful lookup prove every resolver has the record?", a: "No. The answer is what Cloudflare 1.1.1.1 returned. Other resolvers can lag. Quote the resolver and the TTL instead of claiming global propagation." },
      { q: "Why would an agent still see the old address?", a: "The old TTL may not have expired on a recursive resolver, or the agent may be reading a cached result. Ask query_dns again and compare the data field with the expected target." },
    ],
  },
  {
    section: "tools",
    slug: "edge-pings",
    title: "HTTP ping latency MCP tool for status codes and TTFB",
    description: "ping_endpoint measures HTTP status and time to first byte for a URL so an agent can separate a slow host from a failed deploy. No API key is required.",
    h1: "HTTP edge ping MCP",
    lede: "ping_endpoint requests the URL you pass and reports the HTTP status, the time to first byte, and a subset of response headers. Use it after a deploy to see whether the route answers, and use get_cloud_status first when the status page already shows an incident.",
    keywords: ["HTTP ping latency MCP", "ping_endpoint", "TTFB MCP"],
    inputs: [
      { name: "url", required: "Yes", detail: "Absolute http or https URL. A bare hostname is normalized before the request." },
    ],
    sample: `{
  "url": "https://wolrdpulse.app/en",
  "status": 200,
  "ttfbMs": 120,
  "headers": { "content-type": "text/html; charset=utf-8" }
}`,
    prompts: [
      "ping_endpoint https://wolrdpulse.app/en and report status and ttfbMs.",
      "The health URL returned 500. Quote the status from ping_endpoint and stop.",
      "Compare ping_endpoint on /en and /en/features before calling the deploy bad.",
    ],
    notes: [
      "A timeout is an error result. Do not fill in a fake status code.",
      "TTFB includes the network path from the WolrdPulse region, which is Washington, D.C. It is not a browser measurement from the user's city.",
    ],
    faqs: [
      { q: "What does ping_endpoint measure?", a: "It measures the HTTP status code and the time to first byte for one URL, and it returns selected response headers. It is one request from the WolrdPulse region, not a multi-city synthetic monitor." },
      { q: "Should an agent ping before checking cloud status?", a: "If the deploy just went out, ping the route. If several routes fail at once, call get_cloud_status for the host's provider before editing application code." },
      { q: "Which failures come back as errors?", a: "DNS failure, connection refusal, and timeout return an error string. An HTTP 4xx or 5xx is still a completed probe and is reported as a status code." },
    ],
  },
];

export const integrationPages: PseoPage[] = [
  {
    section: "integrations",
    slug: "cursor",
    title: "Cursor MCP server config for WolrdPulse DevOps tools",
    description: "Add the wolrdpulse SSE server to Cursor on macOS, Windows, or Linux, then ask it to call get_cloud_status before a refactor. No API key is required.",
    h1: "Connect WolrdPulse to Cursor",
    lede: "Cursor reads MCP servers from .cursor/mcp.json in the project or from the user-level MCP settings. The server key is wolrdpulse and the URL is the public SSE endpoint. No API key is required. After a reload, get_cloud_status, inspect_ssl, query_dns, and ping_endpoint are callable.",
    keywords: ["Cursor MCP server DevOps", "Cursor MCP cloud status"],
    paths: [
      { os: "macOS", path: "~/.cursor/mcp.json" },
      { os: "Linux", path: "~/.cursor/mcp.json" },
      { os: "Windows", path: "%USERPROFILE%\\.cursor\\mcp.json" },
    ],
    sample: `{
  "mcpServers": {
    "wolrdpulse": { "url": "${sse}" }
  }
}`,
    steps: [
      { name: "Open the MCP file", text: "Create or open .cursor/mcp.json in the project, or the user-level file listed for your OS." },
      { name: "Paste the server", text: "Set mcpServers.wolrdpulse.url to https://wolrdpulse.app/sse. Keep the key spelled wolrdpulse." },
      { name: "Reload and ask", text: "Reload Cursor MCP servers, then ask: call get_cloud_status for vercel and quote the indicator." },
    ],
    notes: [
      "A server key that drops the r in wolrdpulse will not match this project. Cursor will still connect, but the name in logs will not match the domain.",
      "If the tool list stays empty, confirm the URL is https and that a corporate proxy is not stripping the SSE stream.",
    ],
    faqs: [
      { q: "Where does Cursor store the MCP config?", a: "Project config lives in .cursor/mcp.json. A user-level file also works at ~/.cursor/mcp.json on macOS and Linux, and under %USERPROFILE%\\.cursor\\mcp.json on Windows." },
      { q: "How do I know the server connected?", a: "Reload MCP servers. The tool list should include get_cloud_status. Ask Cursor to call it for provider vercel and to quote the status field." },
      { q: "The stream connects and then drops. What next?", a: "Check that the URL is exactly https://wolrdpulse.app/sse and that no local proxy buffers SSE. A normal HTTP 200 page is not a successful stream." },
    ],
  },
  {
    section: "integrations",
    slug: "claude-desktop",
    title: "Claude Desktop SSE MCP config for the WolrdPulse server",
    description: "Paste the wolrdpulse SSE server into claude_desktop_config.json on macOS, Windows, or Linux. No API key is required. No API key is required.",
    h1: "Connect WolrdPulse to Claude Desktop",
    lede: "Claude Desktop loads MCP servers from claude_desktop_config.json. Add a server named wolrdpulse whose url is https://wolrdpulse.app/sse. Restart the app. The same four tools are then available in the tool picker.",
    keywords: ["Claude Desktop SSE MCP", "claude_desktop_config.json"],
    paths: [
      { os: "macOS", path: "~/Library/Application Support/Claude/claude_desktop_config.json" },
      { os: "Linux", path: "~/.config/Claude/claude_desktop_config.json" },
      { os: "Windows", path: "%APPDATA%\\Claude\\claude_desktop_config.json" },
    ],
    sample: `{
  "mcpServers": {
    "wolrdpulse": { "url": "${sse}" }
  }
}`,
    steps: [
      { name: "Open the config file", text: "Open claude_desktop_config.json at the path for your OS. Create the Claude folder if it is missing." },
      { name: "Add wolrdpulse", text: "Under mcpServers, set wolrdpulse.url to https://wolrdpulse.app/sse." },
      { name: "Restart Claude", text: "Quit Claude Desktop fully, reopen it, and ask it to call inspect_ssl for wolrdpulse.app." },
    ],
    notes: [
      "A second server block that drops the r in wolrdpulse is a different name. Delete it so logs match the domain.",
      "Claude must be fully quit. Closing the window on macOS can leave the process running with the old config.",
    ],
    faqs: [
      { q: "Which file does Claude Desktop read?", a: "macOS uses ~/Library/Application Support/Claude/claude_desktop_config.json. Linux uses ~/.config/Claude/claude_desktop_config.json. Windows uses %APPDATA%\\Claude\\claude_desktop_config.json." },
      { q: "Do I need an API key from WolrdPulse?", a: "No. The SSE URL is public. Do not put a secret in the url field. Authentication is not part of this server." },
      { q: "How do I verify the tools loaded?", a: "Restart Claude and ask it to call query_dns for wolrdpulse.app with recordType A. A JSON answer means the server is connected." },
    ],
  },
  {
    section: "integrations",
    slug: "windsurf",
    title: "Windsurf MCP cloud status setup for the WolrdPulse server",
    description: "Point Windsurf at the wolrdpulse SSE server so Cascade can call get_cloud_status, inspect_ssl, query_dns, and ping_endpoint. No API key is required.",
    h1: "Connect WolrdPulse to Windsurf",
    lede: "Windsurf reads MCP servers from its MCP config. Use the key wolrdpulse and the SSE URL https://wolrdpulse.app/sse. If your build of Windsurf expects context_servers instead of mcpServers, keep the same key and URL under that object.",
    keywords: ["Windsurf MCP cloud status", "Windsurf MCP config"],
    paths: [
      { os: "macOS", path: "~/.codeium/windsurf/mcp_config.json" },
      { os: "Linux", path: "~/.codeium/windsurf/mcp_config.json" },
      { os: "Windows", path: "%USERPROFILE%\\.codeium\\windsurf\\mcp_config.json" },
    ],
    sample: `{
  "mcpServers": {
    "wolrdpulse": { "url": "${sse}" }
  }
}`,
    steps: [
      { name: "Open the Windsurf MCP file", text: "Open mcp_config.json under ~/.codeium/windsurf, or the Windows profile path above." },
      { name: "Add the SSE URL", text: "Set wolrdpulse.url to https://wolrdpulse.app/sse under mcpServers or context_servers." },
      { name: "Reload Cascade", text: "Reload MCP servers and ask Cascade to call get_cloud_status with provider github." },
    ],
    notes: [
      "Some Windsurf builds look for context_servers. The URL and the key stay the same. Only the parent key changes.",
      "A saved file that is not reloaded leaves Cascade on the previous tool list.",
    ],
    faqs: [
      { q: "mcpServers or context_servers?", a: "Use mcpServers when the file already has that key. If the client only reads context_servers, put the same wolrdpulse url there. Do not define both with different URLs." },
      { q: "How do I test the connection?", a: "Reload servers and ask for get_cloud_status on github. A status field in the tool result means the SSE session is up." },
      { q: "Why is the tool list empty after a reload?", a: "Confirm the file path, confirm the key is wolrdpulse, and confirm the URL ends in /sse. Then restart Windsurf so the config is read again." },
    ],
  },
];

export const statusPages: PseoPage[] = [
  {
    section: "status",
    slug: "aws-mcp",
    title: "AWS outage status MCP for coding agents and deploys",
    description: "Call get_cloud_status with provider aws before an agent rewrites IAM or networking code during an AWS incident. No API key is required. No API key is re.",
    h1: "AWS outage status for MCP agents",
    lede: "When several AWS-backed calls fail together, the useful first check is the public status feed, not another edit to the SDK wrapper. get_cloud_status with provider aws returns that feed to the agent.",
    keywords: ["AWS outage status MCP", "get_cloud_status aws"],
    sample: `{
  "provider": "aws",
  "status": "investigating",
  "description": "Example only: elevated error rates on a public status feed."
}`,
    prompts: [
      "Call get_cloud_status provider aws. If status is not operational, stop editing the SDK.",
      "Quote the AWS incident description before proposing an IAM change.",
    ],
    notes: [
      "This is the public status page, not AWS Health for one account.",
      "A regional issue can exist while the summary word still looks broad. Read the description field.",
    ],
    faqs: [
      { q: "How does an agent ask about AWS only?", a: "Call get_cloud_status with provider set to aws. The result is that provider's public status, including the description text, rather than the full multi-provider list." },
      { q: "Why do agents rewrite good code during an AWS incident?", a: "The model only sees the failing stack trace. Without the status feed it treats the outage as a bug in the repository and proposes refactors that do not change the provider incident." },
      { q: "Is a clear status proof that my account is healthy?", a: "No. Account-level service health can differ from the public feed. Use the feed to avoid a useless rewrite, then open AWS Health for the account if the call still fails." },
    ],
  },
  {
    section: "status",
    slug: "vercel-mcp",
    title: "Vercel status MCP server for failing production builds",
    description: "Before an agent edits next.config, call get_cloud_status with provider vercel and read whether the build queue is the failure. No API key is required.",
    h1: "Vercel status MCP for build failures",
    lede: "A red Vercel build is not always a type error. get_cloud_status with provider vercel tells the agent whether the public status page is already reporting a build or deploy incident.",
    keywords: ["Vercel status MCP server", "Vercel build failing AI"],
    sample: `{
  "provider": "vercel",
  "status": "degraded",
  "description": "Example only: build queue delays on the public status page."
}`,
    prompts: [
      "get_cloud_status provider vercel. If degraded, do not change next.config.",
      "Quote the Vercel status description in the deploy note.",
    ],
    notes: [
      "A project-specific build error still shows up when the public status is operational. Then read the build log.",
      "Pair this with ping_endpoint on the deployment URL when the status page is clear.",
    ],
    faqs: [
      { q: "When should the agent check Vercel status?", a: "Check it when a production build or deploy fails and the log is a platform timeout rather than a TypeScript diagnostic. Call get_cloud_status with provider vercel first." },
      { q: "What if Vercel status is operational?", a: "Then the failure is in the project. Read the build log. ping_endpoint on the deployment URL tells you whether the last good deployment still answers." },
      { q: "Does this see my team's Vercel project?", a: "No. It sees the public status feed. Project logs, environment variables, and deployment protection stay in the Vercel dashboard." },
    ],
  },
  {
    section: "status",
    slug: "github-mcp",
    title: "GitHub Actions outage MCP for coding agents and CI",
    description: "Call get_cloud_status with provider github before an agent rewrites a workflow that failed because Actions or Git is degraded. No API key is required.",
    h1: "GitHub outage status for MCP agents",
    lede: "A failed GitHub Actions run can be a YAML mistake or a GitHub incident. get_cloud_status with provider github gives the agent the public status text before it rewrites the workflow.",
    keywords: ["GitHub Actions outage MCP", "GitHub status MCP"],
    sample: `{
  "provider": "github",
  "status": "operational",
  "description": "Example only: all systems operational on the public feed."
}`,
    prompts: [
      "get_cloud_status provider github before editing the workflow file.",
      "If GitHub status is operational, then inspect the Actions log.",
    ],
    notes: [
      "Operational status plus a failing job means the YAML, the action pin, or a secret is the next place to look.",
      "The tool does not read your private Actions logs.",
    ],
    faqs: [
      { q: "How does an agent check GitHub before editing YAML?", a: "Call get_cloud_status with provider github. If the feed reports an incident, stop editing the workflow. If it is operational, open the job log." },
      { q: "Can it see a private repository's Actions log?", a: "No. It only returns the public status feed. Logs, secrets, and annotations stay in GitHub." },
      { q: "What should happen when status is degraded?", a: "Record the description, skip the refactor, and rerun the workflow after the feed returns to operational. A retry during the incident only repeats the failure." },
    ],
  },
];

export const guidePages: PseoPage[] = [
  {
    section: "guides",
    slug: "debug-vercel-build-failures-mcp",
    title: "Debug a Vercel build failure with an MCP coding agent",
    description: "A short workflow: get_cloud_status for vercel, then the build log, then ping_endpoint on the last deployment URL. No API key is required. No API key is.",
    h1: "Debug Vercel build failures with MCP",
    lede: "Ask the agent to separate a Vercel platform incident from a project error. The first call is get_cloud_status. The second is the build log. The third, when the status page is clear, is ping_endpoint on the deployment URL.",
    keywords: ["debug Vercel build failing AI agent", "Vercel MCP"],
    steps: [
      { name: "Read Vercel status", text: "Call get_cloud_status with provider vercel. If the description names a build incident, stop editing the app." },
      { name: "Read the build log", text: "If status is operational, open the Vercel build log and quote the first error diagnostic." },
      { name: "Probe the last URL", text: "Call ping_endpoint on the deployment URL. A 200 means the last deployment still serves." },
    ],
    sample: `get_cloud_status { "provider": "vercel" }
→ { "status": "operational" }
ping_endpoint { "url": "https://wolrdpulse.app/en" }
→ { "status": 200 }`,
    notes: [
      "Before: the agent edits next.config because the build is red. After: it quotes the status feed and only edits the file when the feed is operational and the log names that file.",
    ],
    faqs: [
      { q: "What is the first tool call?", a: "get_cloud_status with provider vercel. Do not open next.config until that result is back and the status is operational." },
      { q: "What does a clear status plus a red build mean?", a: "The platform feed is quiet, so the error is in the project log. Read that log before changing configuration." },
      { q: "Where is the connect URL?", a: `Add ${sse} under the server key wolrdpulse, then rerun this workflow from Cursor, Claude, or Windsurf.` },
    ],
  },
  {
    section: "guides",
    slug: "check-ssl-expiry-ai-agent",
    title: "Check SSL expiry with Claude or Cursor using MCP tools",
    description: "Call inspect_ssl with the hostname and read daysRemaining before a launch. No API key and no local openssl install. No API key is required. No API key i.",
    h1: "Check SSL expiry with an AI agent",
    lede: "Give the agent the hostname and tell it to call inspect_ssl. The useful fields are notAfter and daysRemaining. A number under your renewal window is a launch blocker. An error string means the handshake failed.",
    keywords: ["check SSL expiry with Claude", "inspect_ssl MCP"],
    steps: [
      { name: "Pass the hostname", text: "Call inspect_ssl with domain set to the hostname only, for example wolrdpulse.app." },
      { name: "Read daysRemaining", text: "If the number is under 14, renew before launch. Quote notAfter in the checklist." },
      { name: "Treat errors as handshake failures", text: "Do not convert an error string into an expiry date." },
    ],
    sample: `inspect_ssl { "domain": "wolrdpulse.app" }
→ { "valid": true, "daysRemaining": 40 }`,
    faqs: [
      { q: "What argument does inspect_ssl take?", a: "A domain hostname. Do not pass https:// or a path. The tool connects to port 443 itself." },
      { q: "How does an agent decide the certificate is too close to expiry?", a: "Read daysRemaining. Pick a window, such as 14 days, and treat a smaller number as a blocker. Quote notAfter so a person can confirm." },
      { q: "Can Claude do this without openssl installed?", a: "Yes. The handshake runs on WolrdPulse. The desktop app only needs the SSE config and a restarted session." },
    ],
  },
  {
    section: "guides",
    slug: "dns-propagation-debugging-mcp",
    title: "DNS propagation check with an MCP agent and 1.1.1.1",
    description: "Use query_dns against Cloudflare 1.1.1.1 and quote the TTL. Do not claim every resolver has updated. No API key is required. No API key is required.",
    h1: "DNS propagation checks with MCP",
    lede: "An agent that only says to wait 48 hours has not looked up the name. query_dns asks 1.1.1.1. The answer, the record type, and the TTL are the evidence. Other resolvers can still be behind.",
    keywords: ["DNS propagation check MCP", "query_dns CNAME"],
    steps: [
      { name: "Ask 1.1.1.1", text: "Call query_dns with the domain and recordType CNAME or A." },
      { name: "Quote the data and TTL", text: "Write down the data field and the TTL. That is this resolver's view." },
      { name: "Do not claim global completion", text: "If a laptop still shows the old address, say the recursive cache may hold the previous TTL." },
    ],
    sample: `query_dns { "domain": "www.example.com", "recordType": "CNAME" }
→ { "answers": [{ "data": "cname.vercel-dns.com", "ttl": 300 }] }`,
    faqs: [
      { q: "Which resolver does the agent ask?", a: "Cloudflare 1.1.1.1 over HTTPS. Say that name in the answer. It is not the resolver configured on the developer's laptop." },
      { q: "What does an empty answer list mean?", a: "The resolver has no record of that type. It is not a network error. Check the record type and the name." },
      { q: "How do I connect the agent first?", a: `Point the MCP client at ${sse} with the key wolrdpulse, using ${NPX_COMMAND} only if you want a local stdio process instead.` },
    ],
  },
];

export const sections = {
  tools: { slug: "tools", title: "MCP tools", pages: toolPages },
  integrations: { slug: "integrations", title: "IDE integrations", pages: integrationPages },
  status: { slug: "status", title: "Cloud status MCP", pages: statusPages },
  guides: { slug: "guides", title: "Developer guides", pages: guidePages },
} as const;

export type SectionKey = keyof typeof sections;

export function pagesFor(section: SectionKey) {
  return sections[section].pages;
}

export function findPage(section: SectionKey, slug: string) {
  return sections[section].pages.find((page) => page.slug === slug);
}

export function relatedLinks(page: PseoPage) {
  const siblings = sections[page.section].pages.filter((item) => item.slug !== page.slug);
  const links = siblings.map((item) => ({
    href: `/${page.section}/${item.slug}`,
    label: item.h1,
  }));
  links.push(
    { href: "/tools/cloud-status", label: "Cloud status tool" },
    { href: "/integrations/cursor", label: "Cursor setup" },
    { href: "/guides/debug-vercel-build-failures-mcp", label: "Vercel build guide" },
  );
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href) || link.href === `/${page.section}/${page.slug}`) return false;
    seen.add(link.href);
    return true;
  }).slice(0, 4);
}
