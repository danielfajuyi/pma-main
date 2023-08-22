import { createContext, useCallback, useEffect, useState } from "react";
import ClientKycForm1 from "./Client-Kyc-Forms/Client-Kyc-Form-1";
import ClientKycForm2 from "./Client-Kyc-Forms/Client-Kyc-Form-2";
import "./Client-Kyc-Forms.css";
import "../../../../scss/kyc-forms.scss";
import axios from "axios";
export const FormContext = createContext();
function ClientsForms({ setShowNavbar, showNavbar }) {
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [darkmode, setDarkMode] = useState(false);
  const [picture, setPicture] = useState(undefined);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [authToken, setAuthToken] = useState("");

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

  // console.log(inputs)

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
  const focusinputs = document.querySelectorAll(".input-textarea");
  const FocusBlur = () => {
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
  }, [focusinputs]);

  return (
    !showNavbar && (
      <FormContext.Provider
        value={{
          handleNavigation,
          HandleTheme,
          setDarkMode,
          TransitionHandler,
          FocusBlur,
          handleChange,
          setInputs,
          setPicture,
          countries,
          states,
          picture,
          darkmode,
          inputs,
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          {activeForm === 1 && <ClientKycForm1 />}

          {activeForm === 2 && <ClientKycForm2 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default ClientsForms;
