import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavoriteCompany } from "@/lib/api/favoriteCompany";

interface UseDeleteFavoriteCompanyOptions {
  onSuccess?: () => void;
}

export function useDeleteFavoriteCompany(
  email: string,
  options?: UseDeleteFavoriteCompanyOptions
) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: (id: number) => deleteFavoriteCompany(id, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteCompanies"] });
      options?.onSuccess?.();
    },
  });

  const deleteSingle = async (id: number) => {
    await mutation.mutateAsync(id);
  };

  const deleteMultiple = async (ids: number[]) => {
    for (const id of ids) {
      await mutation.mutateAsync(id);
    }
    options?.onSuccess?.();
  };

  const handleDeleteClick = (id?: number, selectedIds?: number[]) => {
    if (id) {
      // 개별 삭제
      setDeleteTargetId(id);
    } else {
      // 다중 삭제
      if (!selectedIds || selectedIds.length === 0) {
        alert("삭제할 기업을 선택해주세요.");
        return;
      }
      setDeleteTargetId(null);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (selectedIds: number[]) => {
    if (deleteTargetId !== null) {
      // 개별 삭제
      await deleteSingle(deleteTargetId);
    } else {
      // 다중 삭제
      await deleteMultiple(selectedIds);
    }
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  return {
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteModal,
    isPending: mutation.isPending,
  };
}
