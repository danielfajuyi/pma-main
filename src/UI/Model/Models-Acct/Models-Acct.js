import "./Models-Acct.css";
import ModelPage from "../Models-Acct/Model-Page/model_page";
import ModelsForms from "./Kyc-Section/Models-Kyc-Forms";
import KycNotice from "../../Notification/kyc-notice";
import { useEffect, useState } from "react";
import "../../../scss/dashboards.scss";

function ModelsAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  const [darkmode, setDarkMode] = useState(false);
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
      el.classList.add("dashboard-transition");
      setTimeout(() => {
        el.classList.remove("dashboard-transition");
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
  return (
    <>
      {!user?.isUpdated && <KycNotice />}

      {!user?.isUpdated ? (
        <ModelsForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <ModelPage
          showNavbar={showNavbar}
          darkmode={darkmode}
          HandleTheme={HandleTheme}
          setShowNavbar={setShowNavbar}
          setNotice={setNotice}
          notice={notice}
        />
      )}

      {/*---> this is used for testing  */}

      {/* <ModelPage
        showNavbar={showNavbar}
        setShowNavbar={setShowNavbar}
        setNotice={setNotice}
        notice={notice}
      /> */}
    </>
  );
}

export default ModelsAcct;
