const fs = require('fs');
const path = require('path');

let pfile = path.join(__dirname, '../app/[locale]/privacy/page.tsx');
let pcontent = fs.readFileSync(pfile, 'utf8');

pcontent = pcontent.replace(/>Back to Home</g, '>{t.nav.backHome}<');
pcontent = pcontent.replace(/>Privacy Policy</g, '>{t.privacy.title}<');
pcontent = pcontent.replace(/>Last updated: /g, '>{t.privacy.lastUpdated}');
pcontent = pcontent.replace(/>1. Information We Collect</g, '>{t.privacy.section1Title}<');
pcontent = pcontent.replace(/>WolrdPulse is designed as a stateless Model Context Protocol \(MCP\) server. We do not require account creation, and we do not collect, store, or sell any personally identifiable information \(PII\) from the AI agents or users connecting to our endpoints.</g, '>{t.privacy.section1Desc}<');
pcontent = pcontent.replace(/>2. Telemetry and Usage Data</g, '>{t.privacy.section2Title}<');
pcontent = pcontent.replace(/>When your agent connects to the WolrdPulse SSE endpoint \(/g, '>{t.privacy.section2Desc1}');
pcontent = pcontent.replace(/\), we may log basic connection metadata \(e.g., IP address, connection duration, and request volume\) strictly for the purpose of maintaining service reliability, rate limiting, and preventing abuse.</g, '{t.privacy.section2Desc2}<');
pcontent = pcontent.replace(/>3. Third-Party Services</g, '>{t.privacy.section3Title}<');
pcontent = pcontent.replace(/>WolrdPulse aggregates data from third-party APIs \(such as AWS, Vercel, and GitHub\). When you or your agent requests data, no user-specific information is passed to these underlying services. We simply fetch public status endpoints and proxy the results.</g, '>{t.privacy.section3Desc}<');
pcontent = pcontent.replace(/>4. Contact</g, '>{t.privacy.section4Title}<');
pcontent = pcontent.replace(/>If you have any questions regarding this privacy policy or how WolrdPulse handles data, please contact the developer at /g, '>{t.privacy.section4Desc1}');
fs.writeFileSync(pfile, pcontent);

let tfile = path.join(__dirname, '../app/[locale]/terms/page.tsx');
let tcontent = fs.readFileSync(tfile, 'utf8');

tcontent = tcontent.replace(/>Back to Home</g, '>{t.nav.backHome}<');
tcontent = tcontent.replace(/>Terms of Service</g, '>{t.terms.title}<');
tcontent = tcontent.replace(/>Last updated: /g, '>{t.terms.lastUpdated}');
tcontent = tcontent.replace(/>1. Acceptance of Terms</g, '>{t.terms.section1Title}<');
tcontent = tcontent.replace(/>By accessing and using WolrdPulse, you accept and agree to be bound by the terms and provisions of this agreement. WolrdPulse is provided "as is" primarily as a tool for developers and autonomous AI agents.</g, '>{t.terms.section1Desc}<');
tcontent = tcontent.replace(/>2. Use License \& API Usage</g, '>{t.terms.section2Title}<');
tcontent = tcontent.replace(/>Permission is granted to temporarily use the WolrdPulse MCP endpoints. However, you agree not to:</g, '>{t.terms.section2Desc}<');
tcontent = tcontent.replace(/>Use the service for any illegal or unauthorized purpose.</g, '>{t.terms.section2Li1}<');
tcontent = tcontent.replace(/>Attempt to reverse engineer or overload the API with malicious intent \(DDoS\).</g, '>{t.terms.section2Li2}<');
tcontent = tcontent.replace(/>Use the Ping Playground or edge network endpoints to launch attacks or probe restricted infrastructure.</g, '>{t.terms.section2Li3}<');
tcontent = tcontent.replace(/>3. Disclaimer</g, '>{t.terms.section3Title}<');
tcontent = tcontent.replace(/>The materials on WolrdPulse's website and APIs are provided on an 'as is' basis. WolrdPulse makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</g, '>{t.terms.section3Desc}<');
tcontent = tcontent.replace(/>4. Limitations</g, '>{t.terms.section4Title}<');
tcontent = tcontent.replace(/>In no event shall WolrdPulse, its developers, or its suppliers be liable for any damages \(including, without limitation, damages for loss of data or profit, or due to business interruption\) arising out of the use or inability to use the materials on WolrdPulse's website.</g, '>{t.terms.section4Desc}<');
tcontent = tcontent.replace(/>5. Developer Contact</g, '>{t.terms.section5Title}<');
tcontent = tcontent.replace(/>WolrdPulse is maintained and built by Anas Rhimi. For inquiries, reach out at /g, '>{t.terms.section5Desc1}');
fs.writeFileSync(tfile, tcontent);

console.log("Privacy and Terms refactored.");
