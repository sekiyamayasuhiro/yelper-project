import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BusinessesIndex from '../components/BusinessesIndex';
import CreateBusinessForm from '../components/CreateBusinessForm';
import ManageBusinesses from '../components/ManageBusinesses';
import BusinessDetails from '../components/BusinessDetails';
import UpdateBusinessForm from '../components/UpdateBusinessForm';
import ManageReviews from '../components/ManageReviews';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <BusinessesIndex />,
      },
      {
        path: "businesses",
        element: <Outlet />,
        children: [
          {
            path: "new",
            element: <CreateBusinessForm />
          },
          {
            path: "current",
            element: <ManageBusinesses />
          },
          {
            path: ":businessId",
            element: <BusinessDetails />
          },
          {
            path: ":businessId/edit",
            element: <UpdateBusinessForm />
          }
        ]
      },
      {
        path: "reviews/current",
        element: <ManageReviews />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
