import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteCompany } from "@/lib/api/favoriteCompany";

export function useFavoriteCompanyDetail(id: number | null, email: string) {
  return useQuery({
    queryKey: ["favoriteCompanyDetail", id, email],
    queryFn: () => fetchFavoriteCompany(id!, email),
    enabled: id !== null,
  });
}
