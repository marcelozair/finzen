import { Wallet } from '../schemas/wallet.schema';

export const WalletProviderRepository = {
  provide: 'WALLETS_REPOSITORY',
  useValue: Wallet,
};
