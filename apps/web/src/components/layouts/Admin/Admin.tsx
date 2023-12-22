import './Admin.scss';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Suspense } from 'react';
import { ScreenLoading } from './ScreenLoading/ScreenLoading';

export const Admin = () => {
  return (
    <main className="admin">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <section className="admin-content__section">
          <Suspense fallback={<ScreenLoading />}>
            <Outlet />
          </Suspense>
        </section>
      </div>
    </main>
  );
}; 