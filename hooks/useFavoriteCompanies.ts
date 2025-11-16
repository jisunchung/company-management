import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteCompanies } from "@/lib/api/favoriteCompany";
import type { PaginatedFavoriteCompanyResponse } from "@/types/favoriteCompany";

// 관심기업 리스트
export function useFavoriteCompanies(email: string, page: number = 1) {
  return useQuery<PaginatedFavoriteCompanyResponse, Error>({
    queryKey: ["favoriteCompanies", email, page],
    queryFn: () => fetchFavoriteCompanies({ email, page }),
    enabled: !!email,
    placeholderData: (prev) => prev,
  });
}
