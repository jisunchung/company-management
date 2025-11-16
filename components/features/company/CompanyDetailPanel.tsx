import React from "react";
import { Pencil, X } from "lucide-react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { useFavoriteCompanyDetail } from "@/hooks/useFavoriteCompanyDetail";
import { DEFAULT_EMAIL, DETAIL_PAGE } from "@/constants";

interface CompanyDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number | null;
}

export default function CompanyDetailPanel({
  isOpen,
  onClose,
  companyId,
}: CompanyDetailPanelProps) {
  const email = DEFAULT_EMAIL;
  const { data, isLoading, isError } = useFavoriteCompanyDetail(
    companyId,
    email
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 z-50 flex h-full w-1/2 flex-col bg-white shadow-xl">
        {/* Header */}
        <div
          className="flex items-center justify-center border-b p-6"
          style={{ height: 60 }}
        >
          {isLoading ? (
            <Text typography="t3" bold="bold">
              {DETAIL_PAGE.LOADING}
            </Text>
          ) : (
            <Text typography="t3" bold="bold">
              {data?.company_name || ""}
            </Text>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          {isLoading ? (
            <div className="py-10 text-center text-gray-400">
              {DETAIL_PAGE.LOADING}
            </div>
          ) : isError ? (
            <div className="py-10 text-center text-red-500">
              {DETAIL_PAGE.ERROR}
            </div>
          ) : (
            <textarea
              className="h-full w-full resize-none rounded border border-gray-300 p-4"
              value={data?.memo || ""}
              readOnly
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4">
          <Button leftIcon={<Pencil width={20} height={20} />} variant="Fill">
            수정하기
          </Button>
        </div>
      </div>
    </>
  );
}
