import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/navbar";
import About from "../Pages/About/about";
import Contact from "../Pages/Contact/contact";
import FAQs from "../Pages/Faqs/Faq";
import FindModel from "../Pages/FindModel/find-model";
import JobPost from "../Pages/JobPost/JobPost";
import JobPostForm from "../Pages/JobPost/JobPostForm/JobPostForm";
import Home from "../Pages/Home/home";
import HowItWorks from "../Pages/HowItWorks/HowItWorks";
import LoginForm from "../Pages/LoginSignup/Login/Login-Form";
import SignUp from "../Pages/LoginSignup/Sign-Up/Sign-up";
import NotFound from "../Pages/NotFound/notfound";
import AdminPage from "../UI/Admin-UI/AdminPage/admin_page";
import AdminDashboard from "../UI/Admin-UI/AdminPage/dashboard/dashboard";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/apiCalls";
import Blogs from "../Pages/Blog/Blogs";
import Single from "../Pages/Blog/Single";
import { Notice } from "../Data/Data-db.js";

//importing agency components
import AgencyAcct from "../UI/Agency/Agency-Acct/Agency-Acct";
import AgencyDashboard from "../UI/Agency/Agency-Acct/Agency-Page/dashboard/dashboard";
import AgencyProfile from "../UI/Agency/AgencyProfile/agency_profile";
import AgencyModels from "../UI/Agency/AgencyListing/AgencyModels";

//importing models components
import ModelDashboard from "../UI/Model/Models-Acct/Model-Page/dashboard/dashboard";
import ModelsAcct from "../UI/Model/Models-Acct/Models-Acct";
import ModelPortfolio from "../UI/Model/ModelPortfolio/ModelPortfolio";
import ProfilePage from "../Pages/FindModel/Models-Profile-page/Profile-Page";
import MyWallet from "../UI/Model/Models-Acct/Model-Page/wallet/my_wallet";
import Review from "../UI/Model/Models-Acct/Model-Page/review/review";
import WriteReview from "../UI/Model/Models-Acct/Model-Page/review/write_review";
import Reviews from "../UI/Model/Models-Acct/Model-Page/review/view_reviews";
import ModelSubscription from "../UI/Model/Models-Acct/Model-Page/subscription/subscription";
//import ModelsForms from "../UI/Model/Models-Acct/Kyc-Section/Models-Kyc-Forms";

//importing clients components
import ClientDashboard from "../UI/Client/Client-Acct/Client-Page/dashboard/dashboard";
import ClientsAcct from "../UI/Client/Client-Acct/Client-Acct";
import ClientProfile from "../UI/Client/ClientProfile/ClientProfile";

export const BaseRoutes = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [notice, setNotice] = useState(Notice.notification); //--> notification data state
  const [modelPage, setModelPage] = useState("dashboard");

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
          path: "blog/",
          element: <Blogs />,
        },
        {
          path: "post/:id",
          element: <Single />,
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
          element: <AdminPage showNavbar={showNavbar} setShowNavbar={setShowNavbar} />,
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
              <AgencyAcct
                user={user}
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
                setNotice={setNotice}
                notice={notice}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <AgencyDashboard showNavbar={showNavbar} setShowNavbar={setShowNavbar} />,
            },
            {
              path: "profile",
              element: <AgencyProfile />,
            },
            {
              path: "listing/",
              children: [
                {
                  path: "add",
                  element: <></>,
                },
                {
                  path: "manage",
                  element: <AgencyModels />,
                },
              ],
            },
          ],
        },
        {
          path: "modelpage/",
          element: (
            <ProtectedRoute>
              <ModelsAcct
                user={user}
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
                setNotice={setNotice}
                notice={notice}
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
              element: <ModelPortfolio setModelPage={setModelPage} />,
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
            // {
            //   path: "notification/:id",
            //   element: <JobNotice />,
            // },
            // {
            //   path: "chat/:id",
            //   element: <Chats />,
            // },
          ],
        },
        {
          path: "clientpage/",
          element: (
            <ProtectedRoute>
              <ClientsAcct
                user={user}
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
                setNotice={setNotice}
                notice={notice}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <ClientDashboard />,
            },
            {
              path: "profile/:id",
              element: <ClientProfile />,
            },
            {
              path: "post-a-job",
              element: <JobPostForm />,
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
              path: "subscription",
              element: <ModelSubscription />,
            },
          ],
        },
        // {
        //   path: "profile/:id",
        //   element: (
        //     <ProtectedRoute>
        //       <ClientProfile />
        //     </ProtectedRoute>
        //   ),
        // },
        // {
        //   path: "/jobpost/post-a-job",
        //   element: (
        //     <ProtectedRoute>
        //       <JobPostForm />
        //     </ProtectedRoute>
        //   ),
        // },
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
