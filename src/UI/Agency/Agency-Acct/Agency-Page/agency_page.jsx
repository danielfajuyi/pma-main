import "./agency_page.scss";

// Sidebar Navigation Icons --> [START]
import { IoListOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineContactPhone,
  MdOutlineDashboard,
  MdOutlineLiveHelp,
  MdOutlineReviews,
} from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiUserSearchLine } from "react-icons/ri";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
// [END]

// Components (The Sidebar, Topbar and Background)  --> [START]
import DashboardSidebar from "../../../../Components/Dashboard/Sidebar/sidebar";
import DashboardTopbar from "../../../../Components/Dashboard/Topbar/topbar";
import Background from "../../../../Components/Dashboard/Background/background";
// [END]

// Custom Hooks  --> [START]
import useMediaQuery from "../../../../custom_hooks/useMediaQuery";
//[END]

// Other External NPM Packages --> [START]
import _ from "lodash";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
//[END]

//--> importing notification component
import Notification from "../../../Notification/Notification";

const AgencyPage = ({ showNavbar, setShowNavbar, setAgencyPage, setNotice, notice }) => {
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
    if (loc.pathname === "/agencypage" || loc.pathname === "/agencypage/") {
      navigate("dashboard");
    }
  }, [loc.pathname, navigate]); // --> Redirecting to the dashboard
  //[END]

  // Array For Composing Sidebar Navigation -> (Sidebar Componet) --> [START]
  const topList = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, path: "dashboard" },
    { name: "Profile", icon: <CgUserList />, path: "profile" },
    { name: "My Wallet", icon: <BiWallet />, path: "mywallet" },
    {
      name: "Listing",
      icon: <IoListOutline />,
      children: [
        { name: "Add model", path: "/model-kyc" },
        { name: "Manage models", path: "listing/manage" },
      ],
    },
    { name: "Find Models", icon: <RiUserSearchLine />, path: "/find-model" },
    {
      name: "Review",
      icon: <MdOutlineReviews />,
      children: [
        { name: "Write Review", path: "review/writereview" },
        { name: "Reviews", path: "review/reviews" },
        { name: "Report", path: "review/report" },
      ],
    },
    { name: "Community", icon: <HiOutlineUserGroup />, path: "/community" },
    { name: "Settings", icon: <IoSettingsOutline />, path: "/agency-Acct-setting" },
  ];
  const bottomList = [
    { name: "Help", icon: <MdOutlineLiveHelp />, path: "/faqs" },
    { name: "Contact us", icon: <MdOutlineContactPhone />, path: "/contact" },
    { name: "Log out", icon: <BiLogOut />, path: "" },
  ];
  // [END]

  // Button Component -> (Topbar Component) --> [START]
  const button = (
    <motion.div whileTap={{ scale: 0.94 }}>
      <button id="nav_button">Promote Model</button>
    </motion.div>
  );
  //   [END]

  return (
    !showNavbar && (
      <div id="agency_page">
        {/* Ageny Page Sidebar Navigation --> [START] */}
        {mQ1050px ? (
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
        {/*[END] */}

        <main>
          {/* Agency Page Topbar --> [START] */}
          <DashboardTopbar
            lastItem={button}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
            setPage={setAgencyPage}
            setToggleNotice={setToggleNotice}
            notice={notice}
          />
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
    )
  );
};

export default AgencyPage;
