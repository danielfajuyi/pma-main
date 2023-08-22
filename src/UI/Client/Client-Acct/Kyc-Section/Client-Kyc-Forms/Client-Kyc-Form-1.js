import { FormContext } from "../Client-Kyc-Forms";
import { useContext, useEffect, useState } from "react";
import { Industry, SocialMedia } from "../../utils";
import {
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaInbox,
  FaAngleDoubleRight,
} from "react-icons/fa";
import FormNavBtn from "../Component/btn/Form-nav-btn";
import KycHeader from "../Component/kyc-header/kyc-header";
import axios from "axios";
import "../Component/svg-scss/svg.scss";
import "../Component/img-scss/img.scss";
function ClientsKycForm1({}) {
  const {
    handleNavigation,
    handleChange,
    HandleTheme,
    darkmode,
    FocusBlur,
    inputs,
    setInputs,
    states,
    countries,
    picture,
    setPicture,
  } = useContext(FormContext);
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);

  // error state
  const [error, setError] = useState({
    brandName: inputs.brandName,
    brandUrl: inputs.brandUrl,
    address: inputs.address,
    state: inputs.state,
    country: inputs.country,
    bio: inputs.bio,
    instagram: inputs.instagram,
    industry: inputs.industry,
  });

  //setting error messages
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required.!";
      let bioErr = "The Bio section is required.!";
      let industryErr = "Please choose an industry.!";
      let socialErr = "You social-media link is required.!";

      !inputs.brandName
        ? setError((prev) => ({ ...prev, brandName: errorText }))
        : setError((prev) => ({ ...prev, brandName: "" }));

      !inputs.brandUrl
        ? setError((prev) => ({ ...prev, brandUrl: errorText }))
        : setError((prev) => ({ ...prev, brandUrl: "" }));

      !inputs.address
        ? setError((prev) => ({ ...prev, address: errorText }))
        : setError((prev) => ({ ...prev, address: "" }));

      !inputs.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: "" }));

      !inputs.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: "" }));

      !inputs.bio
        ? setError((prev) => ({ ...prev, bio: bioErr }))
        : setError((prev) => ({ ...prev, bio: "" }));

      !inputs.industry
        ? setError((prev) => ({ ...prev, industry: industryErr }))
        : setError((prev) => ({ ...prev, industry: "" }));

      !inputs.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));
    }

    handleError();
  }, [inputs]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      !inputs.brandName ||
      !inputs.brandUrl ||
      !inputs.address ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio ||
      !inputs.instagram ||
      !inputs.industry
    ) {
      err = true;
    } else {
      err = false;
    }

    setIsError(err);
  }, [inputs]);

  // trigger focusblur function
  useEffect(() => {
    FocusBlur();
  }, []);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      handleNavigation(text);
    }
  }

  return (
    <section
      className={
        darkmode
          ? "Forms KycForms light-theme  "
          : "Forms KycForms light-theme dark-theme"
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
                    Setting Up Your Client
                    <br></br> Portfolio
                    <span className="dots-hide-on-mobile">.</span>
                  </h1>

                  <p className="form-text">
                    fill in your information for <a>Step 1</a>
                  </p>
                </div>

                <form
                  className="form-left-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Profile Details</h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span> Let's get to know you better.!</span>
                      </p>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span> Fill out some basic info about your Brand.</span>
                      </p>
                    </div>

                    <div className="form-input-column">
                      <div className="form-container" id="brandName">
                        <div className={`form-wrapper  `}>
                          <input
                            className="input-textarea"
                            onChange={handleChange}
                            type="text"
                            id="brandName"
                            name="brandName"
                            placeholder=""
                            required
                          />

                          <label htmlFor={"brandName"}>
                            {"Your Brand Name..."}
                          </label>
                        </div>

                        <div
                          className={
                            error.brandName === ""
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.brandName === "" ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "0" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.brandName}</p>
                          )}
                        </div>
                      </div>

                      <div className="form-container" id="brandUrl">
                        <div className={`form-wrapper  `}>
                          <input
                            className="input-textarea"
                            onChange={handleChange}
                            type="text"
                            id="brandUrl"
                            name="brandUrl"
                            placeholder=""
                            required
                          />

                          <label htmlFor={"brandUrl"}>
                            {"Your Brand Url..."}
                          </label>
                        </div>

                        <div
                          className={
                            error.brandUrl === ""
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.brandUrl === "" ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "0" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.brandUrl}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-container" id="address">
                      <div className={`form-wrapper  `}>
                        <input
                          className="input-textarea"
                          onChange={handleChange}
                          type="text"
                          id="address"
                          name="address"
                          placeholder=""
                          required
                        />

                        <label htmlFor={"address"}>{"Office Address..."}</label>
                      </div>

                      <div
                        className={
                          error.address === ""
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.address === "" ? (
                            <FaCheckCircle className="required-icon valid-icon " />
                          ) : (
                            <FaStar
                              className="required-icon errors"
                              style={{ visibility: "0" }}
                            />
                          )}
                        </span>

                        {showError && (
                          <p className="error-text">{error.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-input-column">
                      <div className="form-container" id="country">
                        <div className={`form-wrapper `}>
                          <div className="select-box">
                            <select
                              className=""
                              onChange={handleChange}
                              name="country"
                            >
                              <option hidden> --Select Country--</option>
                              {countries?.map((getCountry, index) => {
                                const { country_name } = getCountry;
                                return (
                                  <option value={country_name} key={index}>
                                    {country_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div
                          className={
                            error.country === ""
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.country === "" ? (
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
                            <p className="error-text">{error.country}</p>
                          )}
                        </div>
                      </div>
                      <div className="form-container" id="state">
                        <div className={`form-wrapper `}>
                          <div className="select-box">
                            <select
                              className=""
                              onChange={handleChange}
                              name="state"
                            >
                              <option hidden> --Select State--</option>
                              {inputs?.country && (
                                <>
                                  {states.map((state, index) => {
                                    return (
                                      <option
                                        value={
                                          state.state_name ===
                                          "Abuja Federal Capital Territor"
                                            ? "Abuja"
                                            : state.state_name
                                        }
                                        key={index}
                                      >
                                        {state.state_name ===
                                        "Abuja Federal Capital Territor"
                                          ? "Abuja"
                                          : state.state_name}
                                      </option>
                                    );
                                  })}
                                </>
                              )}
                            </select>
                          </div>
                        </div>

                        <div
                          className={
                            error.state === ""
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.state === "" ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "none" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.state}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Client's Industry</h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Pick an industry from the list of industries in the
                          drop down.
                        </span>
                      </p>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Please ensure that your chosen industry compliments
                          your Brand.
                        </span>
                      </p>
                    </div>
                    <div className="form-container" id="industry">
                      <div className={`form-wrapper `}>
                        <div className="select-box">
                          <select
                            className=""
                            onChange={handleChange}
                            name="industry"
                          >
                            <option hidden> --Choose an industry--</option>
                            {Industry.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      <div
                        className={
                          error.industry === ""
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.industry === "" ? (
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
                          <p className="error-text">{error.industry}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Client's Bio</h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Share a little about your Brand, including years of
                          experience, achievements etc.
                        </span>
                      </p>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Include a credible and verifiable information so you
                          can stand out from the crowd.
                        </span>
                      </p>
                    </div>
                    <div className="form-container" id="bio">
                      <div className="form-wrapper">
                        <textarea
                          name="bio"
                          onChange={handleChange}
                          id="bio"
                          cols="30"
                          rows="10"
                          className="input-textarea"
                          required
                        ></textarea>
                        <label>Brief infomation about your Brand... </label>
                        <FaInbox />
                      </div>

                      <div
                        className={
                          error.bio === ""
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.bio === "" ? (
                            <FaCheckCircle className="required-icon valid-icon " />
                          ) : (
                            <FaStar
                              hidden
                              className="required-icon errors"
                              style={{ visibility: "0" }}
                            />
                          )}
                        </span>

                        {showError && <p className="error-text">{error.bio}</p>}
                      </div>
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Social Media Handle</h2>

                      <p
                        className="form-descriptions"
                        style={{ margin: " 1rem 0 -2rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span> Enter your instagram username </span>
                      </p>
                    </div>
                    {SocialMedia.map((item) => {
                      let name = [item.id];
                      return (
                        <div
                          className="form-container "
                          id={item.id}
                          key={item.id}
                        >
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

                    <div
                      className="kyc-btn-container"
                      style={{ margin: "1.5rem 0 2rem 0" }}
                    >
                      <FormNavBtn
                        btnText="Next"
                        name="form1"
                        isError={isError}
                        FocusBlur={FocusBlur}
                        handleClick={handleSubmit}
                        type="button"
                      />
                    </div>
                  </>
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
                    src={"/images/sign-up/client5.jpg"}
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

export default ClientsKycForm1;
