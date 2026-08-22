const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../app/[locale]/features/FeaturesClient.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"MCP JSON-RPC Tool Schema"/g, '{t.features.mcpTools}');
content = content.replace(/>Frequently Asked Questions</g, '>{t.features.faqTitle}<');
content = content.replace(/>Direct answers to common questions about WolrdPulse, MCP integration, and live telemetry.</g, '>{t.features.faqDesc}<');
content = content.replace(/>How does WolrdPulse MCP eliminate AI hallucinations during cloud outages\?</g, '>{t.features.faq1Q}<');
content = content.replace(/>WolrdPulse provides autonomous coding agents \(Claude Desktop, Cursor, Windsurf\) with live telemetry from AWS, Vercel, and GitHub via the Model Context Protocol \(MCP\). When a build fails due to a third-party cloud degradation, the agent queries WolrdPulse, detects the active incident in sub-50ms, and notifies the developer immediately instead of rewriting functional code.</g, '>{t.features.faq1A}<');

content = content.replace(/>How do I connect Claude Desktop or Cursor to WolrdPulse\?</g, '>{t.features.faq2Q}<');
content = content.replace(/>Add the SSE endpoint /g, '>{t.features.faq2A1}');
content = content.replace(/ to your /g, '{t.features.faq2A2}');
content = content.replace(/ or /g, '{t.features.faq2A3}');
content = content.replace(/ under the /g, '{t.features.faq2A4}');
content = content.replace(/\. No API keys or authentication are required\.</g, '{t.features.faq2A5}');

content = content.replace(/>What makes WolrdPulse different from standard uptime monitors\?</g, '>{t.features.faq3Q}<');
content = content.replace(/>Traditional uptime checkers only alert humans via email or Slack. WolrdPulse formats cloud telemetry into native JSON-RPC Model Context Protocol tools that AI models can autonomously invoke during agentic pair programming to check network sockets, TLS certificates, and DNS records.</g, '>{t.features.faq3A}<');
content = content.replace(/>Which DNS and SSL verification tools are supported\?</g, '>{t.features.faq4Q}<');
content = content.replace(/>WolrdPulse supports live DNS-over-HTTPS \(DoH\) queries for A, AAAA, CNAME, MX, TXT, NS, and CAA records via Cloudflare 1.1.1.1, as well as native TLS socket handshakes to verify SSL certificate issuer chains and expiration dates.</g, '>{t.features.faq4A}<');

fs.writeFileSync(file, content);
console.log("Features refactored.");
