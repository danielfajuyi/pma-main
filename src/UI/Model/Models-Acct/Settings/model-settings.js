import "./model-settings.scss";
import "./model-settings.css";

// Sidebar Navigation Icons --> [START]
import {
  MdOutlineLiveTv,
  MdOutlineFilter,
  MdOutlineBarChart,
  MdOutlineLiveHelp,
  MdOutlineContactPhone,
} from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { CgUserList } from "react-icons/cg"; //[END]

// Components (The Sidebar, Topbar and Background)  --> [START]
import SettingsSidebar from "../../../../Components/Settings/Sidebar/sidebar";
import SettingsTopbar from "../../../../Components/Settings/Topbar/topbar";
import Background from "../../../../Components/Dashboard/Background/background"; //[END]

// Custom Hooks  --> [START]
import useMediaQuery from "../../../../custom_hooks/useMediaQuery"; //[END]

// Other External NPM Packages --> [START]
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"; //[END]
import { useSelector } from "react-redux";

//--> importing notification component
import Notification from "../../../Notification/Notification";

const ModelPage = ({ showNavbar, setShowNavbar, setModelPage, setNotice, notice }) => {
  const user = useSelector((state) => state.user.currentUser);
  // Using Hooks  --> [START]

  const [toggleNotice, setToggleNotice] = useState(false); //--> toggle Notification open or close

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  const [sidebarVisibility, setSidebarVisibility] = useState(false); //--> Toggle Sidebar Navigation
  const mQ1050px = useMediaQuery("(min-width: 768px)");

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname === "/model-Acct-setting" || loc.pathname === "/model-Acct-setting/") {
      navigate("profile");
    } else if (loc.pathname === "/model-Acct-setting/wallet") {
      navigate("wallet");
    }
  }, [loc.pathname, navigate]); // --> Redirecting to the dashboard
  //[END]

  // Array For Composing Sidebar Navigation -> (Sidebar Componet) --> [START]
  const topList = [
    { name: "Profile", icon: <CgUserList />, path: "profile" },
    { name: "Stats", icon: <MdOutlineBarChart />, path: "stats" },

    {
      name: "Photos",
      icon: <MdOutlineFilter />,
      path: "photos",
    },
    {
      name: "Videos",
      icon: <MdOutlineLiveTv />,
      path: "videos",
    },
    { name: "Wallet", icon: <BiWallet />, path: "wallet" },
    {
      name: "Logins",
      icon: <HiStatusOnline />,
      path: "logins",
    },
  ];
  const bottomList = [
    { name: "Help", icon: <MdOutlineLiveHelp />, path: "/faqs" },
    { name: "Contact us", icon: <MdOutlineContactPhone />, path: "/contact" },
    { name: "Log out", icon: <BiLogOut />, path: "" },
  ];
  //[END]

  return (
    !showNavbar && (
      <div id="model-settings">
        {/* Model Page Sidebar Navigation --> [START] */}
        {mQ1050px ? (
          <SettingsSidebar top={topList} bottom={bottomList} />
        ) : sidebarVisibility ? (
          <Background childState={setSidebarVisibility}>
            <SettingsSidebar
              top={topList}
              bottom={bottomList}
              setSidebarVisibility={setSidebarVisibility}
            />
          </Background>
        ) : null}
        {/*[END] */}

        <main className="model-setting-main">
          {/* Model Page Topbar --> [START] */}
          <SettingsTopbar
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
            setPage={setModelPage}
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

export default ModelPage;
