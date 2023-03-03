import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/navbar";
import About from "../Pages/About/about";
import Contact from "../Pages/Contact/contact";
import FAQs from "../Pages/Faqs/Faq";
import FindModel from "../Pages/FindModel/find-model";
import JobPost from "../Pages/JobPost/JobPost";
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
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/apiCalls";
import ModelsForms from "../UI/Model/Models-Acct/Kyc-Section/Models-Kyc-Forms";
import ProfilePage from "../Pages/FindModel/Models-Profile-page/Profile-Page";
import ModelPortfolio from "../UI/Model/ModelPortfolio/ModelPortfolio";
import SeeModels from "../Components/SeeModels/see_models";
import ClientProfile from "../UI/Client/ClientProfile/ClientProfile";
import AcctSetting from "../UI/Client/Client-Acct/Acct-Setting/Client-Acct-Setting";

export const BaseRoutes = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // automatically logout a user when session expires
  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    if (user) {
      const token = user.accessToken;
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
          return alert("Session expired! kindly login again to continue");
        }
      }
    }
  });

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
          path: "find-model/",
          element: <FindModel />,
        },
        {
          path: "jobpost/*",
          element: <JobPost />,
        },
        {
          path: "find-model/profile/:id",
          element: <ProfilePage />,
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
              path: "profile/:id",
              element: <ModelPortfolio />,
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
              path: "findmodels",
              element: <FindModel />,
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
              path: "settings",
              element: <AcctSetting />,
            },
            {
              path: "subscription",
              element: <ModelSubscription />,
            },
          ],
        },
        {
          path: "profile/:id",
          element: (
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "login",
      element: !user ? (
        <LoginForm />
      ) : (
        <Navigate
          to={
            user?.role === "agency"
              ? "/agencypage"
              : user?.role === "model"
              ? "/modelpage"
              : "/clientpage"
          }
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
