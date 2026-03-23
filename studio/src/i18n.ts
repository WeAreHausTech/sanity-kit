import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale =
    locale && locales.includes(locale as (typeof locales)[number])
      ? locale
      : defaultLocale;

  if (resolvedLocale !== locale) {
    notFound();
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
