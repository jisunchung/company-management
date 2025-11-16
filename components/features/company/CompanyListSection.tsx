"use client";
import { COMPANY_CONTENT, DEFAULT_EMAIL, MODAL } from "@/constants";
import React, { useState } from "react";
import CompanyList from "./CompanyList";
import Button from "@/components/ui/Button";
import { Plus, Trash } from "lucide-react";
import Text from "@/components/ui/Text";
import { useFavoriteCompanies } from "@/hooks/useFavoriteCompanies";
import { usePaginationStore } from "@/store/pagination";
import useSelectedCompanies from "@/hooks/useSelectedCompanies";
import Pagination from "@/components/ui/Pagination";
import Modal from "@/components/ui/Modal";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import { useCompanies } from "@/hooks/useCompanies";
import { useCreateFavoriteCompany } from "@/hooks/useCreateFavoriteCompany";

export default function CompanyListSection() {
  const { page, setPage } = usePaginationStore();

  const email = DEFAULT_EMAIL;
  const { data, isLoading, isError } = useFavoriteCompanies(email, page);
  const { data: companiesData } = useCompanies();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [memo, setMemo] = useState("");

  const { createCompany, isPending } = useCreateFavoriteCompany({
    onSuccess: () => {
      setIsModalOpen(false);
      setSelectedCompany("");
      setMemo("");
    },
  });

  // API에서 가져온 기업 목록
  const companyOptions = companiesData?.companies ?? [];

  // API 데이터 매핑 (CompanyList에 맞게 변환)
  const companies =
    data?.items.map((item) => ({
      id: item.id,
      name: item.company_name,
      createdAt: item.created_at,
      memo: item.memo,
    })) ?? [];

  const { selectedIds, toggleSelect, selectAll } = useSelectedCompanies(email);

  const handleSelectAll = (checked: boolean) => {
    selectAll(
      checked,
      companies.map((c) => c.id)
    );
  };

  const handleSave = () => {
    const existingCompanyNames = companies.map((c) => c.name);

    createCompany(
      {
        email,
        company_name: selectedCompany,
        memo: memo || null,
      },
      existingCompanyNames
    );
  };

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
            onClick={() => setIsModalOpen(true)}
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
        <CompanyList
          companies={companies}
          selectedIds={selectedIds}
          onToggle={toggleSelect}
          onSelectAll={handleSelectAll}
        />
      )}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={data.total_pages}
          onPageChange={setPage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={MODAL.ADD.TITLE}
      >
        <div className="flex flex-col gap-4">
          <SearchableDropdown
            label={MODAL.ADD.SUBTITLE}
            placeholder={MODAL.ADD.SEARCH_PLACEHOLDER}
            options={companyOptions}
            value={selectedCompany}
            onChange={setSelectedCompany}
          />
          <div className="flex flex-col gap-2">
            <textarea
              className="resize-none overflow-y-auto rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder={MODAL.ADD.MEMO_PLACEHOLDER}
              style={{
                width: 600,
                height: 282,
                borderRadius: 6,
                borderWidth: 1,
              }}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="Fill" onClick={handleSave} disabled={isPending}>
              {isPending ? MODAL.ADD.CONFIRM_PENDING : MODAL.ADD.CONFIRM_BUTTON}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
