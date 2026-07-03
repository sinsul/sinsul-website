export const categoryLabel: Record<string, string> = {
  network: "네트워크", device: "디바이스", security: "보안",
  smart: "스마트교실", consulting: "컨설팅", 기타: "기타",
};

export const projects = [
  {
    id: 1,
    icon: "🏫",
    client: "제주특별자치도교육청",
    name: "테크원터 이용 용역사업",
    detail: "2024년 제주교육청 테크원터 이용 용역, 디바이스임대 설치 및 네트워크 A/S 관리",
    amount: "324,940,000원",
    year: "2024",
    gradient: "linear-gradient(135deg, #0A2010, #1A5228)",
  },
  {
    id: 2,
    icon: "📡",
    client: "주식회사 엠지씨 플러스",
    name: "LG U+ 개통공사",
    detail: "2024년 LG U+ 개통공사. 유·무선 통신망 구축 및 디바이스 설치·유지보수",
    amount: "1,361,209,000원",
    year: "2024",
    gradient: "linear-gradient(135deg, #133A1C, #0A2010)",
  },
  {
    id: 3,
    icon: "🏫",
    client: "인천광역시교육청",
    name: "테크원터 이용 용역",
    detail: "인천광역시교육청 테크원터 이용 용역. 네트워크 장비 관리 및 기술 지원",
    amount: "24,200,000원",
    year: "2024",
    gradient: "linear-gradient(135deg, #0F3D18, #1A6B30)",
  },
  {
    id: 4,
    icon: "📡",
    client: "주식회사 엠지씨 플러스",
    name: "LG U+ 개통공사",
    detail: "2023년 LG U+ 개통공사. 유·무선 통신망 구축 및 인근 커버리지 설치",
    amount: "1,240,268,000원",
    year: "2023",
    gradient: "linear-gradient(135deg, #1A5228, #2D9E4F)",
  },
  {
    id: 5,
    icon: "🔧",
    client: "주식회사 엠지씨 플러스",
    name: "유지보수 공사",
    detail: "2021년 LG U+ 통신 인프라 유지보수 공사. 네트워크 장비 점검 및 장애 대응",
    amount: "997,359,000원",
    year: "2021",
    gradient: "linear-gradient(135deg, #0A2010, #133A1C)",
  },
  {
    id: 6,
    icon: "🌐",
    client: "주식회사 엠지씨 플러스",
    name: "지역 구내 관로공사",
    detail: "2021년 지역 구내 관로(관심점) 공사. 이고 인터넷 인프라 구축",
    amount: "15,425,000원",
    year: "2021",
    gradient: "linear-gradient(135deg, #133A1C, #2D9E4F)",
  },
];

export const orgChart = {
  ceo: "CEO",
  depts: [
    {
      name: "경영지원본부",
      color: "#133A1C",
      teams: ["경영지원팀"],
    },
    {
      name: "네트워크 혁신 본부",
      color: "#1A8C6E",
      teams: ["사업관리팀", "네트워크팀", "디바이스팀", "연구개발전담"],
    },
    {
      name: "CS 사업부",
      color: "#1A8C6E",
      teams: ["CS영업팀", "CS기술팀"],
    },
  ],
  engineers: [
    { grade: "고급 기술자", hw: "-", sw: "-", telecom: "1", etc: "-" },
    { grade: "중급 기술자", hw: "-", sw: "-", telecom: "1", etc: "1" },
    { grade: "초급 기술자", hw: "-", sw: "16", telecom: "5", etc: "2" },
    { grade: "합계", hw: "0", sw: "16", telecom: "7", etc: "3" },
  ],
};
