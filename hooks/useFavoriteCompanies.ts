import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFavoriteCompanies,
  updateFavoriteCompany,
  deleteFavoriteCompany,
} from "@/lib/api/favoriteCompany";
import type {
  FavoriteCompanyUpdate,
  PaginatedFavoriteCompanyResponse,
} from "@/types/favoriteCompany";

// 관심기업 리스트
export function useFavoriteCompanies(email: string, page: number = 1) {
  return useQuery<PaginatedFavoriteCompanyResponse, Error>({
    queryKey: ["favoriteCompanies", email, page],
    queryFn: () => fetchFavoriteCompanies({ email, page }),
    enabled: !!email,
    placeholderData: (prev) => prev,
  });
}

// 관심기업 수정
export function useUpdateFavoriteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      email,
      payload,
    }: {
      id: number;
      email: string;
      payload: FavoriteCompanyUpdate;
    }) => updateFavoriteCompany(id, email, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteCompanies"] });
    },
  });
}

// 관심기업 삭제
export function useDeleteFavoriteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, email }: { id: number; email: string }) =>
      deleteFavoriteCompany(id, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteCompanies"] });
    },
  });
}
