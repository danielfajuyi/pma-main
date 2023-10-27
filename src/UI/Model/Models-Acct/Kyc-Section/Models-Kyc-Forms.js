import { useCallback, useEffect, useState, createContext } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import ModelsKycForm01 from "./Models-Kyc-Forms/Models-Kyc-Form-01";
import ModelsKycForm02 from "./Models-Kyc-Forms/Models-Kyc-Form-02";
import ModelsKycForm03 from "./Models-Kyc-Forms/Models-Kyc-Form-03";
import "./Models-Kyc-Forms.css";
import "../../../../scss/kyc-forms.scss";
import axios from "axios";
export const FormContext = createContext();

function ModelsForms({ showNavbar, setShowNavbar }) {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const path = location.pathname;
  const [picture, setPicture] = useState(undefined);
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState([]);
  const [interestedJob, setInterestedJob] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [authToken, setAuthToken] = useState("");
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

  return (
    !showNavbar && (
      <FormContext.Provider
        value={{
          inputs,
          path,
          user,
          darkmode,
          picture,
          interestedJob,
          category,
          countries,
          states,
          handleNavigation,
          handleChange,
          HandleTheme,
          TransitionHandler,
          FocusBlur,
          setPicture,
          setInputs,
          setCategory,
          setInterestedJob,
        }}
      >
        <div className="kyc">
          {activeForm === 1 && <ModelsKycForm01 />}
          {activeForm === 2 && <ModelsKycForm02 />}
          {activeForm === 3 && <ModelsKycForm03 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default ModelsForms;
