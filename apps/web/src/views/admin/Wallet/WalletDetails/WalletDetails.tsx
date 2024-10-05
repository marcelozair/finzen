import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import { useAppSelector } from "../../../../store/hooks";
import { EnumWalletType } from "../../../../interfaces/Wallet"
import { $transactionApi } from "../../../../api/modules/transaction";
import { Transactions } from "../../Transaction/Transactions/Transactions";
import { TitleView } from "../../../../components/shared/TitleView/TitleView";
import { setTransactionsAction } from "../../../../store/modules/transaction";

import './WalletDetails.scss';

const WalletDetailsSkeleton = () => {
  return (
    <article className="wallet-details">
      <div className="wallet-details-account">
        <h2 className="animate-pulse w-full h-9 rounded-md bg-gray-200 mb-2"/>
        <p className="animate-pulse w-3/4 h-4 rounded-md bg-gray-200"/>
      </div>

      <section className="wallet-details-summary">
        <div className="flex justify-between">
          <h3 className="animate-pulse w-44 h-10 rounded-md bg-gray-200 mb-2" />
          <button className="animate-pulse w-40 h-10 rounded-md bg-gray-200 mb-2" />
        </div>
        <section className="flex flex-col gap-6 mt-10">
          {[1,2,3].map((i) => (
            <div className="flex gap-5 flex-col" key={i}>
              <div className="flex gap-5 items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex w-full justify-between items-center">
                  <div>
                    <p className="h-5 w-60 bg-gray-200 rounded-md mb-2" />
                    <p className="h-5 w-40 bg-gray-200 rounded-md" />
                  </div>
                  <p className="h-8 w-40 bg-gray-200 rounded-md mb-2" />
                </div>
              </div>
              <hr />
            </div>
          ))}
        </section>
      </section>
    </article>
  )
}

export const WalletDetails = () => {
  const dispatch = useDispatch();
  const { walletId } = useParams();

  const { selected } = useAppSelector(({ wallet }) => wallet);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    $transactionApi.getAll(Number(walletId), 1).then((response) => {
      dispatch(setTransactionsAction(response.data));
      setLoading(false);
    });
  }, [selected])

  return (
    <>
      {loading && <WalletDetailsSkeleton />}
      {!loading && selected && (
        <article className="wallet-details">
          <div className="wallet-details-account">
            <TitleView>{selected.name}</TitleView>
            {selected.type.name.toLowerCase() === EnumWalletType.CASH ? (
              <p>Cash Account</p>
            ) : (
              <p>Banco {selected.bank?.name}</p>
            )}
          </div>

          <div className="wallet-details-summary">
            <Transactions />
          </div>
        </article>
      )}
    </>
  )
}