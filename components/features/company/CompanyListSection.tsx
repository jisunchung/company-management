import { COMPANY_CONTENT, PAGENATION } from "@/constants";
import React from "react";
import CompanyList from "./CompanyList";

export default function CompanyListSection() {
  const companies = [
    { id: 1, name: "삼성전자", createdAt: "2025. 07. 18 오후 06:55" },
    { id: 2, name: "네이버", createdAt: "2024. 03. 10 오전 11:15" },
    { id: 3, name: "현대자동차", createdAt: "2024. 03. 05 오후 03:30" },
  ];

  return (
    <section className="mx-auto w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl font-semibold">{COMPANY_CONTENT.TITLE}</div>
        <div className="flex gap-2">
          <button className="rounded bg-black px-4 py-2 text-white">
            {COMPANY_CONTENT.BUTTON.ADD}
          </button>
          <button className="border-border-primary rounded border px-4 py-2">
            {COMPANY_CONTENT.BUTTON.DELETE}
          </button>
        </div>
      </div>
      <p className="text-text-muted mb-2">{COMPANY_CONTENT.SUBTITLE}</p>
      <CompanyList companies={companies} />
      <div className="mt-4 flex items-center justify-center gap-2">
        <button className="text-text-muted" disabled>
          {PAGENATION.PREV}
        </button>
        <span className="font-semibold">1</span>
        <button className="text-text-muted">{PAGENATION.NEXT}</button>
      </div>
    </section>
  );
}
