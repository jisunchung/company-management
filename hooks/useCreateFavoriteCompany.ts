import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavoriteCompany } from "@/lib/api/favoriteCompany";

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
      alert("기업을 선택해주세요.");
      return;
    }

    const isDuplicate = params.existingCompanies.some(
      (name) => name === companyName
    );

    if (isDuplicate) {
      alert("이미 관심기업으로 등록된 기업입니다.");
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
