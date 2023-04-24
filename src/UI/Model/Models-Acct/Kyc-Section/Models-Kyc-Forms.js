import { useCallback, useEffect, useState } from "react";
import ModelsKycForm1 from "./Models-Kyc-Form-1";
import ModelsKycForm2 from "./Models-Kyc-Form-2";
import ModelsKycForm3 from "./Models-Kyc-Form-3";
import { useLocation } from "react-router";
import "./Models-Kyc-Forms.css";

function ModelsForms() {
  const location = useLocation()
  const path = location.pathname

  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState([]);
  const [interestedJob, setInterestedJob] = useState([]);

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

  return (
    <div className="kyc">
      {activeForm === 1 && (
        <ModelsKycForm1
          inputs={inputs}
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          setInputs={setInputs}
          path={path}
        />
      )}
      {activeForm === 2 && (
        <ModelsKycForm2
          inputs={inputs}
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          setCategory={setCategory}
          category={category}
          setInterestedJob={setInterestedJob}
          interestedJob={interestedJob}
          path={path}
        />
      )}
      {activeForm === 3 && (
        <ModelsKycForm3
          inputs={inputs}
          handleNavigation={handleNavigation}
          handleChange={handleChange}
          setInputs={setInputs}
          path={path}
        />
      )}
    </div>
  );
}

export default ModelsForms;
