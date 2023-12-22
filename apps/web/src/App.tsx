import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

import { adminRoutes } from './routes/routes';
import { SignIn } from './views/auth/SignIn/SignIn';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { Admin } from './components/layouts/Admin/Admin';

import './App.scss';
import { PublicRoutes } from './routes/PublicRoutes';

const App = () => {
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

            <Route path="*" element={<Navigate to="dashboard" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
