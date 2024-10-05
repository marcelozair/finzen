export interface Bank {
  id: number;
  icon: string;
  color: string;
  name: string;
}

export interface IGetBanksResponse {
  success: boolean;
  message: string;
  data: Bank[];
}