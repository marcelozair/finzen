import { toRoutes } from '../../../routes/routes';

export const sidebar = {
  menu: [
    {
      name: 'Dashboard',
      icon: 'dashboard-icon',
      to: toRoutes.dashboard,
    },
    {
      name: 'Wallet',
      icon: 'wallet-icon',
      to: toRoutes.wallet,
    },
    // Prestamos
    // Creditos
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