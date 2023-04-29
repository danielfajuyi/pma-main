import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModelInfo from "../../../Pages/FindModel/Models-Profile-page/Model-Info";
import ModelPhoto from "../../../Pages/FindModel/Models-Profile-page/Model-Photo";
import ModelStats from "../../../Pages/FindModel/Models-Profile-page/Model-Stats";
import ModelBio from "../../../Pages/FindModel/Models-Profile-page/Model-Bio";
import ModelVideo from "../../../Pages/FindModel/Models-Profile-page/Model-Video";
import ModelPolaroid from "../../../Pages/FindModel/Models-Profile-page/Model-Polaroid";
import BookingForm from "../../../Pages/FindModel/Models-Profile-page/BookingForm";
import Links from "../../../Pages/FindModel/Models-Profile-page/Links";
import ModelsForms from "../Models-Acct/Kyc-Section/Models-Kyc-Forms";
import AcctSetting from "../Models-Acct/Acct-Setting/Models-Acct-Setting";

function ModelPortfolio({ item, postMsg, setModelPage }) {
  const user = useSelector((state) => state.user.currentUser);

  const [activeSection, setActiveSection] = useState("Photos");
  const [toggleForm, setToggleForm] = useState(false);
  const [displayLimit, setDisplayLimit] = useState("");
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [activeDisplay, setActiveDisplay] = useState("");
  const [viewAll, setViewAll] = useState(false);
  //const [editPortfolio, setEditPortfolio] = useState(false);

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
  }

  function handleDisplay(id, text) {
    setActiveDisplay(id);
    text === "view All" ? setViewAll(true) : setViewAll(false);
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <>
        <ModelInfo
          item={user}
          handleForm={handleForm}
          setModelPage={setModelPage}
        />
        <Links handleSection={handleSection} activeSection={activeSection} />
        {activeSection === "Photos" && (
          <ModelPhoto
            photos={user?.model?.photos}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
          />
        )}
        {activeSection === "Stats" && <ModelStats item={user?.model} />}
        {activeSection === "Bio" && <ModelBio item={user?.model} />}
        {activeSection === "Videos" && (
          <ModelVideo
            videos={user?.model?.videos}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
          />
        )}
        {activeSection === "Polaroids" && (
          <ModelPolaroid
            polaroids={user?.model?.polaroids}
            activeDisplay={activeDisplay}
            displayLimit={displayLimit}
            handleDisplay={handleDisplay}
            viewAll={viewAll}
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
