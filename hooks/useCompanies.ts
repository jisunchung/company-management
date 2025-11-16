import { useQuery } from "@tanstack/react-query";
import { fetchCompanyList } from "@/lib/api/company";
import type { CompanyListResponse } from "@/types/companyList";

export function useCompanies() {
  return useQuery<CompanyListResponse, Error>({
    queryKey: ["companies"],
    queryFn: fetchCompanyList,
  });
}
