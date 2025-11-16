# PwC Company Management App

## 프로젝트 소개

관심 기업을 관리할 수 있는 Next.js 기반의 SPA입니다. 기업 등록, 메모 관리, 삭제, 상세 조회 등 다양한 기능을 제공합니다.

---

## 프로젝트 구조

```
pwc-company-management-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (QueryProvider 포함)
│   ├── page.tsx                 # 홈 페이지
│   └── globals.css              # 글로벌 스타일
│
├── components/
│   ├── layout/                  # 레이아웃 컴포넌트
│   ├── ui/                      # 공통 UI 컴포넌트
│   └── features/                # 기능별 컴포넌트
│
├── lib/
│   ├── api/                     # API 클라이언트 및 엔드포인트
│   ├── providers/               # React Query Provider
│   ├── store/                   # Zustand 스토어
│   └── utils.ts                 # 유틸리티 함수
│
├── hooks/                       # 커스텀 훅
├── types/                       # TypeScript 타입 정의
└── tailwind.config.ts           # Tailwind 설정
```

---

## 주요 기술 스택

- **Next.js 16**
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **@tanstack/react-query**
- **zustand**
- **axios**
- **lucide-react**

---

## 주요 구현 내용

### 관심기업 목록/상세/등록/삭제/메모

- 관심기업 목록 조회, 페이징, 선택/전체선택, 삭제, 상세 패널 제공
- 관심기업 등록 시 중복 체크(이미 등록된 기업명은 등록 불가)
- 관심기업 상세 패널에서 메모 수정 가능, 저장 시 최신 메모가 항상 반영됨
- 메모 수정 성공 시 alert로 안내
- 모든 서버 상태는 React Query로 관리

### 컴포넌트 구조 및 재사용성

- layout, ui, features로 명확히 분리
- className, props 확장성 고려
- 타입 정의는 types/에 분리

### API 클라이언트

- lib/api/client.ts에서 axios 인스턴스 관리
- 관심기업 관련 API는 lib/api/favoriteCompany.ts에 집중

### 상태 관리

- 서버 상태: React Query
- 클라이언트 상태: Zustand (ex. 선택된 기업, 페이지네이션 등)

### AI 활용

- 요구사항을 분석한 후 todo.md로 작업을 세분화하고, 구현 과정 전반에서 GitHub Copilot을 활용했습니다.
- 여러 AI 모델을 통해 구현 방향이 적절한지 검토하며 흐름을 구체화하는 데 참고했습니다.

### 선택과제

- 선택과제는 dropdown 부분만 구현했습니다.

---

## 실행 방법

```bash
npm install
npm run dev
```
