import { createContext, useCallback, useEffect, useState } from "react";
import ClientKycForm1 from "./Client-Kyc-Form-1";
import ClientKycForm2 from "./Client-Kyc-Form-2";

import "./Client-Kyc-Forms.css";
export const FormContext = createContext();
console.log(FormContext);
function ClientsForms({ setShowNavbar, showNavbar }) {
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});

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

  return (
    !showNavbar && (
      <FormContext.Provider
        value={{ handleNavigation, handleChange, setInputs, inputs }}
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
