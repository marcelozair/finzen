import authReducer from './reducer';
import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authReducer,
});

export default walletSlice.reducer;

export const {
  setWallets: setWalletsAction,
  selectWallet: selectWalletAction
} = walletSlice.actions;
