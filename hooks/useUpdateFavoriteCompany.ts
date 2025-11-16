import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFavoriteCompany } from "@/lib/api/favoriteCompany";
import type { FavoriteCompanyUpdate } from "@/types/favoriteCompany";

export function useUpdateFavoriteCompany(id: number, email: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FavoriteCompanyUpdate) =>
      updateFavoriteCompany(id, email, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteCompanyDetail", id, email],
      });
      queryClient.invalidateQueries({
        queryKey: ["favoriteCompanies", { email }],
      });
    },
  });
}
