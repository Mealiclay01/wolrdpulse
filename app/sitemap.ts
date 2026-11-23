import { MetadataRoute } from "next";
import { i18n } from "@/middleware";
import { guidePages, integrationPages, statusPages, toolPages } from "@/lib/pseo";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const translated = ["", "/features", "/sponsor", "/developer", "/privacy", "/terms"];
  const englishOnly = [
    "/tools",
    "/integrations",
    "/status",
    "/guides",
    ...toolPages.map((page) => `/tools/${page.slug}`),
    ...integrationPages.map((page) => `/integrations/${page.slug}`),
    ...statusPages.map((page) => `/status/${page.slug}`),
    ...guidePages.map((page) => `/guides/${page.slug}`),
  ];

  const entry = (path: string, locale: string, languages: Record<string, string>) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date("2026-11-23"),
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
    alternates: { languages },
  });

  const translatedEntries = translated.flatMap((path) => {
    const languages: Record<string, string> = { "x-default": `${SITE_URL}/en${path}` };
    for (const locale of i18n.locales) languages[locale] = `${SITE_URL}/${locale}${path}`;
    return i18n.locales.map((locale) => entry(path, locale, languages));
  });

  const englishEntries = englishOnly.map((path) =>
    entry(path, "en", { en: `${SITE_URL}/en${path}`, "x-default": `${SITE_URL}/en${path}` }),
  );

  return [...translatedEntries, ...englishEntries];
}
