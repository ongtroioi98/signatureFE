import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/styledComponentsRegistry";
//import AntdRegistry from '@/lib/AntdRegistry';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import i18nConfig from "i18nConfig";
import AntdProvider from "@/components/antdProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
const inter = Open_Sans({ subsets: ["latin"] });
import { getTheme, getThemeAsync, THEMES } from "@/theme";
import styles from "../app.module.css";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { MswProvider } from "@/mockAPI/MswProvider";
import ReactQueryProviders from "@/components/reactQueryProvider";
import { Flex } from "antd";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Signature checking",
  description:
    "This is a tool for checking the similarity of customer'signature",
};
// export const dynamic = 'force-dynamic';
// export function generateStaticParams() {
//   return i18nConfig.locales.map((locale: string) => ({ locale }));
// }
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const messages = await getMessages();
  const themeName = "dark";

  // const localeFromCookie = cookieStore.get('lang')?.value;
  const themeData = getTheme(themeName);
  // const themeData = await getTheme(themeName, true);
  // console.log('layout render....', themeData);

  return (
    <Flex vertical>
      <Header />
      <div style={{ padding: "24px" }}>{children}</div>
    </Flex>
  );
}
