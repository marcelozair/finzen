import './UserProfile.scss';
import { arrowIcon, profile } from '../../../../constants/assets/headerAssets';
import { useAppSelector } from '../../../../store/hooks';
import { useDispatch } from 'react-redux';
import { removeSessionAction } from '../../../../store/modules/auth';
import { removeAuthorizationToken } from '../../../../helpers/authorization';
import { useNavigate } from 'react-router-dom';
import { toRoutes } from '../../../../routes/routes';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ auth }) => auth.user);

  const logOut = () => {
    removeAuthorizationToken();
    dispatch(removeSessionAction());

    navigate(toRoutes.signIn);
  }

  return (
    <div className="user-profile">
      <div className="user__icon">
        <img
          src={user?.picture || profile}
          alt="profile-icon"
        />
      </div>
      <div className="user__range">
        <h2>{user?.name}</h2>
        <p> Administrador</p>
      </div>

      <div className="user__arrow-icon">
        <button onClick={logOut}>
          <img
            src={arrowIcon}
            alt="arrow-user-icon"
          />
        </button>
      </div>
    </div>
  );
};