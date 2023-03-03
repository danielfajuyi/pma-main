import "./Client-Kyc-Form-2.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import FormNavBtn from "./Form-nav-btn";
import { useState } from "react";
import { useEffect } from "react";
import { Photo } from "../utils";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../redux/apiCalls";

function ClientsKycForm2({
  DomItems,
  collectData,
  handleNavigation,
  handleModal,
  form2Data,
  handleChange,
  inputs,
  setInputs,
}) {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [jobPhotos, setJobPhotos] = useState([]);
  const [jobPhoto, setJobPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [picture, setPicture] = useState(undefined);
  const [coverPicture, setCoverPicture] = useState(undefined);
  const [submit, setSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalTxt, setModalTxt] = useState("");

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => ({ ...prevData, [e.target.id]: img }));
    setJobPhoto(e.target.files[0]);
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/clients/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "jobPhotos") {
          setProgress(Math.round(progress));
        }
        if (urlType === "picture") {
          setProgress(Math.round(progress));
        }
        if (urlType === "coverPicture") {
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
        // setPicture(undefined);
      }
    };
    sendPicture();

    const sendCoverPicture = (urlType) => {
      urlType = "coverPicture";
      if (coverPicture) {
        uploadFile(coverPicture, "coverPicture");
        // setCoverPicture(undefined);
      }
    };
    sendCoverPicture();
  }, [setInputs, coverPicture, jobPhoto, jobPhotos, picture]);

  //setting error
  useEffect(() => {
    let err = false;
    if (jobPhotos.length < 6 && !picture) {
      err = true;
    } else {
      err = false;
    }
  }, [jobPhotos, picture]);
  console.log( isError)

  //handling submit
  function handleSubmit() {
    if (isError) {
      setModalTxt("add-photo");
    } else {
      update(dispatch, "/client/", { ...inputs }, setModalTxt);
    }
  }

  return (
    <form className="--kyc-form" onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />

      <section className="--kyc-hero">
        <img src="/images/client_4.jpg" alt="" />
        <div className="--kyc-hero__text-rapper">
          <h2 className="--kyc-hero__title">Finally</h2>
          <p className="--kyc-hero__text">
            You Are Moments Away From Awesomeness!!
          </p>
        </div>
      </section>

      <section className="--kyc-content-section">
        <div className="--list-container">
          {/* profile pic */}

          <section className="--detail-rapper">
            <div className="--note-text-rapper">
              <h2 className="--sections-title ">Profile Photo</h2>
              <p className="--note-text">
                <i className="fa-solid fa-angles-right --points"></i>
                Add a display picture for your dashboard.
              </p>
              <p className="--note-text --desktop-note">
                <i className="fa-solid fa-angles-right --points"></i>
                Include a well-lit headShort.
              </p>

              <p className="--note-text --desktop-note">
                <i className="fa-solid fa-angles-right --points"></i>
                Generally framed between top of your head to just below your
                shoulder.
              </p>
              <p className="--note-text">
                <i className="fa-solid fa-angles-right --points"></i>
                You can also make use of your Brand logo image or design
              </p>
            </div>
            <div className="--img-rapper">
              <label className="--upload-btn on-hover" htmlFor="picture">
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setPicture(e.target.files[0])}
                type="file"
                name="picture"
                id="picture"
                className="--file-input"
                style={{ display: "none" }}
              />
              {picture && <img src={URL.createObjectURL(picture)} alt="" />}
            </div>
          </section>

          {/* photo section */}

          <section className="--sections-container">
            <h2 className="--sections-title">Jobs Photo</h2>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Upload pictures of some of the modeling jobs done by your models!
            </p>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Try to include a headShot, a side/profile shot,and a full body
              shot.
            </p>

            <ul className="--photo-list">
              {Photo.map((item) => {
                return (
                  <li className="--photo-item" key={item.id}>
                    <label className="--upload-btn on-hover" htmlFor={item.id}>
                      <i className="fa-solid fa-plus fa-2x"></i>
                    </label>
                    <input
                      onChange={handlePhotos}
                      type="file"
                      name="jobPhotos"
                      id={item.id}
                      className="--file-input"
                      style={{ display: "none" }}
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

          <section className="--sections-container">
            <h2 className="--sections-title">Cover Photo</h2>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Add a Cover Photo (optional).
            </p>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              You can also make use Brand logo design Or Banner
            </p>
            <div className="--cover-img-rapper">
              <label
                className="--cover-upload-btn on-hover"
                htmlFor="coverPicture"
              >
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setCoverPicture(e.target.files[0])}
                type="file"
                name="coverPicture"
                id="coverPicture"
                className="--file-input"
              />
              {coverPicture && (
                <img src={URL.createObjectURL(coverPicture)} alt="" />
              )}
            </div>
          </section>

          <div className="--kyc-btn-container">
            <FormNavBtn
              btnText="Back"
              name="form3"
              handleClick={handleNavigation}
              type="button"
            />
            <FormNavBtn
              submit={submit}
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

export default ClientsKycForm2;
