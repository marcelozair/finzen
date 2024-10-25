import { initialState } from './initialState';
import transactionReducer from './reducer';
import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: transactionReducer,
});

export default transactionSlice.reducer;

export const {
  setCategories: setCategoriesAction,
  setTransactions: setTransactionsAction,
} = transactionSlice.actions;
