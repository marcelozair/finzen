import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

import { Button } from "../../../shared/Button";
import { useAppSelector } from "../../../../store/hooks";
import { TextField } from "../../../shared/TextField/TextField";
import { NumberField } from "../../../shared/NumberField/NumberField";
import { $transactionApi } from "../../../../api/modules/transaction";
import { SelectField } from "../../../shared/SelectField/SelectField";
import { ICreateTransactionForm } from "../../../../interfaces/Transaction";
import schemaCreateTransaction from "../../../../validators/transaction/SchemaCreateTransaction";
import { toast } from "sonner";
import { setTransactionsAction } from "../../../../store/modules/transaction";
import { useDispatch } from "react-redux";

interface CreateTransactionModalProps {
  size: 'sm' | 'md' | 'lg';
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTransactionModal: FC<CreateTransactionModalProps> = ({
  size, isOpen, onClose
}) => {
  const { selected } = useAppSelector(({ wallet }) => wallet);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICreateTransactionForm>({
    mode: 'onChange',
    resolver: yupResolver(schemaCreateTransaction),
  });

  const createTransaction = (values: ICreateTransactionForm) => {
    setLoading(true);

    $transactionApi.create({
      ...values,
      walletId: selected?.id as number,
    }).then(() => {
      onClose();

      $transactionApi.getAll(selected?.id as number, 1).then((response) => {
        dispatch(setTransactionsAction(response.data));
        toast.success('Transactiosn created successful')
        setLoading(false);
      });

    });
  }

  return (
    <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Transaction</ModalHeader>
              <ModalBody>
                <p>Select the transaction type:</p>
                <SelectField
                  {...register('type')}
                  label="Type"
                  placeholder="Select the transaction type"
                  error={errors.type}
                  options={[
                    { value: 'income', label: 'Income' },
                    { value: 'expense', label: 'Expense' },
                    { value: 'transfer', label: 'Transfer' },
                  ]}
                />
                <TextField
                  {...register('concept')}
                  label="Concept"
                  placeholder="Insert the concept"
                  error={errors.concept}
                />
                <NumberField
                  {...register('amount')}
                  label="Amount"
                  placeholder="Insert the amount"
                  error={errors.amount}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button loading={loading} style="danger" onClick={() => {
                  reset();
                  onClose();
                }}>
                  Cancel
                </Button>
                <Button loading={loading} style="primary" onClick={handleSubmit(createTransaction)}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}