"use client";

import Link from "next/link";
import { ArrowRight, Network, Laptop, LineChart, Monitor, Shield } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { services } from "@/data/services";
import { useRef, MouseEvent } from "react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Network, Laptop, LineChart, Monitor, Shield,
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  const featured = services.filter((s) => s.featured);

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">사업분야</h2>
            <p className="mt-4 text-white/50 text-lg">다양한 IT 전문 서비스를 제공합니다</p>
          </div>
        </ScrollReveal>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] || Network;
            return (
              <ScrollReveal key={service.id} delay={i * 0.12}>
                <TiltCard>
                  <Link
                    href={`/services#${service.id}`}
                    className="group relative flex flex-col h-full p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-brand-accent/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* 호버 배경 글로우 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 아이콘 */}
                    <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-6 w-fit`}>
                      <Icon size={26} className="text-white" />
                    </div>

                    <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

                    <div className="flex items-center gap-2 text-brand-accent text-sm font-medium">
                      자세히 보기
                      <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 전체 보기 */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all"
            >
              전체 사업분야 보기
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
