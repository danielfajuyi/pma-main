import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { makeEdit, makeGet, update } from "../../../../redux/apiCalls";
import { info } from "../utils";
import "./About.css";
import EditBtn from "./Edit-btn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";
import KycHeader from "../Kyc-Section/Component/kyc-header/kyc-header";
import { BiCloudUpload } from "react-icons/bi";
import {
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaInbox,
  FaAngleDoubleRight,
} from "react-icons/fa";
function BasicInfo({
  HandleTheme,
  states,
  countries,
  darkmode,
  handleActiveEdit,
  activeEdit,
  handleActiveSet,
  resetDiscard,
  model,
  inputs,
  FocusBlur,
  setInputs,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const imageRef = useRef();
  const [progress, setProgress] = useState(0);
  const [picture, setPicture] = useState(undefined);
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");
  const [modal, setModal] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [ActiveSettings, setActiveSettings] = useState(true);
  // get image imputs
  const handleClick = () => {
    imageRef.current.click();
  };

  // preview image modal
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModal(true);
  };

  // upload file/image
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
      () => {},
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

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );

  //handle save
  const handleSave = () => {
    if (user?.role === "model") {
      update(dispatch, "/model/", { ...inputs }, setMessage);
      setUpdated(true);
    } else {
      makeEdit(
        dispatch,
        `/agency/${model?.model?._id}`,
        { ...inputs },
        setMessage
      );
      setUpdated(true);
    }
  };

  useEffect(() => {
    FocusBlur();
  });

  console.log(inputs);
  console.log(user);

  return (
    <>
      <section
        className={
          darkmode
            ? "Forms KycForms light-theme  "
            : "Forms KycForms light-theme dark-theme"
        }
      >
        <header>
          <KycHeader
            handleActiveSet={handleActiveSet}
            ActiveSettings={ActiveSettings}
            user={user}
            HandleTheme={HandleTheme}
            darkmode={darkmode}
          />
        </header>
        <main>
          <section className="signupform-contact">
            <div className="signupform-container">
              <div className="form-left">
                <div className="form-left-wrapper">
                  <div className="form-left-heading">
                    <h1>
                      Editing Your Model
                      <br></br> Portfolio
                      <span className="dots-hide-on-mobile">.</span>
                    </h1>

                    <p className="form-text">
                      Change your profile and account <a>settings</a>
                    </p>
                  </div>

                  <form
                    className="form-left-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
                    <ToastContainer position="top-center" />
                    <>
                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Model Picture </h2>
                        <EditBtn
                          btnText={
                            activeEdit === "profile-details" ? "Done" : "Edit"
                          }
                          section="profile-details"
                          handleActiveEdit={handleActiveEdit}
                        />
                        {activeEdit === "profile-details" && (
                          <p className="form-descriptions">
                            <FaAngleDoubleRight />
                            <span>
                              Include a well-lit headShort, generally framed
                              between the top of your head to just below your
                              shoulders.
                            </span>
                          </p>
                        )}
                      </div>
                      {activeEdit === "profile-details" && (
                        <div className="form-container" id="picture">
                          <div className="image-container color-codes">
                            <div
                              className={
                                modal ? "pic-model open-model" : "pic-model"
                              }
                            >
                              <img src={tempImgSrc} />
                              <FaTimes onClick={() => setModal(false)} />
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
                                onClick={() =>
                                  getImg(URL.createObjectURL(picture))
                                }
                              >
                                <img
                                  src={
                                    picture
                                      ? URL.createObjectURL(picture)
                                      : user?.picture
                                  }
                                  alt=""
                                />
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

                                <img
                                  src={
                                    picture
                                      ? URL.createObjectURL(picture)
                                      : user?.picture
                                  }
                                  alt=""
                                />
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
                        </div>
                      )}

                      {activeEdit !== "profile-details" && (
                        <div className="form-container" id="picture">
                          <div className="image-container color-codes">
                            <div
                              className={
                                modal ? "pic-model open-model" : "pic-model"
                              }
                            >
                              <img src={tempImgSrc} />
                              <FaTimes onClick={() => setModal(false)} />
                            </div>

                            <div
                              className={"img-area read-only active"}
                              data-img={"preview picture"}
                              onClick={() =>
                                getImg(
                                  picture
                                    ? URL.createObjectURL(picture)
                                    : user?.picture
                                )
                              }
                            >
                              <img
                                src={
                                  picture
                                    ? URL.createObjectURL(picture)
                                    : user?.picture
                                }
                                alt=""
                              />
                            </div>

                            {user?.picture && (
                              <span
                                className="select-image"
                                style={{ textAlign: "center" }}
                              >
                                {user?.role === "agency"
                                  ? model?.model?.fullName
                                  : user?.model?.fullName}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Profile Details</h2>
                        <EditBtn
                          btnText={
                            activeEdit === "profile-details" ? "Done" : "Edit"
                          }
                          section="profile-details"
                          handleActiveEdit={handleActiveEdit}
                        />
                      </div>

                      {activeEdit === "profile-details" && (
                        <>
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

                                <label htmlFor={"username"}>
                                  {"User Name"}
                                </label>
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
                                        <option
                                          value={country_name}
                                          key={index}
                                        >
                                          {country_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
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
                            </div>
                          </div>
                        </>
                      )}

                      {activeEdit !== "profile-details" && (
                        <>
                          <div className="form-container" id="username">
                            <div className={`form-wrapper  `}>
                              <div className="read-only-container">
                                <span className="read-only-title">
                                  Your Full Name
                                </span>

                                <div className="read-only-infobox">
                                  <span className="info">
                                    {user?.role === "agency"
                                      ? model?.model?.fullName
                                      : user?.model?.fullName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-input-column">
                            <div className="form-container" id="username">
                              <div className={`form-wrapper  `}>
                                <div className="read-only-container">
                                  <span className="read-only-title">
                                    Your User Name
                                  </span>

                                  <div className="read-only-infobox">
                                    <span className="info">
                                      {user?.username && updated === true
                                        ? user?.username
                                        : !inputs.username
                                        ? user?.username
                                        : inputs?.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="form-container" id="gender">
                              <div className={`form-wrapper `}>
                                <div className="read-only-container">
                                  <span className="read-only-title">
                                    Gender
                                  </span>

                                  <div className="read-only-infobox">
                                    {user.model.gender === "m"
                                      ? "Male"
                                      : "Female" && (
                                          <div className="read-only-infobox">
                                            {user?.model?.gender &&
                                            updated === true
                                              ? user?.model?.gender
                                              : !inputs.gender
                                              ? user?.model?.gender
                                              : inputs?.gender}
                                          </div>
                                        )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-input-column">
                            <div className="form-container" id="country">
                              <div className={`form-wrapper `}>
                                <div className="read-only-container">
                                  <span className="read-only-title">
                                    Country
                                  </span>

                                  {user?.role === "agency" ? (
                                    <div className="read-only-infobox">
                                      {model?.model?.country && updated === true
                                        ? model?.model?.country
                                        : !inputs.country
                                        ? model?.model?.country
                                        : inputs?.country}
                                    </div>
                                  ) : (
                                    <div className="read-only-infobox">
                                      {user?.model?.country && updated === true
                                        ? user?.model?.country
                                        : !inputs.country
                                        ? user?.model?.country
                                        : inputs?.country}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-container" id="state">
                              <div className={`form-wrapper `}>
                                <div className="read-only-container">
                                  <span className="read-only-title">State</span>

                                  {user?.role === "agency" ? (
                                    <div className="read-only-infobox">
                                      {model?.model?.state && updated === true
                                        ? model?.model?.state
                                        : !inputs.state
                                        ? model?.model?.state
                                        : inputs?.state}
                                    </div>
                                  ) : (
                                    <div className="read-only-infobox">
                                      {user?.model?.state && updated === true
                                        ? user?.model?.state
                                        : !inputs.state
                                        ? user?.model?.state
                                        : inputs?.state}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Model Bio</h2>
                        <EditBtn
                          btnText={activeEdit === "model-bio" ? "Done" : "Edit"}
                          section="model-bio"
                          handleActiveEdit={handleActiveEdit}
                        />
                        {activeEdit === "model-bio" && (
                          <>
                            <p className="form-descriptions">
                              <FaAngleDoubleRight />
                              <span>
                                {" "}
                                Share a little about your self, including years
                                of modeling experience, previous clients, etc.
                              </span>
                            </p>
                            <p className="form-descriptions">
                              <FaAngleDoubleRight />
                              <span>
                                {" "}
                                Don't be afraid to express your personality so
                                you can stand out from the crowd.
                              </span>
                            </p>
                          </>
                        )}
                      </div>

                      {activeEdit === "model-bio" && (
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
                        </div>
                      )}

                      {activeEdit !== "model-bio" && (
                        <div className="form-container" id="bio">
                          <div className="form-wrapper read-only-wrapper">
                            <textarea
                              cols="30"
                              rows="10"
                              readOnly
                              className="input-textarea read-only-textarea"
                              required
                            ></textarea>

                            <div
                              style={{
                                position: "absolute",
                                top: "23px",
                                left: "20px",
                                color: "var(--text-color)",
                              }}
                            >
                              {user?.role === "agency" ? (
                                <div className="read-only-infobox">
                                  {model?.model?.bio && updated === true
                                    ? model?.model?.bio
                                    : !inputs.bio
                                    ? model?.model?.bio
                                    : inputs?.bio}
                                </div>
                              ) : (
                                <div className="read-only-infobox">
                                  {user?.model?.bio && updated === true
                                    ? user?.model?.bio
                                    : !inputs.bio
                                    ? user?.model?.bio
                                    : inputs?.bio}
                                </div>
                              )}
                            </div>

                            <FaInbox />
                          </div>
                        </div>
                      )}

                      <div className="kyc-btn-container">
                        {/* btn section  */}

                        <button
                          onClick={() => resetDiscard(() => handleSave)}
                          className="discard-btn  bold-text cancel-btn"
                        >
                          Discard
                        </button>
                        <button
                          style={{
                            backgroundColor: activeEdit !== "Done" && "#bbbb",
                          }}
                          disabled={activeEdit !== "Done" && true}
                          onClick={handleSave}
                          className="save-btn  bold-text yes-btn"
                        >
                          {isFetching ? "Please wait..." : "Save"}
                        </button>
                        <p className="error-text">{message}</p>
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
                  ) : user?.picture ? (
                    <img src={user?.picture} className="form-img" />
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
    </>
  );
}

export default BasicInfo;
