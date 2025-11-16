import { apiClient } from "@/lib/api/client";
import type { CompanyListResponse } from "@/types/companyList";

// 전체 회사명 리스트 조회
export async function fetchCompanyList(): Promise<CompanyListResponse> {
  const res = await apiClient.get("/companies");
  return res.data;
}
