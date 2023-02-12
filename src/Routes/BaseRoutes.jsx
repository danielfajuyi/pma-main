import { useState } from "react";
import Navbar from "../Components/Navbar/navbar";
import About from "../Pages/About/about";
import Contact from "../Pages/Contact/contact";
import FAQs from "../Pages/Faqs/Faq";
import FindModel from "../Pages/FindModel/find-model";
import Home from "../Pages/Home/home";
import HowItWorks from "../Pages/HowItWorks/HowItWorks";
import LoginForm from "../Pages/LoginSignup/Login/Login-Form";
import SignUp from "../Pages/LoginSignup/Sign-Up/Sign-up";
import NotFound from "../Pages/NotFound/notfound";
import AdminPage from "../UI/Admin-UI/AdminPage/admin_page";
import AdminDashboard from "../UI/Admin-UI/AdminPage/dashboard/dashboard";
import AgencyPage from "../UI/Agency/AgencyPage/agency_page";
import AgencyDashboard from "../UI/Agency/AgencyPage/dashboard/dashboard";
import ModelPage from "../UI/Model/ModelPage/model_page";
import ModelDashboard from "../UI/Model/ModelPage/dashboard/dashboard";
import MyWallet from "../UI/Model/ModelPage/wallet/my_wallet";
import Review from "../UI/Model/ModelPage/review/review";
import WriteReview from "../UI/Model/ModelPage/review/write_review";
import Reviews from "../UI/Model/ModelPage/review/view_reviews";
import ModelSubscription from "../UI/Model/ModelPage/subscription/subscription";
import ClientPage from "../UI/Client/ClientPage/client_page";
import ClientDashboard from "../UI/Client/ClientPage/dashboard/dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

export const BaseRoutes = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const Layout = () => {
    return (
      <div className="app">
        {showNavbar && <Navbar />}
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "find-model",
          element: <FindModel />,
        },
        {
          path: "faqs",
          element: <FAQs />,
        },
        {
          path: "howitworks",
          element: <HowItWorks />,
        },
        {
          path: "adminpage/",
          element: (
            <AdminPage showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          ),
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
          ],
        },
        {
          path: "agencypage/",
          element: (
            <ProtectedRoute>
              <AgencyPage
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <AgencyDashboard />,
            },
          ],
        },
        {
          path: "modelpage/",
          element: (
            <ProtectedRoute>
              <ModelPage
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <ModelDashboard />,
            },
            {
              path: "mywallet",
              element: <MyWallet />,
            },
            {
              path: "review/",
              element: <Review />,
              children: [
                {
                  path: "writereview",
                  element: <WriteReview />,
                },
                {
                  path: "reviews",
                  element: <Reviews />,
                },
              ],
            },
            {
              path: "subscription",
              element: <ModelSubscription />,
            },
          ],
        },
        {
          path: "clientpage/",
          element: (
            <ProtectedRoute>
              <ClientPage
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <ClientDashboard />,
            },
            {
              path: "mywallet",
              element: <MyWallet />,
            },
            {
              path: "review/",
              element: <Review />,
              children: [
                {
                  path: "writereview",
                  element: <WriteReview />,
                },
                {
                  path: "reviews",
                  element: <Reviews />,
                },
              ],
            },
            {
              path: "subscription",
              element: <ModelSubscription />,
            },
          ],
        },
      ],
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "login",
      element: !user ? <LoginForm /> : <Navigate to={user?.role === "agency" ? "/agencypage" : user?.role === "model" ? "/modelpage" : "/clientpage"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
