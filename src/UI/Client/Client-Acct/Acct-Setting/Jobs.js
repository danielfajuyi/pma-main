import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { update } from "../../../../redux/apiCalls";
import "./Jobs.css";

function Photos({ resetDiscard }) {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [jobPhotos, setJobPhotos] = useState([]);
  const [jobPhoto, setJobPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [coverPicture, setCoverPicture] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const [modalTxt, setModalTxt] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [image, setImage] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [trashId, setTrashId] = useState("");

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
      () => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (urlType === "jobPhotos") {
            setJobPhotos((prev) => [...prev, downloadURL]);
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

    const sendCoverPicture = (urlType) => {
      urlType = "coverPicture";
      if (coverPicture) {
        uploadFile(coverPicture, "coverPicture");
        // setCoverPicture(undefined);
      }
    };
    sendCoverPicture();
  }, [setInputs, coverPicture, jobPhoto, jobPhotos]);

  //Setting state and viewing photos
  function handleClick(action, id) {
    //viewing photos
    if (action === "view") {
      let selected = jobPhotos.filter((item, index) =>
        index === id ? item : null
      );
      setActiveModal("display");

      setToggleModal((prev) => !prev);

      setImage(selected[0]);
    } else if (action === "trash") {
      //checking if photo delete limit has been exceeded
      if (jobPhotos.length <= 6) {
        setModalTxt("trash-photo");
      } else {
        setActiveModal("alert");

        setToggleModal((prev) => !prev);

        setTrashId(id);
      }
    }
  }

  //deleting photo from the list
  function handleTrash(response) {
    if (response === "Yes") {
      setJobPhotos(
        jobPhotos.filter((item, index) => (index !== trashId ? item : null))
      );
      setToggleModal((prev) => !prev);
    } else if (response === "No") {
      setToggleModal((prev) => !prev);
    }
  }

  //handle save
  function handleSave() {
    update(dispatch, "/client/", { ...inputs }, setModalTxt);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />

      <section
        style={{ transform: toggleModal && `translateX(${0}%)` }}
        className="--modal-section"
      >
        {activeModal === "display" ? (
          <div className="--modal-img-rapper">
            <i
              onClick={() => setToggleModal(false)}
              className="fa-solid fa-xmark --close-alert"
            ></i>
            <img src={image} alt="" width="300" height="320" />
          </div>
        ) : activeModal === "alert" ? (
          <div className="--alert-box">
            <h2 className="--alert-title">
              Are you sure you want to delete Photo?
            </h2>

            <p className="--alert-text">
              <span className="bold-text --colored-text">Note: </span>
              by clicking Yes and Saving changes this photo will be permanently
              deleted from you Profile.
            </p>

            <div className="--alert-btn">
              <button
                onClick={() => handleTrash("No")}
                className="--del-alert-btn bold-text --cancel-btn"
              >
                No?
              </button>
              <button
                onClick={() => handleTrash("Yes")}
                className="--del-alert-btn bold-text --yes-btn"
              >
                Yes?
              </button>
            </div>
          </div>
        ) : null}
      </section>
      {/* content section */}
      <section className="--content-container">
        <section className="--set_sections-container">
          <h2 className="--set_sections-title">Jobs Photos</h2>
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            We recommend using a variety of high resolution photos that best
            show off your work!
          </p>
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Try to include a headShot, a side/profile shot,and a full body shot.
          </p>
          <div className="--add-photo_container">
            <label className="--add-photo  --cancel-btn" htmlFor="jobPhotos">
              <i className="fa-solid fa-circle-plus --add-icon"></i> Add photo
            </label>

            <input
              onChange={handlePhotos}
              type="file"
              name="jobPhotos"
              id="jobPhotos"
              className="--file-input"
            />

            <span className=" bold-text">{jobPhotos?.length}/18 pics</span>
          </div>
          <ul className="--set_photo-list">
            {jobPhotos?.map((item, index) =>
              viewAll ? (
                <li className="--set_photo-item on-hover" key={index}>
                  <img src={item} alt="" />
                  <div className="--photo-icons">
                    <i
                      onClick={() => handleClick("view", index)}
                      className="fa-solid fa-arrow-up-right-from-square --view-icon"
                    ></i>
                    <i
                      onClick={() => handleClick("trash", index)}
                      className="fa-regular fa-trash-can --trash-icon"
                    ></i>
                  </div>
                </li>
              ) : (
                index <= 5 && (
                  <li className="--set_photo-item on-hover" key={index}>
                    <img src={item} alt="" />
                    <div className="--photo-icons">
                      <i
                        onClick={() => handleClick("view", index)}
                        className="fa-solid fa-arrow-up-right-from-square --view-icon"
                      ></i>
                      <i
                        onClick={() => handleClick("trash", index)}
                        className="fa-regular fa-trash-can --trash-icon"
                      ></i>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
          <span
            onClick={() => setViewAll((prev) => !prev)}
            className="--view-all-btn --cancel-btn"
          >
            {viewAll ? " View Less" : "View All"}
          </span>
        </section>

        {/* Cover photo section  */}

        <section className="--set_sections-container">
          <h2 className="--set_sections-title">Cover Photo</h2>
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Add a Cover Photo.
          </p>
          <p className="--set_note-text">
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

        {/* button section  */}

        <section className="--setting_btn-container">
          <button
            onClick={() => resetDiscard(() => handleSave)}
            className="--discard-btn  bold-text --cancel-btn"
          >
            Discard
          </button>
          <button
            //style={{ backgroundColor: "#ff007a", color: "#fff" }}
            onClick={handleSave}
            className="--save-btn  bold-text --yes-btn"
          >
            {isFetching ? "A moment..." : "Save"}
          </button>
        </section>
      </section>
    </form>
  );
}

export default Photos;
