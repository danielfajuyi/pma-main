import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/navbar";
import Test from "../Pages/Test/Test";
import About from "../Pages/About/about";
import Contact from "../Pages/Contact/contact";
import FAQs from "../Pages/Faqs/Faq";
import FindModel from "../Pages/FindModel/find-model";
import JobPost from "../Pages/JobPost/JobPost";
import JobPostForm from "../Pages/JobPost/JobPostForm/JobPostForm";
import Home from "../Pages/Home/home";
import HowItWorks from "../Pages/HowItWorks/HowItWorks";
import LoginSignup from "../Pages/LoginSignup/Login/Login";
import NotFound from "../Pages/NotFound/notfound";
import Terms from "../Pages/Terms/Terms";
import Privacy from "../Pages/Privacy/Privacy";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/apiCalls";
import Blogs from "../Pages/Blog/Blogs";
import Single from "../Pages/Blog/Single";
import Notice from "../Data/Data-db.json";
import Inbox from "../UI/Inbox/Inbox";
import AlertBox from "../UI/Alert-section/Alert-Box";

//importing agency components
import AgencyAcct from "../UI/Agency/Agency-Acct/Agency-Acct";
import AgencyAcctSetting from "../UI/Agency/Agency-Acct/Acct-Setting/Agency-Acct-Setting";
import AgencyDashboard from "../UI/Agency/Agency-Acct/Agency-Page/dashboard/dashboard";
import AgencyProfile from "../UI/Agency/AgencyProfile/agency_profile";
import AgencyModels from "../UI/Agency/AgencyListing/AgencyModels";

//importing models components
import ModelDashboard from "../UI/Model/Models-Acct/Model-Page/dashboard/dashboard";
import ModelsAcct from "../UI/Model/Models-Acct/Models-Acct";
import ModelAcctSetting from "../UI/Model/Models-Acct/Settings/model-settings";
import ModelPortfolio from "../UI/Model/ModelPortfolio/ModelPortfolio";
import ProfilePage from "../Pages/FindModel/Models-Profile-page/Profile-Page";
import Review from "../UI/Model/Models-Acct/Model-Page/review/review";
import WriteReview from "../UI/Model/Models-Acct/Model-Page/review/write_review";
import Reviews from "../UI/Model/Models-Acct/Model-Page/review/view_reviews";
import ModelSubscription from "../UI/Model/Models-Acct/Model-Page/subscription/subscription";
import ModelsForms from "../UI/Model/Models-Acct/Kyc-Section/Models-Kyc-Forms";

//importing models setting components
import ModelProfile from "../UI/Model/Models-Acct/Settings/Profile";
import ModelStats from "../UI/Model/Models-Acct/Settings/Stats";
import ModelPhotos from "../UI/Model/Models-Acct/Settings/Photos";
import ModelVideos from "../UI/Model/Models-Acct/Settings/Videos";
import ModelWallet from "../UI/Model/Models-Acct/Settings/Wallet-setting";
import ModelLogins from "../UI/Model/Models-Acct/Settings/Logins";

//importing clients components
import ClientDashboard from "../UI/Client/Client-Acct/Client-Page/dashboard/dashboard";
import ClientsAcct from "../UI/Client/Client-Acct/Client-Acct";
import ClientAcctSetting from "../UI/Client/Client-Acct/Acct-Setting/Client-Acct-Setting";
import ClientProfile from "../UI/Client/ClientProfile/ClientProfile";
import Chats from "../UI/Inbox/Chats/chats";
import JobNotice from "../UI/Notification/Job-Notice-Items";

import Wallet from "../Pages/Wallet/wallet-page";
import TransactionHistory from "../Pages/Wallet/History";

import AgencyPortfolio from "../UI/Agency/AgencyProfile/agency_portfolio";
import ClientPortfolio from "../UI/Client/ClientProfile/ClientPortfolio";
import AppPayment from "../Pages/webhook_payment/AppPayment";
import LoginSignups from "../Pages/LoginSignup/Login/Signup";
import Sidebar from "../Components/Sidebar/Sidebar";
import AccountDeletion from "../Pages/LoginSignup/Login/AccountDeletion";

export const BaseRoutes = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [toggleModal, setToggleModal] = useState(false);
  const [activeModel, setActiveModal] = useState("");

  const [notice, setNotice] = useState(Notice.notification); //--> notification data state

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
  }, []);

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

  //Pls don't delete this code
  //i want to use it for a correction----> Start
  function AlertModal() {
    /* modal section */
    return (
      <section
        style={{ transform: toggleModal && `translateX(${0}%)` }}
        className="alert-section"
      >
        {/* successful saving */}

        {activeModel === "save" && (
          <AlertBox
            title=" Saved"
            note=" All current changes made have been saved successfully!"
            icon={true}
            setToggleModal={setToggleModal}
          />
        )}

        {/* successful kyc text  */}

        {activeModel === "kyc" && (
          <AlertBox
            title="Successful"
            note="Your kyc form has been submitted successfully! Congrats and
              Welcome On Board!"
            icon={true}
            setToggleModal={setToggleModal}
          />
        )}

        {/*add image text  */}

        {activeModel === "add-photo" && (
          <AlertBox
            title="Add Photos"
            note="You're required to add six(6) work Photos, Polaroid photos(optional) and a CompCard(optional)"
            icon={false}
            setToggleModal={setToggleModal}
          />
        )}

        {/* trash image text */}

        {activeModel === "trash-photo" && (
          <AlertBox
            title="Delete Photos"
            note="You're required to have more than six(6) work photos to perform this Action!"
            icon={false}
            setToggleModal={setToggleModal}
          />
        )}
        {activeModel === "trash-polaroid" && (
          <AlertBox
            title="Delete Polaroids"
            note="You're required to have more than three(3) polaroid photos to perform this Action!"
            icon={false}
            setToggleModal={setToggleModal}
          />
        )}

        {/* category modal text */}

        {activeModel === "category" && (
          <AlertBox
            title=" Choose which type of model you suited!"
            note="You can only make a maximum of two choices from the list of
              categories."
            icon={false}
            setToggleModal={setToggleModal}
          />
        )}

        {/* job interest modal text */}

        {activeModel === "job" && (
          <AlertBox
            title="Choose the type of job you will be interest in!"
            note="You can make as many choices as you can from the list of job."
            icon={false}
            setToggleModal={setToggleModal}
          />
        )}
      </section>
    );
  }

  function handleModal(mode) {
    setActiveModal(mode);
    setToggleModal((prev) => !prev);
  }
  //---------------------------> end

  let allTransaction = [
    {
      id: 1,
      type: "debit",
      avatar: "/images/model (2).jpg",
      name: "fourwall magazine",
      brand: "brand",
      amount: 5000,
      date: "may-09-24",
      time: "08:25am",
    },
    {
      id: 2,
      type: "credit",
      avatar: "/images/model (4).jpg",
      name: "3touch photography",
      brand: "Photographer",
      amount: 8500,
      date: "may-09-24",
      time: "11:05pm",
    },
    {
      id: 3,
      type: "debit",
      avatar: "/images/model (12).jpg",
      name: "swavvy sashion",
      brand: "fashion design",
      amount: 15000,
      date: "may-09-24",
      time: "12:30am",
    },
    {
      id: 4,
      type: "credit",
      avatar: "/images/model (14).jpg",
      name: "fourwall magazine",
      brand: "brand",
      amount: 5000,
      date: "may-09-24",
      time: "03:00am",
    },
    {
      id: 5,
      type: "credit",
      avatar: "/images/model (20).jpg",
      name: "pixel world",
      brand: "graphics",
      amount: 2500,
      date: "may-09-24",
      time: "5:30am",
    },
    {
      id: 6,
      type: "debit",
      avatar: "/images/model (23).jpg",
      name: "3touch photography",
      brand: "Photographer",
      amount: 8500,
      date: "may-09-24",
      time: "01:10pm",
    },
    {
      id: 7,
      type: "credit",
      avatar: "/images/model (5).jpg",
      name: "swavvy sashion",
      brand: "fashion design",
      amount: 15000,
      date: "may-09-24",
      time: "5:30am",
    },
  ];

  const transactions = allTransaction.reverse();

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
          path: "test",
          element: <Test />,
        },

        {
          path: "sidebar/",
          element: (
            <Sidebar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          ),
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
          path: "find-client/profile/:id",
          element: <ClientPortfolio />,
        },
        {
          path: "find-agency/profile/:id",
          element: <AgencyPortfolio />,
        },
        {
          path: "faqs",
          element: <FAQs />,
        },
        {
          path: "terms-of-service",
          element: (
            <Terms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          ),
        },
        {
          path: "privacy",
          element: (
            <Privacy showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          ),
        },

        {
          path: "howitworks",
          element: <HowItWorks />,
        },
        {
          path: "inbox",
          element: (
            <ProtectedRoute>
              <Inbox showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
            </ProtectedRoute>
          ),
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
              element: (
                <AgencyDashboard
                  showNavbar={showNavbar}
                  setShowNavbar={setShowNavbar}
                />
              ),
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
            // models under agency portfolio
            {
              path: "profile/:id",
              element: <ModelPortfolio />,
            },
            {
              path: "chat/:id",
              element: <Chats />,
            },
            {
              path: "notification/:id",
              element: <JobNotice />,
            },
            {
              path: "mywallet",
              element: (
                <Wallet
                  transactions={transactions}
                  settings={"/Agency-Acct-setting"}
                  currentUser={"/agencypage"}
                />
              ),
            },
            {
              path: "transaction-history",
              element: (
                <TransactionHistory
                  transactions={transactions}
                  currentUser={"/agencypage"}
                />
              ),
            },
          ],
        },
        {
          path: "Agency-Acct-setting",
          element: (
            <AgencyAcctSetting
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
            />
          ),
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
              element: <ModelPortfolio />,
            },
            {
              path: "mywallet",
              element: (
                <Wallet
                  transactions={transactions}
                  settings={"/model-Acct-setting/wallet"}
                  currentUser={"/modelpage"}
                />
              ),
            },
            {
              path: "transaction-history",
              element: (
                <TransactionHistory
                  transactions={transactions}
                  currentUser={"/modelpage"}
                />
              ),
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
            {
              path: "notification/:id",
              element: <JobNotice />,
            },
            {
              path: "chat/:id",
              element: <Chats />,
            },
          ],
        },
        {
          path: "model-kyc",
          element: (
            <ModelsForms
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
            />
          ),
        },
        {
          path: "model-Acct-setting/:id",
          element: (
            <ModelAcctSetting
              handleModal={handleModal}
              AlertModal={AlertModal}
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
            />
          ),
          children: [
            { path: "profile", element: <ModelProfile /> },
            { path: "stats", element: <ModelStats /> },
            { path: "photos", element: <ModelPhotos /> },
            { path: "videos", element: <ModelVideos /> },
            { path: "wallet", element: <ModelWallet /> },
            { path: "logins", element: <ModelLogins /> },
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
              element: (
                <Wallet
                  transactions={transactions}
                  settings={"/Client-Acct-setting"}
                  currentUser={"/clientpage"}
                />
              ),
            },
            {
              path: "transaction-history",
              element: (
                <TransactionHistory
                  transactions={transactions}
                  currentUser={"/clientpage"}
                />
              ),
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
            {
              path: "chat/:id",
              element: <Chats />,
            },
            {
              path: "notification/:id",
              element: <JobNotice />,
            },
          ],
        },
        {
          path: "Client-Acct-setting",
          element: (
            <ClientAcctSetting
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
            />
          ),
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
      path: "signup",
      element: <LoginSignups />,
    },
    {
      path: "app/payment/model",
      element: <AppPayment />,
    },
    {
      path: "user/account/delete",
      element: <AccountDeletion />,
    },
    {
      path: "login",
      element: !user ? (
        <LoginSignup />
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
