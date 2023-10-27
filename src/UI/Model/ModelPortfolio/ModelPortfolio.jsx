import "./Profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelInfo from "../../../Pages/FindModel/Models-Profile-page/Model-Info";
import ModelPhoto from "../../../Pages/FindModel/Models-Profile-page/Model-Photo";
import ModelStats from "../../../Pages/FindModel/Models-Profile-page/Model-Stats";
import ModelBio from "../../../Pages/FindModel/Models-Profile-page/Model-Bio";
import ModelVideo from "../../../Pages/FindModel/Models-Profile-page/Model-Video";
import ModelPolaroid from "../../../Pages/FindModel/Models-Profile-page/Model-Polaroid";
import BookingForm from "../../../Pages/FindModel/Models-Profile-page/BookingForm";
import Links from "../../../Pages/FindModel/Models-Profile-page/Links";
import { makeGet } from "../../../redux/apiCalls";
import { useLocation } from "react-router";

function ModelPortfolio({ item, postMsg }) {
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
  const [model, setModel] = useState();

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
    setToggleForm((prevForm) => !prevForm);

    console.log("toggle form");
  }

  function handleDisplay(id, text) {
    setActiveDisplay(id);
    text === "view All" ? setViewAll(true) : setViewAll(false);
  }

  const fetchModel = () => {
    makeGet(dispatch, `/model/${path}`, setModel);
  };

  useEffect(() => {
    let unsubscribed = fetchModel();
    return () => unsubscribed;
  }, []);
  // console.log(model)

  return (
    <div style={{ backgroundColor: "white" }}>
      <>
        <ModelInfo item={user.role === 'model'? user : model} handleForm={handleForm} />
        <Links handleSection={handleSection} activeSection={activeSection} />
        {activeSection === "Photos" && (
          <ModelPhoto
            photos={model?.model?.photos}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
            fetchModel={fetchModel}
          />
        )}
        {activeSection === "Stats" && <ModelStats item={model?.model} />}
        {activeSection === "Bio" && <ModelBio item={model?.model} />}
        {activeSection === "Videos" && (
          <ModelVideo
            videos={model?.model?.videos}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
            fetchModel={fetchModel}
          />
        )}
        {activeSection === "Polaroids" && (
          <ModelPolaroid
            polaroids={model?.model?.polaroids}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
            fetchModel={fetchModel}
          />
        )}
        <BookingForm
          handleForm={handleForm}
          toggleForm={toggleForm}
          profileId={item?.id}
          postMsg={postMsg}
        />
      </>

      <div className="profile-footer">
        <small>Copyright &copy; 2022 PREMIUM MODEL</small>
        <span>{`(${deviceSize})`}</span>
      </div>
    </div>
  );
}
export default ModelPortfolio;
