import { $axios } from '../config';
import { ICreateTransactionPayload, IGetTransactionResponse } from '../../interfaces/Transaction';

const TRANSACTION_LIMIT_PER_PAGE = 10;

export const $transactionApi = {
  getAll: (walletId: number, page: number): Promise<IGetTransactionResponse> => {
    return $axios.get('transaction/:walletId', {
      params: { walletId }, query: { page, limit: TRANSACTION_LIMIT_PER_PAGE }
    });
  },

  create: (data: ICreateTransactionPayload): Promise<void> => {
    return  $axios.post('transaction/create', { data });
  },
};
