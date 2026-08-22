import FeaturesClient from "./FeaturesClient";
import { getDictionary } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <FeaturesClient t={t} locale={locale} />;
}
