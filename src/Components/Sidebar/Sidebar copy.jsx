import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import {
  Alarm,
  ChevronRight,
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
import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";

import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import { FaBars } from "react-icons/fa";

const Navigation = ({ Svg, Text, close, topList, bottomList }) => {
  return (
    <li className="navigate-link">
      <a href="#">
        {Svg}
        <span
          className={
            close
              ? "sidebar-text close header-text"
              : "sidebar-text header-text"
          }
        >
          {Text}
        </span>
      </a>
    </li>
  );
};
const Sidebar = ({ showNavbar, setShowNavbar, topList, bottomList }) => {
  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar
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
    !showNavbar && (
      <>
        <div
          className={darkmode ? "sidebar-container dark" : "sidebar-container"}
        >
          <nav className={close ? "sidebar-menu close" : "sidebar-menu"}>
            <header>
              <div class="sidebar-info-wrapper">
                <span className="sidebar-image">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/premium-model-frontend.appspot.com/o/model%2FNkechi%2F1692992923458model%20(14).jpg?alt=media&token=17ce9feb-9524-4379-80ea-f97cfb56c6a6"
                    alt=""
                  ></img>
                </span>

                <div
                  className={
                    close
                      ? "sidebar-text close header-text"
                      : "sidebar-text header-text"
                  }
                >
                  <span className="name">Adebayo Victor</span>
                  <span className="title">Model</span>
                </div>
              </div>

              <ChevronRight
                className={
                  close
                    ? "sidebar-toggle toggle-close"
                    : "sidebar-toggle" && darkmode
                    ? "sidebar-toggle toggle-close toggle-dark"
                    : "sidebar-toggle toggle-close "
                }
                onClick={handleClose}
              />
            </header>

            <main>
              <div className="top-content">
                <li className="nav-search-box">
                  <Search className="icon" />
                  <input type="search" placeholder="Search..."></input>
                </li>
                <ul className="navigate-links">
                  <Navigation
                    close={close}
                    Svg={<Home className="icon" />}
                    Text={"Dashboard"}
                  />
                  <Navigation
                    close={close}
                    Svg={<ShowChart className="icon" />}
                    Text={"Revenue"}
                  />
                  <Navigation
                    close={close}
                    Svg={<Alarm className="icon" />}
                    Text={"Notification"}
                  />
                  <Navigation
                    close={close}
                    Svg={<PieChart className="icon" />}
                    Text={"Analytics"}
                  />
                  <Navigation
                    close={close}
                    Svg={<HeartBroken className="icon" />}
                    Text={"Likes"}
                  />
                  <Navigation
                    close={close}
                    Svg={<Wallet className="icon" />}
                    Text={"Wallet"}
                  />
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

                  <dic className="toggle-switch" onClick={handleDarkMode}>
                    <span
                      className={darkmode ? "switch dark-switch" : "switch"}
                    ></span>
                  </dic>
                </li>
              </div>
            </main>
          </nav>

          <section
            className={close ? "dashboard-home close" : "dashboard-home"}
          >
            <div className="dashboard-text">Dashboard</div>
          </section>
        </div>
      </>
    )
  );
};

export default Sidebar;
