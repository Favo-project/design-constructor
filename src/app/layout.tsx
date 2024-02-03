import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });
import { Provider } from 'jotai'

export const metadata: Metadata = {
  title: "Favo design",
  description: "Here you can create your own art within our products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-slate-500 text-white text-xs text-center z-[300] fixed bottom-0 right-0 left-0">Web-site test jarayonida. Xatoliklar yuz berishi mumkin!</div>
        <NextTopLoader showSpinner={false} color="#FF00CC" />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
