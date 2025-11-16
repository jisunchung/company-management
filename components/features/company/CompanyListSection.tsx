"use client";
import { COMPANY_CONTENT, DEFAULT_EMAIL } from "@/constants";
import React, { useState } from "react";
import CompanyList from "./CompanyList";
import Button from "@/components/ui/Button";
import { Plus, Trash } from "lucide-react";
import Text from "@/components/ui/Text";
import { useFavoriteCompanies } from "@/hooks/useFavoriteCompanies";
import { usePaginationStore } from "@/store/pagination";
import useSelectedCompanies from "@/hooks/useSelectedCompanies";
import Pagination from "@/components/ui/Pagination";
import { useCompanies } from "@/hooks/useCompanies";
import { useCreateFavoriteCompany } from "@/hooks/useCreateFavoriteCompany";
import { useDeleteFavoriteCompany } from "@/hooks/useDeleteFavoriteCompany";
import CreateCompanyModal from "./CreateCompanyModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CompanyDetailPanel from "./CompanyDetailPanel";

export default function CompanyListSection() {
  const { page, setPage } = usePaginationStore();

  const email = DEFAULT_EMAIL;
  const { data, isLoading, isError } = useFavoriteCompanies(email, page);
  const { data: companiesData } = useCompanies();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  // API 데이터 매핑 (CompanyList에 맞게 변환)
  const companies =
    data?.items.map((item) => ({
      id: item.id,
      name: item.company_name,
      createdAt: item.created_at,
      memo: item.memo,
    })) ?? [];

  const { handleSave, isPending } = useCreateFavoriteCompany(
    {
      email,
      existingCompanies: companies.map((c) => c.name),
    },
    {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedCompany("");
        setMemo("");
      },
    }
  );

  // API에서 가져온 기업 목록
  const companyOptions = companiesData?.companies ?? [];

  const { selectedIds, toggleSelect, selectAll, clear } =
    useSelectedCompanies(email);

  const {
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteModal,
  } = useDeleteFavoriteCompany(email, {
    onSuccess: () => {
      clear();
    },
  });

  const handleSelectAll = (checked: boolean) => {
    selectAll(
      checked,
      companies.map((c) => c.id)
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
            onClick={() => handleDeleteClick(undefined, selectedIds)}
          >
            {COMPANY_CONTENT.BUTTON.DELETE}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-10 text-center text-gray-400">
          {COMPANY_CONTENT.DATA_LOADING}
        </div>
      ) : isError ? (
        <div className="py-10 text-center text-red-500">
          {COMPANY_CONTENT.DATA_LOADING_ERROR}
        </div>
      ) : (
        <CompanyList
          companies={companies}
          selectedIds={selectedIds}
          onToggle={toggleSelect}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteClick}
          onRowClick={setSelectedDetailId}
        />
      )}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={data.total_pages}
          onPageChange={setPage}
        />
      )}

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyOptions={companyOptions}
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
        memo={memo}
        onMemoChange={setMemo}
        onSave={() => handleSave(selectedCompany, memo)}
        isPending={isPending}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDeleteConfirm(selectedIds)}
      />

      <CompanyDetailPanel
        isOpen={selectedDetailId !== null}
        onClose={() => setSelectedDetailId(null)}
        companyId={selectedDetailId}
      />
    </section>
  );
}
