import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "주식회사 신설 | 제주 교육 IT 전문기업",
    template: "%s | 주식회사 신설",
  },
  description:
    "제주도 학교 네트워크 구축, 교육용 디바이스 공급, IT 컨설팅 전문 기업 주식회사 신설입니다.",
  keywords: ["제주 IT", "학교 네트워크", "교육용 디바이스", "신설", "제주 교육"],
  openGraph: {
    siteName: "주식회사 신설",
    locale: "ko_KR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="ko">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
