import { pseoMetadata, pseoStaticParams, PseoSlugPage } from "@/lib/pseo-route";

export function generateStaticParams() {
  return pseoStaticParams("guides");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return pseoMetadata("guides", locale, slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return PseoSlugPage({ section: "guides", locale, slug });
}
