// 관심기업 생성 요청
export interface FavoriteCompanyCreate {
  email: string;
  company_name: string;
  memo?: string | null;
}

// 관심기업 단일 항목
export interface FavoriteCompanyListItem {
  id: number;
  company_name: string;
  created_at: string; // ISO date string
  memo?: string | null;
}

// 관심기업 리스트(페이지네이션)
export interface PaginatedFavoriteCompanyResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: FavoriteCompanyListItem[];
}

// 관심기업 수정 요청
export interface FavoriteCompanyUpdate {
  memo?: string | null;
}
