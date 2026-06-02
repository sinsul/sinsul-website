import PageLayout from "@/components/layout/PageLayout";
import { company } from "@/data/company";
import { Phone, Mail, Clock } from "lucide-react";

export const metadata = { title: "오시는 길 | 주식회사 신설" };

export default function DirectionsPage() {
  const kakaoMapUrl = "https://map.kakao.com/link/search/제주시 신설로7길 25";

  return (
    <PageLayout title="오시는 길" subtitle="주식회사 신설을 방문해 주세요" eyebrow="Directions">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="directions-grid">
        {/* 지도 영역 */}
        <div>
          <div style={{ background: "#F2F9F4", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, border: "1px solid #E8F5EC" }}>
            <div style={{ fontSize: 48 }}>🗺️</div>
            <p style={{ fontSize: 14, color: "#6A9E72", textAlign: "center", lineHeight: 1.6 }}>
              제주 제주시 신설로7길 25, 2층
            </p>
            <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: "#2D9E4F", color: "white", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              카카오맵으로 보기
            </a>
          </div>
        </div>

        {/* 정보 */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>연락처 및 위치</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { icon: "📍", label: "주소", value: "제주 제주시 신설로7길 25, 2층" },
              { icon: "📞", label: "대표전화", value: company.phone },
              { icon: "✉️", label: "이메일", value: company.email },
              { icon: "🕐", label: "운영시간", value: "월~금 09:00 ~ 18:00 (공휴일 휴무)" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, background: "rgba(45,158,79,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "#6A9E72", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#0A2010" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 교통 안내 */}
          <div style={{ marginTop: 40, background: "#F2F9F4", borderRadius: 16, padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2010", marginBottom: 16 }}>교통 안내</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "🚌", label: "버스", desc: "신설로 정류장 하차 후 도보 2분" },
                { icon: "🚗", label: "자가용", desc: "제주시청 방향, 신설로7길 진입" },
                { icon: "🅿️", label: "주차", desc: "건물 내 주차 가능" },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0A2010" }}>{t.label}</span>
                    <span style={{ fontSize: 13, color: "#6A9E72", marginLeft: 8 }}>{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .directions-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
