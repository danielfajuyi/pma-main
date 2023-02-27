import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { update } from "../../../../redux/apiCalls";
import { Industry, SocialMedia } from "../utils";
import "./About.css";
import EditBtn from "./Edit-btn";
import { Input1, Input2, Input3 } from "./set--kyc-input";

function About({ handleActiveEdit, activeEdit, resetDiscard, user }) {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [picture, setPicture] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const [modalTxt, setModalTxt] = useState("");

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );
  // console.log(inputs)

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/clients/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "picture") {
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
          if (urlType === "picture") {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          }
        });
      }
    );
  };

  useEffect(() => {
    const sendPicture = (urlType) => {
      urlType = "picture";
      if (picture) {
        uploadFile(picture, "picture");
        // setPicture(undefined);
      }
    };
    sendPicture();
  }, [picture]);

  //State Error
  const [error, setError] = useState({
    brandName: inputs.brandName,
    brandUrl: inputs.brandUrl,
    address: inputs.address,
    state: inputs.state,
    country: inputs.country,
    bio: inputs.bio,
    industry: inputs.industry,
    instagram: inputs.instagram,
  });

  const [isError, setIsError] = useState(false);

  //setting error messages
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required!";
      let bioErr = "The Bio section is required!";
      let industryErr = "Please choose an industry!";
      let socialErr = "You social-media link is required";
      !inputs?.brandName
        ? setError((prev) => ({ ...prev, brandName: errorText }))
        : setError((prev) => ({ ...prev, brandName: "" }));

      !inputs?.brandUrl
        ? setError((prev) => ({ ...prev, brandUrl: errorText }))
        : setError((prev) => ({ ...prev, brandUrl: "" }));

      !inputs?.address
        ? setError((prev) => ({ ...prev, address: errorText }))
        : setError((prev) => ({ ...prev, address: "" }));

      !inputs?.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: "" }));

      !inputs?.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: "" }));

      !inputs?.bio
        ? setError((prev) => ({ ...prev, bio: bioErr }))
        : setError((prev) => ({ ...prev, bio: "" }));

      !inputs?.industry
        ? setError((prev) => ({ ...prev, industry: industryErr }))
        : setError((prev) => ({ ...prev, industry: "" }));

      !inputs?.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));
    }

    handleError();
  }, [inputs]);

  //checking for error message

  useEffect(() => {
    let err = false;
    if (
      !inputs.picture ||
      !inputs.brandName ||
      !inputs.brandUrl ||
      !inputs.address ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio ||
      !inputs.instagram ||
      !inputs.industry
    ) {
      err = true;
    } else {
      err = false;
    }

    setIsError(err);
  }, [error]);

  //handle save
  function handleSubmit() {
    if (isError) {
      setModalTxt("add-photo");
    } else {
      update(dispatch, "/client/", { ...inputs }, setModalTxt);
    }
  }

  return (
    <form className="--content-container" onSubmit={(e) => e.preventDefault()}>
      <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />

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
              isError={isError}
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
              {picture && <img src={URL.createObjectURL(picture)} alt="" />}
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
                  isError={isError}
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
                  error={error.name}
                  handleChange={handleChange}
                />

                {/* url input  */}
                <Input1
                  id="brandUrl"
                  label="Brand Url"
                  placeholder="https://brand-url.com"
                  error={error.url}
                  handleChange={handleChange}
                />

                {/* address input */}
                <Input2
                  id="address"
                  label="Address"
                  placeholder="Client Address..."
                  error={error.address}
                  handleChange={handleChange}
                />

                {/* country input */}
                <Input3
                  id="country"
                  label="Country"
                  placeholder="Client Country..."
                  error={error.country}
                  handleChange={handleChange}
                />

                {/* state input */}
                <Input3
                  id="state"
                  label="State"
                  placeholder="Client State..."
                  error={error.state}
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
            isError={isError}
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
              className="--kyc-input-field"
              name="industry"
              onChange={handleChange}
            >
              <option value="">Choose an industry</option>
              {Industry.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <p className="--error-text">{error.industry}</p>
          </div>
        )}

        {/* industry read only section  */}

        {activeEdit !== "client-industry" && (
          <p className="industry-text">
            <span className="bold-text">client industry: </span>{" "}
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
            isError={isError}
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
                required
              ></textarea>
            </div>
            <p className="--error-text">{error.bio}</p>
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
            isError={isError}
          />
        </div>
        {/* social-media  read only section */}
        {activeEdit !== "social-media" && (
          <ul className="--set_social-list">
            {/* <li className="--social-item">{social?.facebook}</li>
            <li className="--social-item">{social?.twitter}</li> */}
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

                    <p className="--error-text">{error[item.id]}</p>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* btn section  */}

      <section className="--setting_btn-container">
        <button
          onClick={() => resetDiscard()}
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
          onClick={handleSubmit}
          className="--save-btn  bold-text --yes-btn"
        >
          {isFetching ? "A moment..." : "Save"}
        </button>
      </section>
    </form>
  );
}

export default About;
