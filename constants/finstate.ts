// 보고서명, 재무제표 유형 등 드롭다운 옵션
export const FINSTATE_REPORT_OPTIONS = [
  { value: "", label: "보고서명을 선택하세요" },
  { value: "1분기보고서", label: "1분기보고서" },
  { value: "반기보고서", label: "반기보고서" },
  { value: "3분기보고서", label: "3분기보고서" },
  { value: "사업보고서", label: "사업보고서" },
];

export const FINSTATE_STATEMENT_OPTIONS = [
  { value: "", label: "재무제표 유형을 선택하세요" },
  { value: "재무제표", label: "재무제표" },
  { value: "연결재무제표", label: "연결재무제표" },
];
// 재무상태표 관련 상수
export const FINSTATE_TABLE = {
  TITLE: "재 무 상 태 표",
  UNIT: "(단위 : 원)",
  COLS: {
    SECTION: "과",
    ACCOUNT: "목",
  },
  NO_DATA: "데이터가 없습니다.",
};
// 재무제표 표에서 상위 항목(섹션) 구분용 키워드
export const FINSTATE_SECTION_KEYWORDS = [
  "자산",
  "부채",
  "자본",
  "유동자산",
  "비유동자산",
  "유동부채",
  "비유동부채",
  "자본총계",
  "부채총계",
  "자산총계",
];
