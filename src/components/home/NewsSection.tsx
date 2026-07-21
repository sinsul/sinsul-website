import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";

const staticNews: NewsRow[] = [
  { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: null, published: true, created_at: "" },
  { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: null, published: true, created_at: "" },
  { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다.", content: null, published: true, created_at: "" },
];

const categoryStyle: Record<string, string> = {
  공지: "background: rgba(45,158,79,0.12); color: #1A5C30",
  소식: "background: rgba(134,200,58,0.12); color: #4A6A10",
  채용: "background: rgba(26,140,110,0.12); color: #1A6E5A",
  이벤트: "background: rgba(26,110,140,0.12); color: #1A5A6E",
};

async function getNews(): Promise<NewsRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false })
        .limit(3);
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticNews;
}

export default async function NewsSection() {
  const news = await getNews();

  return (
    <section id="news" style={{ background: "#F2F9F4", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
              <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
              News
            </div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>공지사항</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38" }}>최신 소식을 전달드립니다</p>
          </div>
          <a href="/#news" style={{ display: "flex", alignItems: "center", gap: 6, color: "#2D9E4F", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            전체 보기 →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="news-grid">
          {news.map((item) => {
            const catStyle = categoryStyle[item.category] ?? "background: #E8F5EC; color: #2F5C38";
            const styleObj = Object.fromEntries(catStyle.split("; ").map(s => s.split(": ")));
            return (
              <a key={item.id} href="/#news" className="news-card" style={{ display: "flex", flexDirection: "column", padding: 28, borderRadius: 20, background: "#fff", border: "1px solid #E8F5EC", textDecoration: "none", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, ...styleObj }}>{item.category}</span>
                  <span style={{ fontSize: 12, color: "#6A9E72" }}>📅 {item.date}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A2010", lineHeight: 1.5, marginBottom: 10, flex: 1 }}>{item.title}</h3>
                {item.excerpt && <p style={{ fontSize: 13, color: "#6A9E72", lineHeight: 1.6, marginBottom: 16 }}>{item.excerpt}</p>}
                <span style={{ fontSize: 12, color: "#2D9E4F", fontWeight: 500 }}>자세히 보기 →</span>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .news-grid { grid-template-columns: 1fr !important; } }
        .news-card:hover { border-color: rgba(45,158,79,0.4) !important; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(10,32,16,0.10); }
      `}</style>
    </section>
  );
}
