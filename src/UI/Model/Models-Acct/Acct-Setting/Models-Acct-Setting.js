import "./Models-Acct-Setting.css";
import { useCallback, useEffect, useState } from "react";
import About from "./About";
import EmailAndPassword from "./Email-and-password";
import PaymentInfo from "./Wallet-setting";
import Stats from "./Stats";
import Photos from "./Photos";
import Videos from "./Videos";
import { navList1, navList2 } from "../utils";
import { NavLink } from "react-router-dom";
import { makeGet, update } from "../../../../redux/apiCalls";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../../../scss/kyc-forms.scss";
import "../Kyc-Section/Component/img-scss/img.scss";
import "../Kyc-Section/Component/svg-scss/svg.scss";

function ModelAcctSetting({
  AlertModal,
  handleModal,
  userData,
  showNavbar,
  setShowNavbar,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [activeSet, setActiveSet] = useState("about");
  const [toggleSetMenu, setToggleSetMenu] = useState(false);
  const [activeEdit, setActiveEdit] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [inputs, setInputs] = useState({});
  const [discardFunc, setDiscardFunc] = useState("");
  const [toggleDiscard, setToggleDiscard] = useState(false);
  const [model, setModel] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [darkmode, setDarkMode] = useState(false);
  // get access token for countries api
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.get(
          "https://www.universal-tutorial.com/api/getaccesstoken",
          {
            headers: {
              Accept: "application/json",
              "api-token":
                "Ku2uq0eMGByhMQmQdP5tKH3bbR4dD3ZNXjRqllWOT-srDfzC-wXRnd7Kcym_A_9MpP4",
              "user-email": "tosinadebayo55@gmail.com",
            },
          }
        );
        setAuthToken(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getAccessToken();
  }, []);

  // get list of countries
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get(
          "https://www.universal-tutorial.com/api/countries/",
          {
            headers: {
              Authorization: `Bearer ${authToken.auth_token}`,
              Accept: "application/json",
            },
          }
        );
        setCountries(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getCountries();
  }, [authToken]);

  // get list of states
  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await axios.get(
          `https://www.universal-tutorial.com/api/states/${inputs?.country}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.auth_token}`,
              Accept: "application/json",
            },
          }
        );
        setStates(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getStates();
  }, [inputs.country]);

  // function handles onfocus and onblur mode on form inputs
  const FocusBlur = () => {
    const focusinputs = document.querySelectorAll(".input-textarea");
    focusinputs.forEach((ipt) => {
      ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
      });

      ipt.addEventListener("blur", () => {
        if (ipt.value == "") {
          ipt.parentNode.classList.remove("not-empty");
          ipt.parentNode.classList.remove("focus");
        }
      });
    });
  };

  // handles form transitions on light and dark mode
  const TransitionHandler = () => {
    const allElement = document.querySelectorAll("*");
    allElement.forEach((el) => {
      el.classList.add("form-transition");
      setTimeout(() => {
        el.classList.remove("form-transition");
      }, 1000);
    });
  };
  //  function handles dark and light mode onclick on forms
  const HandleTheme = (event) => {
    // 👇️ toggle darkmode state on click
    setDarkMode((current) => !current);
    TransitionHandler();
  };

  useEffect(() => {
    FocusBlur();
  }, []);

  const fetchData = useCallback(() => {
    makeGet(dispatch, `/model/${path}`, setModel);
  }, [dispatch]);

  useEffect(() => {
    // if (user?.role === "agency") {
    let unsubscribed = false;
    if (!unsubscribed) {
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
    // }
  }, []);

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  function handleActiveSet(set) {
    setActiveSet(set);
    setToggleSetMenu((prevSet) => !prevSet);
  }

  function handleToggleSetMenu() {
    setToggleSetMenu((prevSet) => !prevSet);
  }

  function handleActiveEdit(section, text) {
    text === "Done" ||
    text === "Update" ||
    text === "Check" ||
    text === "Reset" ||
    text === "Verify"
      ? setActiveEdit(text)
      : setActiveEdit(section);
  }

  //discarding changes
  function handleDiscard(response) {
    response === "Yes" && discardFunc();
    setToggleDiscard((prev) => !prev);
  }

  //setting discard alert
  function resetDiscard(fun) {
    setToggleDiscard((prev) => !prev);
    setDiscardFunc(fun);
  }

  //displaying discard alert
  function discardAlert() {
    return (
      <section
        style={{ transform: toggleDiscard && `translateX(${0}%)` }}
        className="modal-section"
      >
        <div className="alert-box">
          <h2 className="alert-title">Do you want to disCard changes?</h2>

          <p className="alert-text">
            <span className="bold-text colored-text">Note: </span>
            by clicking yes all unsaved changes will be deleted and progress
            lost!
          </p>

          <div className="alert-btn">
            <button
              onClick={() => handleDiscard("No")}
              className="del-alert-btn bold-text cancel-btn"
            >
              No?
            </button>
            <button
              onClick={() => handleDiscard("Yes")}
              className="del-alert-btn bold-text yes-btn"
            >
              Yes?
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {!showNavbar && (
        <div className="set_sections">
          {discardAlert()}
          {AlertModal()}

          {/* nav section */}

          <section
            style={{ transform: toggleSetMenu && `translateX(${0}%)` }}
            className="Acct-set-menu"
          >
            <div className="set-nav_title">
              <h2>Setting</h2>
              <i className="fa-solid fa-gear"></i>
            </div>

            <nav className="set-nav">
              <i
                className="fa-solid fa-xmark close-set colored-hover"
                onClick={handleToggleSetMenu}
              ></i>
              <ul className="set-nav_list">
                {navList1.map((item) => {
                  return (
                    <li
                      key={item}
                      className="set-nav_item colored-hover"
                      onClick={() => handleActiveSet(item)}
                      role="button"
                    >
                      {item === "about" ? (
                        <i className="fa-solid fa-address-book"></i>
                      ) : item === "stats" ? (
                        <i className="fa-solid fa-chart-simple"></i>
                      ) : item === "photos" ? (
                        <i className="fa-solid fa-image"></i>
                      ) : (
                        <i className="fa-brands fa-youtube"></i>
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
              <ul className="set-nav_list">
                {navList2.map((item) => {
                  return (
                    <NavLink
                      to={item === "dashboard" && "/modelPage/dashboard"}
                    >
                      <li
                        key={item}
                        className="set-nav_item colored-hover"
                        onClick={() => handleActiveSet(item)}
                        role="button"
                      >
                        {item === "email/pass" ? (
                          <i className="fa-solid fa-envelope-circle-check"></i>
                        ) : item === "payment" ? (
                          <i className="fa-solid fa-landmark"></i>
                        ) : (
                          <i className="fa-solid fa-house"></i>
                        )}
                        {item}
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
          </section>

          {/* main section */}

          <section
            className="Acct-set-main"
            style={{ backgroundColor: "white" }}
          >
            {/* settings header */}
            <div className="set_mobile-nav">
              <h2>
                Acct-<span className="mobile-nav-text">Settings</span>
              </h2>
              <i
                className="fa-solid fa-gear colored-hover"
                onClick={handleToggleSetMenu}
              ></i>
            </div>

            {/* About section */}

            {activeSet === "about" && (
              <About
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                HandleTheme={HandleTheme}
                model={model}
                inputs={inputs}
                setInputs={setInputs}
                FocusBlur={FocusBlur}
                handleActiveSet={handleActiveSet}
                countries={countries}
                states={states}
                darkmode={darkmode}
              />
            )}

            {/* stats section */}

            {activeSet === "stats" && (
              <Stats
                // DomItems={DomItems}
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                model={model}
              />
            )}

            {/* photo section */}

            {activeSet === "photos" && (
              <Photos
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                model={model}
              />
            )}

            {/* video section */}

            {activeSet === "videos" && (
              <Videos
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
              />
            )}

            {/* email and password section */}

            {activeSet === "email/pass" && (
              <EmailAndPassword
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
              />
            )}

            {/* payment info section */}

            {activeSet === "payment" && (
              <PaymentInfo userData={userData} model={model} />
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default ModelAcctSetting;
