import { useCallback, useState } from "react";
import ClientKycForm1 from "./Client-Kyc-Form-1";
import ClientKycForm2 from "./Client-Kyc-Form-2";

import "./Client-Kyc-Forms.css";

function ClientsForms() {
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

  return (
    <div style={{ backgroundColor: "white" }}>
      {activeForm === 1 && (
        <ClientKycForm1
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          setInputs={setInputs}
          inputs={inputs}
        />
      )}

      {activeForm === 2 && (
        <ClientKycForm2
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          setInputs={setInputs}
          inputs={inputs}
        />
      )}
    </div>
  );
}

export default ClientsForms;
