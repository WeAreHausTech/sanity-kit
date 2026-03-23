import { loadSettings } from "@webicient/sanity-kit/query";
import { KitVisualEditing } from "@webicient/sanity-kit/visual-editing";
import { KitProvider } from "@webicient/sanity-kit/provider";
import type { Metadata } from "next";

interface RouteParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { locale } = await params;
  const { data: seoSettings } = await loadSettings({
    name: "seoSettings",
    language: locale,
  });

  const siteTitle =
    typeof seoSettings?.title === "string" ? seoSettings.title : undefined;
  return {
    title: siteTitle
      ? { absolute: siteTitle, template: `%s | ${siteTitle}` }
      : undefined,
    description:
      typeof seoSettings?.description === "string"
        ? seoSettings.description
        : undefined,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> &
  RouteParams): Promise<React.ReactElement> {
  const { locale } = await params;
  const { data: settings } = await loadSettings({ language: locale });

  return (
    <KitProvider settings={settings}>
      {children}
      <KitVisualEditing />
    </KitProvider>
  );
}
