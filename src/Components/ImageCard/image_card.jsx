import "./image_card.scss";
import img from "../../Images/model-profile/model.png";

const ImageCard = ({photo}) => {
  return (
    <div id="img_card">
      <img src={photo} alt="profileimage" />
    </div>
  );
};

export default ImageCard;
