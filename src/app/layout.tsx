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
        <NextTopLoader showSpinner={false} color="#7752FE" />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
