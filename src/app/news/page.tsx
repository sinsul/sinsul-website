import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "공지사항",
  description: "주식회사 신설의 최신 소식과 공지사항입니다.",
};

export const revalidate = 60;

async function getNews(): Promise<NewsRow[]> {
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
  // Supabase 미설정 시 샘플 데이터
  return [
    { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: null, published: true, created_at: "" },
    { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: null, published: true, created_at: "" },
    { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다. 현장에서 만나보세요.", content: null, published: true, created_at: "" },
  ];
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <section className="py-20 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">News</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">공지사항</h1>
            <p className="mt-4 text-white/50 text-lg">최신 소식을 전달드립니다</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <p className="text-center text-white/30 py-20">등록된 공지사항이 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {news.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <Link href={`/news/${item.id}`}>
                  <article className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-accent/30 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent/20 text-brand-accent">
                            {item.category}
                          </span>
                          <span className="text-white/30 text-sm">{item.date}</span>
                        </div>
                        <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-brand-accent transition-colors">
                          {item.title}
                        </h2>
                        {item.excerpt && (
                          <p className="text-white/50 text-sm">{item.excerpt}</p>
                        )}
                      </div>
                    </div>
                  </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
