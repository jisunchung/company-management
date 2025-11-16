import React, { useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { useFavoriteCompanyDetail } from "@/hooks/useFavoriteCompanyDetail";
import { useUpdateFavoriteCompany } from "@/hooks/useUpdateFavoriteCompany";
import { DEFAULT_EMAIL, DETAIL_PAGE } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFavoriteCompanyDetail(
    companyId,
    email
  );
  const updateFavoriteCompany = useUpdateFavoriteCompany(companyId!, email);

  // 패널이 열릴 때마다 refetch
  useEffect(() => {
    if (isOpen && companyId) {
      queryClient.invalidateQueries({
        queryKey: ["favoriteCompanyDetail", companyId, email],
      });
    }
  }, [isOpen, companyId, email, queryClient]);

  // textarea ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (textareaRef.current) {
      updateFavoriteCompany.mutate(
        { memo: textareaRef.current.value },
        {
          onSuccess: () => {
            alert(DETAIL_PAGE.EDIT_SUCCESS);
            onClose();
          },
        }
      );
    }
  };

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
        <div className="flex h-[60px] items-center justify-between border-b p-6">
          <div className="flex-1 text-center">
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
              key={data?.memo || ""}
              ref={textareaRef}
              className="h-full w-full resize-none rounded border border-gray-300 p-4"
              defaultValue={data?.memo || ""}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 px-6 py-4">
          <Button
            leftIcon={<Pencil width={20} height={20} />}
            variant="Fill"
            onClick={handleSave}
            disabled={updateFavoriteCompany.isPending}
          >
            {DETAIL_PAGE.BUTTON.EDIT}
          </Button>
        </div>
      </div>
    </>
  );
}
