# 주식회사 신설 홈페이지 - CLAUDE.md

## 프로젝트 개요
제주도 교육 IT 전문기업 **주식회사 신설**의 공식 홈페이지.
Next.js 14 + Tailwind CSS + Framer Motion 기반.

## 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일**: Tailwind CSS
- **애니메이션**: Framer Motion
- **다국어**: next-intl (현재 한국어만, 추후 확장)

## 디렉토리 구조
```
src/
├── app/                    # 페이지 (Next.js App Router)
│   ├── page.tsx            # 홈
│   ├── about/page.tsx      # 회사소개
│   ├── services/page.tsx   # 사업분야
│   ├── projects/page.tsx   # 납품실적
│   ├── news/page.tsx       # 공지사항
│   └── contact/page.tsx    # 문의하기
├── components/
│   ├── layout/             # Header, Footer
│   ├── home/               # 홈 전용 섹션
│   └── ui/                 # 공통 UI (ScrollReveal, CounterNumber 등)
├── data/                   # 데이터 파일 (수정 가능)
│   ├── services.ts         # 사업분야 목록
│   └── company.ts          # 회사 정보, 통계, 연혁
└── messages/
    └── ko.json             # 한국어 텍스트
```

## 색상 시스템 (tailwind.config.ts)
- `brand-primary`: #003F7F (딥 블루)
- `brand-accent`: #0096FF (밝은 블루, 강조)
- `brand-dark`: #0A0E1A (메인 배경)
- `brand-darker`: #060912 (더 어두운 배경)

## 자주 하는 작업

### 사업분야 추가
`src/data/services.ts`의 `services` 배열에 항목 추가.
`featured: true`로 설정하면 홈 화면에도 노출됨.

### 회사 정보 수정
`src/data/company.ts`에서 `company`, `stats`, `history` 수정.

### 텍스트 수정
`src/messages/ko.json`에서 UI 텍스트 수정.

### 다국어 추가 (추후)
1. `src/messages/en.json` 파일 생성
2. `src/i18n/request.ts`에서 locale 로직 추가

## 애니메이션 컴포넌트
- `<ScrollReveal>`: 스크롤 시 나타나는 효과 (direction, delay 옵션)
- `<CounterNumber>`: 숫자 카운팅 애니메이션 (value, suffix 옵션)

## 코딩 규칙
- 모든 페이지 컴포넌트는 서버 컴포넌트로 작성 (기본값)
- 클라이언트 상태/이벤트가 필요한 경우만 `"use client"` 추가
- 스타일은 Tailwind 클래스만 사용 (인라인 style 최소화)
- 새 아이콘은 `lucide-react`에서 import
