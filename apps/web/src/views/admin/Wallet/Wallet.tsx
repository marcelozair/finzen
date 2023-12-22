import { walletsFake } from '../../../constants/data/wallets';
import { CardWallet } from '../../../components/admin/wallet/CardWallet/CardWallet';
import { ButtonAddWallet } from '../../../components/admin/wallet/ButtonAddWallet/ButtonAddWallet';

import './Wallet.scss';
import { Suspense } from 'react';

export const Wallet = () => {
  return (
    <Suspense fallback="Loading">
      <div className="wallet-header">
        <div className="wallet-list">
          <ButtonAddWallet />
          {walletsFake.map((wallet) => (<CardWallet key={wallet.id} wallet={wallet} />))}
        </div>
      </div>
    </Suspense>
  );
};

export default Wallet;
