import type { Metadata } from "next";
import { Network, Laptop, LineChart, Monitor, Shield } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "사업분야",
  description: "주식회사 신설의 다양한 IT 전문 서비스를 확인하세요.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Network,
  Laptop,
  LineChart,
  Monitor,
  Shield,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* 페이지 헤더 */}
      <section className="py-20 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
              Services
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
              사업분야
            </h1>
            <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto">
              주식회사 신설이 제공하는 다양한 IT 전문 서비스를 소개합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 서비스 목록 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Network;
              return (
                <ScrollReveal key={service.id} delay={i * 0.05}>
                  <div
                    id={service.id}
                    className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-accent/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} shrink-0`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-3">
                          {service.title}
                        </h2>
                        <p className="text-white/60 mb-6">{service.description}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-center gap-2 text-white/70 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
