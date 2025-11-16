import { Trash } from "lucide-react";
import React from "react";

interface Company {
  id: number;
  name: string;
  createdAt: string;
}

interface CompanyListItemProps {
  company: Company;
  highlight?: boolean;
}

export default function CompanyListItem({
  company,
  highlight,
}: CompanyListItemProps) {
  return (
    <tr className={highlight ? "bg-[#fff7e0]" : ""}>
      <td className="text-center align-middle">
        <input type="checkbox" />
      </td>
      <td className="px-4 py-2 align-middle">{company.name}</td>
      <td className="px-4 py-2 align-middle">{company.createdAt}</td>
      <td className="text-center align-middle">
        <Trash className="h-5 w-5 text-gray-400 hover:text-red-500" />
      </td>
    </tr>
  );
}
