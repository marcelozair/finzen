import React, { useState } from "react";

import { Button } from "../../../../components/shared/Button";
import { TransactionTable } from "../../../../components/admin/transaction/TransactionTable/TransacionTable";

import './Transactions.scss';
import { useAppSelector } from "../../../../store/hooks";
import { CreateTransactionModal } from "../../../../components/admin/transaction/CreateTransaction/CreateTransactionModal";

export const Transactions = React.memo(() => {
  const { list } = useAppSelector(({ transaction }) => transaction);
  const [createTransactionOpen, setCreateTransactionOpen] = useState(false);

  return (
    <>
      <div className="transaction">
        <div className="transaction__options">
          <h3 className="transaction__title">Summary</h3>
          <Button
            onClick={() => setCreateTransactionOpen(true)}
            type="button"
          >
              Create Transaction
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