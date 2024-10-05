import { toRoutes } from './routes';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthorizationToken } from '../helpers/authorization';

export const PublicRoutes = () => {
  const authorization = getAuthorizationToken();

  if (authorization) {
    return <Navigate to={toRoutes.dashboard} />
  }

  return <Outlet />
}