import ImgItem from "./ImgItem";
import { ViewBtn } from "./Buttons";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function ModelPolaroid({
  polaroids,
  activeDisplay,
  displayLimit,
  handleDisplay,
  viewAll,
  fetchModel,
  item,
}) {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <section className="section section-profile  polaroid-section">
      <div className={model ? "pic-model open-model" : "pic-model"}>
        <img src={tempImgSrc} />
        <FaTimes onClick={() => setModel(false)} />
      </div>
      {/* image display section  */}
      {/* <ul className="imgList">
        {polaroids.map((polaroid, index) =>
          activeDisplay !== "polaroids" ? (
            index <= displayLimit - 1 && (
              <ImgItem
                key={index}
                img={polaroid}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : activeDisplay === "polaroids" && !viewAll ? (
            index <= displayLimit - 1 && (
              <ImgItem
                key={index}
                img={polaroid}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : (
            <ImgItem
              key={index}
              img={polaroid}
              fetchModel={fetchModel}
              item={item}
            />
          )
        )}
      </ul> */}

      <div className="gallery">
        {polaroids?.map((polaroid, index) =>
          activeDisplay !== "polaroids" ? (
            index <= displayLimit - 1 && (
              <ImgItem
                index={index}
                img={polaroid}
                getImg={getImg}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : activeDisplay === "polaroids" && !viewAll ? (
            index <= displayLimit - 1 && (
              <ImgItem
                key={index}
                img={polaroid}
                getImg={getImg}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : (
            <ImgItem
              index={index}
              img={polaroid}
              fetchModel={fetchModel}
              item={item}
            />
          )
        )}
      </div>

      {/* No image posted yet */}

      <div
        style={{ display: polaroids.length > 1 && "none" }}
        className="empty-content-text"
      >
        Sorry, Model is yet to post a Polaroid.
      </div>

      {/* display  Btn section */}

      {polaroids.length > displayLimit && (
        <ViewBtn
          id="polaroids"
          handleDisplay={handleDisplay}
          btnText={
            activeDisplay === "polaroids" && viewAll ? "view Less" : "view All"
          }
        />
      )}
    </section>
  );
}

export default ModelPolaroid;
