// =====================================================
// 납품실적 데이터
// =====================================================
// 새 실적 추가 방법:
//   아래 배열 맨 위(또는 원하는 위치)에 항목을 추가하세요.
//   저장하면 사이트에 자동 반영됩니다.
//
// 각 항목 설명:
//   year     : 연도 (예: "2024")
//   client   : 기관명 (예: "제주○○초등학교")
//   service  : 사업 내용 (예: "무선 네트워크 구축")
//   count    : 규모/수량 (예: "AP 40대")
//   category : 분류 — "network" | "device" | "security" | "smart" | "consulting" | "기타"
//   featured : true 이면 홈 화면 실적 요약에도 표시
// =====================================================

export type ProjectCategory =
  | "network"
  | "device"
  | "security"
  | "smart"
  | "consulting"
  | "기타";

export interface Project {
  year: string;
  client: string;
  service: string;
  count: string;
  category: ProjectCategory;
  featured?: boolean;
}

export const categoryLabel: Record<ProjectCategory, string> = {
  network:    "네트워크",
  device:     "디바이스",
  security:   "보안",
  smart:      "스마트교실",
  consulting: "컨설팅",
  기타:       "기타",
};

// ↓↓↓ 실적을 여기에 추가하세요 (최신순 권장) ↓↓↓
export const projects: Project[] = [
  {
    year: "2024",
    client: "제주○○초등학교",
    service: "학교 네트워크 구축 + 디바이스 공급",
    count: "태블릿 200대",
    category: "device",
    featured: true,
  },
  {
    year: "2024",
    client: "제주○○중학교",
    service: "무선 네트워크 전면 교체",
    count: "AP 40대",
    category: "network",
    featured: true,
  },
  {
    year: "2023",
    client: "제주○○고등학교",
    service: "스마트 교실 구축",
    count: "15개 교실",
    category: "smart",
    featured: true,
  },
  {
    year: "2023",
    client: "제주○○초등학교",
    service: "크롬북 공급 및 MDM 구축",
    count: "크롬북 300대",
    category: "device",
  },
  {
    year: "2022",
    client: "제주특별자치도교육청",
    service: "관내 학교 네트워크 점검",
    count: "30개교",
    category: "consulting",
  },
  {
    year: "2022",
    client: "제주○○중학교",
    service: "보안 솔루션 구축",
    count: "방화벽 2식",
    category: "security",
  },
];
// ↑↑↑ 여기까지 ↑↑↑
