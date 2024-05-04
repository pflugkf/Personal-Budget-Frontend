import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import HomePage from '../HomePage/HomePage';
import DashboardPage from '../DashboardPage/DashboardPage';
import Footer from '../Footer/Footer';

const Routes = () => {
  const { token } = useAuth();

/*   // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ]; */

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;