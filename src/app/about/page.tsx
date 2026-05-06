import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { company, stats, history } from "@/data/company";
import { Network, Zap, Users, Award, MapPin, Phone, Mail, Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "회사소개",
  description: "주식회사 신설을 소개합니다.",
};

const coreValues = [
  {
    icon: Network,
    title: "통신 네트워크 전문성",
    desc: "정보통신 인프라 구축 기술을 기반으로 출범하여 네트워크 설계와 시스템 통합 전 과정을 수행합니다.",
  },
  {
    icon: Users,
    title: "고객 맞춤형 솔루션",
    desc: "급변하는 디지털 환경 속에서 고객의 니즈에 최적화된 기술을 제안하고 함께 문제를 해결합니다.",
  },
  {
    icon: Award,
    title: "신뢰 기반의 서비스",
    desc: "현장 중심의 기술력과 10년 이상의 실적으로 쌓아온 신뢰를 바탕으로 지속 가능한 관계를 이어갑니다.",
  },
];

const companyInfo = [
  { icon: Award,  label: "대표이사",   value: company.ceo },
  { icon: Zap,    label: "설립연도",   value: `${company.founded}년` },
  { icon: Phone,  label: "대표전화",   value: company.phone },
  { icon: Mail,   label: "이메일",     value: company.email },
  { icon: MapPin, label: "주소",       value: company.address },
  { icon: Hash,   label: "사업자번호", value: company.businessNumber },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">

      {/* ── 히어로 ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-[#1a4a20]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(63,174,54,0.15),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block text-brand-accent text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
              회사소개
            </h1>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              {company.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 회사 개요 ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* 좌: 소개 텍스트 */}
            <ScrollReveal direction="left">
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Company Overview</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-snug mb-6">
                정보통신 인프라 구축의<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-lime-400">
                  현장 중심 전문기업
                </span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  주식회사 신설은 정보통신 인프라 구축 기술을 기반으로 출범하여,
                  초기 네트워크 설계와 시스템 통합 사업을 시작으로 꾸준히 성장해 온 기업입니다.
                </p>
                <p>
                  급변하는 디지털 환경 속에서 고객의 니즈에 최적화된 기술을 제안하고,
                  지속 가능한 통신 네트워크 인프라 구축 및 IT 생태계 조성을 목표로
                  현장 중심의 기술력과 신뢰 기반의 서비스를 제공합니다.
                </p>
                <p>
                  통신공사업·소프트웨어사업·전기공사업·진단 및 유지보수의 4개 핵심 사업을 통해
                  제주도 내 학교와 공공기관의 디지털 전환을 책임지고 있습니다.
                </p>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {stats.map((s) => (
                  <div key={s.label} className="p-5 rounded-2xl border border-brand-accent/20 bg-brand-accent/5">
                    <p className="text-brand-accent text-3xl font-extrabold">{s.value}{s.suffix}</p>
                    <p className="text-white/45 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* 우: 회사 정보 카드 */}
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="px-6 py-5 border-b border-white/10 bg-white/[0.03]">
                  <p className="text-white font-semibold">{company.name}</p>
                  <p className="text-white/40 text-sm mt-0.5">{company.nameEn}</p>
                </div>
                <div className="divide-y divide-white/[0.07]">
                  {companyInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4 px-6 py-4">
                      <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent shrink-0 mt-0.5">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 핵심 역량 ── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Core Values</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">핵심 역량</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.12}>
                <div className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-all duration-300">
                  <div className="inline-flex p-3 rounded-xl bg-brand-accent/15 text-brand-accent mb-5 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    <v.icon size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 회사 연혁 ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">History</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">회사 연혁</h2>
              <p className="mt-3 text-white/40">2015년 설립부터 현재까지의 발자취</p>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {history.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.07}>
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-brand-accent bg-brand-dark flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                    </div>
                    <div className="flex-1 p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-brand-accent/30 hover:bg-white/[0.06] transition-all">
                      <span className="text-brand-accent font-bold text-sm">{item.year}</span>
                      <p className="text-white/80 mt-1 text-sm leading-relaxed">{item.event}</p>
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
