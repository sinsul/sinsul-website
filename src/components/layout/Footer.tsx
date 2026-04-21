import Link from "next/link";
import { Mail, Phone, MapPin, Lock } from "lucide-react";
import { company } from "@/data/company";
import SinsulLogo from "@/components/ui/SinsulLogo";

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 회사 정보 */}
          <div>
            <div className="mb-4">
              <SinsulLogo size="sm" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "회사소개" },
                { href: "/services", label: "사업분야" },
                { href: "/projects", label: "납품실적" },
                { href: "/news", label: "공지사항" },
                { href: "/contact", label: "문의하기" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-brand-accent text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={16} className="text-brand-accent shrink-0" />
                {company.phone}
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={16} className="text-brand-accent shrink-0" />
                {company.email}
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" />
                {company.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              이용약관
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-white/20 hover:text-white/50 text-xs transition-colors"
            >
              <Lock size={11} />
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
