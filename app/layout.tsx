import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/providers/QueryProvider";

export const metadata: Metadata = {
  title: "PwC 관심기업 관리 서비스",
  description: "관심있는 기업을 등록하고 관리하는 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
