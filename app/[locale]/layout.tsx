import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import ChangeLang from "@/components/navbar/component/changeLang";
import Link from "next/link";
import TranslateText from "@/components/utils/translator";


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
        <header className="w-full flex items-center justify-between py-4 px-12 border-b">
            <div className="flex">
              <Link className="font-bold mr-6" href={'/'}><TranslateText comp="Header" text="home"/></Link>
                <ChangeLang locale={locale}/>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </header>
        {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
