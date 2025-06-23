import { FC, JSX, ReactNode, Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import AppPage from "./features/AppPage";
import { Home } from "./features/home/Home";
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import ResetPassword from './features/auth/components/ResetPassword';
import ProtectedRoute from "./features/ProtectedRoute";
import Error from "./features/error/Error";
import BuyerDasboard from "./features/buyer/components/Dashboard";
import AddSeller from "./features/sellers/components/add/AddSeller";

const Layout = ({backgroundColor = '#ffffff', children}: {backgroundColor: string, children: ReactNode}): JSX.Element => (
  <div style={{backgroundColor}} className="flex flex-grow">
    {children}
  </div>
);

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
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Home/>
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <BuyerDasboard/>
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <AddSeller/>
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Error/>
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
}

export default AppRouter
