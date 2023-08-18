import React, { useRef, useState } from "react";
import "./ImageUploader.scss";
import { BiCloudUpload } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

const ImageUploader = () => {
  const imageRef = useRef();
  const [picture, setPicture] = useState(undefined);
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handlePicture = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPicture(img);
    console.log(picture);
  };

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <>
      <div className="image-body color-codes">
        <div className="image-container">
          <div className={model ? "pic-model open-model" : "pic-model"}>
            <img src={tempImgSrc} />
            <FaTimes onClick={() => setModel(false)} />
          </div>
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={imageRef}
            onChange={handlePicture}
            hidden
          />
          {picture ? (
            <div
              className={"img-area active"}
              data-img="preview photo"
              onClick={() => getImg([picture])}
            >
              {picture && <img src={picture} alt="" />}
            </div>
          ) : (
            <div
              className={"img-area"}
              data-img="preview photo"
              onClick={handleClick}
            >
              <BiCloudUpload />

              <h3>Upload Image</h3>
              <p>
                Image size must be less than <span>2mb</span>
              </p>
              {picture && <img src={picture} alt="" />}
            </div>
          )}

          <button onClick={handleClick} className="select-image">
            Select Image
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
