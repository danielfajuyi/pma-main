import React from "react";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";
import logo from "../logo/logo.png";
const KycHeader = ({ HandleTheme, darkmode }) => {
  return (
    <>
      <section className="signupforms">
        <div className="signupform-container">
          <ul>
            <li>
              <a href="/" className="form-logo">
                <div className="form-images">
                  <img
                    src={logo}
                    alt="premiummodelapp-logo"
                    title="premiummodelapp-logo"
                    className="logo-forDark"
                  />
                  <img
                    src={logo}
                    alt="premiummodelapp-logo"
                    title="premiummodelapp-logo"
                    className="logo-forLight"
                  />
                </div>
                <h2>
                  <div className="logo-01">
                    <span className="logo-color-change">Premium</span>
                  </div>
                  <div className="logo-02">
                    <span className="logo-color">models</span>
                    <span className="logo-color ">.</span>
                  </div>
                </h2>
              </a>
            </li>

            <li>
              <a href="/" className="formnav-link">
                Home
              </a>
            </li>

            <li>
              <span
                className="formnav-link theme-toggle "
                onClick={HandleTheme}
              >
                {!darkmode ? (
                  <FaSun className="sun-icon" />
                ) : (
                  <FaMoon className="moon-icon" />
                )}
              </span>
            </li>

            <li>
              <span className="formnav-link">
                <FaTimes className="closeform-icon" />
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default KycHeader;
