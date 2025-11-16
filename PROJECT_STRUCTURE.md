# 프로젝트 구조

## 📁 디렉토리 구조

```
pwc-company-management-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (QueryProvider 포함)
│   ├── page.tsx                 # 홈 페이지
│   └── globals.css              # 글로벌 스타일
│
├── components/
│   ├── layout/                  # 레이아웃 컴포넌트 (재사용)
│   │   ├── Header.tsx          # 헤더 (고정 높이 60px)
│   │   ├── Container.tsx       # 컨테이너 (maxWidth 설정 가능)
│   │   ├── Banner.tsx          # 배너 (제목 + 부제목)
│   │   ├── PageLayout.tsx      # 페이지 레이아웃
│   │   └── index.ts            # Export 모음
│   │
│   ├── ui/                      # 공통 UI 컴포넌트
│   │   └── (추후 추가 예정)
│   │
│   └── features/                # 기능별 컴포넌트
│       └── (추후 추가 예정)
│
├── lib/
│   ├── api/
│   │   └── client.ts            # Axios 클라이언트 설정
│   │
│   ├── providers/
│   │   └── QueryProvider.tsx    # TanStack Query 프로바이더
│   │
│   ├── store/                   # Zustand 스토어
│   │   └── (추후 추가 예정)
│   │
│   └── utils.ts                 # 유틸리티 함수 (cn 등)
│
├── hooks/                       # 커스텀 훅
│   └── (추후 추가 예정)
│
├── types/                       # TypeScript 타입 정의
│   └── company.ts               # 기업 관련 타입
│
└── tailwind.config.ts           # Tailwind 설정
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: black, white
- **Accent**: orange (#f66d00), orange-variant (#ff8700)
- **Text**: primary (#252525), secondary (#3e3e3e), muted (#7f7f82), disabled (#a8a8aa)
- **Background**: primary (#ffffff), secondary (#f9fafb), tertiary (#f3f4f6), light (#f1f1f1), yellow (#fff7e0)
- **Border**: primary (#c6c6c8), secondary (#c4c4c4), light (#c1c1c1)

### 레이아웃 크기

- **Max Width**
  - layout: 1920px
  - content: 1680px
  - container: 1000px
- **Header Height**: 60px

### 폰트

- **Primary**: Pretendard JP
- **Korean**: Noto Sans KR
- **Size**: xs(12px), sm(14px), base(16px), lg(17px), xl(24px), 2xl(28px), 3xl(32px)

## 🔧 설치된 패키지

### Core

- Next.js 16.0.3 (App Router)
- React 19.2.0
- TypeScript 5.x

### Styling

- Tailwind CSS 4.x
- clsx & tailwind-merge (유틸리티)

### State & Data

- @tanstack/react-query (서버 상태 관리)
- zustand (클라이언트 상태 관리)
- axios (API 클라이언트)

### Icons

- lucide-react (아이콘)

### Container maxWidth 옵션

- `layout`: 1920px (전체 너비)
- `content`: 1680px (기본 컨텐츠 너비)
- `container`: 1000px (좁은 컨텐츠)

## 📝 개발 가이드

### 재사용성 원칙

1. **컴포넌트 분리**: layout, ui, features로 명확히 구분
2. **Props 확장성**: 필수 props는 최소화, optional props로 유연성 확보
3. **스타일 커스터마이징**: className prop으로 추가 스타일 가능 (cn 함수 사용)

### 확장성 원칙

1. **타입 정의**: types/ 디렉토리에 명확한 타입 정의
2. **API 클라이언트**: 중앙 집중식 axios 인스턴스
3. **상태 관리**: TanStack Query (서버) + Zustand (클라이언트) 분리
