import { useContext, useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { BiCloudUpload } from "react-icons/bi";
import { storage } from "../../../../../firebase";
import { useSelector } from "react-redux";
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
import { FormContext } from "../Models-Kyc-Forms";
function ModelsKycForm1({}) {
  const {
    handleNavigation,
    inputs,
    handleChange,
    setInputs,
    path,
    darkmode,
    countries,
    states,
    picture,
    setPicture,
    FocusBlur,
    HandleTheme,
  } = useContext(FormContext);
  const user = useSelector((state) => state.user.currentUser);
  const imageRef = useRef();
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [progress, setProgress] = useState(0);

  // get image imputs
  const handleClick = () => {
    imageRef.current.click();
  };

  // preview image modal
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  // upload image
  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "picture" && setProgress(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    picture && uploadFile(picture, "picture");
  }, [picture]);

  //input error state
  const [error, setError] = useState({
    userNameErr: "",
    genderErr: "",
    countryErr: "",
    stateErr: "",
    bioErr: "",
    pictureErr: "",
  });

  // handle empty input
  useEffect(() => {
    function handleError() {
      // handles progress state
      let newprogress = 16.67;
      let errorText = "This detail is required!";
      let bioText = "The bio section is required!";
      let pictureText = "Model picture is";

      !inputs.username
        ? setError((prev) => ({ ...prev, userNameErr: errorText }))
        : setError((prev) => ({ ...prev, userNameErr: null }));

      !inputs.gender
        ? setError((prev) => ({ ...prev, genderErr: errorText }))
        : setError((prev) => ({ ...prev, genderErr: null }));

      !inputs.country
        ? setError((prev) => ({ ...prev, countryErr: errorText }))
        : setError((prev) => ({ ...prev, countryErr: null }));

      !inputs.state
        ? setError((prev) => ({ ...prev, stateErr: errorText }))
        : setError((prev) => ({ ...prev, stateErr: null }));

      !inputs.bio
        ? setError((prev) => ({
            ...prev,
            bioErr: bioText,
          }))
        : setError((prev) => ({ ...prev, bioErr: null }));

      picture === undefined
        ? setError((prev) => ({ ...prev, pictureErr: pictureText }))
        : setError((prev) => ({ ...prev, pictureErr: null }));
    }

    handleError();
  }, [inputs, picture]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      picture === undefined ||
      !inputs.username ||
      !inputs.gender ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio
    ) {
      err = true;
    }

    !user.isUpdated && setIsError(err);
    path !== "/modelpage" && setIsError(err);
    setProgress(100);
  }, [error, inputs, picture, user]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      FocusBlur();
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
                    Setting Up Your Model
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
                    </div>
                    <div className="form-input-column">
                      <div className="form-container" id="username">
                        <div className={`form-wrapper  `}>
                          <input
                            className="input-textarea"
                            onChange={handleChange}
                            type="text"
                            id="User Name"
                            name="username"
                            placeholder=""
                            required
                          />

                          <label htmlFor={"username"}>{"User Name"}</label>
                        </div>

                        <div
                          className={
                            error.userNameErr === null
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.userNameErr === null ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "0" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.userNameErr}</p>
                          )}
                        </div>
                      </div>

                      <div className="form-container" id="gender">
                        <div className={`form-wrapper `}>
                          <div className="select-box">
                            <select
                              className=""
                              onChange={handleChange}
                              name="gender"
                              id="gender"
                            >
                              <option hidden> Select your gender</option>
                              <option value="m">Male</option>
                              <option value="f">Female</option>
                            </select>
                          </div>
                        </div>

                        <div
                          className={
                            error.genderErr === null
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.genderErr === null ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "0" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.genderErr}</p>
                          )}
                        </div>
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
                            error.countryErr === null
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.countryErr === null ? (
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
                            <p className="error-text">{error.countryErr}</p>
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
                            error.stateErr === null
                              ? "form-error-controller error-mtop"
                              : "form-error-controller"
                          }
                        >
                          <span className="form-error-btn">
                            {error.stateErr === null ? (
                              <FaCheckCircle className="required-icon valid-icon " />
                            ) : (
                              <FaStar
                                className="required-icon errors"
                                style={{ visibility: "none" }}
                              />
                            )}
                          </span>

                          {showError && (
                            <p className="error-text">{error.stateErr}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Model Bio</h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Share a little about your self, including years of
                          modeling experience, previous clients, etc.
                        </span>
                      </p>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Don't be afraid to express your personality so you can
                          stand out from the crowd.
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
                        <label>wright out your Bio here...</label>
                        <FaInbox />
                      </div>

                      <div
                        className={
                          error.bioErr === null
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.bioErr === null ? (
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
                          <p className="error-text">{error.bioErr}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Model Picture </h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          Include a well-lit headShort, generally framed between
                          the top of your head to just below your shoulders.
                        </span>
                      </p>
                    </div>
                    <div className="form-container" id="picture">
                      <div className="image-container color-codes">
                        <div
                          className={
                            model ? "pic-model open-model" : "pic-model"
                          }
                        >
                          <img src={tempImgSrc} />
                          <FaTimes onClick={() => setModel(false)} />
                        </div>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          ref={imageRef}
                          onChange={(e) => setPicture(e.target.files[0])}
                          hidden
                        />
                        {picture ? (
                          <div
                            className={"img-area active"}
                            data-img={
                              progress < 100
                                ? `uploading ${progress}%`
                                : "preview picture"
                            }
                            onClick={() => getImg(URL.createObjectURL(picture))}
                          >
                            {picture && (
                              <img src={URL.createObjectURL(picture)} alt="" />
                            )}
                          </div>
                        ) : (
                          <div
                            className={"img-area"}
                            data-img={
                              progress < 100
                                ? `uploading ${progress}%`
                                : "preview picture"
                            }
                            onClick={handleClick}
                          >
                            <BiCloudUpload />

                            <h3>Upload Image</h3>

                            {picture === undefined && !user.isUpdated && (
                              <p style={{ zIndex: 1, color: "var(--pink)" }}>
                                {error.pictureErr} <span>required! </span>
                              </p>
                            )}

                            {picture && (
                              <img src={URL.createObjectURL(picture)} alt="" />
                            )}
                          </div>
                        )}

                        {picture ? (
                          <span
                            onClick={handleClick}
                            className="select-image"
                            style={{ textAlign: "center" }}
                            disabled={progress > 0 && progress < 100}
                          >
                            {progress > 0 && progress < 100
                              ? ` uploading ${progress}%`
                              : "Change Picture"}
                          </span>
                        ) : (
                          <span
                            onClick={handleClick}
                            className="select-image"
                            style={{ textAlign: "center" }}
                          >
                            {"Upload Picture"}
                          </span>
                        )}
                      </div>

                      <div
                        className={
                          error.pictureErr === null
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.pictureErr === null ? (
                            <FaCheckCircle className="required-icon valid-icon " />
                          ) : (
                            <FaStar
                              hidden
                              className="required-icon errors"
                              style={{ visibility: "0" }}
                            />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="kyc-btn-container">
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

export default ModelsKycForm1;
