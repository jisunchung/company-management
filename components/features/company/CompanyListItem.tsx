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
  onDelete?: (id: number) => void;
  onRowClick?: (id: number) => void;
}

export default function CompanyListItem({
  company,
  checked = false,
  onToggle,
  onDelete,
  onRowClick,
}: CompanyListItemProps) {
  return (
    <tr
      className={`${checked ? "bg-background-yellow" : ""} cursor-pointer hover:bg-gray-50`}
    >
      <td
        className="text-center align-middle"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle && onToggle(company.id)}
          aria-label={`select ${company.name}`}
          className="accent-background-orange checked:bg-background-orange h-4 w-4"
        />
      </td>
      <td
        className="px-4 py-2 align-middle"
        onClick={() => onRowClick && onRowClick(company.id)}
      >
        {company.name}
      </td>
      <td
        className="px-4 py-2 align-middle"
        onClick={() => onRowClick && onRowClick(company.id)}
      >
        {formatDate(company.createdAt)}
      </td>
      <td
        className="text-center align-middle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={() => onDelete && onDelete(company.id)}
            className="cursor-pointer"
          >
            <Trash className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
