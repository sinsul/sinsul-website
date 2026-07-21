export const revalidate = 60;

import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";

const staticNews: NewsRow[] = [
  { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다. 본 사업은 노후화된 유선 네트워크를 최신 Wi-Fi 6 무선 인프라로 교체하는 프로젝트로, 학생들의 디지털 학습 환경 개선에 크게 기여하였습니다.", published: true, created_at: "" },
  { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다. 신설의 스마트 교실 솔루션은 교사와 학생 모두에게 최적화된 IT 환경을 제공합니다.", published: true, created_at: "" },
  { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다.", content: "오는 9월 제주 교육 IT 박람회에 참가합니다. 신설의 다양한 교육 IT 솔루션을 직접 체험해보실 수 있는 기회이니 많은 관심 부탁드립니다.", published: true, created_at: "" },
];

async function getNewsItem(id: number): Promise<NewsRow | null> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();
      if (data) return data;
    } catch {}
  }
  return staticNews.find((n) => n.id === id) ?? null;
}

const categoryStyle: Record<string, { bg: string; color: string }> = {
  공지:   { bg: "rgba(45,158,79,0.12)",  color: "#1A5C30" },
  소식:   { bg: "rgba(134,200,58,0.12)", color: "#4A6A10" },
  채용:   { bg: "rgba(26,140,110,0.12)", color: "#1A6E5A" },
  이벤트: { bg: "rgba(26,110,140,0.12)", color: "#1A5A6E" },
};

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsItem(Number(id));
  if (!item) notFound();

  const cat = categoryStyle[item.category] ?? { bg: "#E8F5EC", color: "#2F5C38" };

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#F2F9F4" }}>
        {/* 헤더 */}
        <div style={{ background: "#0A2010", padding: "72px 0 48px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
            <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, marginBottom: 20 }}>
              ← 공지사항 목록
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: cat.bg, color: cat.color }}>{item.category}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>📅 {item.date}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 600, color: "#fff", lineHeight: 1.4 }}>
              {item.title}
            </h1>
          </div>
        </div>

        {/* 본문 */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E8F5EC", padding: "40px 44px", boxShadow: "0 2px 12px rgba(10,32,16,0.06)" }}>
            {item.content ? (
              <div style={{ fontSize: 16, lineHeight: 1.9, color: "#1A3A22", whiteSpace: "pre-wrap" }}>
                {item.content}
              </div>
            ) : item.excerpt ? (
              <div style={{ fontSize: 16, lineHeight: 1.9, color: "#1A3A22" }}>
                {item.excerpt}
              </div>
            ) : (
              <div style={{ color: "#6A9E72", fontSize: 14 }}>내용이 없습니다.</div>
            )}
          </div>

          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <Link href="/news"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#0A2010", color: "#fff", borderRadius: 50, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              ← 목록으로
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
