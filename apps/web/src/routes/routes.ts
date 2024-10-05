import { LazyExoticComponent, lazy } from 'react';


export type ReactView = () => JSX.Element;
export type LazyReactView = LazyExoticComponent<() => JSX.Element>

export interface RouteApp {
  to: string;
  path: string;
  name: string;
  Component: LazyReactView;
}

const WalletLazy = lazy(() => import('../views/admin/Wallet/Wallet'));
const DashboardLazy = lazy(() => import('../views/admin/Dashboard/Dashboard'));
const CreateProfileLazy = lazy(() => import('../views/auth/CreateProfile/CreateProfile'));

export const toRoutes = {
  signIn: '/sign-in',
  signUp: '/sign-up',

  dashboard: '/admin/dashboard',
  wallet: '/admin/wallet',
  createWallet: '/admin/wallet/create',

  createProfile: '/profile/create',
} 

export const adminRoutes: RouteApp[] = [
  {
    to: toRoutes.dashboard,
    path: 'dashboard',
    name: 'Dashboard',
    Component: DashboardLazy,
  },
  {
    to: toRoutes.wallet,
    path: 'wallet/*',
    name: 'Wallet',
    Component: WalletLazy,
  },
];

export const profielRoutes: RouteApp[] = [
  {
    to: toRoutes.createProfile,
    path: 'create',
    name: 'Create Profile',
    Component: CreateProfileLazy,
  }
]

export const findAdminRoute = (pathname: string): RouteApp => {
  const route = adminRoutes.find(({ name }) => pathname.includes(name.toLocaleLowerCase()));
  if (route) return route;
  return adminRoutes[0];
};

// export default routes;