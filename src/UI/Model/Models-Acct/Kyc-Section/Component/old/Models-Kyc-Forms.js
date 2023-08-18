import { useCallback, useEffect, useState } from "react";
import ModelsKycForm1 from "./Models-Kyc-Form-1";
import ModelsKycForm2 from "./Models-Kyc-Form-2";
import ModelsKycForm3 from "./Models-Kyc-Form-3";
import { useLocation } from "react-router";

import "./Models-Kyc-Forms.css";

function ModelsForms({ showNavbar, setShowNavbar }) {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const path = location.pathname;
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState([]);
  const [interestedJob, setInterestedJob] = useState([]);
  const [darkmode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );

  const handleCheckboxChange = useCallback(
    (type) => {
      type = "category";
      setInputs((prev) => {
        return { ...prev, [type]: category };
      });
    },
    [category]
  );
  const handleCheckboxChange2 = useCallback(
    (type) => {
      type = "interestedJob";
      setInputs((prev) => {
        return { ...prev, [type]: interestedJob };
      });
    },
    [interestedJob]
  );

  useEffect(() => {
    if (category && category.length <= 2) {
      handleCheckboxChange(category, "category");
    }
    if (interestedJob) {
      handleCheckboxChange2(interestedJob, "interestedJob");
    }
  }, [category, interestedJob, handleCheckboxChange, handleCheckboxChange2]);

  function handleNavigation(text) {
    if (text === "Next") {
      setActiveForm((prevForm) => prevForm + 1);
    } else if (text === "Back") {
      setActiveForm((prevForm) => prevForm - 1);
    } else {
      setTimeout(() => {
        setActiveForm(1);
      }, 1500);
    }
  }

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  // This function handles form transitions on light and dark mode
  const TransitionHandler = () => {
    const allElement = document.querySelectorAll("*");
    allElement.forEach((el) => {
      el.classList.add("form-transition");
      setTimeout(() => {
        el.classList.remove("form-transition");
      }, 1000);
    });
  };

  // This function handles onfocus and onblur mode on form inputs
  const FocusBlur = () => {
    const inputs = document.querySelectorAll(".input-textarea");
    inputs.forEach((ipt) => {
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

  // This function handles dark and light mode onclick on forms
  const HandleTheme = (event) => {
    // 👇️ toggle darkmode state on click
    setDarkMode((current) => !current);
    TransitionHandler();
  };

  useEffect(() => {
    FocusBlur();
  }, []);

  return (
    !showNavbar && (
      <div className="kyc">
        {activeForm === 1 && (
          <ModelsKycForm1
            inputs={inputs}
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            setInputs={setInputs}
            TransitionHandler={TransitionHandler}
            FocusBlur={FocusBlur}
            HandleTheme={HandleTheme}
            darkmode={darkmode}
            setDarkMode={setDarkMode}
            path={path}
            user={user}
          />
        )}
        {activeForm === 2 && (
          <ModelsKycForm2
            inputs={inputs}
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            setCategory={setCategory}
            TransitionHandler={TransitionHandler}
            FocusBlur={FocusBlur}
            HandleTheme={HandleTheme}
            category={category}
            setInterestedJob={setInterestedJob}
            interestedJob={interestedJob}
            darkmode={darkmode}
            setDarkMode={setDarkMode}
            path={path}
            user={user}
          />
        )}
        {activeForm === 3 && (
          <ModelsKycForm3
            inputs={inputs}
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            setInputs={setInputs}
            TransitionHandler={TransitionHandler}
            FocusBlur={FocusBlur}
            darkmode={darkmode}
            setDarkMode={setDarkMode}
            HandleTheme={HandleTheme}
            path={path}
            user={user}
          />
        )}
      </div>
    )
  );
}

export default ModelsForms;
