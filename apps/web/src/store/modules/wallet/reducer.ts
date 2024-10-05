import { PayloadAction } from '@reduxjs/toolkit';
import { WalletState, Wallet } from '../../../interfaces/Wallet';

const walletReducer = {
  setWallets(state: WalletState, { payload }: PayloadAction<Wallet[]>) {
    return { ...state, wallets: payload };
  },

  selectWallet(state: WalletState, { payload }: PayloadAction<Wallet>) {
    return { ...state, selected: payload };
  }
};

export default walletReducer;
