import './UserProfile.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { arrowIcon } from '../../../../constants/assets/headerAssets';

export const UserProfile = () => {

  const logout = () => {
    console.log('logout ...');
  }

  return (
    <div className="user-profile">
      <div className="user__icon">
        <img
          src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000"
          alt="profile-icon"
        />
      </div>
      <div className="user__range">
        <h2>Edgar Salas</h2>
        <p> Administrador</p>
      </div>

      <div className="user__arrow-icon">
        <button onClick={logout}>
          <img
            src={arrowIcon}
            alt="arrow-user-icon"
          />
        </button>
      </div>
    </div>
  );
};