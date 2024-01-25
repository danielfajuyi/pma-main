import "./topbar.scss";

import { IoSettingsOutline } from "react-icons/io5";
import useMediaQuery from "../../../custom_hooks/useMediaQuery";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";

const SettingsTopbar = ({ setSidebarVisibility, sidebarVisibility, setToggleNotice }) => {
  const { notification } = useSelector((state) => state.notification);
  const { message } = useSelector((state) => state.message);

  let mQ = useMediaQuery("(min-width: 540px)");

  return (
    <nav id="topbar">
      <div id="left">
        <h2 className="topbar-title">Settings</h2>
      </div>

      <IconContext.Provider value={{ size: mQ ? 32 : 26 }}>
        <div id="icons_holder">
          <motion.div
            id="notification"
            whileTap={{ scale: 0.8 }}
            onClick={() => setSidebarVisibility(!sidebarVisibility)}>
            <IoSettingsOutline id="bars" />
          </motion.div>
        </div>
      </IconContext.Provider>
    </nav>
  );
};

export default SettingsTopbar;
