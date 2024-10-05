import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { toRoutes } from "../../../../routes/routes";
import { $bankApi } from "../../../../api/modules/bank";
import { $walletApi } from "../../../../api/modules/wallet";
import { WALLET_COLORS } from "../../../../constants/colors";
import { Button } from "../../../../components/shared/Button/Button";
import { TextField } from "../../../../components/shared/TextField/TextField";
import { TitleView } from "../../../../components/shared/TitleView/TitleView";
import { BackButton } from "../../../../components/shared/BackButton/BackButton";
import schemaCreateWallet from "../../../../validators/wallet/SchemaCreateWallet";
import { NumberField } from "../../../../components/shared/NumberField/NumberField";
import { EnumWalletTypeId, ICreateWalletForm } from "../../../../interfaces/Wallet";
import { Option, SelectField } from "../../../../components/shared/SelectField/SelectField";
import { ColorSelectField } from "../../../../components/shared/ColorSelectField/ColorSelectField";

export const CreateWallet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [typesCatalogs, setTypesCatalogs] = useState<Option[]>([]);
  const [banksCatalog, setBanksCatalog] = useState<Option[]>([]);

  const {
    handleSubmit,
    getValues,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICreateWalletForm>({
    mode: 'onChange',
    defaultValues: { color: '#000' },
    resolver: yupResolver(schemaCreateWallet),
  });

  const getAllCatalogs = async () => {
    setLoading(true);

    try {
      const wallets = await $walletApi.getWalletTypes();
      setTypesCatalogs(wallets.data.map(({ name, id }) => ({ label: name, value: id })));

      const banks = await $bankApi.getAll();
      setBanksCatalog(banks.data.map(({ name, id }) => ({ label: name, value: id })));
    } catch {
      console.error('something is wrong');
    } finally {
      setLoading(false);
    }
  }

  const createWalletSubmit = async (values: ICreateWalletForm) => {
    setLoading(true);
    $walletApi.create(values).then(response => {
      navigate(toRoutes.wallet);
      setLoading(false);
    });
  }

  const isCash = useMemo(() => {
    const typeId = getValues('typeId');
    if (typeId == EnumWalletTypeId.CASH) {
      setValue('closingDate', null);
      setValue('dueDate', null);
      setValue('bankId', null);
      
      return true;
    } else if (!typeId) {
      return true;
    }
  }, [watch('typeId')]);

  useEffect(() => {
    getAllCatalogs();
  }, []);

  return (
    <div>
      <BackButton />
      <section className="mt-6">
        <TitleView>Create Wallet</TitleView>
        <form className="mt-6" onSubmit={handleSubmit(createWalletSubmit)}>
          <div className="flex gap-4 w-full">
            <TextField
              autoComplete="off"
              label="Account Name"
              placeholder="Insert account name"
              error={errors.name}
              {...register('name')}
            />
            <SelectField
              {...register('typeId')}
              loading={loading}
              options={typesCatalogs}
              label="Wallet Type"
              placeholder="Select the wallet type"
              error={errors.typeId}
            />
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <NumberField
              {...register('balance')}
              label="Initial Balance"
              placeholder="Insert the initial balance"
              error={errors.balance}
              min={0}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
            <ColorSelectField
              {...register('color')}
              loading={loading}
              options={WALLET_COLORS}
              label="Select Color"
              placeholder="Select a color"
              error={errors.color}
            />
          </div>

          <div className="flex mt-4 gap-4">
            <SelectField
              {...register('bankId')}
              loading={loading}
              options={banksCatalog}
              disabled={isCash}
              label="Bank"
              placeholder="Select the bank"
              error={errors.bankId}
            />

            {/* #TODO disabled are not working */}
            <TextField
              {...register('accountNumber')}
              label="Last 4 digits of the Wallet"
              autoComplete="off"
              disabled={isCash}
              placeholder="0912"
              error={errors.accountNumber}
            />
          </div>

          <div className="flex mt-4 gap-4">
            <NumberField
              {...register('closingDate')}
              label="Closing Date (Number day)"
              placeholder="Insert the number of the day"
              disabled={isCash}
              max={31}
              error={errors.closingDate}
            />

            <NumberField
              {...register('dueDate')}
              label="DueDate (Number day)"
              placeholder="Insert the number of the day"
              max={31}
              disabled={isCash}
              error={errors.dueDate}
            />
          </div>

          <Button className="mt-6" type="submit" loading={loading}>
            Create Wallet
          </Button>


        </form>
      </section>
    </div>
  );
};

export default CreateWallet;
