import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../../../../firebase";
import { update } from "../../../../redux/apiCalls";
import "./Photos.css";
import { ToastContainer } from "react-toastify";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";

function Photos({ handleModal, resetDiscard }) {
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [polaroids, setPolaroids] = useState([]);
  const [polaroid, setPolaroid] = useState(undefined);
  const [compCard, setCompCard] = useState(undefined);
  const [modalTxt, setModalTxt] = useState("");
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const [viewAll, setViewAll] = useState({ photo: false, polaroid: false });
  const [image, setImage] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [trash, setTrash] = useState({ section: "", id: "" });

  const handlePhotos = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePolaroids = (e) => {
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
      }
    };
    sendCompCard();
  }, [photos, polaroids, photo, polaroid, compCard, setInputs]);

  //Setting state and viewing photos
  function handleClick(action, id, section) {
    if (section === "photos") {
      //viewing photos
      if (action === "view") {
        let selected = photos.filter((item, index) =>
          index === id ? item : null
        );
        setActiveModal("display");

        setToggleModal((prev) => !prev);

        setImage(selected[0]);
      } else if (action === "trash") {
        //checking if photo delete limit has been exceeded
        if (photos.length <= 6) {
          handleModal("trash-photo");
        } else {
          setActiveModal("alert");

          setToggleModal((prev) => !prev);

          setTrash({ section: section, id: id });
        }
      }
    } else if (section === "polaroids") {
      //viewing polaroid photos
      if (action === "view") {
        let selected = polaroids.filter((item, index) =>
          index === id ? item : null
        );

        setActiveModal("display");

        setToggleModal((prev) => !prev);

        setImage(selected[0]);
      } else if (action === "trash") {
        //checking if delete limit has been exceeded
        if (polaroids.length <= 3) {
          handleModal("trash-polaroid");
        } else {
          setActiveModal("alert");

          setToggleModal((prev) => !prev);

          setTrash({ section: section, id: id });
        }
      }
    }
  }

  //deleting photo from the list
  function handleTrash(response) {
    if (response === "Yes") {
      if (trash.section === "photos") {
        setPhotos(
          photos.filter((item, index) => (index !== trash.id ? item : null))
        );
        setToggleModal((prev) => !prev);
      } else if (trash.section === "polaroids") {
        setPolaroids(
          polaroids.filter((item, index) => (index !== trash.id ? item : null))
        );
        setToggleModal((prev) => !prev);
      }
    } else if (response === "No") {
      setToggleModal((prev) => !prev);
    }
  }

  //handle save
  function handleSubmit(text) {
    update(dispatch, "/model/", { ...inputs }, setModalTxt);
  }

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
              Are you sure you want to delete Photo?
            </h2>

            <p className="alert-text">
              <span className="bold-text colored-text">Note: </span>
              by clicking yes and saving changes this photo will be permanently
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
          <h2 className="set_sections-title">Portfolio Photos</h2>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            We recommend using a variety of high resolution photos that best
            show off your work!
          </p>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Try to include a headShot, a side/profile shot,and a full body shot.
          </p>
          <div className="add-photo_container">
            <label
              className="add-photo dark--btn cancel-btn"
              htmlFor="add-photo"
            >
              <i className="fa-solid fa-circle-plus add-icon"></i> Add photo
            </label>

            <input
              onChange={handlePhotos}
              type="file"
              name="photos"
              id="add-photo"
              className="file-input"
            />

            <span className="num-photo bold-text">{photos.length}/18 pics</span>
          </div>
          <ul className="set_photo-list">
            {photos?.map((item, index) =>
              viewAll.photo ? (
                <li className="set_photo-item on-hover" key={index}>
                  <img src={item} alt="" />
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
              ) : (
                index <= 5 && (
                  <li className="set_photo-item on-hover" key={index}>
                    <img src={item} alt="" />
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
                )
              )
            )}
          </ul>
          <span
            onClick={() =>
              setViewAll((prev) => ({ ...prev, photo: !viewAll.photo }))
            }
            className="utility-btn cancel-btn"
          >
            {viewAll.photo ? " View Less" : "View All"}
          </span>
        </div>
        <div className="set_sections-container">
          <h2 className="set_sections-title">Polaroid</h2>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Polaroid are natural un-retouched photographs with minimal makeup.
          </p>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            They should be taken in a well-lit space, with a clean (preferable
            white) background.
          </p>
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Try to include a headShot, a side/profile shot,and a full body shot.
          </p>

          <div className="add-polaroid_container">
            <label
              className="add-polaroid dark--btn cancel-btn"
              htmlFor="add-polaroid"
            >
              <i className="fa-solid fa-circle-plus add-icon"></i> Add polaroid
            </label>

            <input
              onChange={handlePolaroids}
              type="file"
              name="polaroids"
              id="add-polaroid"
              className="file-input"
            />

            <span className="bold-text">{polaroids?.length}/18 pics</span>
          </div>
          <ul className="set_polaroid-list">
            {polaroids?.map((item, index) =>
              viewAll.polaroid
                ? item && (
                    <li className="set_polaroid-item on-hover" key={index}>
                      <img src={item} alt="" />
                      <div className="photo-icons">
                        <i
                          onClick={() => handleClick("view", index, "polaroids")}
                          className="fa-solid fa-arrow-up-right-from-square view-icon"
                        ></i>
                        <i
                          onClick={() =>
                            handleClick("trash", index, "polaroids")
                          }
                          className="fa-regular fa-trash-can trash-icon"
                        ></i>
                      </div>
                    </li>
                  )
                : item &&
                  index <= 5 && (
                    <li className="set_polaroid-item on-hover" key={index}>
                      <img src={item} alt="" />
                      <div className="photo-icons">
                        <i
                          onClick={() => handleClick("view", index, "polaroids")}
                          className="fa-solid fa-arrow-up-right-from-square view-icon"
                        ></i>
                        <i
                          onClick={() =>
                            handleClick("trash", index, "polaroids")
                          }
                          className="fa-regular fa-trash-can trash-icon"
                        ></i>
                      </div>
                    </li>
                  )
            )}
          </ul>
          <span
            onClick={() =>
              setViewAll((prev) => ({ ...prev, polaroid: !viewAll.polaroid }))
            }
            className="utility-btn cancel-btn"
          >
            {viewAll.polaroid ? " View Less" : "View All"}
          </span>
        </div>

        <div className="set_sections-container ">
          <h2 className="set_sections-title">Comp Card</h2>
          {compCard && (
            <img
              className="card-img"
              src={URL.createObjectURL(compCard)}
              alt=""
            />
          )}
          {console.log(compCard)}
          <input
            className="colored-hover"
            onChange={(e) => setCompCard(e.target.files[0])}
            type="file"
            id=""
            name="card"
          />
        </div>
        {/* button section  */}

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
          >
            Save
          </button>
        </section>
      </section>
    </form>
  );
}

export default Photos;
