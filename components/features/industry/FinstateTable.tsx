import React from "react";
import {
  FINSTATE_SECTION_KEYWORDS,
  FINSTATE_TABLE,
} from "@/constants/finstate";

export interface FinstateRow {
  sj_div: string; // 재무제표 구분
  account_nm: string; // 계정명
  thstrm_amount: string; // 당기 금액
  frmtrm_amount?: string; // 전기 금액 (optional)
  bfefrmtrm_amount?: string; // 전전기 금액 (optional)
  // 연도/기수/날짜 관련 메타데이터 (optional)
  thstrm_nm?: string;
  frmtrm_nm?: string;
  bfefrmtrm_nm?: string;
  thstrm_dt?: string;
  frmtrm_dt?: string;
  bfefrmtrm_dt?: string;
}

export interface FinstateTableProps {
  data: FinstateRow[];
}

function formatNumber(num?: string) {
  if (!num || isNaN(Number(num.replace(/,/g, "")))) return num || "-";
  return Number(num.replace(/,/g, "")).toLocaleString();
}

// 연도 정보 추출 (데이터에 연도 정보가 없으면 빈 문자열)

// 연도/기수/날짜 정보 추출
function extractPeriodInfo(data: FinstateRow[]) {
  if (!data || data.length === 0) {
    return [
      { label: "제 1(당)기", date: "-" },
      { label: "제 0(전)기", date: "-" },
      { label: "제 -1(전전)기", date: "-" },
    ];
  }
  // 가장 첫 행의 메타데이터에서 추출 (thstrm_nm, thstrm_dt 등)
  const thstrm = data[0].thstrm_nm || "당기";
  const frmtrm = data[0].frmtrm_nm || "전기";
  const bfefrmtrm = data[0].bfefrmtrm_nm || "전전기";
  const thstrm_dt = data[0].thstrm_dt || "-";
  const frmtrm_dt = data[0].frmtrm_dt || "-";
  const bfefrmtrm_dt = data[0].bfefrmtrm_dt || "-";

  // 기수에서 숫자 추출 (예: "제 55(당)기")

  return [
    { label: thstrm, date: thstrm_dt },
    { label: frmtrm, date: frmtrm_dt },
    { label: bfefrmtrm, date: bfefrmtrm_dt },
  ];
}

const FinstateTable: React.FC<FinstateTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">{FINSTATE_TABLE.NO_DATA}</div>;
  }

  const periodInfo = extractPeriodInfo(data);

  // 상위 항목(과) 구분: 계정명이 섹션 키워드로 끝나면 상위 항목
  const isSectionRow = (row: FinstateRow) => {
    return (
      !row.account_nm ||
      row.account_nm.trim() === "" ||
      FINSTATE_SECTION_KEYWORDS.some((k) => row.account_nm.endsWith(k))
    );
  };

  return (
    <div className="overflow-x-auto rounded border bg-white p-4">
      {/* 표 상단 제목/연도/단위 */}
      <div className="mb-2 text-center">
        <div className="text-base font-bold">{FINSTATE_TABLE.TITLE}</div>
        {/* 연도별 정보 */}
        <div className="mb-1 flex flex-col items-center text-xs text-gray-700">
          <div className="flex flex-col">
            {periodInfo.map((p, i) => (
              <div key={i} className="mx-1 inline-block">
                {p.label} {p.date ? p.date.replace("현재", "현재") : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full pr-2 text-right text-xs text-gray-600">
          {FINSTATE_TABLE.UNIT}
        </div>
      </div>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">{FINSTATE_TABLE.COLS.SECTION}</th>
            <th className="border px-2 py-1">{FINSTATE_TABLE.COLS.ACCOUNT}</th>
            <th className="border px-2 py-1">{periodInfo[0].label}</th>
            <th className="border px-2 py-1">{periodInfo[1].label}</th>
            <th className="border px-2 py-1">{periodInfo[2].label}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.account_nm + idx}
              className={isSectionRow(row) ? "bg-gray-50 font-bold" : ""}
            >
              <td className="border px-2 py-1 whitespace-nowrap">
                {row.sj_div}
              </td>
              <td
                className={
                  "border px-2 py-1 whitespace-nowrap" +
                  (isSectionRow(row) ? "" : " pl-6 text-gray-800")
                }
              >
                {row.account_nm}
              </td>
              <td className="border px-2 py-1 text-right">
                {formatNumber(row.thstrm_amount)}
              </td>
              <td className="border px-2 py-1 text-right">
                {formatNumber(row.frmtrm_amount)}
              </td>
              <td className="border px-2 py-1 text-right">
                {formatNumber(row.bfefrmtrm_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinstateTable;
