import { FC, Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import AppPage from "./features/AppPage";
import { Home } from "./features/home/Home";
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import ResetPassword from './features/auth/components/ResetPassword';

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage/>
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      )
    },
    {
      path: '/',
      element: <Home/>
    }
  ];

  return useRoutes(routes);
}

export default AppRouter
