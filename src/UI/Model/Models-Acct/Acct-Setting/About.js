import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { update } from "../../../../redux/apiCalls";
import { info } from "../utils";
import "./About.css";
import EditBtn from "./Edit-btn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BasicInfo({ handleActiveEdit, activeEdit, resetDiscard }) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(0);
  const [picture, setPicture] = useState(undefined);
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");

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
    update(dispatch, "/model/", { ...inputs }, setMessage);
    setModalTxt("save");
  };

  return (
    <form className="content-container" onSubmit={(e) => e.preventDefault()}>
      {/* profile detail section */}
      <div className="set_sections-container ">
        <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
        <ToastContainer position="top-center" />

        {/* mobile text */}
        <div className="set_mobile-text">
          <div className="set_sections-title-rapper">
            <h2 className="set_sections-title ">Profile Details</h2>
            <EditBtn
              btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
              section="profile-details"
              handleActiveEdit={handleActiveEdit}
            />
          </div>

          {activeEdit === "profile-details" && (
            <p className="set_description">
              <i className="fa-solid fa-angles-right note"></i>
              Include a well-lit headShort, generally framed between the top of
              your head to just below your shoulders.
            </p>
          )}
        </div>

        <div className="set_detail-container">
          {/* profile read only  img */}

          {activeEdit !== "profile-details" && (
            <div className="set_img-rapper">
              <img src={user?.picture} alt="" />
            </div>
          )}

          {/* profile edit img */}

          {activeEdit === "profile-details" && (
            <div className="set_img-rapper">
              <label
                className="set_upload-btn on-hover"
                htmlFor="set_profile-img"
              >
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setPicture(e.target.files[0])}
                type="file"
                name="picture"
                id="set_profile-img"
                className="file-input"
              />
              <img
                src={picture ? URL.createObjectURL(picture) : user?.picture}
                alt=""
              />
            </div>
          )}

          <div className="set1_info-section-rapper">
            {/* desktop text */}

            <div className="set_desktop-text">
              <div className="set_sections-title-rapper">
                <h2 className="set_sections-title ">Profile Details</h2>
                <EditBtn
                  btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
                  section="profile-details"
                  handleActiveEdit={handleActiveEdit}
                />
              </div>

              {activeEdit === "profile-details" && (
                <p className="set_description">
                  <i className="fa-solid fa-angles-right note"></i>
                  Include a well-lit headShort, generally framed between the top
                  of your head to just below your shoulders.
                </p>
              )}
            </div>

            {/* profile edit section */}
            {activeEdit === "profile-details" && (
              <ul className="set1_info-section">
                {info.map((item) => {
                  return (
                    <li className="set1_input-container" key={item.id}>
                      <label className="set1_input-label" htmlFor={item.id}>
                        {item.label}
                        <input
                          onChange={handleChange}
                          className="set1_input-field"
                          type={item.type}
                          id={item.id}
                          name={item.id}
                          placeholder={item.placeholder}
                          required
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* profile read only section  */}
            {activeEdit !== "profile-details" && (
              <ul className="set1_info-text-container">
                <li>
                  <span className="bold-text">Name: </span>
                  {user?.model?.fullName}
                </li>
                <li>
                  <span className="bold-text">User Name: </span>
                  {user?.username}
                </li>
                <li>
                  <span className="bold-text">Gender: </span>
                  {user?.model?.gender === "m" ? "Male" : "Female"}
                </li>
                <li>
                  <span className="bold-text">Country: </span>
                  {user?.model?.country}
                </li>
                <li>
                  <span className="bold-text">State: </span>
                  {user?.model?.state}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* model bio section  */}

      <div className="set_sections-container">
        <div className="set_sections-title-rapper">
          <h2 className="set_sections-title">Model's Bio</h2>
          <EditBtn
            btnText={activeEdit === "model-bio" ? "Done" : "Edit"}
            section="model-bio"
            handleActiveEdit={handleActiveEdit}
          />
        </div>

        {activeEdit === "model-bio" && (
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Share a little about your self, including years of modeling
            experience, previous clients, etc.
          </p>
        )}
        {activeEdit === "model-bio" && (
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Don't be afraid to express your personality so you can stand out
            from the crowd.
          </p>
        )}

        {/* bio edit section  */}

        {activeEdit === "model-bio" && (
          <div>
            <div className="bio-rapper">
              <textarea
                className="bio-text-area"
                onChange={handleChange}
                name="bio"
                id="bio"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>
          </div>
        )}

        {/* bio read only section  */}

        {activeEdit !== "model-bio" && (
          <p className="bio-text">{user?.model?.bio}</p>
        )}
      </div>

      {/* btn section  */}
      <section className="setting_btn-container">
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
      </section>
    </form>
  );
}

export default BasicInfo;
