import { useCallback, useEffect, useState, createContext } from "react";
import AgencyKycForm1 from "./Agency-Kyc-Forms/Agency-Kyc-Form-1";
import AgencyKycForm2 from "./Agency-Kyc-Forms/Agency-Kyc-Form-2";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./Agency-Kyc-Forms.css";
import "react-toastify/dist/ReactToastify.css";

export const FormContext = createContext();
function AgencyForms({ showNavbar, setShowNavbar }) {
  const [activeForm, setActiveForm] = useState(1);
  const [darkmode, setDarkMode] = useState(false);
  const [picture, setPicture] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [authToken, setAuthToken] = useState("");

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

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

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
          handleNavigation,
          handleChange,
          setInputs,
          setDarkMode,
          TransitionHandler,
          FocusBlur,
          HandleTheme,
          handleNavigation,
          setPicture,
          picture,
          inputs,
          darkmode,
          countries,
          states,
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          <ToastContainer />
          {activeForm === 1 && <AgencyKycForm1 />}

          {activeForm === 2 && <AgencyKycForm2 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default AgencyForms;
