import { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Photo, Polaroid } from "../../utils";
import { AlertModal } from "../../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { storage } from "../../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { makePost, update } from "../../../../../redux/apiCalls";
import { ToastContainer } from "react-toastify";
import { BiCloudUpload } from "react-icons/bi";
import { FaSun, FaMoon, FaTimes, FaAngleDoubleRight } from "react-icons/fa";
import FormNavBtn from "../Component/btn/Form-nav-btn";
import KycHeader from "../Component/kyc-header/kyc-header";
import "../Component/svg-scss/svg.scss";
import "../Component/img-scss/img.scss";
import "react-toastify/dist/ReactToastify.css";
import { FormContext } from "../Models-Kyc-Forms";

function ModelsKycForm3({}) {
  const { handleNavigation, inputs, setInputs, path, darkmode, picture, FocusBlur, HandleTheme } =
    useContext(FormContext);
  const { isFetching } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [polaroids, setPolaroids] = useState([]);
  const [polaroid, setPolaroid] = useState(undefined);
  const [previewPolaroids, setPreviewPolaroids] = useState([]);
  const [compCard, setCompCard] = useState(undefined);
  const [modalTxt, setModalTxt] = useState("");
  const [progress, setProgress] = useState(0);

  // preview image modal
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  // handles photos
  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => ({ ...prevData, [e.target.id]: img }));
    setPhoto(e.target.files[0]);
  };
  // handles polaroids
  const handlePolaroids = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPolaroids((prevData) => ({ ...prevData, [e.target.id]: img }));
    setPolaroid(e.target.files[0]);
  };
  // upload images
  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/model/${inputs.username}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "photos") {
          setProgress(Math.round(progress));
        }
        if (urlType === "polaroids") {
          setProgress(Math.round(progress));
        }
        if (urlType === "compCard") {
          setProgress(Math.round(progress));
        }
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
          if (urlType === "photos") {
            setPhotos((prev) => [...prev, downloadURL]);
          }
          if (urlType === "polaroids") {
            setPolaroids((prev) => [...prev, downloadURL]);
          }
          if (urlType === "compCard") {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          }
        });
      }
    );
  };
  // send images
  useEffect(() => {
    const sendPhoto = (urlType) => {
      urlType = "photos";
      setInputs((prev) => {
        return { ...prev, [urlType]: photos };
      });
      if (photo) {
        uploadFile(photo, "photos");
        setPhoto(undefined);
      }
    };
    sendPhoto();

    const sendPolaroid = (urlType) => {
      urlType = "polaroids";
      setInputs((prev) => {
        return { ...prev, [urlType]: polaroids };
      });
      if (polaroid) {
        uploadFile(polaroid, "polaroids");
        setPolaroid(undefined);
      }
    };
    sendPolaroid();

    const sendCompCard = (urlType) => {
      urlType = "compCard";
      if (compCard) {
        uploadFile(compCard, "compCard");
        setCompCard(undefined);
      }
    };
    sendCompCard();
  }, [photos, polaroids, photo, polaroid, compCard, setInputs]);

  //handles submit
  function handleSubmit(text) {
    if (photos.length < 4) {
      setModalTxt("add-photo");
    }
    if (path !== "/modelpage") {
      makePost(dispatch, "/agency/create", { ...inputs }, setInputs);
    } else {
      update(dispatch, "/model/", { ...inputs, isUpdated: true }, setModalTxt);
    }
  }
  console.log(inputs);

  return (
    <section
      className={
        darkmode ? "Forms KycForms light-theme  " : "Forms KycForms light-theme dark-theme"
      }>
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
                    Setting Up Your Model
                    <br></br> Portfolio
                    <span className="dots-hide-on-mobile">.</span>
                  </h1>

                  <p className="form-text">
                    fill in your information for <a>Step 3</a>
                  </p>
                </div>

                <form className="form-left-form" onSubmit={(e) => e.preventDefault()}>
                  <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
                  <ToastContainer position="top-center" />

                  <section>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Portfolio Photos</h2>

                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          We recommend using a variety of high resolution photos that best show off
                          your work!
                        </span>
                      </p>
                      <p className="form-descriptions" style={{ margin: " -1rem 0" }}>
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Try to include a headShot, a side/profile shot,and a full body shot.
                        </span>
                      </p>
                    </div>

                    <div className="form-images-column">
                      {Photo.map((item) => {
                        return (
                          <div className="image-container color-codes" key={item.id}>
                            <div className={model ? "pic-model open-model" : "pic-model"}>
                              <img src={tempImgSrc} />
                              <FaTimes onClick={() => setModel(false)} />
                            </div>

                            <input
                              type="file"
                              name="photos"
                              className={`pic-${item.id}`}
                              id={item.id}
                              onChange={handlePhotos}
                              hidden
                            />

                            {previewPhotos[item.id] ? (
                              <div
                                className={"img-area area-2 active"}
                                data-img={
                                  progress > 0 && progress < 100
                                    ? `uploading ${progress}%`
                                    : "preview picture"
                                }
                                onClick={() => getImg(previewPhotos[item.id])}>
                                {previewPhotos[item.id] && (
                                  <img src={previewPhotos[item.id]} alt="" />
                                )}
                              </div>
                            ) : (
                              <div
                                className={"img-area area-2"}
                                data-img={
                                  progress > 0 && progress < 100
                                    ? `uploading ${progress}%`
                                    : "preview picture"
                                }
                                onClick={() => document.querySelector(`.pic-${item.id}`).click()}>
                                <BiCloudUpload />

                                <h3>Upload Image</h3>

                                {previewPhotos[item.id] && (
                                  <img src={previewPhotos[item.id]} alt="" />
                                )}
                              </div>
                            )}

                            {previewPhotos[item.id] ? (
                              <span
                                onClick={() => document.querySelector(`.pic-${item.id}`).click()}
                                className="select-image"
                                style={{ textAlign: "center" }}
                                disabled={progress > 0 && progress < 100}>
                                {progress > 0 && progress < 100 && item.id === item.id
                                  ? ` uploading ${item.id} ${progress}%`
                                  : "Change Picture"}
                              </span>
                            ) : (
                              <span
                                onClick={() => document.querySelector(`.pic-${item.id}`).click()}
                                className="select-image"
                                style={{ textAlign: "center" }}>
                                {"Upload Picture"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Polaroid</h2>

                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Polaroid are natural un-retouched photographs with minimal makeup.
                        </span>
                      </p>
                      <p className="form-descriptions" style={{ margin: " -1rem 0" }}>
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          They should be taken in a well-lit space, with a clean (preferable white)
                          background.
                        </span>
                      </p>

                      <p className="form-descriptions" style={{ margin: " -1rem 0" }}>
                        <FaAngleDoubleRight />
                        <span> Try to include a headShot, a side/profile shot,and a full body</span>
                      </p>
                    </div>

                    <div className="form-images-column">
                      {Polaroid.map((item) => {
                        return (
                          <div className="image-container color-codes" key={item.id}>
                            <div className={model ? "pic-model open-model" : "pic-model"}>
                              <img src={tempImgSrc} />
                              <FaTimes onClick={() => setModel(false)} />
                            </div>

                            <input
                              type="file"
                              name="polaroids"
                              className={`polariods-${item.id}`}
                              id={item.id}
                              onChange={handlePolaroids}
                              hidden
                            />

                            {previewPolaroids[item.id] ? (
                              <div
                                className={"img-area area-2 active"}
                                data-img={
                                  progress > 0 && progress < 100
                                    ? `uploading ${progress}%`
                                    : "preview picture"
                                }
                                onClick={() => getImg(previewPolaroids[item.id])}>
                                {previewPolaroids[item.id] && (
                                  <img src={previewPolaroids[item.id]} alt="" />
                                )}
                              </div>
                            ) : (
                              <div
                                className={"img-area area-2"}
                                data-img={
                                  progress > 0 && progress < 100
                                    ? `uploading ${progress}%`
                                    : "preview picture"
                                }
                                onClick={() =>
                                  document.querySelector(`.polariods-${item.id}`).click()
                                }>
                                <BiCloudUpload />

                                <h3>Upload Picture</h3>

                                {previewPolaroids[item.id] && (
                                  <img src={previewPolaroids[item.id]} alt="" />
                                )}
                              </div>
                            )}

                            {previewPolaroids[item.id] ? (
                              <span
                                onClick={() =>
                                  document.querySelector(`.polariods-${item.id}`).click()
                                }
                                className="select-image"
                                style={{ textAlign: "center" }}
                                disabled={progress > 0 && progress < 100}>
                                {progress > 0 && progress < 100
                                  ? ` uploading ${progress}%`
                                  : "Change Picture"}
                              </span>
                            ) : (
                              <span
                                onClick={() =>
                                  document.querySelector(`.polariods-${item.id}`).click()
                                }
                                className="select-image"
                                style={{ textAlign: "center" }}>
                                {"Upload Picture"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="kyc-btn-container">
                      <FormNavBtn
                        btnText="Back"
                        name="form3"
                        FocusBlur={FocusBlur}
                        handleClick={handleNavigation}
                        type="button"
                      />
                      <FormNavBtn
                        isFetching={isFetching}
                        btnText={isFetching ? "A moment..." : "Submit"}
                        name="form3"
                        FocusBlur={FocusBlur}
                        handleClick={handleSubmit}
                        type="submit"
                        progress={progress}
                      />
                    </div>
                  </section>
                </form>
              </div>
            </div>

            <div className="form-right">
              <div className="form-img-wrapper">
                {picture ? (
                  <img src={URL.createObjectURL(picture)} className="form-img" />
                ) : (
                  <img src={"/images/sign-up/model2.jpg"} className="form-img" />
                )}
                <div className="wave-wrap">
                  <svg
                    className="wave"
                    viewBox="0 0 783 1536"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
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
                  className="dashed-wave">
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

export default ModelsKycForm3;
