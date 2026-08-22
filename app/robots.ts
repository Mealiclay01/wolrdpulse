import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/internal/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "cohere-ai",
        ],
        allow: ["/", "/features", "/developer", "/privacy", "/terms", "/llms.txt", "/sse"],
      },
    ],
    sitemap: "https://wolrdpulse.app/sitemap.xml",
    host: "https://wolrdpulse.app",
  };
}
