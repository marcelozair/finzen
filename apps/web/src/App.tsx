import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from './views/auth/SignIn/SignIn';
import { SignUp } from './views/auth/SignUp/SignUp';

import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { Admin } from './components/layouts/Admin/Admin';
import { adminRoutes, profielRoutes } from './routes/routes';

import './App.scss';
import { SelectLanguage } from './components/shared/SelectLanguage/SelectLanguage';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" expand={true} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
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
        </Route>

        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>

      {/* <SelectLanguage /> */}
    </BrowserRouter>
  );
};

export default App;
