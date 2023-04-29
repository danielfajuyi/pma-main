import "./Agency-Kyc-Form-2.css";
import FormNavBtn from "./Form-nav-btn";
import { useState } from "react";
import { useEffect } from "react";
import { Photo } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import { update } from "../../../../redux/apiCalls";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AgencyKycForm2({ handleNavigation, inputs, setInputs }) {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [jobPhotos, setJobPhotos] = useState([]);
  const [jobPhoto, setJobPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [coverPhoto, setCoverPhoto] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [modalTxt, setModalTxt] = useState("");

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => ({ ...prevData, [e.target.id]: img }));
    setJobPhoto(e.target.files[0]);
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/agency/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "jobPhotos") {
          setProgress(Math.round(progress));
        }
        if (urlType === "photo") {
          setProgress(Math.round(progress));
        }
        if (urlType === "coverPhoto") {
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
      () => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (urlType === "jobPhotos") {
            setJobPhotos((prev) => [...prev, downloadURL]);
          }
          if (urlType === "photo") {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          }
          if (urlType === "coverPhoto") {
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
      urlType = "photo";
      if (photo) {
        uploadFile(photo, "photo");
        // setPicture(undefined);
      }
    };
    sendPicture();

    const sendCoverPicture = (urlType) => {
      urlType = "coverPhoto";
      if (coverPhoto) {
        uploadFile(coverPhoto, "coverPhoto");
        // setCoverPicture(undefined);
      }
    };
    sendCoverPicture();
  }, [setInputs, coverPhoto, jobPhoto, jobPhotos, photo]);

  //handling submit
  function handleSubmit() {
    if (jobPhotos.length > 3) {
      update(dispatch, "/agency/", { ...inputs }, setModalTxt);
    } else {
      setModalTxt("add-photo");
    }
  }

  return (
    <form className="kyc--form" onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
      <ToastContainer />

      <section className="kyc--hero">
        <img src="/images/kyc/agent-2.jpg" alt="" />
        <div className="kyc--hero__text-rapper">
          <h2 className="kyc--hero__title">Finally</h2>
          <p className="kyc--hero__text">
            You Are Moments Away From Awesomeness!!
          </p>
        </div>
      </section>

      <section className="kyc--content-section">
        <div className="list--container">
          {/* profile pic */}

          <section className="detail--rapper">
            <div className="note-text-rapper">
              <h2 className="sections--title ">Profile Photo</h2>
              <p className="note-text">
                <i className="fa-solid fa-angles-right points"></i>
                Add a display picture for your dashboard.
              </p>
              <p className="note-text desktop-note">
                <i className="fa-solid fa-angles-right points"></i>
                Include a well-lit headShort.
              </p>

              <p className="note-text desktop-note">
                <i className="fa-solid fa-angles-right points"></i>
                Generally framed between top of your head to just below your
                shoulder.
              </p>
              <p className="note-text">
                <i className="fa-solid fa-angles-right points"></i>
                You can also make use of your Agency logo image or design
              </p>
            </div>
            <div className="img--rapper">
              <label className="upload--btn on-hover" htmlFor="profile-img">
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setPhoto(e.target.files[0])}
                type="file"
                name="photo"
                id="profile-img"
                className="file--input"
              />
              {photo && <img src={URL.createObjectURL(photo)} alt="" />}
            </div>
          </section>

          {/* photo section */}

          <section className="sections--container">
            <h2 className="sections--title">Jobs Photo</h2>
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Upload pictures of some of the modeling jobs done by your models!
            </p>
            <p className="set_description">
              <i className="fa-solid fa-angles-right points"></i>
              Try to include a headShot, a side/profile shot,and a full body
              shot.
            </p>

            <ul className="photo--list">
              {Photo.map((item) => {
                return (
                  <li className="photo--item" key={item.id}>
                    <label className="upload--btn on-hover" htmlFor={item.id}>
                      <i className="fa-solid fa-plus fa-2x"></i>
                    </label>
                    <input
                      onChange={handlePhotos}
                      type="file"
                      name="jobPhotos"
                      id={item.id}
                      className="file--input"
                    />

                    {previewPhotos[item.id] && (
                      <img src={previewPhotos[item.id]} alt="" />
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Cover photo section  */}

          <section className="set__sections-container">
            <h2 className="set__sections-title">Cover Photo</h2>
            <p className="set_note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Add a Cover Photo (optional).
            </p>
            <p className="set_note-text">
              <i className="fa-solid fa-angles-right points"></i>
              You can also make use Brand logo design Or Banner
            </p>
            <div className="cover-img-rapper">
              <label className="cover-upload-btn on-hover" htmlFor="cover-img">
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setCoverPhoto(e.target.files[0])}
                type="file"
                name="coverPhoto"
                id="cover-img"
                className="file--input"
              />
              {coverPhoto && (
                <img src={URL.createObjectURL(coverPhoto)} alt="" />
              )}
            </div>
          </section>

          <div className="kyc--btn-container">
            <FormNavBtn
              btnText="Back"
              name="form3"
              handleClick={handleNavigation}
              type="button"
            />
            <FormNavBtn
              submit={progress > 0 && progress < 100}
              btnText={isFetching ? "A moment..." : "Submit"}
              name="form3"
              handleClick={handleSubmit}
              type="submit"
            />
          </div>
        </div>
      </section>
    </form>
  );
}

export default AgencyKycForm2;
