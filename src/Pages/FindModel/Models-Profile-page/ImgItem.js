import { useState } from "react";
import { userRequest } from "../../../redux/requestMethod";
import { useSelector } from "react-redux";
import { AlertModal } from "../../LoginSignup/Sign-Up/signUpForm/Modal";

function ImgItem({
  img,
  fetchModel,
  item,
  getImg,
  model,
  index,
  ModalTxt,
  setModalTxt,
  setModel,
  temImgSrc,
  key,
}) {
  const user = useSelector((state) => state.user.currentUser);

  const [photo, setPhoto] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleHoverIn = (pic) => {
    setIsClicked(!isClicked);
    setPhoto(pic);
  };

  const handleRemovePic = async () => {
    try {
      await userRequest.put("/model/remove/photo", { photo });
      setModalTxt("deleted");
      setIsDeleted(!isDeleted);
      fetchModel();
    } catch (error) {}
  };

  return (
    <div
      className="pics"
      style={{
        position: "relative",
      }}
      onClick={() => handleHoverIn(img)}
    >
      {isClicked && (
        <>
          <div
            className="hover-state preview-img"
            onClick={() => getImg(img)}
            style={{ display: !item && "none" }}
          >
            Preview Photo
          </div>

          <div
            className="hover-state delete-img"
            onClick={handleRemovePic}
            style={{ display: item && "none" }}
          >
            Delete Photo
          </div>
        </>
      )}

      <img src={img} alt="" style={{ width: "100% " }} />
    </div>
  );
}

export default ImgItem;
