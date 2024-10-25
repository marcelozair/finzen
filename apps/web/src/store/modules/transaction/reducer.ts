import { PayloadAction } from '@reduxjs/toolkit';
import { IGetTransactionPayload, TransactionState } from '../../../interfaces/Transaction';
import { Category } from '../../../interfaces/Category';

const transactionReducer = {
  setTransactions(state: TransactionState, { payload }: PayloadAction<IGetTransactionPayload>) {
    state = { ...state, ...payload };

    return state;
  },

  setCategories(state: TransactionState, { payload }: PayloadAction<Category[]>) {
    state = { ...state, categories: payload };
    return state;
  }
};

export default transactionReducer;
