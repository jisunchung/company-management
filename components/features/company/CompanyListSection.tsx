"use client";
import { COMPANY_CONTENT, PAGENATION, DEFAULT_EMAIL } from "@/constants";
import React from "react";
import CompanyList from "./CompanyList";
import Button from "@/components/ui/Button";
import { Plus, Trash } from "lucide-react";
import Text from "@/components/ui/Text";
import { useFavoriteCompanies } from "@/hooks/useFavoriteCompanies";
import { usePaginationStore } from "@/store/pagination";

export default function CompanyListSection() {
  // zustand로 페이지 상태 관리
  const { page, setPage } = usePaginationStore();
  // 여러 API에서 공통 사용: constants에서 임시 email import
  const email = DEFAULT_EMAIL;
  const { data, isLoading, isError } = useFavoriteCompanies(email, page);

  // DEBUG: Print API data to console
  console.log("Favorite companies API data:", data);

  // API 데이터 매핑 (CompanyList에 맞게 변환)
  const companies =
    data?.items.map((item) => ({
      id: item.id,
      name: item.company_name,
      createdAt: item.created_at,
      memo: item.memo,
    })) ?? [];

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

      {isLoading ? (
        <div className="py-10 text-center text-gray-400">로딩 중...</div>
      ) : isError ? (
        <div className="py-10 text-center text-red-500">
          데이터를 불러오지 못했습니다.
        </div>
      ) : (
        <CompanyList companies={companies} />
      )}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          className="text-text-muted"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          {PAGENATION.PREV}
        </button>
        <span className="font-semibold">{data?.page ?? page}</span>
        <button
          className="text-text-muted"
          disabled={data ? data.page >= data.total_pages : false}
          onClick={() => setPage(page + 1)}
        >
          {PAGENATION.NEXT}
        </button>
      </div>
    </section>
  );
}
