# WolrdPulse — Open-Source Cloud Status, DNS, SSL & Edge Ping MCP Server

WolrdPulse is an open-source Model Context Protocol server for coding agents. The live site is [https://wolrdpulse.app/en](https://wolrdpulse.app/en). It returns AWS, Vercel, and GitHub outage status, DNS-over-HTTPS answers, TLS certificate details, and HTTP edge timing. It is not the World Pulse social network and not the WorldPulse weather product.

Author: [Anas Rhimi](https://anasrhimi.tech). License: MIT.

## Quick start

Hosted SSE, no API key:

```json
{
  "mcpServers": {
    "wolrdpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}
```

Local stdio:

```bash
npx -y github:Mealiclay01/wolrdpulse
```

## Tools

| Tool | What it checks | Inputs |
| --- | --- | --- |
| `get_cloud_status` | Public outage feeds | `provider?` |
| `inspect_ssl` | TLS certificate on port 443 | `domain` |
| `query_dns` | DNS-over-HTTPS via 1.1.1.1 (`inspect_dns` is an alias) | `domain`, `recordType?` |
| `ping_endpoint` | HTTP status and time to first byte | `url` |

## Cursor

File: `~/.cursor/mcp.json` (or `.cursor/mcp.json` in the project). Windows: `%USERPROFILE%\.cursor\mcp.json`.

```json
{
  "mcpServers": {
    "wolrdpulse": { "url": "https://wolrdpulse.app/sse" }
  }
}
```

## Claude Desktop

macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
Linux: `~/.config/Claude/claude_desktop_config.json`  
Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "wolrdpulse": { "url": "https://wolrdpulse.app/sse" }
  }
}
```

## Windsurf

File: `~/.codeium/windsurf/mcp_config.json`. Use `context_servers` instead of `mcpServers` only if that build reads the former. Keep the key `wolrdpulse`.

```json
{
  "mcpServers": {
    "wolrdpulse": { "url": "https://wolrdpulse.app/sse" }
  }
}
```

## Develop

```bash
npm install
npm run dev
```

## Suggested GitHub topics

`mcp`, `mcp-server`, `model-context-protocol`, `devops`, `cloud-status`, `dns`, `ssl`, `cursor`, `claude`, `windsurf`, `ai-agents`

Directory submission copy lives in `docs/distribution-checklist.md`.
