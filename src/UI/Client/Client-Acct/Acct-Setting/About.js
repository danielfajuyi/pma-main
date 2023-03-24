import { useCallback, useEffect, useState } from "react";
import { Industry, SocialMedia } from "../utils";
import "./About.css";
import EditBtn from "./Edit-btn";
import { Input1, Input2, Input3 } from "./set--kyc-input";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../../redux/apiCalls";
import { ToastContainer } from "react-toastify";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function About({ handleActiveEdit, activeEdit, resetDiscard }) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [picture, setPicture] = useState(undefined);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

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
  // console.log(inputs);

  const handleSave = () => {
    update(dispatch, `/client`, { ...inputs }, setMessage);
  };

  return (
    <form className="--content-container" onSubmit={(e) => e.preventDefault()}>
      <ToastContainer position="top-center" />
      {/* profile detail section */}

      <div className="--set_sections-container ">
        {/* mobile text */}

        <div className="--set_mobile-text">
          <div className="--set_sections-title-rapper">
            <h2 className="--set_sections-title ">Profile Details</h2>
            <EditBtn
              btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
              section="profile-details"
              handleActiveEdit={handleActiveEdit}
            />
          </div>

          {activeEdit === "profile-details" && (
            <p className="--set_note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Add a display picture for your dashboard.
            </p>
          )}
        </div>

        <div className="--set_detail-container">
          {/* profile read only  img */}

          {activeEdit !== "profile-details" && (
            <div className="--set_img-rapper">
              <img src={user?.picture} alt="" />
            </div>
          )}

          {/* profile edit img */}

          {activeEdit === "profile-details" && (
            <div className="--set_img-rapper">
              <label
                className="--set_upload-btn on-hover"
                htmlFor="set_profile-img"
              >
                <i className="fa-solid fa-plus fa-2x"></i>
              </label>
              <input
                onChange={(e) => setPicture(e.target.files[0])}
                type="file"
                name="picture"
                id="set_profile-img"
                className="--file-input"
              />
              <img src={picture && URL.createObjectURL(picture)} alt="" />
            </div>
          )}

          <div className="--set-info-rapper">
            {/* desktop text */}

            <div className="--set_desktop-text">
              <div className="--set_sections-title-rapper">
                <h2 className="--set_sections-title ">Profile Details</h2>
                <EditBtn
                  btnText={activeEdit === "profile-details" ? "Done" : "Edit"}
                  section="profile-details"
                  handleActiveEdit={handleActiveEdit}
                />
              </div>

              {activeEdit === "profile-details" && (
                <p className="--set_note-text">
                  <i className="fa-solid fa-angles-right --points"></i>
                  Add a display picture for your dashboard.
                </p>
              )}
            </div>

            {/* profile edit section */}

            {activeEdit === "profile-details" && (
              <ul className="--set_info-section">
                {/* name input */}
                <Input1
                  id="brandName"
                  label="Brand Name"
                  placeholder="Your Brand Name..."
                  handleChange={handleChange}
                />

                {/* url input  */}
                <Input1
                  id="brandUrl"
                  label="Brand Url"
                  placeholder="https://brand-url.com"
                  handleChange={handleChange}
                />

                {/* address input */}
                <Input2
                  id="address"
                  label="Address"
                  placeholder="Client Address..."
                  handleChange={handleChange}
                />

                {/* country input */}
                <Input3
                  id="country"
                  label="Country"
                  placeholder="Client Country..."
                  handleChange={handleChange}
                />

                {/* state input */}
                <Input3
                  id="state"
                  label="State"
                  placeholder="Client State..."
                  handleChange={handleChange}
                />
              </ul>
            )}

            {/* profile read only section  */}
            {activeEdit !== "profile-details" && (
              <ul className="--set_info-text-container">
                <li>
                  <span className="bold-text">Brand Name: </span>
                  {user?.client?.brandName}
                </li>
                <li>
                  <span className="bold-text "> Brand Url: </span>
                  <span className="--url">{user?.client?.brandUrl}</span>
                </li>
                <li>
                  <span className="bold-text">Address: </span>
                  {user?.client?.address}
                </li>

                <li>
                  <span className="bold-text">Country: </span>
                  {user?.client?.country}
                </li>
                <li>
                  <span className="bold-text">State: </span>
                  {user?.client?.state}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* industry section  */}

      <div className="--set_sections-container">
        <div className="--set_sections-title-rapper">
          <h2 className="--set_sections-title">Client's Industry</h2>
          <EditBtn
            btnText={activeEdit === "client-industry" ? "Done" : "Edit"}
            section="client-industry"
            handleActiveEdit={handleActiveEdit}
          />
        </div>

        {activeEdit === "client-industry" && (
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Pick an industry from the list of industries in the drop down.
          </p>
        )}
        {activeEdit === "client-industry" && (
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Please ensure that your chosen industry compliments your Brand.
          </p>
        )}

        {/* industry edit section  */}

        {activeEdit === "client-industry" && (
          <div className="industry-container">
            <select
              name="industry"
              className="industry-list"
              onChange={handleChange}
            >
              <option value={user?.client?.industry}>Select an industry</option>
              {Industry.map((item, index) => (
                <option value={item} key={index} className="industry-item ">
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* industry read only section  */}

        {activeEdit !== "client-industry" && (
          <p className="industry-text">
            <span className="bold-text">client industry: </span>
            {user?.client?.industry}
          </p>
        )}
      </div>

      {/* client bio section  */}

      <div className="--set_sections-container">
        <div className="--set_sections-title-rapper">
          <h2 className="--set_sections-title">Client's Bio</h2>
          <EditBtn
            btnText={activeEdit === "client-bio" ? "Done" : "Edit"}
            section="client-bio"
            handleActiveEdit={handleActiveEdit}
          />
        </div>

        {activeEdit === "client-bio" && (
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Share a little about your Brand, including years of experience,
            achievements etc.
          </p>
        )}
        {activeEdit === "client-bio" && (
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Include a credible and verifiable information so you can stand out
            from the crowd.
          </p>
        )}

        {/* bio edit section  */}

        {activeEdit === "client-bio" && (
          <div>
            <div className="--set_bio-rapper">
              <textarea
                className="--set_bio-text-area"
                onChange={handleChange}
                name="bio"
                id="bio"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        )}

        {/* bio read only section  */}

        {activeEdit !== "client-bio" && (
          <p className="--set_bio-text">{user?.client?.bio}</p>
        )}
      </div>

      {/* social media section */}

      <div className="--set_sections-container">
        <div className="--set_sections-title-rapper">
          <h2 className="--set_sections-title">Social Media Handles</h2>
          <EditBtn
            btnText={activeEdit === "social-media" ? "Done" : "Edit"}
            section="social-media"
            handleActiveEdit={handleActiveEdit}
          />
        </div>
        {/* social-media  read only section */}
        {activeEdit !== "social-media" && (
          <ul className="--set_social-list">
            <li className="--social-item">{user?.client?.instagram}</li>
          </ul>
        )}
        {/* social-media  edit section */}
        {activeEdit === "social-media" && (
          <ul className="--set_social-media-link">
            {SocialMedia.map((item) => {
              return (
                <li className="--set_input-container" key={item.id}>
                  <label className="--set_input-label" htmlFor={item.id}>
                    {item.label}
                  </label>
                  <input
                    onChange={handleChange}
                    className="--set_input-field"
                    type={item.type}
                    id={item.id}
                    name={item.id}
                    placeholder={item.placeholder}
                    required
                    spellCheck={false}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* btn section  */}

      <section className="--setting_btn-container">
        <button
          onClick={() => resetDiscard(() => handleSave)}
          className="--discard-btn  bold-text --cancel-btn"
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
          className="--save-btn  bold-text --yes-btn"
        >
          {isFetching ? "Please wait..." : "Save"}
        </button>
        <p className="error-text">{message}</p>
      </section>
    </form>
  );
}

export default About;
