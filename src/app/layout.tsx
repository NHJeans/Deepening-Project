import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/provider/QureyProvider";

import "./globals.css";

interface RootLayoutProps {}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "어땠어?",
  description: "마음을 전할 수 있는 롤링페이퍼 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="container mx-auto h-dvh max-w-custom bg-customYellow">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
