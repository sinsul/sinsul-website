// 사업분야 데이터 - 여기에 항목을 추가하면 사이트에 자동 반영됩니다

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;       // lucide-react 아이콘 이름
  color: string;      // Tailwind 색상 클래스
  image?: string;     // /public/images/ 경로
  featured: boolean;  // 홈 화면 노출 여부
}

export const services: Service[] = [
  {
    id: "school-network",
    title: "학교 네트워크 구축",
    description: "제주도 내 학교의 안정적이고 빠른 네트워크 인프라를 구축합니다.",
    details: [
      "유·무선 네트워크 설계 및 시공",
      "망분리 및 보안 솔루션 적용",
      "네트워크 모니터링 시스템 구축",
      "유지보수 및 기술 지원",
    ],
    icon: "Network",
    color: "from-blue-500 to-blue-700",
    featured: true,
  },
  {
    id: "device-management",
    title: "교육용 디바이스 공급",
    description: "학생과 교사를 위한 최적의 디바이스를 공급하고 관리합니다.",
    details: [
      "태블릿·노트북·크롬북 공급",
      "MDM(기기관리시스템) 구축",
      "디바이스 일괄 설정 및 배포",
      "고장 수리 및 교체 서비스",
    ],
    icon: "Laptop",
    color: "from-cyan-500 to-cyan-700",
    featured: true,
  },
  {
    id: "it-consulting",
    title: "IT 컨설팅",
    description: "기관과 기업의 디지털 전환을 위한 전문 컨설팅을 제공합니다.",
    details: [
      "IT 인프라 현황 진단",
      "디지털 전환 로드맵 수립",
      "예산 최적화 방안 제시",
      "보안 취약점 분석",
    ],
    icon: "LineChart",
    color: "from-indigo-500 to-indigo-700",
    featured: true,
  },
  {
    id: "smart-classroom",
    title: "스마트 교실 구축",
    description: "미래형 교육 환경을 위한 스마트 교실 솔루션을 제공합니다.",
    details: [
      "전자칠판·프로젝터 설치",
      "화상수업 시스템 구축",
      "교실 IoT 환경 조성",
      "원격 제어 시스템 구성",
    ],
    icon: "Monitor",
    color: "from-purple-500 to-purple-700",
    featured: false,
  },
  {
    id: "security",
    title: "보안 솔루션",
    description: "학교 및 기업의 데이터와 네트워크를 안전하게 보호합니다.",
    details: [
      "방화벽 구축 및 운영",
      "CCTV 및 출입통제 시스템",
      "개인정보 보호 솔루션",
      "보안 교육 및 컨설팅",
    ],
    icon: "Shield",
    color: "from-green-500 to-green-700",
    featured: false,
  },
];

// 새 사업분야 추가 방법:
// 위 배열에 같은 형식으로 객체를 추가하세요.
// featured: true 로 설정하면 홈 화면에도 노출됩니다.
