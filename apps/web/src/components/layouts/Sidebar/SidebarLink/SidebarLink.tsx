
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ICON_SIDEBAR_PATH } from '../../../../constants/path';
import { useLanguage } from '../../../../hooks/useLanguage';

interface SidebarLinkProps {
  config: { name: string; to: string, icon: string }
}

export const SidebarLink: FC<SidebarLinkProps> = ({ config }) => {
  const location = useLocation();
  const { content } = useLanguage('sidebar');

  return (
    <li>
      <NavLink
        className={({ isActive }) => (`sidebar-option ${isActive && 'sidebar-option__active'}`)}
        to={config.to}
      >
        {location.pathname.includes(config.to)
            ? <img src={`${ICON_SIDEBAR_PATH}/${config.icon}-active.svg`} />
            : <img src={`${ICON_SIDEBAR_PATH}/${config.icon}.svg`} />
        }
        <p>{content[config.name.toLowerCase()]}</p>
      </NavLink>
    </li>
  );
};