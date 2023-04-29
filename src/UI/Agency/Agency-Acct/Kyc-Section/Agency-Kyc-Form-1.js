import "./Agency-Kyc-Form-1.css";
import FormNavBtn from "./Form-nav-btn";
import { useEffect, useState } from "react";
import { Input1, Input2, Input3 } from "./kyc-input";
import { SocialMedia } from "../utils";

function AgencyKycForm1({ handleNavigation, handleChange, inputs }) {
  //State Error
  const [error, setError] = useState({
    agencyName: inputs.agencyName,
    agencyUrl: inputs.agencyUrl,
    address: inputs.address,
    state: inputs.state,
    country: inputs.country,
    about: inputs.about,
    instagram: inputs.instagram,
  });

  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);

  //setting error messages
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required.!";
      let socialErr = "Your social-media link is required.!";

      !inputs.agencyName
        ? setError((prev) => ({ ...prev, agencyName: errorText }))
        : setError((prev) => ({ ...prev, name: "" }));

      !inputs.agencyUrl
        ? setError((prev) => ({ ...prev, agencyUrl: errorText }))
        : setError((prev) => ({ ...prev, url: "" }));

      !inputs.address
        ? setError((prev) => ({ ...prev, address: errorText }))
        : setError((prev) => ({ ...prev, address: "" }));

      !inputs.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: "" }));

      !inputs.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: "" }));

      !inputs.about
        ? setError((prev) => ({
            ...prev,
            about: "The Bio section is required.!",
          }))
        : setError((prev) => ({ ...prev, about: "" }));

      !inputs.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));
    }

    handleError();
  }, [inputs]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      !inputs.agencyName ||
      !inputs.agencyUrl ||
      !inputs.address ||
      !inputs.state ||
      !inputs.country ||
      !inputs.about ||
      !inputs.instagram
    ) {
      err = true;
    } else {
      err = false;
    }

    setIsError(err);
  }, [inputs]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      handleNavigation(text);
    }
  }

  return (
    <form className="kyc--form" onSubmit={(e) => e.preventDefault()}>
      <section className="kyc--hero">
        <img src="/images/kyc/agent-1.jpg" alt="" />
        <div className="kyc--hero__text-rapper">
          <h2 className="kyc--hero__dark-title">Step-1</h2>
          <p className="kyc--hero__dark-text">
            Setting Up Your Agency Portfolio.
          </p>
        </div>
      </section>
      <section className="kyc--content-section">
        <div className="list--container">
          <div className="sections--container ">
            <h2 className="sections--title">Profile Details</h2>
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Let's get to know you better.!
            </p>
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Fill out some basic info about your agency.
            </p>

            {/* details section  */}

            <ul className="info--section">
              {/* name input */}
              <Input1
                id="agencyName"
                label=" Agency Name"
                placeholder="Your Agency Name..."
                error={error.agencyName}
                handleChange={handleChange}
                showError={showError}
              />

              {/* url input  */}
              <Input1
                id="agencyUrl"
                label=" Agency Url"
                placeholder="Agency Url..."
                error={error.agencyUrl}
                handleChange={handleChange}
                showError={showError}
              />

              {/* address input */}
              <Input2
                id="address"
                label=" Agency Address"
                placeholder="Agency Address..."
                error={error.address}
                handleChange={handleChange}
                showError={showError}
              />

              {/* country input */}
              <Input3
                id="country"
                label="Country"
                placeholder="Agency Country..."
                error={error.country}
                handleChange={handleChange}
                showError={showError}
              />

              {/* state input */}
              <Input3
                id="state"
                label="State"
                placeholder="Agency State..."
                error={error.state}
                handleChange={handleChange}
                showError={showError}
              />
            </ul>
          </div>

          <div className="sections--container">
            <h2 className="sections--title">Agency Bio</h2>
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Share a little about your Agency, including years of experience,
              achievements etc.
            </p>
            <p className="note-text">
              <i className="fa-solid fa-angles-right points"></i>
              Include a credible and verifiable information so you can stand out
              from the crowd.
            </p>
            <div className="bio--rapper">
              <textarea
                className="bio--text-area"
                onChange={handleChange}
                name="about"
                id="about"
                cols="30"
                rows="10"
                placeholder="Brief information about your Agency..."
                required
              ></textarea>
            </div>

            {showError && <p className="error-text bio-error">{error.about}</p>}
          </div>

          {/* social media section */}
          <div className="sections--container">
            <h2 className="sections--title">Social Media Handles</h2>
            <ul className="social--media-link">
              {SocialMedia.map((item) => {
                return (
                  <li className="kyc--input-container" key={item.id}>
                    <label className="kyc--input-label" htmlFor={item.id}>
                      <span className="required--icon_rapper">
                        {item.label}
                        {error[item.id] === "" ? (
                          <i className="fa-solid fa-circle-check valid--icon"></i>
                        ) : (
                          <i className="fa-solid fa-star required--icon"></i>
                        )}
                      </span>
                      <input
                        onChange={handleChange}
                        className="kyc--input-field"
                        type={item.type}
                        id={item.id}
                        name={item.id}
                        placeholder={item.placeholder}
                        required
                        spellCheck={false}
                      />
                      {showError && (
                        <p className="error-text">{error[item.id]}</p>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="kyc--btn-container">
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

export default AgencyKycForm1;
