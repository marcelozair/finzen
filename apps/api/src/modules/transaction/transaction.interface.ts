import { Transaction } from "src/database/schemas/transaction.schema";

export interface IGetWithPagination {
  total: number;
  list: Transaction[],
  page: number;
}