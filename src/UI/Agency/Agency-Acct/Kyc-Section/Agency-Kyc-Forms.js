import { useCallback, useState } from "react";
import AgencyKycForm1 from "./Agency-Kyc-Form-1";
import AgencyKycForm2 from "./Agency-Kyc-Form-2";

import "./Agency-Kyc-Forms.css";

function AgencyForms() {
  const [activeForm, setActiveForm] = useState(2);

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

  const [inputs, setInputs] = useState({});

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );
  console.log(inputs);

  return (
    <div style={{ backgroundColor: "white" }}>
      {activeForm === 1 && (
        <AgencyKycForm1
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          inputs={inputs}
        />
      )}

      {activeForm === 2 && (
        <AgencyKycForm2
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          inputs={inputs}
          setInputs={setInputs}
        />
      )}
    </div>
  );
}

export default AgencyForms;
