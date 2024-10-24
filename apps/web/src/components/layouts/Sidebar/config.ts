import { toRoutes } from '../../../routes/routes';

export const sidebar = {
  menu: [
    {
      name: 'Dashboard',
      icon: 'dashboard-icon',
      to: toRoutes.dashboard,
    },
    {
      name: 'Wallets',
      icon: 'wallet-icon',
      to: toRoutes.wallet,
    },
    {
      name: 'Goals',
      icon: 'star-icon',
      to: toRoutes.goals,
    },
  ],
  config: [
    {
      name: 'Configuraciones',
      icon: 'configuration-icon',
      to: 'none',
    },
    {
      name: 'Ayuda',
      icon: 'help-icon',
      to: 'none',
    },
  ]
}