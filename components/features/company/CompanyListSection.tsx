import { COMPANY_CONTENT, PAGENATION } from "@/constants";
import React from "react";
import CompanyList from "./CompanyList";
import Button from "@/components/ui/Button";
import { Plus, Trash } from "lucide-react";
import Text from "@/components/ui/Text";

export default function CompanyListSection() {
  const companies = [
    { id: 1, name: "삼성전자", createdAt: "2025. 07. 18 오후 06:55" },
    { id: 2, name: "네이버", createdAt: "2024. 03. 10 오전 11:15" },
    { id: 3, name: "현대자동차", createdAt: "2024. 03. 05 오후 03:30" },
  ];

  return (
    <section className="mx-auto flex w-full flex-col gap-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <Text typography="t2" bold="bold" className="w-full">
            {COMPANY_CONTENT.TITLE}
          </Text>
          <Text
            typography="t6"
            bold="regular"
            className="text-text-muted mb-2 w-full"
          >
            {COMPANY_CONTENT.SUBTITLE}
          </Text>
        </div>
        <div className="flex flex-row items-end gap-2">
          <Button
            variant="Fill"
            leftIcon={<Plus width={20} height={20} style={{ opacity: 1 }} />}
          >
            {COMPANY_CONTENT.BUTTON.ADD}
          </Button>
          <Button
            variant="Outline"
            leftIcon={<Trash width={20} height={20} style={{ opacity: 1 }} />}
          >
            {COMPANY_CONTENT.BUTTON.DELETE}
          </Button>
        </div>
      </div>

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
