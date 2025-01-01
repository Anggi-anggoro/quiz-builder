import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";


const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params:{locale:string}
}>) {
  const {locale} = await params
  const message = await getMessages()
  return (
    <html lang={locale} className={geistSans.className}>
      <body>
        <NextIntlClientProvider messages={message}>
        <Navbar locale={locale}/>
        {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
