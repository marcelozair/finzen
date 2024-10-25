import { Category } from "./Category";

export interface Transaction {
  id: number;
  concept: string;
  amount: number;
  type: TransactionType;
  category: Category;
  walletId: number;
  profileId: number;
  transactionPlaceId: number;
  createdAt: string;
}

export interface TransactionState {
  list: Transaction[];
  categories: Category[]
  page: number;
  total: number;
  limit: number;
}

export interface IGetTransactionPayload {
  list: Transaction[];
  page: number;
  total: number;
}

export interface ICreateTransactionForm {
  type: string;
  concept: string;
  amount: number;
  categoryId?: number | null;
}


export interface IGetTransactionResponse {
  data: {
    list: Transaction[];
    page: number;
    total: number;
  },
  success: boolean;
  message: string;
}

export interface ICreateTransactionPayload extends ICreateTransactionForm {
  walletId: number;
}

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer"
}