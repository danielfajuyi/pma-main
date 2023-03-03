import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
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

const jobapi = "https://formapi-4wry.onrender.com/postjob";

const initialState = {
  title: "",
  desc: "",
  country: "",
  city: "",
  duedate: "",
  price: "",
  location: "",
  status: "",
  statusInfo: "",
  date: "",
  jobtype: "",
  gender: "male",
  age: "",
  height: "",
};

const JobPostForm = ({ loadJobPostData }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);

  // eslint-disable-next-line
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  // const countrydataApi =
  //   "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

  const {
    title,
    desc,
    date,
    country,
    city,
    duedate,
    price,
    location,
    status,
    statusInfo,
    jobtype,
    gender,
    age,
    height,
  } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "Paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, img: [downloadUrl] }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onCountryChange = (e) => {
    setForm({ ...form, country: e.target.value });
  };

  const onCityChange = (e) => {
    setForm({ ...form, city: e.target.value });
  };

  const onDateChange = (e) => {
    setForm({ ...form, date: e.target.value });
  };

  const onGenderChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const onStatusChange = (e) => {
    setForm({ ...form, status: e.target.value });
  };

  const onJobTypeChange = (e) => {
    setForm({ ...form, jobtype: e.target.value });
  };

  const onJobdueChange = (e) => {
    setForm({ ...form, duedate: e.target.value });
  };

  const onHeightChange = (e) => {
    setForm({ ...form, height: e.target.value });
  };

  const onAgeChange = (e) => {
    setForm({ ...form, age: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !desc ||
      !country ||
      !city ||
      !duedate ||
      !date ||
      !price ||
      !location ||
      !status ||
      !statusInfo ||
      !jobtype ||
      !gender ||
      !age ||
      !height
    ) {
      toast.error("Please fill all input feild");
    } else {
      axios.post(jobapi, form);
      toast.success("Job Added Successfully");
      console.log(form);
      console.log(`New Jobapi => ${jobapi}`);
      setForm({
        title: "",
        desc: "",
        country: "",
        city: "",
        duedate: "",
        price: "",
        location: "",
        status: "",
        statusInfo: "",
        date: "",
        jobtype: "",
        gender: "male",
        age: "",
        height: "",
      });

      setTimeout(() => loadJobPostData(), 5000 , navigate("/jobpost"));
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
              value={title}
              onChange={onInputChange}
              placeholder="For example: Female model required for photo shoot"
            />

            <div className="jobform-desc">
              <label className="bookform-label" htmlFor="desc">
                Describe the Job
              </label>
              <textarea
                placeholder="Explain the type of model jobs"
                name="desc"
                value={desc}
                className="bookform-textarea"
                onChange={onInputChange}
              ></textarea>
              <h6>Email address is not permitted here</h6>
            </div>
          </div>

          <div className="jobform-status form-mtop form-box">
            <label htmlFor="status" className="bookform-label">
              Payment information
            </label>
            <select value={status} onChange={onStatusChange}>
              <option hidden>Please select payment status</option>
              {statusOption.map((option, index) => {
                return (
                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="statusInfo"
              value={statusInfo}
              onChange={onInputChange}
              className="bookform-text"
              style={{ border: "none", margin: "10px 0px" }}
              placeholder="Enter more details"
            />

            <div>
              <label className="bookform-label">Price</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={onInputChange}
                placeholder="Enter Price"
              />
            </div>

            <div className="jobform-jobtype">
              <label htmlFor="jobtype" className="bookform-label">
                Job or collaboration type
              </label>

              <select value={jobtype} onChange={onJobTypeChange}>
                <option hidden>Please select payment status</option>
                {jobTypeOption.map((option, index) => {
                  return (
                    <option id="jobcategory" value={option || ""} key={index}>
                      {option}
                    </option>
                  );
                })}
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
              value={location}
              onChange={onInputChange}
              placeholder="give breif details abou the job location"
            />

            <div className="jobform-countryNstate">
              <label htmlFor="countryNstate" className="bookform-label">
                Where can models apply from ?
              </label>

              <select onChange={onCountryChange} value={country}>
                <option hidden>--Select Country--</option>
                {countrydata.map((getCountry, index) => {
                  const { country_name } = getCountry;
                  return (
                    <option value={country_name || ""} key={index}>
                      {country_name}
                    </option>
                  );
                })}
              </select>

              <select onChange={onCityChange} value={city}>
                <option hidden>--Select State--</option>
                {countrydata.map((getstates, index) => {
                  const { states } = getstates;
                  return (
                    <>
                      {states &&
                        states.map((state, index) => {
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

              <select value={duedate} onChange={onJobdueChange}>
                <option hidden>Please select expire date </option>
                {jobdurationOption.map((option, index) => {
                  return (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
              <button>Custom</button>
              <input
                type="date"
                name="date"
                value={date}
                placeholder="Enter date"
                onChange={onDateChange}
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
                  checked={gender === "male"}
                  onChange={onGenderChange}
                />
                <label>Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={onGenderChange}
                />
                <label>Female</label>
              </div>
            </div>

            <div>
              <label className="bookform-label">Age</label>
              <select value={age} onChange={onAgeChange}>
                <option hidden>Choose Age</option>
                {ageOption.map((option, index) => {
                  return (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="bookform-label">Height</label>
              <select value={height} onChange={onHeightChange}>
                <option hidden>Please select payment status</option>
                {heightOption.map((option, index) => {
                  return (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-box form-mtop">
            <label>Upload Photo</label>
            <input type="file" onChange={onFileChange} />
            <p>You can add up to 5 images to represent the mood of your post</p>
            <div className="form-mtop button-wrapper ">
              <button type="submit" className="btn-shadow">
                Post
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default JobPostForm;
