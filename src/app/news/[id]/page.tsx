import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 60;

const staticNews: NewsRow[] = [
  { id: 1, date: "2024-11-15", category: "공지", title: "2024년 하반기 학교 네트워크 구축 사업 완료", excerpt: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.", content: "제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.\n\n이번 사업은 노후화된 유·무선 네트워크를 최신 장비로 전면 교체하고, 안정적인 교육 환경을 제공하기 위해 진행되었습니다.\n\n주요 내용:\n- 유·무선 AP 교체 및 신규 설치\n- 코어 스위치 및 보안 장비 업그레이드\n- 네트워크 모니터링 시스템 구축\n- 교직원 대상 네트워크 사용 교육 실시", published: true, created_at: "" },
  { id: 2, date: "2024-10-01", category: "소식", title: "스마트 교실 솔루션 신규 서비스 출시", excerpt: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.", content: "최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.\n\n스마트 교실 패키지는 교육 현장의 디지털 전환을 지원하기 위해 개발된 종합 솔루션입니다.\n\n포함 서비스:\n- 75인치 전자칠판 설치 및 셋업\n- 화상수업 전용 카메라·마이크 시스템\n- 교실 IoT 환경 조성 (온·습도, 공기질 센서)\n- 원격 제어 및 관리 시스템", published: true, created_at: "" },
  { id: 3, date: "2024-08-20", category: "공지", title: "2024 제주 교육 IT 박람회 참가 안내", excerpt: "오는 9월 제주 교육 IT 박람회에 참가합니다. 현장에서 만나보세요.", content: "주식회사 신설이 2024 제주 교육 IT 박람회에 참가합니다.\n\n일시: 2024년 9월 중\n장소: 제주국제컨벤션센터\n\n이번 박람회에서는 당사의 학교 네트워크 구축 솔루션과 스마트 교실 제품을 직접 체험하실 수 있습니다.\n\n방문하셔서 전문 상담을 받아보세요.", published: true, created_at: "" },
];

async function getNewsItem(id: string): Promise<NewsRow | null> {
  const numId = Number(id);
  if (isNaN(numId)) return null;

  if (supabase) {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", numId)
        .eq("published", true)
        .single();
      if (data) return data;
    } catch {}
  }
  return staticNews.find((n) => n.id === numId) ?? null;
}

async function getAdjacentNews(id: number): Promise<{ prev: NewsRow | null; next: NewsRow | null }> {
  if (supabase) {
    try {
      const { data: all } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (all) {
        const idx = all.findIndex((n) => n.id === id);
        return {
          prev: idx < all.length - 1 ? all[idx + 1] : null,
          next: idx > 0 ? all[idx - 1] : null,
        };
      }
    } catch {}
  }
  const idx = staticNews.findIndex((n) => n.id === id);
  return {
    prev: idx < staticNews.length - 1 ? staticNews[idx + 1] : null,
    next: idx > 0 ? staticNews[idx - 1] : null,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsItem(id);
  if (!item) return { title: "공지사항" };
  return { title: item.title, description: item.excerpt ?? undefined };
}

const categoryColor: Record<string, string> = {
  공지: "bg-green-500/20 text-green-300 border-green-500/30",
  소식: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  채용: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  이벤트: "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsItem(id);
  if (!item) notFound();

  const { prev, next } = await getAdjacentNews(item.id);

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* 헤더 배경 */}
      <section className="py-16 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* 뒤로 가기 */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              공지사항 목록
            </Link>

            {/* 메타 */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor[item.category] ?? "bg-brand-accent/20 text-brand-accent border-brand-accent/30"}`}>
                {item.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/40 text-sm">
                <Calendar size={13} />
                {item.date}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              {item.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* 본문 */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
              {item.content ? (
                <div className="text-white/75 leading-relaxed text-base whitespace-pre-line">
                  {item.content}
                </div>
              ) : item.excerpt ? (
                <p className="text-white/75 leading-relaxed text-base">{item.excerpt}</p>
              ) : (
                <p className="text-white/30 text-sm">내용이 없습니다.</p>
              )}
            </div>
          </ScrollReveal>

          {/* 이전 / 다음 */}
          <ScrollReveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/news/${prev.id}`}
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-white/10 hover:border-brand-accent/40 hover:bg-white/5 transition-all"
                >
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <ArrowLeft size={12} /> 이전 글
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors line-clamp-1">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  href={`/news/${next.id}`}
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-white/10 hover:border-brand-accent/40 hover:bg-white/5 transition-all text-right"
                >
                  <span className="text-white/30 text-xs flex items-center justify-end gap-1">
                    다음 글 <ArrowLeft size={12} className="rotate-180" />
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors line-clamp-1">
                    {next.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </ScrollReveal>

          {/* 목록으로 */}
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/60 rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all text-sm"
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
