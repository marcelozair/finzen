import { TransactionState } from "../../../interfaces/Transaction";

export const initialState: TransactionState = {
  categories: [],
  list: [],
  page: 1,
  total: 0,
  limit: 20,
}