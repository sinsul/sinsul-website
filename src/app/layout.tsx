import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import ScrollObserver from "@/components/ui/ScrollObserver";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "주식회사 신설 | 첨단 ICT 인프라 전문기업",
  description:
    "정보통신·소프트웨어·전기공사 및 ICT 인프라 구축·유지보수 전문기업 주식회사 신설",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${dmSans.variable} ${notoSans.variable} ${notoSerif.variable}`}>
      <body style={{ fontFamily: "var(--font-dm), var(--font-noto), sans-serif" }}>
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
