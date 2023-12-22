import './Sidebar.scss';

import { sidebar } from './config';
import { useLocation } from 'react-router-dom';
import { SidebarLink } from './SidebarLink/SidebarLink';
import { ICON_SIDEBAR_PATH, LOGO_IMAGE } from '../../../constants/path';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <picture className="app-logo-container">
        <img className="app-logo" src={LOGO_IMAGE} />
      </picture>

      <nav className="sidebar-nav">
        <section>
          <h3 className="nav-title">MENÚ</h3>
          <ul>{sidebar.menu.map((config) => (<SidebarLink key={config.name} config={config} />))}</ul>
        </section>

        <section>
          <h3 className="nav-title">AYUDA</h3>
          <ul>
            {sidebar.config.map((config) => (<SidebarLink key={config.name} config={config} />))}
            <li>
              <button className="sidebar-option">
                <img src={`${ICON_SIDEBAR_PATH}/oscuro-icon.svg`} />
                <p>Modo oscuro</p>
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </aside>
  );
};