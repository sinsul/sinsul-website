import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";
import { categoryLabel } from "@/data/projects";
import { projects as staticProjects } from "@/data/projects";
import type { ProjectRow } from "@/lib/supabase";

const categoryColor: Record<string, string> = {
  network:    "bg-green-100 text-green-700",
  device:     "bg-lime-100 text-lime-700",
  security:   "bg-emerald-100 text-emerald-700",
  smart:      "bg-teal-100 text-teal-700",
  consulting: "bg-green-50 text-green-700",
  기타:       "bg-gray-100 text-gray-600",
};

async function getFeaturedProjects(): Promise<ProjectRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("year", { ascending: false })
        .limit(6);
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticProjects
    .filter((p) => p.featured)
    .slice(0, 6)
    .map((p, i) => ({ ...p, id: i + 1, created_at: "", featured: p.featured ?? false }));
}

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Projects</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">납품실적</h2>
              <p className="mt-2 text-gray-600">신뢰할 수 있는 실적으로 증명합니다</p>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-1.5 text-brand-accent text-sm font-medium hover:gap-2.5 transition-all">
              전체 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        {/* 카드 리스트 */}
        <div className="space-y-3">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.06}>
              <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-6 py-5 rounded-2xl border border-gray-200 bg-white hover:bg-brand-darker hover:border-brand-accent/30 transition-all">
                {/* 연도 */}
                <span className="text-brand-accent font-extrabold text-lg sm:text-xl w-16 shrink-0">
                  {p.year}
                </span>

                {/* 기관명 + 사업내용 */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">{p.client}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-0.5 truncate">{p.service}</p>
                </div>

                {/* 규모 + 분류 */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium whitespace-nowrap">
                    {p.count}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${categoryColor[p.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {categoryLabel[p.category as keyof typeof categoryLabel] ?? p.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium">
              전체 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
