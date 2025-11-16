import CompanyListItem from "./CompanyListItem";
import { COMPANY_CONTENT } from "@/constants";
import React from "react";

interface Company {
  id: number;
  name: string;
  createdAt: string;
}

interface CompanyListProps {
  companies: Company[];
}

export default function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className="overflow-hidden rounded border">
      <table className="w-full table-fixed text-left">
        <colgroup>
          <col style={{ width: "74px" }} />
          <col style={{ width: "80.7%" }} />
          <col style={{ width: "19.3%" }} />
          <col style={{ width: "74px" }} />
        </colgroup>
        <thead className="bg-background-tertiary">
          <tr>
            <th className="text-center"></th>
            <th className="px-4 py-2">{COMPANY_CONTENT.LIST.COMPANY_NAME}</th>
            <th className="px-4 py-2">{COMPANY_CONTENT.LIST.CREATED_DATE}</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, idx) => (
            <CompanyListItem
              key={company.id}
              company={company}
              highlight={idx === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
