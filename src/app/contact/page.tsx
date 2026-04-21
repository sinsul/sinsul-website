import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { company } from "@/data/company";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "문의하기",
  description: "주식회사 신설에 문의하세요.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <section className="py-20 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
              Contact
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">문의하기</h1>
            <p className="mt-4 text-white/50 text-lg">언제든지 연락주세요</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 연락처 정보 */}
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">연락처 정보</h2>
                {[
                  { icon: Phone, label: "대표전화", value: company.phone },
                  { icon: Mail, label: "이메일", value: company.email },
                  { icon: MapPin, label: "주소", value: company.address },
                  { icon: Clock, label: "운영시간", value: "월~금 09:00 ~ 18:00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm">{item.label}</p>
                      <p className="text-white font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* 문의 폼 */}
            <ScrollReveal direction="right">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">이름</label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">기관명</label>
                    <input
                      type="text"
                      placeholder="○○학교"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">연락처</label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">문의 내용</label>
                  <textarea
                    rows={5}
                    placeholder="문의하실 내용을 입력해 주세요."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors"
                >
                  문의 보내기
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
