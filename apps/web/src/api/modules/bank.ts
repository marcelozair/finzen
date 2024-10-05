import { IGetBanksResponse } from '../../interfaces/Bank';
import { $axios } from '../config';

export const $bankApi = {
  getAll: (): Promise<IGetBanksResponse> => {
    return $axios.get('bank');
  }
};
