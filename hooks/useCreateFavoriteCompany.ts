import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavoriteCompany } from "@/lib/api/favoriteCompany";
import type { FavoriteCompanyCreate } from "@/types/favoriteCompany";

interface UseCreateFavoriteCompanyOptions {
  onSuccess?: () => void;
}

export function useCreateFavoriteCompany(
  options?: UseCreateFavoriteCompanyOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createFavoriteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteCompanies"] });
      options?.onSuccess?.();
    },
  });

  const createCompany = (
    payload: FavoriteCompanyCreate,
    existingCompanies: string[]
  ) => {
    if (!payload.company_name) {
      alert("기업을 선택해주세요.");
      return;
    }

    const isDuplicate = existingCompanies.some(
      (name) => name === payload.company_name
    );

    if (isDuplicate) {
      alert("이미 관심기업으로 등록된 기업입니다.");
      return;
    }

    mutation.mutate(payload);
  };

  return {
    createCompany,
    isPending: mutation.isPending,
  };
}
