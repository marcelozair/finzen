import { Suspense } from 'react';
import { Outlet, Route, Routes, useSearchParams } from 'react-router-dom';

import Wallets from './Wallets/Wallets';
import CreateWallet from './CreateWallet/CreateWallet';
import { WalletDetails } from './WalletDetails/WalletDetails';

export const Wallet = () => {
  return (
    <Suspense fallback="Loading">
      <Routes>
        <Route path="/" element={<Wallets />}>
          <Route path="/:walletId" element={<WalletDetails />} />
        </Route>
        <Route path="/create" element={<CreateWallet />} />
      </Routes>
      <Outlet />
    </Suspense>
  );
};

export default Wallet;
