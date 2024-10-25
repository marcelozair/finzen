import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../../store/hooks";
import { $walletApi } from "../../../../api/modules/wallet";
import { selectWalletAction, setWalletsAction } from "../../../../store/modules/wallet";
import { CardWallet } from "../../../../components/admin/wallet/CardWallet/CardWallet";
import { ButtonAddWallet } from "../../../../components/admin/wallet/ButtonAddWallet/ButtonAddWallet";

import './Wallets.scss';
import { $transactionApi } from "../../../../api/modules/transaction";
import { setCategoriesAction } from "../../../../store/modules/transaction";

const CardsWalletSkeleton = () => {
  return (
    <>
      <button
        disabled
        className="h-24 min-w-[208px] bg-gray-200 rounded-md animate-pulse"
      />
      <button
        disabled
        className="h-24 min-w-[208px] bg-gray-200 rounded-md animate-pulse"
      />
        <button
        disabled
        className="h-24 min-w-[208px] bg-gray-200 rounded-md animate-pulse"
      />
    </>
  )
}

export const Wallets = () => {
  const dispatch = useDispatch();
  const { walletId } = useParams();
  const { wallets, selected } = useAppSelector(({ wallet }) => wallet);

  const [loading, setLoading] = useState(true);

  const setUpSelectedWallet = () => {
    const selectedWallet = wallets.find(({ id }) => id === Number(walletId));
    if (selectedWallet){
      dispatch(selectWalletAction(selectedWallet));
    }
  }

  useEffect(() => {
    setLoading(true);

    $walletApi.getAll().then((response) => {
      dispatch(setWalletsAction(response.data));
      if (walletId) setUpSelectedWallet();

      setLoading(false);
    });

    $transactionApi.getAllCategories().then((response) => {
      dispatch(setCategoriesAction(response.data));
    });
  }, []);

  useEffect(() => {
    if (walletId) setUpSelectedWallet();
  }, [wallets]);

  return (
    <>
      <section className="wallet">
        <article className="wallet-list">
          <ButtonAddWallet />
          {loading && <CardsWalletSkeleton />}
          {!loading && wallets.map((wallet) => (
            <CardWallet
              key={wallet.id}
              wallet={wallet}
              active={selected?.id === wallet.id}
            />
          ))}
        </article>

        <div className="mt-10">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Wallets;
