import { FormContext } from "../Client-Kyc-Forms";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState, useEffect, useContext } from "react";
import { Photo } from "../../utils";
import { storage } from "../../../../../firebase";
import { AlertModal } from "../../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../../redux/apiCalls";
import { BiCloudUpload } from "react-icons/bi";
import {
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaInbox,
  FaAngleDoubleRight,
} from "react-icons/fa";
import FormNavBtn from "../Component/btn/Form-nav-btn";
import KycHeader from "../Component/kyc-header/kyc-header";
import "../Component/svg-scss/svg.scss";
import "../Component/img-scss/img.scss";
function ClientsKycForm2({}) {
  const {
    handleNavigation,
    handleChange,
    HandleTheme,
    darkmode,
    FocusBlur,
    inputs,
    setInputs,
  } = useContext(FormContext);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [jobPhotos, setJobPhotos] = useState([]);
  const [jobPhoto, setJobPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [coverPicture, setCoverPicture] = useState(undefined);
  const [picture, setPicture] = useState(undefined);
  const [submit, setSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [brandProgress, setBrandProgress] = useState(0);
  const [modalTxt, setModalTxt] = useState("");

  // preview image modal
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => ({ ...prevData, [e.target.id]: img }));
    setJobPhoto(e.target.files[0]);
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/client/${inputs.brandName}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "jobPhotos") {
          setBrandProgress(Math.round(progress));
        }
        if (urlType === "picture") {
          setProgress(Math.round(progress));
        }
        if (urlType === "coverPicture") {
          setCoverProgress(Math.round(progress));
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log(`Upload is running at ${progress} `);
            console.log(`brand Upload is running at ${brandProgress} `);
            console.log(`cover Upload is running at ${coverProgress} `);
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (urlType === "jobPhotos") {
            setJobPhotos((prev) => [...prev, downloadURL]);
          }
          if (urlType === "picture") {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          }
          if (urlType === "coverPicture") {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          }
        });
      }
    );
  };

  useEffect(() => {
    const sendJobPhoto = (urlType) => {
      urlType = "jobPhotos";
      setInputs((prev) => {
        return { ...prev, [urlType]: jobPhotos };
      });
      if (jobPhoto) {
        uploadFile(jobPhoto, "jobPhotos");
        setJobPhoto(undefined);
      }
    };
    sendJobPhoto();

    const sendPicture = (urlType) => {
      urlType = "picture";
      if (picture) {
        uploadFile(picture, "picture");
        setPicture(undefined);
      }
    };
    sendPicture();

    const sendCoverPicture = (urlType) => {
      urlType = "coverPicture";
      if (coverPicture) {
        uploadFile(coverPicture, "coverPicture");
        setCoverPicture(undefined);
      }
    };
    sendCoverPicture();
  }, [coverPicture, jobPhoto, jobPhotos, picture]);

  //handling submit
  function handleSubmit() {
    if (jobPhotos.length < 6 && !picture) {
      setModalTxt("add-photo");
    } else {
      update(dispatch, "/client/", { ...inputs, isUpdated: true }, setModalTxt);
    }
  }
  console.log(inputs);

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
            <div className="form-left  polariods">
              <div className="form-left-wrapper polariods-wrapper">
                <div className="form-left-heading">
                  <h1>
                    Setting Up Your Client
                    <br></br> Portfolio
                    <span className="dots-hide-on-mobile">.</span>
                  </h1>

                  <p className="form-text">
                    fill in your information for <a>Final Step</a>
                  </p>
                </div>

                <form
                  className="form-left-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />

                  <section>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Profile Photo</h2>

                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span> Add a display picture for your dashboard.</span>
                      </p>
                      <p
                        className="form-descriptions"
                        style={{ margin: " -1rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span> Include a well-lit headShort.</span>
                      </p>
                      <p
                        className="form-descriptions"
                        style={{ margin: " -1rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Generally framed between top of your head to just
                          below your shoulder.
                        </span>
                      </p>
                      <p
                        className="form-descriptions"
                        style={{ margin: " -1rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          You can also make use of your Brand logo image or
                          design
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
                          name="picture"
                          id="picture"
                          className="client-picture"
                          onChange={(e) => setPicture(e.target.files[0])}
                          hidden
                        />
                        {inputs?.picture ? (
                          <div
                            className={"img-area active"}
                            data-img={
                              progress < 100
                                ? `uploading ${progress}%`
                                : "preview picture"
                            }
                            onClick={() => getImg(inputs?.picture)}
                          >
                            {inputs?.picture && (
                              <img src={inputs?.picture} alt="" />
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
                            onClick={() =>
                              document.querySelector(`.client-picture`).click()
                            }
                          >
                            <BiCloudUpload />

                            <h3>Upload Profile Picture</h3>

                            <p style={{ zIndex: 1, color: "var(--pink)" }}>
                              Client Photo is <span>required! </span>
                            </p>

                            {inputs?.picture && (
                              <img src={inputs?.picture} alt="" />
                            )}
                          </div>
                        )}

                        {inputs?.picture ? (
                          <span
                            onClick={() =>
                              document.querySelector(`.client-picture`).click()
                            }
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
                            onClick={() =>
                              document.querySelector(`.client-picture`).click()
                            }
                            className="select-image"
                            style={{ textAlign: "center" }}
                          >
                            {"Upload Picture"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Brand Photo</h2>

                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Upload pictures of some of the modeling jobs done by
                          your models!
                        </span>
                      </p>
                      <p
                        className="form-descriptions"
                        style={{ margin: " -1rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Try to include a headShot, a side/profile shot,and a
                          full body shot.
                        </span>
                      </p>
                    </div>
                    <div className="form-images-column" id="jobPhotos">
                      {Photo.map((item, index) => {
                        return (
                          <div
                            className="image-container color-codes"
                            key={item.id}
                          >
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
                              name="jobPhotos"
                              className={`picture-${item.id}`}
                              id={item.id}
                              onChange={handlePhotos}
                              hidden
                            />

                            {jobPhotos[index] ? (
                              <div
                                className={"img-area area-2 active"}
                                data-img={
                                  brandProgress > 0 && brandProgress < 100
                                    ? `uploading ${brandProgress}%`
                                    : "preview picture"
                                }
                                onClick={() => getImg(jobPhotos[index])}
                              >
                                {jobPhotos[index] && (
                                  <img src={jobPhotos[index]} alt="" />
                                )}
                              </div>
                            ) : (
                              <div
                                className={"img-area area-2"}
                                data-img={
                                  brandProgress > 0 && brandProgress < 100
                                    ? `uploading ${brandProgress}%`
                                    : "preview picture"
                                }
                                onClick={() =>
                                  document
                                    .querySelector(`.picture-${item.id}`)
                                    .click()
                                }
                              >
                                <BiCloudUpload />

                                <h3>Upload Brand Photo</h3>

                                {jobPhotos[index] && (
                                  <img src={jobPhotos[index]} alt="" />
                                )}
                              </div>
                            )}

                            {jobPhotos[index] ? (
                              <span
                                onClick={() =>
                                  document
                                    .querySelector(`.picture-${item.id}`)
                                    .click()
                                }
                                className="select-image"
                                style={{ textAlign: "center" }}
                                disabled={
                                  brandProgress > 0 && brandProgress < 100
                                }
                              >
                                {brandProgress > 0 &&
                                brandProgress < 100 &&
                                item.id === item.id
                                  ? ` uploading ${brandProgress}`
                                  : "Change Picture"}
                              </span>
                            ) : (
                              <span
                                onClick={() =>
                                  document
                                    .querySelector(`.picture-${item.id}`)
                                    .click()
                                }
                                className="select-image"
                                style={{ textAlign: "center" }}
                              >
                                {"Upload Picture"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Cover Photo</h2>

                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span> Add a Cover Photo (optional). </span>
                      </p>
                      <p
                        className="form-descriptions"
                        style={{ margin: " -1rem 0" }}
                      >
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          You can also make use Brand logo design Or Banner{" "}
                        </span>
                      </p>
                    </div>
                    <div className="form-container" id="coverPicture">
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
                          name="coverPicture"
                          id="coverPicture"
                          className="cover-picture"
                          onChange={(e) => setCoverPicture(e.target.files[0])}
                          hidden
                        />
                        {inputs?.coverPhoto ? (
                          <div
                            className={"img-area active"}
                            data-img={
                              coverProgress > 0 && coverProgress < 100
                                ? `uploading ${coverProgress}%`
                                : "preview cover picture"
                            }
                            onClick={() => getImg(inputs?.coverPhoto)}
                          >
                            {inputs?.coverPicture && (
                              <img src={inputs?.coverPicture} alt="" />
                            )}
                          </div>
                        ) : (
                          <div
                            className={"img-area"}
                            data-img={
                              coverProgress > 0 && coverProgress < 100
                                ? `uploading ${coverProgress}%`
                                : "preview picture"
                            }
                            onClick={() =>
                              document.querySelector(`.cover-picture`).click()
                            }
                          >
                            <BiCloudUpload />

                            <h3>Upload Cover Photo</h3>

                            {inputs?.coverPicture && (
                              <img src={inputs?.coverPicture} alt="" />
                            )}
                          </div>
                        )}

                        {inputs?.coverPicture ? (
                          <span
                            onClick={() =>
                              document.querySelector(`.cover-picture`).click()
                            }
                            className="select-image"
                            style={{ textAlign: "center" }}
                            disabled={coverProgress > 0 && coverProgress < 100}
                          >
                            {coverProgress > 0 && coverProgress < 100
                              ? ` uploading ${coverProgress}%`
                              : "Change Cover Photo"}
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              document.querySelector(`.cover-picture`).click()
                            }
                            className="select-image"
                            style={{ textAlign: "center" }}
                          >
                            {"Upload Picture"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="kyc-btn-container">
                      <FormNavBtn
                        btnText="Back"
                        name="form3"
                        isError={isError}
                        FocusBlur={FocusBlur}
                        handleClick={handleNavigation}
                        type="button"
                      />
                      <FormNavBtn
                        btnText={isFetching ? "A moment..." : "Submit"}
                        name="form3"
                        isError={isError}
                        FocusBlur={FocusBlur}
                        submit={submit}
                        handleClick={handleSubmit}
                        type="submit"
                      />
                    </div>
                  </section>
                </form>
              </div>
            </div>

            <div className="form-right">
              <div className="form-img-wrapper">
                <img src={"/images/sign-up/client5.jpg"} className="form-img" />

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

export default ClientsKycForm2;
