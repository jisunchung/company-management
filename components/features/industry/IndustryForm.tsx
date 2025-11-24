import React, { useState } from "react";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import { useCompanies } from "@/hooks/useCompanies";

import FinstateTable, { FinstateRow } from "./FinstateTable";
import {
  FINSTATE_REPORT_OPTIONS,
  FINSTATE_STATEMENT_OPTIONS,
} from "@/constants/finstate";

const IndustryForm: React.FC = () => {
  const [industryCompany, setIndustryCompany] = useState("");
  const [year, setYear] = useState("");
  const [report, setReport] = useState("");
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FinstateRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: companiesData } = useCompanies();
  const companyOptions = companiesData?.companies ?? [];

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/finstate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: industryCompany,
          year,
          report,
          statement,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result as FinstateRow[]);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6">
      {/* 기업명: SearchableDropdown */}

      <div className="w-full">
        <SearchableDropdown
          label="기업명 *"
          placeholder="기업명을 입력하세요"
          options={companyOptions}
          value={industryCompany}
          onChange={setIndustryCompany}
        />
      </div>

      {/* 사업연도: dropdown */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          사업연도 <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">사업연도를 선택하세요</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      {/* 보고서명: dropdown */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          보고서명 <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        >
          {FINSTATE_REPORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* 재무제표: dropdown */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          재무제표 <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        >
          {FINSTATE_STATEMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* 검색 버튼 (비활성화 예시) */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          disabled={
            !(industryCompany && year && report && statement) || loading
          }
          onClick={handleSearch}
          className={`flex items-center gap-2 rounded px-6 py-2 ${
            industryCompany && year && report && statement && !loading
              ? "hover:black cursor-pointer bg-black text-white"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          {loading ? "검색 중..." : "검색"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {result && Array.isArray(result) && (
          <div className="w-full">
            <FinstateTable data={result} />
          </div>
        )}
      </div>
    </form>
  );
};

export default IndustryForm;
