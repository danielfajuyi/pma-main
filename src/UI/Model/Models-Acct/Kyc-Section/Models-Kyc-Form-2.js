import "./Models-Kyc-Form-2.css";
import FormNavBtn from "./Form-nav-btn";
import { useState } from "react";
import { useEffect } from "react";
import { categoryInput, jobsInput, SocialMedia, statsInput } from "../utils";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { useSelector } from "react-redux";

function ModelsKycForm2({
  handleNavigation,
  inputs,
  handleChange,
  setCategory,
  category,
  setInterestedJob,
  interestedJob,path
}) {
  const user = useSelector((state) => state.user.currentUser);

  //static DOM elements
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalTxt, setModalTxt] = useState("");
  const [error, setError] = useState({
    height: inputs.height,
    waist: inputs.waist,
    bust: inputs.bust,
    chest: inputs.chest,
    hip: inputs.hip,
    shoulder: inputs.shoulder,
    eyes: inputs.eyes,
    size: inputs.size,
    shoe: inputs.shoe,
    tattoos: inputs.tattoos,
    agency: inputs.agency,
    hairColor: inputs.hairColor,
    hairLength: inputs.hairLength,
    ethnicity: inputs.ethnicity,
    skinColor: inputs.skinColor,
    language: inputs.language,
    availableForTravel: inputs.availableForTravel,
    instagram: inputs.instagram,
  });

  //setting empty input
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required.!";
      let socialErr = "You social-media link is required.!";

      !inputs.waist
        ? setError((prev) => ({ ...prev, waist: errorText }))
        : setError((prev) => ({ ...prev, waist: "" }));

      !inputs.eyes
        ? setError((prev) => ({ ...prev, eyes: errorText }))
        : setError((prev) => ({ ...prev, eyes: "" }));

      !inputs.size
        ? setError((prev) => ({ ...prev, size: errorText }))
        : setError((prev) => ({ ...prev, size: "" }));

      !inputs.shoe
        ? setError((prev) => ({ ...prev, shoe: errorText }))
        : setError((prev) => ({ ...prev, shoe: "" }));

      !inputs.tattoos
        ? setError((prev) => ({ ...prev, tattoos: errorText }))
        : setError((prev) => ({ ...prev, tattoos: "" }));

      !inputs.agency
        ? setError((prev) => ({ ...prev, agency: errorText }))
        : setError((prev) => ({ ...prev, agency: "" }));

      !inputs.hairColor
        ? setError((prev) => ({ ...prev, hairColor: errorText }))
        : setError((prev) => ({ ...prev, hairColor: "" }));

      !inputs.hairLength
        ? setError((prev) => ({ ...prev, hairLength: errorText }))
        : setError((prev) => ({ ...prev, hairLength: "" }));

      !inputs.ethnicity
        ? setError((prev) => ({ ...prev, ethnicity: errorText }))
        : setError((prev) => ({ ...prev, ethnicity: "" }));

      !inputs.skinColor
        ? setError((prev) => ({ ...prev, skinColor: errorText }))
        : setError((prev) => ({ ...prev, skinColor: "" }));

      !inputs.language
        ? setError((prev) => ({ ...prev, language: errorText }))
        : setError((prev) => ({ ...prev, language: "" }));

      !inputs.availableForTravel
        ? setError((prev) => ({ ...prev, availableForTravel: errorText }))
        : setError((prev) => ({ ...prev, availableForTravel: "" }));

      !inputs.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));

      if (inputs.gender === "m") {
        !inputs.height
          ? setError((prev) => ({ ...prev, height: errorText }))
          : setError((prev) => ({ ...prev, height: "" }));

        !inputs?.chest
          ? setError((prev) => ({ ...prev, chest: errorText }))
          : setError((prev) => ({ ...prev, chest: "" }));

        !inputs?.shoulder
          ? setError((prev) => ({ ...prev, shoulder: errorText }))
          : setError((prev) => ({ ...prev, shoulder: "" }));
      } else {
        !inputs?.hip
          ? setError((prev) => ({ ...prev, hip: errorText }))
          : setError((prev) => ({ ...prev, hip: "" }));

        !inputs?.bust
          ? setError((prev) => ({ ...prev, bust: errorText }))
          : setError((prev) => ({ ...prev, bust: "" }));
      }
    }

    handleError();
  }, [inputs]);

  //checking for an error
  useEffect(() => {
    let err = false;

    if (
      !inputs.waist ||
      !inputs.eyes ||
      !inputs.size ||
      !inputs.shoe ||
      !inputs.tattoos ||
      !inputs.agency ||
      !inputs.hairColor ||
      !inputs.hairLength ||
      !inputs.ethnicity ||
      !inputs.skinColor ||
      !inputs.language ||
      !inputs.availableForTravel ||
      !inputs.instagram
    ) {
      err = true;
      if (!inputs?.height || !inputs?.chest || !inputs?.shoulder) {
        inputs.gender === "m" && (err = true);
      } else if (!inputs?.bust || !inputs?.hip) {
        err = true;
      }
    }
    !user.isUpdated && setIsError(err);
    path === "/agencypage/listing/add" && setIsError(err);
  }, [error, inputs, user]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
      if (category.length === 0) {
        setModalTxt("category");
      } else if (interestedJob.length === 0) {
        setModalTxt("job");
      }
    } else {
      handleNavigation(text);
    }
  }

  return (
    <form className="kyc-form" onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
      <section className="kyc-hero">
        <img src="/images/kyc (2).jpg" alt="" />
        <div className="kyc-hero__text-rapper">
          <h2 className="kyc-hero__title">Step-2</h2>
          <p className="kyc-hero__text">You Are Almost There!!</p>
        </div>
      </section>

      {/* stats section */}
      <section className="kyc-content-section">
        <div className="list-container">
          <h2 className="sections-title">Models statistic</h2>
          <ul className="model-statistic">
            {statsInput.map((item) => {
              let name = item.id;
              return (
                <div className="kyc-main-container" key={item.id}>
                  {inputs.gender === "m"
                    ? item.id !== "bust" &&
                      item.id !== "hip" && (
                        <li className="kyc-input-container" key={item.id}>
                          <label className="input-label" htmlFor={item.id}>
                            <span className="required-icon_rapper">
                              {item.label}
                              {error[name] === "" ? (
                                <i className="fa-solid fa-circle-check valid-icon"></i>
                              ) : (
                                <i className="fa-solid fa-star required-icon"></i>
                              )}
                            </span>

                            {item.id !== "availableForTravel" &&
                              item.id !== "tattoos" && (
                                <input
                                  onChange={handleChange}
                                  className="kyc-input-field"
                                  type={item.type}
                                  id={item.id}
                                  name={item.id}
                                  placeholder={item.placeholder}
                                  required
                                  spellCheck={false}
                                />
                              )}

                            {item.id === "availableForTravel" && (
                              <select
                                onChange={handleChange}
                                className="kyc-input-field"
                                id={item.id}
                                name={item.id}
                              >
                                <option value="">Select option...</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}
                            {item.id === "tattoos" && (
                              <select
                                onChange={handleChange}
                                className="kyc-input-field"
                                id={item.id}
                                name={item.id}
                              >
                                <option value="">Select option...</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}

                            {showError && (
                              <p className="error-text">
                                {item.id === name ? error[name] : null}
                              </p>
                            )}
                          </label>
                        </li>
                      )
                    : item.id !== "chest" &&
                      item.id !== "shoulder" &&
                      item.id !== "height" && (
                        <li className="kyc-input-container" key={item.id}>
                          <label className="input-label" htmlFor={item.id}>
                            <span className="required-icon_rapper">
                              {item.label}
                              {error[name] === "" ? (
                                <i className="fa-solid fa-circle-check valid-icon"></i>
                              ) : (
                                <i className="fa-solid fa-star required-icon"></i>
                              )}
                            </span>

                            {item.id !== "availableForTravel" &&
                              item.id !== "tattoos" && (
                                <input
                                  onChange={handleChange}
                                  className="kyc-input-field"
                                  type={item.type}
                                  id={item.id}
                                  name={item.id}
                                  placeholder={item.placeholder}
                                  required
                                  spellCheck={false}
                                />
                              )}

                            {item.id === "availableForTravel" && (
                              <select
                                onChange={handleChange}
                                className="kyc-input-field"
                                id={item.id}
                                name={item.id}
                              >
                                <option value="">Select option...</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}
                            {item.id === "tattoos" && (
                              <select
                                onChange={handleChange}
                                className="kyc-input-field"
                                id={item.id}
                                name={item.id}
                              >
                                <option value="">Select option...</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}

                            {showError && (
                              <p className="error-text">
                                {item.id === name ? error[name] : null}
                              </p>
                            )}
                          </label>
                        </li>
                      )}
                </div>
              );
            })}
          </ul>

          {/* category section  */}
          <div className="list-title-rapper">
            <h2 className="sections-title">Models categories</h2>
            {/* <br/><br/> */}
            <p className="category-des-text">
              choose which type of model you suited (2max)
            </p>
          </div>
          <ul className="model-categories">
            {categoryInput.map((item) => {
              return (
                <div className="kyc-main-container" key={item.id}>
                  <li className="kyc-input-container" key={item.id}>
                    <label
                      className="check-box-label colored-hover"
                      htmlFor={item.id}
                    >
                      {item.label}
                      <input
                        onChange={(e) => {
                          if (e.target.checked && category.length >= 2) {
                            return setModalTxt("max_category"); // prevent checkbox from being checked
                          }
                          setCategory((prev) =>
                            e.target.checked === false
                              ? prev.filter((item) => item !== e.target.value)
                              : [...prev, e.target.value]
                          );
                        }}
                        className="kyc-check-box colored-hover"
                        type={item.type}
                        id={item.id}
                        name="category"
                        value={item.id}
                        checked={
                          category.find((value) => value === item.value)
                            ? true
                            : false
                        }
                      />
                    </label>
                  </li>
                </div>
              );
            })}
          </ul>

          {/* job interest section */}
          <h2 className="sections-title">Job interested in</h2>
          <ul className="work-interest">
            {jobsInput.map((item) => {
              return (
                <div className="kyc-main-container" key={item.id}>
                  <li className="kyc-input-container" key={item.id}>
                    <label
                      className="check-box-label colored-hover"
                      htmlFor={item.id}
                    >
                      {item.label}
                      <input
                        onChange={(e) =>
                          setInterestedJob((prev) =>
                            e.target.checked === false
                              ? prev.filter((item) => item !== e.target.value)
                              : [...prev, e.target.value]
                          )
                        }
                        className="kyc-check-box colored-hover"
                        type={item.type}
                        id={item.id}
                        name="interestedJob"
                        value={item.id}
                        checked={
                          interestedJob.find((value) => value === item.value)
                            ? true
                            : false
                        }
                      />
                    </label>
                  </li>
                </div>
              );
            })}
          </ul>

          {/* social media section */}
          <h2 className="sections-title">Social Media Handles</h2>
          <ul className="social-media-link">
            {SocialMedia.map((item) => {
              let name = [item.id];
              return (
                <div className="kyc-main-container" key={item.id}>
                  <li className="kyc-input-container" key={item.id}>
                    <label className="input-label" htmlFor={item.id}>
                      <span className="required-icon_rapper">
                        {item.label}
                        {error[name] === "" ? (
                          <i className="fa-solid fa-circle-check valid-icon"></i>
                        ) : (
                          <i className="fa-solid fa-star required-icon"></i>
                        )}
                      </span>
                      <input
                        onChange={handleChange}
                        className="kyc-input-field"
                        type={item.type}
                        id={item.id}
                        name={item.id}
                        placeholder={item.placeholder}
                        required
                        spellCheck={false}
                      />
                      {showError && (
                        <p className="error-text">{error[item.id]}</p>
                      )}
                    </label>
                  </li>
                </div>
              );
            })}
          </ul>

          {/* nav section */}
          <div className="kyc-btn-container">
            <FormNavBtn
              btnText="Back"
              name="form2"
              handleClick={handleNavigation}
              type="button"
            />
            <FormNavBtn
              btnText="Next"
              name="form2"
              handleClick={handleSubmit}
              type="button"
            />
          </div>
        </div>
      </section>
    </form>
  );
}

export default ModelsKycForm2;
