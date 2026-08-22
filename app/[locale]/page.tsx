import HomeClient from "./HomeClient";
import { getDictionary } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <HomeClient t={t} locale={locale} />;
}
