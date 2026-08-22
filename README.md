# WolrdPulse (`wolrdpulse.app`)

**WolrdPulse** is a real-time DevOps health dashboard, edge diagnostics utility, and remote **Model Context Protocol (MCP)** server built for developers, DevOps engineers, and AI coding assistants (Claude Desktop, Cursor, Antigravity, Zed).

Designed to run **100% on free-tier infrastructure ($0/month)** via Vercel Serverless, Cloudflare DNS-over-HTTPS, and public status feeds.

---

## 🌟 Features

- ⚡ **Remote MCP Server (`/sse` & `/api/mcp`)**: Connect Cursor, Claude Desktop, or Antigravity with 1 line of configuration.
- 📡 **Global Cloud & API Status Radar**: Live status and incident detection for AWS, GitHub, Cloudflare, OpenAI, Anthropic, Vercel, Supabase, NPM, and Docker Hub.
- 🌐 **Edge Latency & TTFB Pinger**: Measure response times, HTTP status codes, and inspect headers.
- 🔍 **Live DNS-over-HTTPS (DoH)**: Query A, AAAA, CNAME, MX, TXT, and NS records via Cloudflare 1.1.1.1.
- 🚀 **Framework Release Pulse**: Real-time tracker for major open-source releases (Kubernetes, Docker, Bun, Next.js, Go, Rust).

---

## 🔌 Connecting to AI Agents via MCP

### Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}
```

### Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}
```

---

## 🛠️ MCP Tools Provided

1. `get_cloud_status(provider?)`: Live operational status and active incidents.
2. `ping_endpoint(url)`: Time to First Byte (TTFB) and HTTP response headers.
3. `inspect_dns(domain, recordType?)`: Cloudflare DoH resolution.
4. `get_tech_pulse()`: Latest releases and trending repositories.

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel (100% Free)

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Assign your custom domain `wolrdpulse.app`.
4. Deploy! Zero environment variables required.
