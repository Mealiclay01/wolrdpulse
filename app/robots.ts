import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const aiCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "Applebot-Extended",
  "Google-Extended",
  "YandexBot",
];

export default function robots(): MetadataRoute.Robots {
  const rule = {
    allow: "/",
    disallow: ["/api/", "/sse"],
  };
  return {
    rules: [{ userAgent: "*", ...rule }, ...aiCrawlers.map((userAgent) => ({ userAgent, ...rule }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
