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
    id: "telecom",
    title: "통신공사업",
    description: "학교·공공기관의 유무선 네트워크 인프라를 설계·시공하고 안정적인 통신 환경을 구축합니다.",
    details: [
      "유·무선 LAN 설계 및 시공",
      "망분리(교무망·학생망) 구축",
      "Wi-Fi 6 / 차세대 네트워크 구축",
      "보안 솔루션 적용 및 네트워크 모니터링",
    ],
    icon: "Network",
    color: "from-green-500 to-green-700",
    featured: true,
  },
  {
    id: "software",
    title: "소프트웨어사업",
    description: "교육 현장에 최적화된 소프트웨어 공급 및 시스템 구축으로 스마트 교실 환경을 실현합니다.",
    details: [
      "교육용 디바이스 MDM(기기관리시스템) 구축",
      "태블릿·노트북·크롬북 일괄 배포",
      "전자칠판·화상수업 시스템 설치",
      "소프트웨어 라이선스 공급 및 관리",
    ],
    icon: "Monitor",
    color: "from-lime-500 to-lime-700",
    featured: true,
  },
  {
    id: "electrical",
    title: "전기공사업",
    description: "IT 인프라 운영에 필요한 전기 설비를 안전하게 시공하고 전력 환경을 최적화합니다.",
    details: [
      "전기 배선 및 분전반 설치",
      "UPS·항온항습 설비 구축",
      "CCTV·출입통제 시스템 설치",
      "전기 안전점검 및 유지보수",
    ],
    icon: "Zap",
    color: "from-emerald-500 to-emerald-700",
    featured: true,
  },
  {
    id: "maintenance",
    title: "진단 및 유지보수",
    description: "구축 이후에도 지속적인 점검과 빠른 기술 지원으로 안정적인 IT 운영 환경을 보장합니다.",
    details: [
      "네트워크·시스템 정기 점검",
      "장애 발생 시 신속 출동 및 복구",
      "IT 인프라 현황 진단 및 개선 제안",
      "담당자 교육 및 운영 컨설팅",
    ],
    icon: "Settings",
    color: "from-teal-500 to-teal-700",
    featured: true,
  },
];

// 새 사업분야 추가 방법:
// 위 배열에 같은 형식으로 객체를 추가하세요.
// featured: true 로 설정하면 홈 화면에도 노출됩니다.
