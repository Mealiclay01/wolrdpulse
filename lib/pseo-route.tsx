import { notFound } from "next/navigation";
import PseoArticle from "@/components/PseoArticle";
import { getDictionary } from "@/lib/i18n";
import { findPage, pagesFor, type SectionKey } from "@/lib/pseo";
import { routeMetadata } from "@/lib/seo";
import { i18n } from "@/middleware";

export function pseoStaticParams(section: SectionKey) {
  return i18n.locales.flatMap((locale) =>
    pagesFor(section).map((page) => ({ locale, slug: page.slug })),
  );
}

export function pseoMetadata(section: SectionKey, locale: string, slug: string) {
  const page = findPage(section, slug);
  if (!page) return {};
  return routeMetadata(locale, `/${section}/${slug}`, page.title, page.description, true);
}

export async function PseoSlugPage({
  section,
  locale,
  slug,
}: {
  section: SectionKey;
  locale: string;
  slug: string;
}) {
  const page = findPage(section, slug);
  if (!page) notFound();
  const t = await getDictionary(locale);
  return <PseoArticle page={page} locale={locale} nav={t.nav} />;
}
