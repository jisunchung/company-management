import { Trash } from "lucide-react";
import React from "react";
import { formatDate } from "@/lib/utils";

interface Company {
  id: number;
  name: string;
  createdAt: string;
}

interface CompanyListItemProps {
  company: Company;
  highlight?: boolean;
  checked?: boolean;
  onToggle?: (id: number) => void;
}

export default function CompanyListItem({
  company,
  highlight,
  checked = false,
  onToggle,
}: CompanyListItemProps) {
  return (
    <tr className={highlight ? "bg-[#fff7e0]" : ""}>
      <td className="text-center align-middle">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle && onToggle(company.id)}
          aria-label={`select ${company.name}`}
        />
      </td>
      <td className="px-4 py-2 align-middle">{company.name}</td>
      <td className="px-4 py-2 align-middle">
        {formatDate(company.createdAt)}
      </td>
      <td className="text-center align-middle">
        <Trash className="h-5 w-5 text-gray-400 hover:text-red-500" />
      </td>
    </tr>
  );
}
