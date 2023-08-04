import { useState } from "react";
import { userRequest } from "../../../redux/requestMethod";
import { useSelector } from "react-redux";

function ImgItem({ img, fetchModel, item }) {
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
    <li
      style={{ position: "relative" }}
      className="imgItem"
      onClick={() => handleClicked(img)}
    >
      {isClicked && (
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
      )}
      <img className="image" src={img} alt="" width="250" height="300" />
    </li>
  );
}

export default ImgItem;
