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
export const metadata: Metadata = {
  title: "Signature checking",
  description:
    "This is a tool for checking the similarity of customer'signature",
};
// export const dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const messages = await getMessages();
  const themeName = "light";

  // const localeFromCookie = cookieStore.get('lang')?.value;
  const themeData = getTheme(themeName);
  // const themeData = await getTheme(themeName, true);
  // console.log('layout render....', themeData);

  return (
    <>
      <html lang={locale}>
        <head />
        <body
          className={`${inter.className} ${styles.myApp}`}
          style={{
            // background: `url('${themeData.token.topBackgroundImage}') no-repeat`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <StyledComponentsRegistry>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AntdRegistry>
                <AntdProvider
                  defaultTheme={themeName}
                  defaultThemeData={themeData}
                >
                  <ReactQueryProviders>
                    <MswProvider>{children}</MswProvider>
                  </ReactQueryProviders>
                </AntdProvider>
              </AntdRegistry>
            </NextIntlClientProvider>
          </StyledComponentsRegistry>
        </body>
      </html>
    </>
  );
}
