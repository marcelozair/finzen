import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { toRoutes } from './routes';
import { $authApi } from '../api/modules/auth';
import { setSessionAction } from '../store/modules/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeAuthorizationToken, setAuthorizationToken } from '../helpers/authorization';
import { ScreenLoading } from '../components/layouts/Admin/ScreenLoading/ScreenLoading';
import { addAxiosAuthorization } from '../api/config';

export const PrivateRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ auth }) => auth.user);

  useEffect(() => {
    addAxiosAuthorization();
    console.log('Validating private session ...');
  
    if (!user) {
      $authApi.session().then((response) => {
        setAuthorizationToken(response.token);
        dispatch(setSessionAction(response));
      }).catch(() => {
        removeAuthorizationToken();
        navigate(toRoutes.signIn);
      });
    }
  }, [user]);

  if (user) {
    return <Outlet />
  }

  return <ScreenLoading />;
}