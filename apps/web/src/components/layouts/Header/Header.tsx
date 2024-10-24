import './Header.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findAdminRoute } from '../../../routes/routes';
import { UserProfile } from './UserProfile/UserProfile';
import { NotificationButton } from './Notification/NotificationButton/NotificationButton';
import { useLanguage } from '../../../hooks/useLanguage';

export const Header = () => {
  const location = useLocation();
  const { content } = useLanguage('sidebar');

  const [routeName, setRouteName] = useState('');

  useEffect(() => {
    const route = findAdminRoute(location.pathname);
    setRouteName(route.name);
  }, [location.pathname]);

  return (
    <header className="header">
      <h1 className="header__title">{content[routeName.toLowerCase()]}</h1>
      <div className="header__features">
        <NotificationButton />
        <UserProfile />
      </div>
    </header>
  );
};