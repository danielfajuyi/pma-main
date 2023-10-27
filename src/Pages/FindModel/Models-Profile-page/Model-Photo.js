import ImgItem from "./ImgItem";
import { ViewBtn } from "./Buttons";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AlertModal } from "../../LoginSignup/Sign-Up/signUpForm/Modal";

function ModelPhoto({
  photos,
  activeDisplay,
  displayLimit,
  handleDisplay,
  viewAll,
  fetchModel,
  item,
}) {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [modalTxt, setModalTxt] = useState("");
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <section className="section  section-profile photo-section">
      <div className={model ? "pic-model open-model" : "pic-model"}>
        <img src={tempImgSrc} />
        <FaTimes onClick={() => setModel(false)} />
      </div>

      {/* photo display section */}
      {/* <ul className="imgList">
        {photos?.map((photo, index) =>
          activeDisplay !== "photos" ? (
            index <= displayLimit - 1 && (
              <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
            )
          ) : activeDisplay === "photos" && !viewAll ? (
            index <= displayLimit - 1 && (
              <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
            )
          ) : (
            <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
          )
        )}
      </ul> */}

      <div className="gallery">
        <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
        {photos?.map((photo, index) =>
          activeDisplay !== "photos" ? (
            index <= displayLimit - 1 && (
              <ImgItem
                index={index}
                modalTxt={modalTxt}
                setModalTxt={setModalTxt}
                img={photo}
                getImg={getImg}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : activeDisplay === "photos" && !viewAll ? (
            index <= displayLimit - 1 && (
              <ImgItem
                key={index}
                img={photo}
                modalTxt={modalTxt}
                setModalTxt={setModalTxt}
                getImg={getImg}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : (
            <ImgItem
              index={index}
              img={photo}
              modalTxt={modalTxt}
              setModalTxt={setModalTxt}
              fetchModel={fetchModel}
              item={item}
            />
          )
        )}
      </div>

      {/* No photo posted yet */}
      <div
        style={{ display: photos?.length > 0 && "none" }}
        className="empty-content-text"
      >
        Sorry, Model is yet to post a Photo.
      </div>

      {/* photo display btn section */}
      {photos?.length > displayLimit && (
        <ViewBtn
          id="photos"
          handleDisplay={handleDisplay}
          btnText={
            activeDisplay === "photos" && viewAll ? "view Less" : "view All"
          }
        />
      )}
    </section>
  );
}

export default ModelPhoto;
