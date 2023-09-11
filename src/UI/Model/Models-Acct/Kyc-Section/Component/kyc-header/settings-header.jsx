import React from "react";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";
import logo from "../logo/logo.png";
import { navList1 } from "../../../utils";
const KycHeader = ({
  HandleTheme,
  handleActiveSet,
  ActiveSettings,
  user,
  darkmode,
}) => {
  return (
    <>
      <section className="signupforms">
        <div className="signupform-container">
          <ul>
            <li>
              <a href="/" className="form-logo">
                <div className="form-images">
                  {!ActiveSettings && (
                    <>
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
                    </>
                  )}
                </div>
                <h2>
                  <div className="logo-01">
                    <span className="logo-color-change">
                      {user?.lastName ? user?.lastName : "Premium"}
                    </span>
                  </div>
                  <div className="logo-02">
                    <span className="logo-color">
                      {user?.firstName ? user?.firstName : "models"}
                    </span>
                    <span className="logo-color ">.</span>
                  </div>
                </h2>
              </a>
            </li>

            {!ActiveSettings && (
              <li>
                <a href="/" className="formnav-link">
                  Home
                </a>
              </li>
            )}
            {ActiveSettings &&
              navList1.map((item) => {
                return (
                  <li
                    key={item}
                    onClick={() => handleActiveSet(item)}
                    role="button"
                  >
                    <span className="settings-navlink">{item}</span>
                  </li>
                );
              })}
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
                {ActiveSettings ? "" : <FaTimes className="closeform-icon" />}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default KycHeader;
