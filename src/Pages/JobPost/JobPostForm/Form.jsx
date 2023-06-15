import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./JobPostForm.scss";
import {
  statusOption,
  jobTypeOption,
  jobdurationOption,
  ageOption,
  heightOption,
} from "../JobCategory/JobsCategory";
import { useSelector } from "react-redux";

const Form = ({
  handleSubmit,
  handleChange,
  handlePhotos,
  states,
  countries,
  progress,
  previewPhotos,
  inputs,
}) => {
  const { isFetching } = useSelector((state) => state.process);

  return (
    <form className="book-forms form-mtop" onSubmit={handleSubmit}>
      <div className="form-header form-box">
        <h1>Post Job</h1>
      </div>

      <div className="form-desc1 form-mtop form-box">
        <label htmlFor="title" className="bookform-label">
          Title
        </label>
        <input
          className="bookform-texts"
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="For example: Female model required for photo shoot"
        />

        <div className="jobform-desc">
          <label className="bookform-label" htmlFor="desc">
            Describe the Job
          </label>
          <textarea
            placeholder="Explain the type of model jobs"
            name="desc"
            className="bookform-textarea"
            onChange={handleChange}
          ></textarea>
          <h6>Email address is not permitted here</h6>
        </div>
      </div>

      <div className="jobform-status form-mtop form-box">
        <label htmlFor="status" className="bookform-label">
          Payment information
        </label>
        <select name="paymentInfo" onChange={handleChange}>
          <option hidden value="">
            Please select payment status
          </option>
          {statusOption.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="payMoreDetails"
          onChange={handleChange}
          className="bookform-text"
          style={{ border: "none", margin: "10px 0px" }}
          placeholder="Enter more details"
        />

        <div>
          <label className="bookform-label">Price</label>
          <input
            type={inputs?.paymentInfo === "Paid" ? "number" : "text"}
            name="price"
            onChange={handleChange}
            placeholder={
              inputs?.paymentInfo === "Paid"
                ? "Enter Price"
                : "Enter Product or Collaboration Details"
            }
          />
        </div>

        <div className="jobform-jobtype">
          <label htmlFor="jobtype" className="bookform-label">
            Job or collaboration type
          </label>

          <select name="type" onChange={handleChange}>
            <option hidden value="">
              Please select payment status
            </option>
            {jobTypeOption.map((option, index) => (
              <option id="jobcategory" value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="jobform-location form-box form-mtop">
        <label htmlFor="location" className="bookform-label">
          Shoot or project location
        </label>
        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="give breif details abou the job location"
        />

        <div className="jobform-countryNstate">
          <label htmlFor="countryNstate" className="bookform-label">
            Where can models apply from ?
          </label>

          <select onChange={handleChange} name="country">
            <option hidden value="">
              --Select Country--
            </option>
            {countries?.map((getCountry, index) => {
              const { country_name } = getCountry;
              return (
                <option value={country_name} key={index}>
                  {country_name}
                </option>
              );
            })}
          </select>

          <select onChange={handleChange} name="state">
            <option hidden value="">
              --Select State--
            </option>
            {inputs?.country && (
              <>
                {states.map((state, index) => {
                  return (
                    <option value={state.state_name} key={index}>
                      {state.state_name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <div>
          <label className="bookform-label">Application expires</label>

          <select name="expire" onChange={handleChange}>
            <option hidden value="">
              Please select expire date{" "}
            </option>
            {jobdurationOption.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
          <button>Custom</button>
          <input
            type="date"
            name="expire"
            placeholder="Enter date"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-box form-mtop">
        <label>Model Preferences</label>

        <div>
          <label className="bookform-label">Gender</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>

          <div>
            <input
              type="radio"
              name="gender"
              value="both"
              id="both"
              onChange={handleChange}
            />
            <label htmlFor="female">Both</label>
          </div>
        </div>

        <div>
          <label className="bookform-label">Age</label>
          <select name="age" onChange={handleChange}>
            <option hidden value="">
              Choose Age
            </option>
            {ageOption.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="bookform-label">Height</label>
          <select name="height" onChange={handleChange}>
            <option hidden value="">
              Please select preferred height
            </option>
            {heightOption.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-box form-mtop">
        <label>Upload Photo</label>
        <input
          type="file"
          name="photos"
          onChange={handlePhotos}
          disabled={previewPhotos?.length === 5}
        />
        <p>You can add up to 5 images to represent the mood of your post</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {previewPhotos?.map((img, index) => (
            <img
              src={img}
              alt=""
              style={{
                width: "120px",
                height: "80px",
                objectFit: "contain ",
              }}
              key={index}
            />
          ))}
        </div>
        <div
          className="form-mtop button-wrapper "
          style={{ paddingBottom: "10px" }}
        >
          <button
            type="submit"
            className="btn-shadow"
            disabled={progress > 0 && progress < 100}
          >
            {isFetching ? "Please wait..." : "Post"}
          </button>
          {/* <p>{success ? "Job has been posted successfully!": ""}</p> */}
        </div>
      </div>
    </form>
  );
};

export default Form;
