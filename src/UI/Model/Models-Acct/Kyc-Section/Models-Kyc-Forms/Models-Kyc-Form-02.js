import { useContext, useEffect, useState } from "react";
import { categoryInput, jobsInput, SocialMedia, statsInput } from "../../utils";
import { AlertModal } from "../../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { useSelector } from "react-redux";
import { BsCheck2All } from "react-icons/bs";
import { FaCheckCircle, FaStar, FaAngleDoubleRight } from "react-icons/fa";
import KycHeader from "../Component/kyc-header/kyc-header";
import FormNavBtn from "../Component/btn/Form-nav-btn";
import "../Component/svg-scss/svg.scss";
import "../Component/img-scss/img.scss";
import { FormContext } from "../Models-Kyc-Forms";

function ModelsKycForm2({}) {
  const {
    handleNavigation,
    inputs,
    handleChange,
    setCategory,
    category,
    setInterestedJob,
    interestedJob,
    path,
    darkmode,
    picture,
    FocusBlur,
    HandleTheme,
  } = useContext(FormContext);

  const user = useSelector((state) => state.user.currentUser);
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
    minPrice: inputs.minPrice,
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

      !inputs.minPrice
        ? setError((prev) => ({ ...prev, minPrice: errorText }))
        : setError((prev) => ({ ...prev, minPrice: "" }));

      !inputs.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));

      !inputs.height
        ? setError((prev) => ({ ...prev, height: errorText }))
        : setError((prev) => ({ ...prev, height: "" }));

      if (inputs.gender === "m") {
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
  // trigger focusblur function
  useEffect(() => {
    FocusBlur();
  }, []);
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
      !inputs.minPrice ||
      !inputs.instagram
    ) {
      err = true;
      if (!inputs?.chest || !inputs?.shoulder) {
        inputs.gender === "m" && (err = true);
      } else if (!inputs?.bust || !inputs?.hip) {
        err = true;
      }
    }
    !user.isUpdated && setIsError(err);
    path !== "/modelpage" && setIsError(err);
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
      FocusBlur();
      handleNavigation(text);
    }
  }

  return (
    <section
      className={
        darkmode
          ? "Forms KycForms light-theme "
          : "Forms KycForms light-theme dark-theme "
      }
    >
      <header>
        <KycHeader HandleTheme={HandleTheme} darkmode={darkmode} />
      </header>

      <main>
        <section className="signupform-contact">
          <div className="signupform-container">
            <div className="form-left">
              <div className="form-left-wrapper">
                <div className="form-left-heading">
                  <h1>
                    Setting Up Your Model
                    <br></br> Portfolio
                    <span className="dots-hide-on-mobile">.</span>
                  </h1>

                  <p className="form-text">
                    fill in your information for <a>Step 2</a>
                  </p>
                </div>

                <form
                  className="form-left-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />

                  {/* stats section */}
                  <div className="form-titles-wrapper">
                    <h2 className="form-titles">Model Stats</h2>
                  </div>

                  <div className="form-stats-column">
                    {statsInput.map((item) => {
                      let name = item.id;
                      return (
                        <div className="form-container ">
                          {inputs.gender === "m"
                            ? item.id !== "bust" &&
                              item.id !== "hip" && (
                                <>
                                  <div
                                    className="form-wrapper"
                                    key={item.id}
                                    id={item.id}
                                  >
                                    {item.id !== "availableForTravel" &&
                                      item.id !== "tattoos" && (
                                        <>
                                          <input
                                            className="input-textarea"
                                            onChange={handleChange}
                                            type={item.type}
                                            id={item.id}
                                            name={item.id}
                                            placeholder=""
                                            spellCheck={false}
                                            required
                                          />

                                          <label htmlFor={item.id}>
                                            {item.placeholder}
                                          </label>
                                        </>
                                      )}

                                    {item.id === "availableForTravel" && (
                                      <div className="select-box">
                                        <select
                                          onChange={handleChange}
                                          id={item.id}
                                          name={item.id}
                                        >
                                          <option>{item.label}</option>
                                          <option value="true">Yes</option>
                                          <option value="false">No</option>
                                        </select>
                                      </div>
                                    )}
                                    {item.id === "tattoos" && (
                                      <div className="select-box">
                                        <select
                                          onChange={handleChange}
                                          id={item.id}
                                          name={item.id}
                                        >
                                          <option>{item.label}</option>
                                          <option value="true">Yes</option>
                                          <option value="false">No</option>
                                        </select>
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className={
                                      error[name] === ""
                                        ? "form-error-controller error-mtop"
                                        : "form-error-controller"
                                    }
                                  >
                                    <span className="form-error-btn">
                                      {error[name] === "" ? (
                                        <FaCheckCircle className="required-icon valid-icon " />
                                      ) : (
                                        <FaStar
                                          hidden
                                          className="required-icon errors"
                                          style={{ visibility: "0" }}
                                        />
                                      )}
                                    </span>

                                    {showError && (
                                      <p className="error-text">
                                        {item.id === name ? error[name] : null}
                                      </p>
                                    )}
                                  </div>
                                </>
                              )
                            : item.id !== "chest" &&
                              item.id !== "shoulder" && (
                                <div
                                  className="form-container"
                                  key={item.id}
                                  id={item.id}
                                >
                                  <>
                                    <div className={`form-wrapper  `}>
                                      {item.id !== "availableForTravel" &&
                                        item.id !== "tattoos" && (
                                          <>
                                            <input
                                              className="input-textarea"
                                              onChange={handleChange}
                                              type={item.type}
                                              id={item.id}
                                              name={item.id}
                                              placeholder=""
                                              spellCheck={false}
                                              required
                                            />

                                            <label htmlFor={item.id}>
                                              {item.placeholder}
                                            </label>
                                          </>
                                        )}

                                      {item.id === "availableForTravel" && (
                                        <div className="select-box">
                                          <select
                                            onChange={handleChange}
                                            id={item.id}
                                            name={item.id}
                                          >
                                            <option>{item.label}</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                          </select>
                                        </div>
                                      )}
                                      {item.id === "tattoos" && (
                                        <div className="select-box">
                                          <select
                                            onChange={handleChange}
                                            id={item.id}
                                            name={item.id}
                                          >
                                            <option>{item.label}</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                          </select>
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className={
                                        error[name] === ""
                                          ? "form-error-controller error-mtop"
                                          : "form-error-controller"
                                      }
                                    >
                                      <span className="form-error-btn">
                                        {error[name] === "" ? (
                                          <FaCheckCircle className="required-icon valid-icon " />
                                        ) : (
                                          <FaStar
                                            hidden
                                            className="required-icon errors"
                                            style={{ visibility: "0" }}
                                          />
                                        )}
                                      </span>

                                      {showError && (
                                        <p className="error-text">
                                          {item.id === name
                                            ? error[name]
                                            : null}
                                        </p>
                                      )}
                                    </div>
                                  </>
                                </div>
                              )}
                        </div>
                      );
                    })}
                  </div>

                  <section>
                    <div>
                      {/* category section  */}

                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Model Categories</h2>

                        <p className="form-descriptions">
                          <FaAngleDoubleRight />
                          <span>
                            {" "}
                            Choose which type of model you suited (2max)
                          </span>
                        </p>
                        <p
                          className="form-descriptions"
                          style={{ margin: " -1rem 0" }}
                        >
                          <FaAngleDoubleRight />
                          <span> You can only choose two model category</span>
                        </p>
                      </div>
                      <div className="form-categories-column">
                        {categoryInput.map((item) => {
                          let checked = category.find(
                            (value) => value === item.value
                          );

                          return (
                            <div key={item.id} className={`form-categories`}>
                              <input
                                onChange={(e) => {
                                  if (
                                    e.target.checked &&
                                    category.length >= 2
                                  ) {
                                    return setModalTxt("max_category");
                                    // prevent checkbox from being checked
                                  }
                                  setCategory((prev) =>
                                    e.target.checked === false
                                      ? prev.filter(
                                          (item) => item !== e.target.value
                                        )
                                      : [...prev, e.target.value]
                                  );
                                }}
                                className={`input-checkbox `}
                                type={item.type}
                                id={item.id}
                                name="category"
                                value={item.id}
                                checked={checked ? true : false}
                              />
                              <label className="" htmlFor={item.id}>
                                {item.label}
                              </label>
                              {/* For checked item */}
                              <span
                                id={item.id}
                                className={
                                  checked ? "checbox-active " : "checbox"
                                }
                              >
                                {checked ? `${item.label} ` : ""}
                                {checked ? <BsCheck2All size={18} /> : ""}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {/* jireh remix  (nigeria)*/}
                      {/* job interest section */}
                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Job Interested In</h2>

                        <p className="form-descriptions">
                          <FaAngleDoubleRight />
                          <span>
                            {" "}
                            Choose the type of job you will be interviewed in!{" "}
                          </span>
                        </p>
                        <p
                          className="form-descriptions"
                          style={{ margin: " -1rem 0" }}
                        >
                          <FaAngleDoubleRight />
                          <span>
                            {" "}
                            You can make as many choices as you can from the
                            list of jobs{" "}
                          </span>
                        </p>
                      </div>
                      <div className="form-categories-column">
                        {jobsInput.map((item) => {
                          let checked = interestedJob.find(
                            (value) => value === item.value
                          );

                          return (
                            <div key={item.id} className={`form-categories`}>
                              <input
                                onChange={(e) =>
                                  setInterestedJob((prev) =>
                                    e.target.checked === false
                                      ? prev.filter(
                                          (item) => item !== e.target.value
                                        )
                                      : [...prev, e.target.value]
                                  )
                                }
                                className={`input-checkbox `}
                                type={item.type}
                                id={item.id}
                                name="interestedJob"
                                value={item.id}
                                checked={checked ? true : false}
                              />
                              <label className="" htmlFor={item.id}>
                                {item.label}
                              </label>
                              {/* For checked item */}
                              <span
                                id={item.id}
                                className={
                                  checked ? "checbox-active " : "checbox"
                                }
                              >
                                {checked ? `${item.label} ` : ""}
                                {checked ? <BsCheck2All size={18} /> : ""}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* social media section */}

                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Social Media Handles</h2>

                        <p
                          className="form-descriptions"
                          style={{ margin: " -1rem 0 -2.5rem 0" }}
                        >
                          <FaAngleDoubleRight />
                          <span> Enter your instagram username </span>
                        </p>
                      </div>

                      <div className="form-stats-column">
                        {SocialMedia.map((item) => {
                          let name = [item.id];
                          return (
                            <div className="form-container " key={item.id}>
                              <div className="form-wrapper ">
                                <>
                                  <input
                                    className="input-textarea"
                                    onChange={handleChange}
                                    type={item.type}
                                    id={item.id}
                                    name={item.id}
                                    placeholder=""
                                    spellCheck={false}
                                    required
                                  />
                                  <label htmlFor={item.id}>
                                    {item.placeholder}
                                  </label>
                                </>
                              </div>

                              <div
                                className={
                                  error[name] === ""
                                    ? "form-error-controller error-mtop"
                                    : "form-error-controller"
                                }
                              >
                                <span className="form-error-btn">
                                  {error[name] === "" ? (
                                    <FaCheckCircle className="required-icon valid-icon " />
                                  ) : (
                                    <FaStar
                                      hidden
                                      className="required-icon errors"
                                      style={{ visibility: "0" }}
                                    />
                                  )}
                                </span>

                                {showError && (
                                  <p className="error-text">{error[item.id]}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* nav section */}
                      <div className="kyc-btn-container">
                        <FormNavBtn
                          btnText="Back"
                          name="form2"
                          FocusBlur={FocusBlur}
                          handleClick={handleNavigation}
                          type="button"
                        />
                        <FormNavBtn
                          btnText="Next"
                          FocusBlur={FocusBlur}
                          isError={isError}
                          name="form2"
                          handleClick={handleSubmit}
                          type="button"
                        />
                      </div>
                    </div>
                  </section>
                </form>
              </div>
            </div>

            <div className="form-right">
              <div className="form-img-wrapper">
                {picture ? (
                  <img
                    src={URL.createObjectURL(picture)}
                    className="form-img"
                  />
                ) : (
                  <img
                    src={"/images/sign-up/model2.jpg"}
                    className="form-img"
                  />
                )}

                <div className="wave-wrap">
                  <svg
                    className="wave"
                    viewBox="0 0 783 1536"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="wave"
                      d="M236.705 1356.18C200.542 1483.72 64.5004 1528.54 1 1535V1H770.538C793.858 63.1213 797.23 196.197 624.165 231.531C407.833 275.698 274.374 331.715 450.884 568.709C627.393 805.704 510.079 815.399 347.561 939.282C185.043 1063.17 281.908 1196.74 236.705 1356.18Z"
                    />
                  </svg>
                </div>
                <svg
                  viewBox="0 0 345 877"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dashed-wave"
                >
                  <path
                    id="dashed-wave"
                    d="M0.5 876C25.6667 836.167 73.2 739.8 62 673C48 589.5 35.5 499.5 125.5 462C215.5 424.5 150 365 87 333.5C24 302 44 237.5 125.5 213.5C207 189.5 307 138.5 246 87C185 35.5 297 1 344.5 1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default ModelsKycForm2;
