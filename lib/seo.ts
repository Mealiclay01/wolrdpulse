import type { Metadata } from "next";
import { i18n } from "@/middleware";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function routeMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
  englishOnly = false,
): Metadata {
  const canonicalLocale = englishOnly ? "en" : locale;
  const url = `${SITE_URL}/${canonicalLocale}${path}`;
  const languages: Record<string, string> = { "x-default": `${SITE_URL}/en${path}` };
  if (englishOnly) {
    languages.en = `${SITE_URL}/en${path}`;
  } else {
    for (const code of i18n.locales) languages[code] = `${SITE_URL}/${code}${path}`;
  }
  return {
    title: { absolute: title },
    description,
    robots: englishOnly && locale !== "en" ? { index: false, follow: true } : undefined,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

/** Search terms for the head and schema. They stay out of the visible page copy. */
export const SEARCH_KEYWORDS = [
  "SEO",
  "GEO",
  "LLMEO",
  "AEO",
  "LMSEO",
  "pSEO",
  "generative engine optimization",
  "answer engine optimization",
  "programmatic SEO",
  "LLM engine optimization",
];

export function withSearchKeywords(keywords: string[] | undefined) {
  const base = Array.isArray(keywords) ? keywords : [];
  const seen = new Set(base.map((keyword) => keyword.toLowerCase()));
  return [...base, ...SEARCH_KEYWORDS.filter((keyword) => !seen.has(keyword.toLowerCase()))];
}
