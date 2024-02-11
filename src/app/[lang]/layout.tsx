import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Provider } from 'jotai'
import { Locale, i18n } from "@/i18n.config";

import { Inter } from "next/font/google";
import LocaleRedirect from "@/components/LocaleRedirect";
const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "Favo design",
  description: "Here you can create your own art within our products",
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <div className="bg-slate-500 text-white text-sm text-center z-[300] fixed bottom-0 right-0 left-0">Web-site test jarayonida. Xatoliklar yuz berishi mumkin!</div>
        <NextTopLoader showSpinner={false} color="#FF00CC" />
        <LocaleRedirect />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
