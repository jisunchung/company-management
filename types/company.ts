// 기업 관련 타입 정의
export interface Company {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyListResponse {
  data: Company[];
  total: number;
  page: number;
  pageSize: number;
}
