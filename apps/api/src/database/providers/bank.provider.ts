import { Bank } from '../schemas/bank.schema';

export const BankProviderRepository = {
  provide: 'BANK_REPOSITORY',
  useValue: Bank,
};
