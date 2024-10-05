import { $axios } from '../config';
import { ICreateWalletPayload, IGetWalletsResponse, IGetWalletsTypeResponse } from '../../interfaces/Wallet';

export const $walletApi = {
  getAll: (): Promise<IGetWalletsResponse> => {
    return $axios.get('wallet');
  },

  create: (data: ICreateWalletPayload): Promise<void> => {
    return  $axios.post('wallet/create', { data });
  },

  getWalletTypes: (): Promise<IGetWalletsTypeResponse> => {
    return $axios.get('wallet/types');
  }
};
