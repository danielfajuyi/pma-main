import "./Models-Kyc-Form-3.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import FormNavBtn from "./Form-nav-btn";
import { useState } from "react";
import { useEffect } from "react";
import { Photo, Polaroid } from "../utils";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { storage } from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { makePost, update } from "../../../../redux/apiCalls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModelsKycForm3({ handleNavigation, inputs, setInputs, path }) {
  const { isFetching } = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // console.log(path)

  const [photos, setPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [polaroids, setPolaroids] = useState([]);
  const [polaroid, setPolaroid] = useState(undefined);
  const [previewPolaroids, setPreviewPolaroids] = useState([]);
  const [compCard, setCompCard] = useState(undefined);
  const [modalTxt, setModalTxt] = useState("");
  const [progress, setProgress] = useState(0);

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => ({ ...prevData, [e.target.id]: img }));
    setPhoto(e.target.files[0]);
  };

  const handlePolaroids = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPolaroids((prevData) => ({ ...prevData, [e.target.id]: img }));
    setPolaroid(e.target.files[0]);
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  // handling automatic verification for model registered by an angency
  useEffect(() => {
    if (path === "/agencypage/listing/add") {
      const updateIsVerified = (urlType) => {
        urlType = "isVerified";
        setInputs((prev) => {
          return { ...prev, [urlType]: true };
        });
      };
      updateIsVerified();
    }
  }, [path]);

  //handling submit
  function handleSubmit(text) {
    if (photos.length < 6) {
      setModalTxt("add-photo");
    } else if (path === "/agencypage/listing/add") {
      makePost(dispatch, "/agency/create", { ...inputs }, setInputs);
    } else {
      update(dispatch, "/model/", { ...inputs }, setModalTxt);
    }
  }

  return (
    <form className="kyc-form" onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
      <ToastContainer position="top-center" />
      <section className="kyc-hero">
        <img src="/images/kyc/model-3.jpg" alt="" />
        <div className="kyc-hero__text-rapper">
          <h2 className="kyc-hero__title">Finally</h2>
          <p className="kyc-hero__text" style={{ color: "#000" }}>
            You Are Moments Away From Awesomeness!!
          </p>
        </div>
      </section>

      <section className="kyc-content-section">
        <div className="list-container">
          <div className="sections-container">
            <h2 className="sections-title">Portfolio Photos</h2>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              We recommend using a variety of high resolution photos that best
              show off your work!
            </p>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              Try to include a headShot, a side/profile shot,and a full body
              shot.
            </p>

            <ul className="photo-list">
              {Photo.map((item) => {
                return (
                  <li className="photo-item" key={item.id}>
                    <label className="upload-btn on-hover" htmlFor={item.id}>
                      <i className="fa-solid fa-plus fa-2x"></i>
                    </label>
                    <input
                      onChange={handlePhotos}
                      type="file"
                      name="photos"
                      id={item.id}
                      className="file-input"
                    />

                    {previewPhotos[item.id] && (
                      <img src={previewPhotos[item.id]} alt="" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sections-container">
            <h2 className="sections-title">Polaroid</h2>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              Polaroid are natural un-retouched photographs with minimal makeup.
            </p>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              They should be taken in a well-lit space, with a clean (preferable
              white) background.
            </p>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              Try to include a headShot, a side/profile shot,and a full body
              shot.
            </p>
            <ul className="polaroid-list">
              {Polaroid.map((item) => {
                return (
                  <li className="polaroid-item" key={item.id}>
                    <label className="upload-btn on-hover" htmlFor={item.id}>
                      <i className="fa-solid fa-plus fa-2x"></i>
                    </label>
                    <input
                      onChange={handlePolaroids}
                      type="file"
                      name="polaroids"
                      id={item.id}
                      className="file-input"
                    />

                    {previewPolaroids[item.id] && (
                      <img src={previewPolaroids[item.id]} alt="" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <div className="sections-container">
            <h2 className="sections-title">Comp Card</h2>
            {compCard && (
              <img
                className="compCard-img"
                src={URL.createObjectURL(compCard)}
                alt=""
              />
            )}
            <input
              onChange={(e) => setCompCard(e.target.files[0])}
              type="file"
              id="compCard"
              name="compCard"
              className="colored-hover"
            />
          </div> */}

          <div className="kyc-btn-container">
            <FormNavBtn
              btnText="Back"
              name="form3"
              handleClick={handleNavigation}
              type="button"
            />
            <FormNavBtn
              isFetching={isFetching}
              btnText={isFetching ? "A moment..." : "Submit"}
              name="form3"
              handleClick={handleSubmit}
              type="submit"
              progress={progress}
            />
          </div>
        </div>
      </section>
    </form>
  );
}

export default ModelsKycForm3;
