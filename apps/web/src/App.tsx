import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from './views/auth/SignIn/SignIn';
import { addAxiosAuthorization } from './api/config';
import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { Admin } from './components/layouts/Admin/Admin';
import { adminRoutes, profielRoutes } from './routes/routes';

import './App.scss';

const App = () => {

  useEffect(() => {
    addAxiosAuthorization();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route path="admin" element={<Admin />}>
            {adminRoutes.map(({ path, Component  }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          <Route path="profile">
            {profielRoutes.map(({ path, Component  }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
