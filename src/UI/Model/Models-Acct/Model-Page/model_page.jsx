import "./model_page.scss";

// Sidebar Navigation Icons --> [START]
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineRssFeed,
  MdOutlineDashboard,
  MdOutlineReviews,
  MdOutlineLiveHelp,
  MdOutlineContactPhone,
} from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { CgUserList } from "react-icons/cg"; //[END]

// Components (The Sidebar, Topbar and Background)  --> [START]
import DashboardSidebar from "../../../../Components/Dashboard/Sidebar/sidebar";
import DashboardTopbar from "../../../../Components/Dashboard/Topbar/topbar";
import Background from "../../../../Components/Dashboard/Background/background"; //[END]
import Sidebar from "../../../../Components/Sidebar/Sidebar";
// Custom Hooks  --> [START]
import useMediaQuery from "../../../../custom_hooks/useMediaQuery"; //[END]

// Other External NPM Packages --> [START]
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"; //[END]
import { useSelector } from "react-redux";

//--> importing notification component
import Notification from "../../../Notification/Notification";
import { FaTimes } from "react-icons/fa";

const ModelPage = ({
  showNavbar,
  setShowNavbar,
  setModelPage,
  setNotice,
  notice,
  darkmode,
  HandleTheme,
}) => {
  const user = useSelector((state) => state.user.currentUser);
  // Using Hooks  --> [START]

  const [toggleNotice, setToggleNotice] = useState(false); //--> toggle Notification open or close

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  const [sidebarVisibility, setSidebarVisibility] = useState(false); //--> Toggle Sidebar Navigation
  const mQ1050px = useMediaQuery("(min-width: 1050px)");

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname === "/modelpage" || loc.pathname === "/modelpage/") {
      navigate("dashboard");
    }
  }, [loc.pathname, navigate]); // --> Redirecting to the dashboard
  //[END]

  // Array For Composing Sidebar Navigation -> (Sidebar Componet) --> [START]
  const topList = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard className="icon" />,
      path: "dashboard",
    },
    {
      name: "Profile",
      icon: <CgUserList className="icon" />,
      path: "profile/" + user._id,
    },
    {
      name: "My Wallet",
      icon: <BiWallet className="icon" />,
      path: "mywallet",
    },
    // {
    //   name: "Review",
    //   icon: <MdOutlineReviews />,
    //   children: [
    //     { name: "Write Review", path: "review/writereview" },
    //     { name: "Reviews", path: "review/reviews" },
    //     { name: "Report", path: "review/report" },
    //   ],
    // },
    {
      name: "Subscription",
      icon: <MdOutlineRssFeed className="icon" />,
      path: "subscription",
    },
    {
      name: "Community",
      icon: <HiOutlineUserGroup className="icon" />,
      path: "community",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline className="icon" />,

      path: "/model-Acct-setting/" + user._id,
    },

    {
      name: "Close Bar",
      icon: <FaTimes className="icon" />,
      close: false,
    },
  ];
  const bottomList = [
    {
      name: "Help",

      icon: <MdOutlineLiveHelp className="icon" />,
      path: "/faqs",
    },
    {
      name: "Contact us",

      icon: <MdOutlineContactPhone className="icon" />,
      path: "/contact",
    },
    { name: "Log out", icon: <BiLogOut className="icon" />, path: "" },
  ];
  //[END]

  // Button Component -> (Topbar Component) --> [START]
  const button = (
    <motion.button whileTap={{ scale: 0.96 }} id="nav_button">
      Promote Portfolio
    </motion.button>
  );
  //[END]

  return (
    !showNavbar && (
      <div
        className={
          darkmode
            ? "model_page  dashboards-styles  darkmode"
            : " model_page  dashboards-styles"
        }
      >
        {/* Model Page Sidebar Navigation --> [START] */}
        {mQ1050px ? (
          <Sidebar
            topList={topList}
            darkmode={darkmode}
            HandleTheme={HandleTheme}
            bottomList={bottomList}
            setSidebarVisibility={setSidebarVisibility}
          />
        ) : sidebarVisibility ? (
          <Background childState={setSidebarVisibility}>
            <Sidebar
              topList={topList}
              darkmode={darkmode}
              HandleTheme={HandleTheme}
              bottomList={bottomList}
              setSidebarVisibility={setSidebarVisibility}
            />
          </Background>
        ) : null}
        {/*[END] */}

        <main
          className={
            darkmode ? " dashboards-styles  darkmode " : "dashboards-styles "
          }
        >
          {/* Model Page Topbar --> [START] */}
          <DashboardTopbar
            lastItem={button}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
            setPage={setModelPage}
            setToggleNotice={setToggleNotice}
            notice={notice}
          />
          {/* [END] */}

          {/* Render The Current Sidebar Navigation Link --> [START] */}
          <Outlet darkmode={darkmode} HandleTheme={HandleTheme} />
          {/* [END] */}

          <Notification
            toggleNotice={toggleNotice}
            setToggleNotice={setToggleNotice}
            notice={notice}
            setNotice={setNotice}
          />
        </main>
      </div>
    )
  );
};

export default ModelPage;
