export const revalidate = 60;

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";

const staticNews: NewsRow[] = [
  { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: null, published: true, created_at: "" },
  { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: null, published: true, created_at: "" },
  { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다.", content: null, published: true, created_at: "" },
];

const categoryStyle: Record<string, { bg: string; color: string }> = {
  공지:  { bg: "rgba(45,158,79,0.12)",   color: "#1A5C30" },
  소식:  { bg: "rgba(134,200,58,0.12)",  color: "#4A6A10" },
  채용:  { bg: "rgba(26,140,110,0.12)",  color: "#1A6E5A" },
  이벤트:{ bg: "rgba(26,110,140,0.12)",  color: "#1A5A6E" },
};

async function getAllNews(): Promise<NewsRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticNews;
}

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#F2F9F4" }}>
        {/* 헤더 */}
        <div style={{ background: "#0A2010", padding: "72px 0 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <Link href="/#news" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, marginBottom: 20 }}>
              ← 홈으로
            </Link>
            <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: "#fff", marginBottom: 12 }}>공지사항</h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>신설의 최신 소식을 전달드립니다</p>
          </div>
        </div>

        {/* 목록 */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
          {news.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#6A9E72" }}>등록된 공지사항이 없습니다.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {news.map((item) => {
                const cat = categoryStyle[item.category] ?? { bg: "#E8F5EC", color: "#2F5C38" };
                return (
                  <Link key={item.id} href={`/news/${item.id}`}
                    style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E8F5EC", padding: "24px 28px", textDecoration: "none", transition: "all 0.2s" }}
                    className="news-list-item">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: cat.bg, color: cat.color }}>{item.category}</span>
                      <span style={{ fontSize: 12, color: "#6A9E72" }}>📅 {item.date}</span>
                    </div>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0A2010", lineHeight: 1.5, marginBottom: 8 }}>{item.title}</h2>
                    {item.excerpt && <p style={{ fontSize: 14, color: "#6A9E72", lineHeight: 1.6 }}>{item.excerpt}</p>}
                    <div style={{ marginTop: 14, fontSize: 13, color: "#2D9E4F", fontWeight: 500 }}>자세히 보기 →</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        .news-list-item:hover {
          border-color: rgba(45,158,79,0.4) !important;
          box-shadow: 0 8px 24px rgba(10,32,16,0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
