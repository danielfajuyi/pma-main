import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobPostForm.scss";
import { useDispatch } from "react-redux";
import { makePost } from "../../../redux/apiCalls";
import axios from "axios";
import Form from "./Form";

const JobPostForm = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // get access token for countries api
  useEffect(() => {
    const getAccessToken = async () => {
      const res = await axios.get(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            Accept: "application/json",
            "api-token":
              "Ku2uq0eMGByhMQmQdP5tKH3bbR4dD3ZNXjRqllWOT-srDfzC-wXRnd7Kcym_A_9MpP4",
            "user-email": "tosinadebayo55@gmail.com",
          },
        }
      );
      setAuthToken(res.data);
    };
    getAccessToken();
  }, []);

  // get list of countries
  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get(
        "https://www.universal-tutorial.com/api/countries/",
        {
          headers: {
            Authorization: `Bearer ${authToken.auth_token}`,
            Accept: "application/json",
          },
        }
      );
      setCountries(res.data);
    };
    getCountries();
  }, [authToken]);

  // get list of states
  useEffect(() => {
    const getStates = async () => {
      const res = await axios.get(
        `https://www.universal-tutorial.com/api/states/${inputs?.country}`,
        {
          headers: {
            Authorization: `Bearer ${authToken.auth_token}`,
            Accept: "application/json",
          },
        }
      );
      setStates(res.data);
    };
    getStates();
  }, [inputs.country]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePhotos = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewPhotos((prevData) => [...prevData, img]);
    setPhoto(e.target.files[0]);
  };

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
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handlePhotos={handlePhotos}
          states={states}
          countries={countries}
          progress={progress}
          previewPhotos={previewPhotos}
          inputs={inputs}
        />
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default JobPostForm;
