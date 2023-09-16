import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import {
  Alarm,
  ChevronRight,
  Close,
  HeartBroken,
  Home,
  Logout,
  PieChart,
  Search,
  ShowChart,
  Wallet,
} from "@mui/icons-material";

import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

import logo from "../../Images/dashboard/logo.png";

import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import { FaBars, FaTimes } from "react-icons/fa";
import useMediaQuery from "../../custom_hooks/useMediaQuery";

const Sidebar = ({ topList, bottomList, setSidebarVisibility }) => {
  const navigate = useNavigate();
  const mQ1050px = useMediaQuery("(min-width: 1050px)");

  const [close, setClose] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
    window.location.reload();
  };

  const handleDarkMode = () => {
    setDarkmode(!darkmode);
  };

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <>
      <div
        className={darkmode ? "sidebar-container dark" : "sidebar-container"}
        id={close ? "close-sidebar" : ""}
      >
        <nav className={close ? "sidebar-menu close" : "sidebar-menu"}>
          <header>
            <div class="sidebar-info-wrapper">
              <span className="sidebar-image">
                <img src={logo} alt="Premium Model" />
              </span>

              <div
                className={
                  close
                    ? "sidebar-text close header-text"
                    : "sidebar-text header-text"
                }
              >
                <span className="name">Premium Models</span>
              </div>
            </div>

            <ChevronRight
              className={
                close ? "sidebar-toggle toggle-close " : "sidebar-toggle"
              }
              id={
                darkmode && !close ? "toggle-dark" : "toggle-dark toggle-close"
              }
              onClick={handleClose}
            />
          </header>

          <main className="main-links">
            <div className="top-content">
              {/* <li className="nav-search-box">
                <Search className="icon" />
                <input type="search" placeholder="Search..."></input>
              </li> */}
              <ul className="navigate-links">
                {topList.map((item, index) => {
                  return item.path ? (
                    <li className="navigate-link" key={index}>
                      <div
                        className="link-item"
                        onClick={(e) => navigate(item.path)}
                      >
                        {item.icon}
                        <span
                          className={
                            close
                              ? "sidebar-text close header-text"
                              : "sidebar-text header-text"
                          }
                        >
                          {item.name}
                        </span>
                      </div>
                    </li>
                  ) : (
                    <li className="navigate-link close-link" key={index}>
                      <div
                        className="link-item"
                        onClick={() => setSidebarVisibility(item.close)}
                      >
                        {item.icon}
                        <span
                          className={
                            close
                              ? "sidebar-text close header-text"
                              : "sidebar-text header-text"
                          }
                        >
                          {item.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bottom-content">
              <li onClick={handleLogout}>
                <a href="">
                  <Logout className="icon" />
                  <span
                    className={
                      close
                        ? "sidebar-text close nav-text"
                        : "sidebar-text nav-text"
                    }
                  >
                    Logout
                  </span>
                </a>
              </li>

              <li className="mode">
                <div className="moon-sun">
                  {darkmode ? (
                    <BsSun className="icon sun" />
                  ) : (
                    <BsMoon className="icon moon" />
                  )}
                </div>
                <span
                  className={
                    close
                      ? "sidebar-text close mode-text"
                      : "sidebar-text mode-text"
                  }
                >
                  {darkmode ? "Light Mode" : "Dark Mode"}
                </span>

                <div className="toggle-switch" onClick={handleDarkMode}>
                  <span
                    className={darkmode ? "switch dark-switch" : "switch"}
                  ></span>
                </div>
              </li>
            </div>
          </main>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
