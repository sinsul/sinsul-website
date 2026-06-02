"use client";

import { Lock } from "lucide-react";
import SinsulLogo from "@/components/ui/SinsulLogo";
import { company } from "@/data/company";

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid rgba(45,158,79,0.15)", boxShadow: "0 -2px 16px rgba(10,32,16,0.06)", padding: "60px 0 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(45,158,79,0.12)", marginBottom: 32 }} className="footer-grid">

          {/* 브랜드 */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <SinsulLogo size="sm" />
            </div>
            <p style={{ fontSize: 13, color: "#6A9E72", lineHeight: 1.7, maxWidth: 240 }}>
              첨단 ICT 인프라 구축과 이관에 특화된 정보통신 전문기업. 신뢰와 기술로 지역과 함께 성장합니다.
            </p>
          </div>

          {/* 사업영역 */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 20 }}>사업영역</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/services/telecom", label: "통신공사업" },
                { href: "/services/software", label: "소프트웨어사업" },
                { href: "/services/electric", label: "전기공사업" },
                { href: "/services/network", label: "네트워크시스템" },
                { href: "/services/platform", label: "플랫폼 서비스" },
              ].map((t) => (
                <li key={t.href}><a href={t.href} style={{ fontSize: 13, color: "#2A4A30", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2D9E4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2A4A30")}
                >{t.label}</a></li>
              ))}
            </ul>
          </div>

          {/* 회사소개 */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 20 }}>회사소개</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/#about", label: "기업소개" },
                { href: "/#history", label: "회사 연혁" },
                { href: "/#org", label: "조직도" },
                { href: "/#projects", label: "주요 실적" },
                { href: "/#certs", label: "인증·자격" },
                { href: "/#news", label: "공지사항" },
              ].map(({ href, label }) => (
                <li key={label}><a href={href} style={{ fontSize: 13, color: "#2A4A30", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2D9E4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2A4A30")}
                >{label}</a></li>
              ))}
            </ul>
          </div>

          {/* 문의·기타 */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 20 }}>문의</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/contact", label: "프로젝트 문의" },
                { href: "/partnership", label: "파트너십" },
                { href: "/careers", label: "채용" },
                { href: "/directions", label: "오시는 길" },
              ].map(({ href, label }) => (
                <li key={label}><a href={href} style={{ fontSize: 13, color: "#2A4A30", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2D9E4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2A4A30")}
                >{label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#6A9E72", lineHeight: 1.6 }}>
            © 2025 {company.name}. All rights reserved. &nbsp;|&nbsp; {company.address} &nbsp;|&nbsp; {company.phone}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {["정보통신공사업 등록", "전기공사업 등록", "소프트웨어사업자 등록"].map((c) => (
              <span key={c} style={{ fontSize: 12, color: "#6A9E72" }}>{c}</span>
            ))}
            {/* 관리자 링크 */}
            <a href="/admin/login" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6A9E72", textDecoration: "none", borderLeft: "1px solid #C5DFC9", paddingLeft: 16 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2D9E4F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6A9E72")}
            >
              <Lock size={12} /> 관리자
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
