import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/provider/QureyProvider";
import Script from "next/script";
import Head from "next/head";

interface RootLayoutProps {}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "어땠어?",
  description: "마음을 전할 수 있는 롤링페이퍼 사이트",
};
declare global {
  interface Window {
    Kakao: any;
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
      </head>

      <body className={inter.className}>
        <QueryProvider>
          <div className="container max-w-custom bg-customYellow h-dvh mx-auto">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
