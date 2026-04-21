import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";

const staticNews: NewsRow[] = [
  { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: null, published: true, created_at: "" },
  { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: null, published: true, created_at: "" },
  { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다.", content: null, published: true, created_at: "" },
];

async function getLatestNews(): Promise<NewsRow[]> {
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

const categoryColor: Record<string, string> = {
  공지: "bg-blue-500/20 text-blue-300",
  소식: "bg-green-500/20 text-green-300",
  채용: "bg-purple-500/20 text-purple-300",
  이벤트: "bg-orange-500/20 text-orange-300",
};

export default async function NewsSection() {
  const news = await getLatestNews();

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">News</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">공지사항</h2>
              <p className="mt-2 text-white/50">최신 소식을 전달드립니다</p>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-1.5 text-brand-accent text-sm font-medium hover:gap-3 transition-all">
              전체 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.12}>
              <Link
                href="/news"
                className="group relative flex flex-col h-full p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-brand-accent/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* 상단 라인 강조 */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent/0 via-brand-accent/60 to-brand-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* 메타 */}
                <div className="flex items-center gap-2 mb-5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColor[item.category] ?? "bg-brand-accent/20 text-brand-accent"}`}>
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/25 text-xs">
                    <Calendar size={11} />
                    {item.date}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-brand-accent transition-colors duration-200 line-clamp-2 flex-1">
                  {item.title}
                </h3>

                {/* 요약 */}
                {item.excerpt && (
                  <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-5">{item.excerpt}</p>
                )}

                <div className="flex items-center gap-1 text-brand-accent/50 text-xs group-hover:text-brand-accent transition-colors mt-auto">
                  자세히 보기
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium">
            전체 보기 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
