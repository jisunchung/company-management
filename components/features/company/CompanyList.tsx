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
  selectedIds: number[];
  onToggle: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete?: (id: number) => void;
  onRowClick?: (id: number) => void;
}

export default function CompanyList({
  companies,
  selectedIds,
  onToggle,
  onSelectAll,
  onDelete,
  onRowClick,
}: CompanyListProps) {
  const allSelected =
    companies.length > 0 && selectedIds.length === companies.length;
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
            <th className="text-center">
              <input
                type="checkbox"
                aria-label="select all companies"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="accent-background-orange checked:bg-background-orange h-4 w-4"
              />
            </th>
            <th className="px-4 py-2">{COMPANY_CONTENT.LIST.COMPANY_NAME}</th>
            <th className="px-4 py-2">{COMPANY_CONTENT.LIST.CREATED_DATE}</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <CompanyListItem
              key={company.id}
              company={company}
              checked={selectedIds.includes(company.id)}
              onToggle={onToggle}
              onDelete={onDelete}
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
