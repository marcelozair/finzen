import { useNavigate } from 'react-router-dom';
import { addIcon } from '../../../../constants/assets/walletAssets';
import './ButtonAddWallet.scss';
import { toRoutes } from '../../../../routes/routes';

export const ButtonAddWallet = () => {
  const navigate = useNavigate();
  const onRedirect = () => navigate(toRoutes.createWallet);

  return (
    <button className="button-add-wallet" onClick={onRedirect}>
      <img src={addIcon} alt="Add wallet" />
    </button>
  );
};