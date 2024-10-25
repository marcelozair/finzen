export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export interface IGetCategoryResponse {
  data: Category[];
  success: boolean;
  message: string;
}
