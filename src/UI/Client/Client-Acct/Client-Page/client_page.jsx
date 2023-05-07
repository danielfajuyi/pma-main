import "./client_page.scss";

// Sidebar Navigation Icons --> [START]
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineContactPhone,
  MdOutlineDashboard,
  MdOutlineLiveHelp,
  MdOutlineReviews,
  MdOutlinePostAdd,
} from "react-icons/md";
import { RiUserSearchLine, RiMessage2Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
//[END]

// Components (The Sidebar, Topbar and Background)  --> [START]
import DashboardSidebar from "../../../../Components/Dashboard/Sidebar/sidebar";
import DashboardTopbar from "../../../../Components/Dashboard/Topbar/topbar";
import Background from "../../../../Components/Dashboard/Background/background";
//[END]

// Custom Hooks  --> [START]
import useMediaQuery from "../../../../custom_hooks/useMediaQuery";
//[END]

// Other External NPM Packages --> [START]
import _ from "lodash";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//[END]

//--> importing notification component
import Notification from "../../../Notification/Notification";

const ClientPage = ({ showNavbar, setShowNavbar, setClientPage, setNotice, notice }) => {
  const user = useSelector((state) => state.user.currentUser);

  const [toggleNotice, setToggleNotice] = useState(false); //--> toggle Notification open or close

  // Using Hooks  --> [START]
  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const mQ = useMediaQuery("(min-width: 1050px)");

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname === "/clientpage" || loc.pathname === "/clientpage/") {
      navigate("dashboard");
    }
  }, [loc.pathname, navigate]); // --> Redirecting to the dashboard

  //[END]

  // Array For Composing Sidebar Navigation -> (Sidebar Componet) --> [START]
  const topList = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, path: "dashboard" },
    { name: "Profile", icon: <CgUserList />, path: "profile/" + user._id },
    { name: "Post Job", icon: <MdOutlinePostAdd />, path: "post-a-job" },
    { name: "Find Models", icon: <RiUserSearchLine />, path: "/find-model" },
    { name: "Wallet", icon: <RiUserSearchLine />, path: "wallet" },
    {
      name: "Review",
      icon: <MdOutlineReviews />,
      children: [
        { name: "Write Review", path: "review/writereview" },
        { name: "Reviews", path: "review/reviews" },
        { name: "Report", path: "review/report" },
      ],
    },
    { name: "Settings", icon: <IoSettingsOutline />, path: "/client-Acct-setting" },
  ];

  const bottomList = [
    { name: "Help", icon: <MdOutlineLiveHelp />, path: "/faqs" },
    { name: "Contact us", icon: <MdOutlineContactPhone />, path: "/contact" },
    { name: "Log out", icon: <BiLogOut />, path: "" },
  ];
  //[END]

  // Button Component -> (Topbar Component) --> [START]
  const button = (
    <motion.div whileTap={{ scale: 0.94 }}>
      <Link to="/clientpage/post-a-job">
        <button id="nav_button">Post Job</button>
      </Link>
    </motion.div>
  );
  //[END]

  return (
    !showNavbar && (
      <>
        <div id="client_page">
          {/* Client Page Sidebar Navigation --> [START] */}
          {mQ ? (
            <DashboardSidebar top={topList} bottom={bottomList} />
          ) : sidebarVisibility ? (
            <Background childState={setSidebarVisibility}>
              <DashboardSidebar
                top={topList}
                bottom={bottomList}
                setSidebarVisibility={setSidebarVisibility}
              />
            </Background>
          ) : null}
          {/* [END] */}

          <main>
            {/* Model Page Topbar --> [START] */}
            {user.isUpdated && user?.isVerified && (
              <DashboardTopbar
                lastItem={button}
                sidebarVisibility={sidebarVisibility}
                setSidebarVisibility={setSidebarVisibility}
                setPage={setClientPage}
                setToggleNotice={setToggleNotice}
                notice={notice}
              />
            )}
            {/* [END] */}

            {/* Render The Current Sidebar Navigation Link --> [START] */}
            <Outlet />
            {/* [END] */}

            <Notification
              toggleNotice={toggleNotice}
              setToggleNotice={setToggleNotice}
              notice={notice}
              setNotice={setNotice}
            />
          </main>
        </div>
      </>
    )
  );
};

export default ClientPage;
