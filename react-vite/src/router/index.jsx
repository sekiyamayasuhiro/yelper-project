import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginFormModal from "../components/LoginFormModal";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import BusinessesIndex from "../components/BusinessesIndex";
import HomePage from '../components/HomePage/HomePage'
import CreateBusinessForm from "../components/CreateBusinessForm";
import ManageBusinesses from "../components/ManageBusinesses";
import BusinessDetails from "../components/BusinessDetails";
import UpdateBusinessForm from "../components/UpdateBusinessForm";
import ManageReviews from "../components/ManageReviews";
import CreateReviewFormModal from "../components/CreateReviewFormModal";
import ReviewForm from "../components/Reviews/ReviewForm";
import ReviewShare from "../components/Reviews/ReviewShare";
import Testing from "../components/Testing";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                // element: <BusinessesIndex />,
                element: <HomePage />
            },
            {
                path: 'review_share',
                element: <ReviewShare />
            },
            {
                path: "businesses",
                element: <Outlet />,
                children: [
                    {
                        index: true, // This makes BusinessesIndex the default component
                        element: <BusinessesIndex />,
                    },
                    {
                        path: "new",
                        element: <CreateBusinessForm />,
                    },
                    {
                        path: "current",
                        element: <ManageBusinesses />,
                    },
                    {
                        path: ":businessId",
                        element: <BusinessDetails />,
                    },
                    {
                        path: ":businessId/edit",
                        element: <UpdateBusinessForm />,
                    },
                    {
                        path: ':businessId/writeareview',
                        element: <ReviewForm />
                    },

                    // {
                    //     path: ":businessId/add-image",
                    //     element: <CreateImageFormModal />,
                    // },
                ],
            },
            {
                path: 'reviews/new',
                element: <CreateReviewFormModal />
            },
            {
                path: "reviews/current",
                element: <ManageReviews />,
            },
            {
                path: "login",
                element: <LoginFormModal />,
            },
            {
                path: "signup",
                element: <SignupFormPage />,
            },
            {
                path: "testing",
                element: <Testing />,
            },
        ],
    },
]);
