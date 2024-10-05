import { WalletType } from '../schemas/wallet-types.schema';

export const WalletTypeProviderRepository = {
  provide: 'WALLETS_TYPE_REPOSITORY',
  useValue: WalletType,
};
