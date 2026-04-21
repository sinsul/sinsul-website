-- =====================================================
-- 주식회사 신설 홈페이지 - Supabase 테이블 생성 SQL
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요
-- =====================================================

-- 납품실적 테이블
CREATE TABLE IF NOT EXISTS projects (
  id        BIGSERIAL PRIMARY KEY,
  year      TEXT NOT NULL,
  client    TEXT NOT NULL,
  service   TEXT NOT NULL,
  count     TEXT NOT NULL,
  category  TEXT NOT NULL DEFAULT '기타',
  featured  BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS news (
  id         BIGSERIAL PRIMARY KEY,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  category   TEXT NOT NULL DEFAULT '공지',
  title      TEXT NOT NULL,
  excerpt    TEXT,
  content    TEXT,
  published  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공개 읽기 허용 (로그인 없이 사이트에서 조회 가능)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "공개 읽기" ON projects;
DROP POLICY IF EXISTS "공개 읽기" ON news;
CREATE POLICY "공개 읽기" ON projects FOR SELECT USING (true);
CREATE POLICY "공개 읽기" ON news FOR SELECT USING (published = true);

-- 샘플 데이터 (선택사항 - 삭제해도 됩니다)
INSERT INTO projects (year, client, service, count, category, featured) VALUES
  ('2024', '제주○○초등학교', '학교 네트워크 구축 + 디바이스 공급', '태블릿 200대', 'device', true),
  ('2024', '제주○○중학교', '무선 네트워크 전면 교체', 'AP 40대', 'network', true),
  ('2023', '제주○○고등학교', '스마트 교실 구축', '15개 교실', 'smart', true),
  ('2023', '제주○○초등학교', '크롬북 공급 및 MDM 구축', '크롬북 300대', 'device', false),
  ('2022', '제주특별자치도교육청', '관내 학교 네트워크 점검', '30개교', 'consulting', false),
  ('2022', '제주○○중학교', '보안 솔루션 구축', '방화벽 2식', 'security', false);

INSERT INTO news (date, category, title, excerpt, published) VALUES
  ('2024-11-15', '공지', '2024년 하반기 학교 네트워크 구축 사업 완료', '제주도 내 10개 학교의 네트워크 인프라 구축을 성공적으로 완료하였습니다.', true),
  ('2024-10-01', '소식', '스마트 교실 솔루션 신규 서비스 출시', '최신 전자칠판 및 화상수업 시스템을 포함한 스마트 교실 패키지를 출시합니다.', true),
  ('2024-08-20', '공지', '2024 제주 교육 IT 박람회 참가 안내', '오는 9월 제주 교육 IT 박람회에 참가합니다. 현장에서 만나보세요.', true);
