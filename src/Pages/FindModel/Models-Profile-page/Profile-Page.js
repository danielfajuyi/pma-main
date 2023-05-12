import "./Profile.css";
import ModelInfo from "./Model-Info";
import Links from "./Links";
import ModelPhoto from "./Model-Photo";
import ModelStats from "./Model-Stats";
import ModelBio from "./Model-Bio";
import ModelVideo from "./Model-Video";
import ModelPolaroid from "./Model-Polaroid";
import BookingForm from "./BookingForm";
import { useState, useEffect, useCallback } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage({ item, postMsg }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [activeSection, setActiveSection] = useState("Photos");
  const [toggleForm, setToggleForm] = useState(false);
  const [displayLimit, setDisplayLimit] = useState("");
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [activeDisplay, setActiveDisplay] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = useCallback(() => {
    makeGet(
      dispatch,
      user ? `/model/${path}` : `/model/model/${path}`,
      setMessage
    );
  }, [dispatch]);
  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
  }, []);

  // setting device size
  function handleResize() {
    setDeviceSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceSize]);

  useEffect(() => {
    deviceSize > 1279 ? setDisplayLimit(8) : setDisplayLimit(6);
  }, [deviceSize]);

  function handleSection(e) {
    let section = e.target.textContent;
    setActiveSection(section);
  }

  function handleForm() {
    if (!user) {
      alert("Please login to book this model");
      window.location.replace("/login");
    } else {
      setToggleForm((prevForm) => !prevForm);
    }
  }

  function handleDisplay(id, text) {
    setActiveDisplay(id);
    text === "view All" ? setViewAll(true) : setViewAll(false);
  }

  return (
    <>
      <ModelInfo item={message} handleForm={handleForm} />
      <Links handleSection={handleSection} activeSection={activeSection} />
      {activeSection === "Photos" && (
        <ModelPhoto
          photos={message?.model?.photos}
          activeDisplay={activeDisplay}
          displayLimit={displayLimit}
          handleDisplay={handleDisplay}
          viewAll={viewAll}
          item={message}
        />
      )}
      {activeSection === "Stats" && <ModelStats item={message} />}
      {activeSection === "Bio" && <ModelBio item={message} />}
      {activeSection === "Videos" && (
        <ModelVideo
          videos={message.model?.videos}
          activeDisplay={activeDisplay}
          displayLimit={displayLimit}
          handleDisplay={handleDisplay}
          viewAll={viewAll}
          item={message}
        />
      )}
      {activeSection === "Polaroids" && (
        <ModelPolaroid
          polaroids={message?.model?.polaroids}
          activeDisplay={activeDisplay}
          displayLimit={displayLimit}
          handleDisplay={handleDisplay}
          viewAll={viewAll}
          item={message}
        />
      )}
      <BookingForm
        handleForm={handleForm}
        toggleForm={toggleForm}
        profileId={message?._id}
        postMsg={postMsg}
      />
      <div className="profile-footer">
        <small>Copyright &copy; 2022 PREMIUM MODEL</small>
      </div>
    </>
  );
}
export default ProfilePage;
