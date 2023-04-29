import "./Models-Kyc-Form-1.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import FormNavBtn from "./Form-nav-btn";
import { useEffect, useState } from "react";
import { info } from "../utils";
import { storage } from "../../../../firebase";
import { useSelector } from "react-redux";

function ModelsKycForm1({ handleNavigation, inputs, handleChange, setInputs }) {
  const user = useSelector((state) => state.user.currentUser);

  const [picture, setPicture] = useState(undefined);
  const [error, setError] = useState({
    username: inputs.username,
    gender: inputs.gender,
    state: inputs.state,
    country: inputs.country,
    bio: inputs.bio,
  });
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);

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
      (error) => {},
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

  // handle empty input
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required!";

      picture === undefined
        ? setError((prev) => ({ ...prev, picture: errorText }))
        : setError((prev) => ({ ...prev, picture: "" }));

      !inputs.username
        ? setError((prev) => ({ ...prev, username: errorText }))
        : setError((prev) => ({ ...prev, username: "" }));

      !inputs.gender
        ? setError((prev) => ({ ...prev, gender: errorText }))
        : setError((prev) => ({ ...prev, gender: "" }));

      !inputs.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: "" }));

      !inputs.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: "" }));

      !inputs.bio
        ? setError((prev) => ({
            ...prev,
            bio: "The Bio section is required.!",
          }))
        : setError((prev) => ({ ...prev, bio: "" }));
    }

    handleError();
  }, [inputs, picture]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      picture === undefined ||
      !inputs.username ||
      !inputs.gender ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio
    ) {
      err = true;
    }

    !user.isUpdated && setIsError(err);
  }, [error, inputs, picture, user]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      handleNavigation(text);
    }
  }

  return (
    <form className="kyc-form" onSubmit={(e) => e.preventDefault()}>
      <section className="kyc-hero">
        <img src="/images/kyc/model-1.jpg" alt="" />
        <div className="kyc-hero__text-rapper">
          <h2 className="kyc1-hero__title dark-text">Step-1</h2>
          <p className="kyc-hero__text dark-text">
            Setting Up Your Model Portfolio.
          </p>
        </div>
      </section>
      <section className="kyc-content-section">
        <div className="list-container">
          <div className="sections-container ">
            <div className="detail-container">
              <div className="img-rapper">
                <label
                  className="upload-btn on-hover"
                  htmlFor="profile-img"
                  style={{ position: "absolute" }}
                >
                  <i className="fa-solid fa-plus fa-2x"></i>
                </label>
                <input
                  onChange={(e) => setPicture(e.target.files[0])}
                  type="file"
                  name="picture"
                  id="profile-img"
                  className="file-input"
                />{" "}
                {!picture && !user.isUpdated && (
                  <p className="error-text" style={{ zIndex: 1 }}>
                    This detail is required!
                  </p>
                )}
                {picture && (
                  <img
                    src={URL.createObjectURL(picture)}
                    alt=""
                    className="preview"
                  />
                )}
              </div>

              <div className="info-section__rapper">
                <div className="desktop-text">
                  <h2 className="sections-title ">Profile Details</h2>
                  <p className="description">
                    <i className="fa-solid fa-angles-right point"></i>
                    Include a well-lit headShort, generally framed between the
                    top of your head to just below your shoulders.
                  </p>
                </div>

                <ul className="info-section">
                  {info.map((item) => {
                    let name = [item.id];
                    return (
                      <li className="kyc1-input-container" key={item.id}>
                        <label className="kyc1-input-label" htmlFor={item.id}>
                          <span className="required-icon_rapper">
                            {item.label}
                            {error[name] === "" ? (
                              <i className="fa-solid fa-circle-check valid-icon"></i>
                            ) : (
                              <i className="fa-solid fa-star required-icon"></i>
                            )}
                          </span>

                          {item.id !== "gender" && (
                            <input
                              onChange={handleChange}
                              className="kyc1-input-field"
                              type={item.type}
                              id={item.id}
                              name={item.id}
                              // defaultValue={user === item.id}
                              placeholder={item.placeholder}
                              required
                            />
                          )}
                          {item.id === "gender" && (
                            <select
                              onChange={handleChange}
                              className="kyc1-input-field"
                              id={item.id}
                              name={item.id}
                            >
                              <option value="">Select your gender</option>
                              <option value="m">Male</option>
                              <option value="f">Female</option>
                            </select>
                          )}
                          {showError && (
                            <p className="error-text">{error[item.id]}</p>
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="sections-container">
            <h2 className="sections-title">Model Bio</h2>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              Share a little about your self, including years of modeling
              experience, previous clients, etc.
            </p>
            <p className="description">
              <i className="fa-solid fa-angles-right point"></i>
              Don't be afraid to express your personality so you can stand out
              from the crowd.
            </p>
            <div className="bio-rapper">
              <textarea
                className="bio-text-area"
                onChange={handleChange}
                name="bio"
                id="bio"
                cols="30"
                rows="10"
                placeholder="wright out your Bio here..."
                required
              ></textarea>
            </div>

            {showError && <p className="error-text">{error.bio}</p>}
          </div>
          <div className="kyc-btn-container">
            <FormNavBtn
              btnText="Next"
              name="form1"
              handleClick={handleSubmit}
              type="button"
            />
          </div>
        </div>
      </section>
    </form>
  );
}

export default ModelsKycForm1;
