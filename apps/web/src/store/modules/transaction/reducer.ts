import { PayloadAction } from '@reduxjs/toolkit';
import { IGetTransactionPayload, TransactionState } from '../../../interfaces/Transaction';

const transactionReducer = {
  setTransactions(state: TransactionState, { payload }: PayloadAction<IGetTransactionPayload>) {
    state = { ...state, ...payload };

    return state;
  }
};

export default transactionReducer;
