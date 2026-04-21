import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { company, history } from "@/data/company";

export const metadata: Metadata = {
  title: "회사소개",
  description: "주식회사 신설을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* 페이지 헤더 */}
      <section className="py-20 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
              About Us
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
              회사소개
            </h1>
            <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto">
              {company.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 회사 비전 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-3xl font-bold text-white mb-6">
                제주 교육의 디지털 미래를
                <br />
                <span className="text-gradient">함께 만들어 갑니다</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                {company.description}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "설립연도", value: company.founded },
                  { label: "사업지역", value: company.location },
                  { label: "이메일", value: company.email },
                  { label: "대표번호", value: company.phone },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-brand-accent text-xs font-semibold uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="py-16 bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white text-center mb-12">회사 연혁</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {history.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className="flex items-center gap-6 pl-4">
                    <div className="relative z-10 w-8 h-8 rounded-full border-2 border-brand-accent bg-brand-dark flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl border border-white/10 bg-white/5">
                      <span className="text-brand-accent font-bold text-sm">{item.year}</span>
                      <p className="text-white mt-1">{item.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
