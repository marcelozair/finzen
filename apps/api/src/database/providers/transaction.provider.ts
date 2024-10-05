import { Transaction } from '../schemas/transaction.schema';

export const TransactionProviderRepository = {
  provide: 'TRANSACTION_REPOSITORY',
  useValue: Transaction,
};
