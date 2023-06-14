import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../../../../firebase";
import { makeEdit, update } from "../../../../redux/apiCalls";
import "./Photos.css";
import { ToastContainer } from "react-toastify";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { userRequest } from "../../../../redux/requestMethod";

function Photos({ handleModal, resetDiscard }) {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(undefined);
  const [modalTxt, setModalTxt] = useState("");
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const [viewAll, setViewAll] = useState({ photo: false, polaroid: false });
  const [image, setImage] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [trash, setTrash] = useState({ section: "", id: "" });

  const handlePhotos = (e) => {
    setVideo(e.target.files[0]);
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
        if (urlType === "videos") {
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
          if (urlType === "videos") {
            setVideos((prev) => [...prev, downloadURL]);
          }
        });
      }
    );
  };

  useEffect(() => {
    const sendPhoto = (urlType) => {
      urlType = "videos";
      setInputs((prev) => {
        return { ...prev, [urlType]: videos };
      });
      if (video) {
        uploadFile(video, "videos");
        setVideo(undefined);
      }
    };
    sendPhoto();
  }, [videos, video, setInputs]);

  //Setting state and viewing photos
  function handleClick(action, id, section) {
    if (section === "videos") {
      //viewing photos
      if (action === "view") {
        let selected = videos.filter((item, index) =>
          index === id ? item : null
        );
        setActiveModal("display");

        setToggleModal((prev) => !prev);

        setImage(selected[0]);
      } else if (action === "trash") {
        // //checking if video delete limit has been exceeded
        // if (videos.length <= 1) {
        //   handleModal("trash-photo");
        // } else {
        setActiveModal("alert");

        setToggleModal((prev) => !prev);

        setTrash({ section: section, id: id });
        // }
      }
    }
  }

  //deleting photo from the list
  function handleTrash(response) {
    if (response === "Yes") {
      if (trash.section === "videos") {
        setVideos(
          videos.filter((item, index) => (index !== trash.id ? item : null))
        );
        setToggleModal((prev) => !prev);
      }
    } else if (response === "No") {
      setToggleModal((prev) => !prev);
    }
  }

  //handle save photos
  const handleSubmit = async () => {
    try {
      await userRequest.put("/model/upload-photo", { ...inputs });
      setModalTxt("save");
      setVideos([]);
    } catch (error) {}
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
      <ToastContainer position="top-center" />

      <section
        style={{ transform: toggleModal && `translateX(${0}%)` }}
        className="modal-section"
      >
        {activeModal === "display" ? (
          <div className="modal-img-rapper">
            <i
              onClick={() => setToggleModal(false)}
              className="fa-solid fa-xmark close-alert2"
            ></i>
            <img src={image} alt="" width="300" height="320" />
          </div>
        ) : activeModal === "alert" ? (
          <div className="alert-box">
            <h2 className="alert-title">
              Are you sure you want to delete Video?
            </h2>

            <p className="alert-text">
              <span className="bold-text colored-text">Note: </span>
              by clicking yes and saving changes this video will be permanently
              deleted from you Profile.
            </p>

            <div className="alert-btn">
              <button
                onClick={() => handleTrash("No")}
                className="del-alert-btn bold-text cancel-btn"
              >
                No?
              </button>
              <button
                onClick={() => handleTrash("Yes")}
                className="del-alert-btn bold-text yes-btn"
              >
                Yes?
              </button>
            </div>
          </div>
        ) : null}
      </section>
      {/* content section */}
      <section className="content-container">
        <div className="set_sections-container">
          <h2 className="set_sections-title">Portfolio Videos</h2>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            We recommend using a variety of high resolution videos that best
            show off your work!
          </p>
          {/* <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Try to include a headShot, a side/profile shot,and a full body shot.
          </p> */}
          <div className="add-photo_container">
            {videos?.length < 6 && (
              <label
                className="add-photo dark--btn cancel-btn"
                htmlFor="add-photo"
              >
                <i className="fa-solid fa-circle-plus add-icon"></i> Add video
              </label>
            )}

            <input
              onChange={handlePhotos}
              type="file"
              name="videos"
              id="add-photo"
              className="file-input"
            />

            <span className="num-photo bold-text">{videos.length}/6 video</span>
          </div>
          <ul className="set_photo-list">
            {progress > 0 && progress < 100 && (
              <p>uploading, {`${progress}%`} done</p>
            )}
            {videos?.map((item, index) => (
              <li className="set_photo-item on-hover" key={index}>
                <video
                  src={item}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="photo-icons">
                  <i
                    onClick={() => handleClick("view", index, "photos")}
                    className="fa-solid fa-arrow-up-right-from-square view-icon"
                  ></i>
                  <i
                    onClick={() => handleClick("trash", index, "photos")}
                    className="fa-regular fa-trash-can trash-icon"
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <section className="setting_btn-container">
          <button
            onClick={() => resetDiscard(() => handleSubmit)}
            className="discard-btn dark--btn bold-text cancel-btn"
          >
            Discard
          </button>
          <button
            onClick={() => handleSubmit("save")}
            className="save-btn  bold-text yes-btn"
            disabled={progress > 0 && progress < 100}
          >
            Save
          </button>
        </section>
      </section>
    </form>
  );
}

export default Photos;
