import { MetadataRoute } from "next";
import { i18n } from "../middleware";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wolrdpulse.app";
  const lastModified = new Date();
  
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/features", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/developer", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // We add alternates so Google knows about all localized versions of a page
    const alternates: { languages: Record<string, string> } = { languages: {} };
    
    i18n.locales.forEach((locale) => {
      alternates.languages[locale] = `${baseUrl}/${locale}${route.path}`;
    });
    
    // x-default for unmatched locales
    alternates.languages['x-default'] = `${baseUrl}${route.path}`;

    i18n.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      });
    });
  });

  return sitemapEntries;
}
