import { useState } from "react";
import { userRequest } from "../../../redux/requestMethod";
import { useSelector } from "react-redux";

function ImgItem({
  img,
  fetchModel,
  item,
  getImg,
  model,
  index,
  setModel,
  temImgSrc,
  key,
}) {
  const user = useSelector((state) => state.user.currentUser);

  const [photo, setPhoto] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleClicked = (pic) => {
    setIsClicked(!isClicked);
    setPhoto(pic);
  };

  const handleRemovePic = async () => {
    try {
      await userRequest.put("/model/remove/photo", { photo });
      fetchModel();
    } catch (error) {}
  };

  return (
    <div className="pics" onClick={() => getImg(img)}>
      {/* {isClicked && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "10%",
            textAlign: "center",
            backgroundColor: "white",
            bottom: "0",
            cursor: "pointer",
            display: item && "none",
          }}
          onClick={handleRemovePic}
        >
          Delete Photo
        </div>
      )} */}
      <img src={img} alt="" style={{ width: "100% " }} />
    </div>
  );
}

export default ImgItem;
