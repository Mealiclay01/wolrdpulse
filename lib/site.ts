export const SITE_NAME = "WolrdPulse";
export const SITE_URL = "https://wolrdpulse.app";
export const MCP_SSE_URL = "https://wolrdpulse.app/sse";
export const MCP_SERVER_KEY = "wolrdpulse";
export const GITHUB_REPO = "https://github.com/Mealiclay01/wolrdpulse";
export const NPX_COMMAND = "npx -y github:Mealiclay01/wolrdpulse";
export const AUTHOR_NAME = "Anas Rhimi";
export const AUTHOR_URL = "https://anasrhimi.tech";
export const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/anas-rhimi";
export const AUTHOR_GIST = "https://gist.github.com/Mealiclay01";
export const GITHUB_USER = "https://github.com/Mealiclay01";

export const AUTHOR_SAME_AS = [GITHUB_USER, AUTHOR_GIST, AUTHOR_LINKEDIN, GITHUB_REPO];

/** Copy-paste MCP client config. The server key matches the domain spelling. */
export function mcpConfig(block: "mcpServers" | "context_servers" = "mcpServers") {
  return JSON.stringify(
    { [block]: { [MCP_SERVER_KEY]: { url: MCP_SSE_URL } } },
    null,
    2,
  );
}
