import React, { useState } from "react";

import { Button } from "../../../../components/shared/Button";
import { TransactionTable } from "../../../../components/admin/transaction/TransactionTable/TransacionTable";

import './Transactions.scss';
import { useAppSelector } from "../../../../store/hooks";
import { CreateTransactionModal } from "../../../../components/admin/transaction/CreateTransaction/CreateTransactionModal";
import { useLanguage } from "../../../../hooks/useLanguage";

export const Transactions = React.memo(() => {
  const { content } = useLanguage('walletDetails');
  const { list } = useAppSelector(({ transaction }) => transaction);
  const [createTransactionOpen, setCreateTransactionOpen] = useState(false);

  return (
    <>
      <div className="transaction">
        <div className="transaction__options">
          <h3 className="transaction__title">{content.title}</h3>
          <Button
            onClick={() => setCreateTransactionOpen(true)}
            type="button"
          >
            {content.create}
          </Button>
        </div>

        <TransactionTable list={list} />
      </div>

      <CreateTransactionModal
        size="md"
        isOpen={createTransactionOpen}
        onClose={() => setCreateTransactionOpen(false)}
      />
    </>
  )
})