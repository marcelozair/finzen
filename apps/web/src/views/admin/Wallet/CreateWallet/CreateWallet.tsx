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
import { useLanguage } from "../../../../hooks/useLanguage";

export const CreateWallet = () => {
  const navigate = useNavigate();
  const { content } = useLanguage('createWallet');
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
      <BackButton value={content.back} />
      <section className="mt-6">
        <TitleView>{content.title}</TitleView>
        <form className="mt-6" onSubmit={handleSubmit(createWalletSubmit)}>
          <div className="flex gap-4 w-full">
            <TextField
              autoComplete="off"
              label={content.form.accountName}
              placeholder={content.form.accountNamePl}
              error={errors.name}
              {...register('name')}
            />
            <SelectField
              {...register('typeId')}
              loading={loading}
              options={
                typesCatalogs.map(({ label, value }) => ({
                  label: content.form.walletType[label.toLowerCase()],
                  value: value
                }))
              }
              label={content.form.walletType.label}
              placeholder={content.form.walletType.placeholder}
              error={errors.typeId}
            />
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <NumberField
              {...register('balance')}
              label={content.form.initialBalance}
              placeholder={content.form.initialBalancePl}
              error={errors.balance}
              min={0}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">S/</span>
                </div>
              }
            />
            <ColorSelectField
              {...register('color')}
              loading={loading}
              options={WALLET_COLORS}
              label={content.form.color}
              placeholder={content.form.colorPl}
              error={errors.color}
            />
          </div>

          <div className="flex mt-4 gap-4">
            <SelectField
              {...register('bankId')}
              loading={loading}
              options={banksCatalog}
              disabled={isCash}
              label={content.form.bank}
              placeholder={content.form.bankPl}
              error={errors.bankId}
            />

            {/* #TODO disabled are not working */}
            <TextField
              {...register('accountNumber')}
              label={content.form.digits}
              placeholder={content.form.digitsPl}
              autoComplete="off"
              disabled={isCash}
              error={errors.accountNumber}
            />
          </div>

          <div className="flex mt-4 gap-4">
            <NumberField
              {...register('closingDate')}
              label={content.form.closingDate}
              placeholder={content.form.closingDatePl}
              disabled={isCash}
              max={31}
              error={errors.closingDate}
            />

            <NumberField
              {...register('dueDate')}
              label={content.form.dueDate}
              placeholder={content.form.dueDatePl}
              max={31}
              disabled={isCash}
              error={errors.dueDate}
            />
          </div>

          <Button className="mt-6" type="submit" loading={loading}>
            {content.form.submit}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default CreateWallet;
