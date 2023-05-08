import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobPostForm.scss";
import Footer from "../../Home/Layout/FooterSection/Footer/footer";
import countrydata from "../Component/CountryData/Country-State-Data.json";
import {
  statusOption,
  jobTypeOption,
  jobdurationOption,
  ageOption,
  heightOption,
} from "../JobCategory/JobsCategory";
import { useDispatch, useSelector } from "react-redux";
import { makePost } from "../../../redux/apiCalls";

const JobPostForm = () => {
  const { isFetching } = useSelector((state) => state.process);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // console.log(inputs);

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => [...prevData, img]);
    setPhoto(e.target.files[0]);
  };
  // console.log(previewPhotos);

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/jobs/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "photos" && setProgress(progress);
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
          setPhotos((prev) => [...prev, downloadURL]);
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
  }, [photo, photos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !inputs.title ||
      !inputs.desc ||
      !inputs.country ||
      !inputs.state ||
      !inputs.expire ||
      !inputs.price ||
      !inputs.location ||
      !inputs.paymentInfo ||
      !inputs.payMoreDetails ||
      !inputs.type ||
      !inputs.gender ||
      !inputs.age ||
      !inputs.height
    ) {
      toast.error("Please fill all input feild");
    } else {
      makePost(dispatch, "/job/post-job/", { ...inputs });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="booking-sections">
        <form className="book-forms form-mtop" onSubmit={handleSubmit}>
          <div className="form-header form-box  ">
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
                type="text"
                name="price"
                onChange={handleChange}
                placeholder="Enter Price"
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
                {countrydata.map((getCountry, index) => {
                  const { country_name } = getCountry;
                  return (
                    <option value={country_name || ""} key={index}>
                      {country_name}
                    </option>
                  );
                })}
              </select>

              <select onChange={handleChange} name="state">
                <option hidden value="">
                  --Select State--
                </option>
                {countrydata.map((getstates, index) => {
                  const { states } = getstates;
                  return (
                    <>
                      {states.map((state, index) => {
                        return (
                          <option value={state.state_name || ""} key={index}>
                            {state.state_name}
                          </option>
                        );
                      })}
                    </>
                  );
                })}
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
              disabled={previewPhotos.length === 5}
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
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default JobPostForm;
