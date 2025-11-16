import { apiClient } from "@/lib/api/client";
import type {
  FavoriteCompanyCreate,
  FavoriteCompanyUpdate,
  PaginatedFavoriteCompanyResponse,
  FavoriteCompanyListItem,
} from "@/types/favoriteCompany";

// 관심기업 목록 조회
export async function fetchFavoriteCompanies(params: {
  email: string;
  page?: number;
}): Promise<PaginatedFavoriteCompanyResponse> {
  const res = await apiClient.get("/favorites", { params });
  return res.data;
}

// 관심기업 상세 조회
export async function fetchFavoriteCompany(
  id: number,
  email: string
): Promise<FavoriteCompanyListItem> {
  const res = await apiClient.get(`/favorites/${id}`, { params: { email } });
  return res.data;
}

// 관심기업 등록
export async function createFavoriteCompany(payload: FavoriteCompanyCreate) {
  const res = await apiClient.post("/favorites", payload);
  return res.data;
}

// 관심기업 메모 수정
export async function updateFavoriteCompany(
  id: number,
  email: string,
  payload: FavoriteCompanyUpdate
) {
  const res = await apiClient.put(`/favorites/${id}`, payload, {
    params: { email },
  });
  return res.data;
}

// 관심기업 삭제
export async function deleteFavoriteCompany(id: number, email: string) {
  const res = await apiClient.delete(`/favorites/${id}`, { params: { email } });
  return res.data;
}
