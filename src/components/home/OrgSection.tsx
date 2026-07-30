import { orgChart } from "@/data/projects";


export default function OrgSection() {
  return (
    <section id="org" style={{ background: "#fff", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        {/* 헤더 */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          조직구성
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>
          조직도 현황
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", marginBottom: 56 }}>
          전문성을 갖춘 각 본부와 팀이 유기적으로 협력하여 최고의 ICT 서비스를 제공합니다.
        </p>

        {/* 조직도 — 가로 스크롤로 모바일 대응 */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ minWidth: 680, display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* CEO */}
            <div style={{
              background: "#2D9E4F", color: "white", borderRadius: 12,
              padding: "12px 44px", fontSize: 15, fontWeight: 700, letterSpacing: 1,
              boxShadow: "0 4px 20px rgba(45,158,79,0.3)",
            }}>
              CEO
            </div>

            {/* CEO → 본부 수직선 */}
            <div style={{ width: 2, height: 36, background: "#C5DFC9" }} />

            {/* 3본부 가로선 */}
            <div style={{ width: "100%", position: "relative", display: "flex" }}>
              {/* 본부 간 수평 연결선 — 첫 번째 본부 중앙 ~ 마지막 본부 중앙 */}
              <div style={{
                position: "absolute", top: 0,
                left: `${100 / (2 * orgChart.depts.length)}%`,
                right: `${100 / (2 * orgChart.depts.length)}%`,
                height: 2, background: "#C5DFC9",
              }} />

              {orgChart.depts.map((dept) => (
                  <div key={dept.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* 본부 수직선 */}
                    <div style={{ width: 2, height: 36, background: "#C5DFC9" }} />

                    {/* 본부 박스 */}
                    <div style={{
                      background: dept.color, color: "white", borderRadius: 10,
                      padding: "9px 14px", fontSize: 12, fontWeight: 700,
                      textAlign: "center", whiteSpace: "nowrap",
                    }}>
                      {dept.name}
                    </div>

                    {/* 본부 → 팀 수직선 */}
                    <div style={{ width: 2, height: 28, background: "#C5DFC9" }} />

                    {/* 팀 목록 — 각 아이템이 직접 좌/우 절반씩 수평선을 그림 */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 0, flexWrap: "nowrap" }}>
                      {dept.teams.map((team, idx, arr) => {
                        const isFirst = idx === 0;
                        const isLast = idx === arr.length - 1;
                        const isResearch = team.includes("연구");
                        return (
                          <div key={team} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 4px" }}>
                            {/* 수평선: 첫 아이템은 오른쪽 절반만, 마지막은 왼쪽 절반만, 중간은 양쪽 모두 */}
                            {!isFirst && (
                              <div style={{ position: "absolute", top: 0, left: 0, right: "50%", height: 2, background: "#C5DFC9" }} />
                            )}
                            {!isLast && (
                              <div style={{ position: "absolute", top: 0, left: "50%", right: 0, height: 2, background: "#C5DFC9" }} />
                            )}
                            {/* 수직선 */}
                            <div style={{ width: 2, height: 22, background: "#C5DFC9" }} />
                            {/* 팀 박스 */}
                            <div style={{
                              background: isResearch ? "rgba(134,200,58,0.12)" : "#F2F9F4",
                              color: isResearch ? "#2A4A10" : "#0A2010",
                              borderRadius: 8, padding: "7px 10px",
                              fontSize: 11, fontWeight: 600,
                              border: isResearch ? "1px solid rgba(134,200,58,0.4)" : "1px solid #C5DFC9",
                              textAlign: "center", whiteSpace: "nowrap",
                            }}>
                              {team}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
            ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
