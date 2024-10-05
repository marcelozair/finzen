import { FC } from 'react';
import './CardWallet.scss';
import { Wallet } from '../../../../interfaces/Wallet';
import { parseCurrency } from '../../../../helpers/currency';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { selectWalletAction } from '../../../../store/modules/wallet';
import { useNavigate } from 'react-router-dom';

interface CardWalletProps {
  wallet: Wallet;
  active: boolean;
}

export const CardWallet: FC<CardWalletProps> = ({ wallet, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectWallet = () => {
    dispatch(selectWalletAction(wallet));
    navigate('/admin/wallet/' + wallet.id);
  }

  return (
    <button
      className={classNames("card-wallet", { [`!border-[${wallet.color.toUpperCase()}]`]: active })}
      onClick={selectWallet}
    >
      <div style={{ background: wallet.color }} className="card-wallet__color-bar"></div>
      <div className="card-wallet__content">
        <p className="card-wallet__name">{wallet.name}</p>
        <p className="card-wallet__number">{wallet.accountNumber}</p>
      </div>

      <p className="card-wallet__balance">{parseCurrency(wallet.balance)}</p>
    </button>
  );
};