import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavoriteCompany } from "@/lib/api/favoriteCompany";
import { MODAL } from "@/constants";

interface UseCreateFavoriteCompanyOptions {
  onSuccess?: () => void;
}

interface UseCreateFavoriteCompanyParams {
  email: string;
  existingCompanies: string[];
}

export function useCreateFavoriteCompany(
  params: UseCreateFavoriteCompanyParams,
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

  const handleSave = (companyName: string, memo: string) => {
    if (!companyName) {
      alert(MODAL.ADD.ALERT);
      return;
    }

    const isDuplicate = params.existingCompanies.some(
      (name) => name === companyName
    );

    if (isDuplicate) {
      alert(MODAL.ADD.ALERT_DUPLICATE);
      return;
    }

    mutation.mutate({
      email: params.email,
      company_name: companyName,
      memo: memo || null,
    });
  };

  return {
    handleSave,
    isPending: mutation.isPending,
  };
}
