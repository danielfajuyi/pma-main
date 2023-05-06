import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { update } from "../../../../redux/apiCalls";
import { SocialMedia } from "../utils";
import "./About.css";
import EditBtn from "./Edit-btn";
import { Input1, Input2, Input3 } from "./set--kyc-input";

function About({
  handleActiveEdit,
  activeEdit,
  user,
  resetDiscard,
}) {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(0);
  const [photo, setphoto] = useState(undefined);
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/agency/${fileName}`);
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
    photo && uploadFile(photo, "picture");
  }, [photo]);

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );
  // console.log(inputs);

  //handle save
  const handleSave = () => {
    update(dispatch, `/agency`, { ...inputs }, setMessage);
  };

  return (
    <form className="content--container" onSubmit={(e) => e.preventDefault()}>
      {/* profile detail section */}

      <div className="set__sections-container ">
        <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
        <ToastContainer position="top-center" />
        {/* mobile text */}

        <div className="set_mobile--text">
          <div className="set__sections-title-rapper">
            <h2 className="set__sections-title ">Profile Details</h2>
            <EditBtn
              btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
              section="profile-details"
              handleActiveEdit={handleActiveEdit}
            />
          </div>

          {activeEdit === "profile-details" && (
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Add a display photo for your dashboard.
            </p>
          )}
        </div>

        <div className="set_detail--container">
          {/* profile read only  img */}

          {activeEdit !== "profile-details" && (
            <div className="set_img--rapper">
              <img src={user?.agency?.photo} alt="" />
            </div>
          )}

          {/* profile edit img */}

          {activeEdit === "profile-details" && (
            <div className="set_img--rapper">
              <label
                className="set_upload--btn on-hover"
                htmlFor="set_profile-img"
              >
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setphoto(e.target.files[0])}
                type="file"
                name="picture"
                id="set_profile-img"
                className="file--input"
              />
              <img src={photo && URL.createObjectURL(photo)} alt="" />
            </div>
          )}

          <div className="set-info--rapper">
            {/* desktop text */}

            <div className="set_desktop--text">
              <div className="set__sections-title-rapper">
                <h2 className="set__sections-title ">Profile Details</h2>
                <EditBtn
                  btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
                  section="profile-details"
                  handleActiveEdit={handleActiveEdit}
                />
              </div>

              {activeEdit === "profile-details" && (
                <p className="note-text">
                  <i className="fa-solid fa-angles-right points"></i>
                  Add a display photo for your dashboard.
                </p>
              )}
            </div>

            {/* profile edit section */}

            {activeEdit === "profile-details" && (
              <ul className="set_info--section">
                {/* name input */}
                <Input1
                  id="agencyName"
                  label="Name"
                  placeholder="Your Agency Name..."
                  handleChange={handleChange}
                />

                {/* url input  */}
                <Input1
                  id="agencyUrl"
                  label="Url"
                  placeholder="Agency Url..."
                  handleChange={handleChange}
                />

                {/* address input */}
                <Input2
                  id="address"
                  label="Address"
                  placeholder="Agency Address..."
                  handleChange={handleChange}
                />

                {/* country input */}
                <Input3
                  id="country"
                  label="Country"
                  placeholder="Agency Country..."
                  handleChange={handleChange}
                />

                {/* state input */}
                <Input3
                  id="state"
                  label="State"
                  placeholder="Agency State..."
                  handleChange={handleChange}
                />
              </ul>
            )}

            {/* profile read only section  */}
            {activeEdit !== "profile-details" && (
              <ul className="set_info-text--container">
                <li>
                  <span className="bold-text">Agency Name: </span>
                  {user?.agency?.agencyName}
                </li>
                <li>
                  <span className="bold-text ">Agency Url: </span>
                  <span className="url">{user?.agency?.agencyUrl}</span>
                </li>
                <li>
                  <span className="bold-text">Office Address: </span>
                  {user?.agency?.address}
                </li>

                <li>
                  <span className="bold-text">Country: </span>
                  {user?.agency?.country}
                </li>
                <li>
                  <span className="bold-text">State: </span>
                  {user?.agency?.state}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* agency bio section  */}

      <div className="set__sections-container">
        <div className="set__sections-title-rapper">
          <h2 className="set__sections-title">Agency Bio</h2>
          <EditBtn
            btnText={activeEdit === "agency-bio" ? "Done" : "Edit"}
            section="agency-bio"
            handleActiveEdit={handleActiveEdit}
          />
        </div>

        {activeEdit === "agency-bio" && (
          <p className="note-text">
            <i className="fa-solid fa-angles-right points"></i>
            Share a little about your Agency, including years of experience,
            achievements etc.
          </p>
        )}
        {activeEdit === "agency-bio" && (
          <p className="note-text">
            <i className="fa-solid fa-angles-right points"></i>
            Include a credible and verifiable information so you can stand out
            from the crowd.
          </p>
        )}

        {/* bio edit section  */}

        {activeEdit === "agency-bio" && (
          <div>
            <div className="set_bio--rapper">
              <textarea
                className="set_bio--text-area"
                onChange={handleChange}
                name="about"
                id="bio"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>
          </div>
        )}

        {/* bio read only section  */}

        {activeEdit !== "agency-bio" && (
          <p className="set_bio-text">{user?.agency?.about}</p>
        )}
      </div>

      {/* social media section */}

      <div className="set__sections-container">
        <div className="set__sections-title-rapper">
          <h2 className="set__sections-title">Social Media Handles</h2>
          <EditBtn
            btnText={activeEdit === "social-media" ? "Done" : "Edit"}
            section="social-media"
            handleActiveEdit={handleActiveEdit}
          />
        </div>
        {/* social-media  read only section */}
        {activeEdit !== "social-media" && (
          <ul className="set_social--list">
            <li className="social--item">{user?.agency?.instagram}</li>
          </ul>
        )}
        {/* social-media  edit section */}
        {activeEdit === "social-media" && (
          <ul className="set_social--media-link">
            {SocialMedia.map((item) => {
              return (
                <li className="set_input--container" key={item.id}>
                  <label className="set_input--label" htmlFor={item.id}>
                    {item.label}
                    <input
                      onChange={handleChange}
                      className="set_input--field"
                      type={item.type}
                      id={item.id}
                      name={item.id}
                      placeholder={item.placeholder}
                      required
                      spellCheck={false}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* btn section  */}

      <section className="setting_btn--container">
        <button
          onClick={() => resetDiscard(() => handleSave)}
          className="discard--btn dark--btn bold-text cancel--btn"
          type="button"
        >
          Discard
        </button>
        <button
          style={{
            backgroundColor: activeEdit !== "Done" && "#bbbb",
          }}
          disabled={activeEdit !== "Done" && true}
          onClick={handleSave}
          className="save--btn  bold-text yes--btn"
        >
          {isFetching ? "Please wait..." : "Save"}
        </button>
        <p className="error-text">{message}</p>
      </section>
    </form>
  );
}

export default About;
