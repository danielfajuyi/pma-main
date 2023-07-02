import profileImg from "../../Images/model/model3.jpg";
import "./model_card.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoVerified, GoStar } from "react-icons/go";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const 
ModelCard = ({model}) => {
  const uuid = model?._id;
  // console.log(uuid)

  return (
    <div id="model_card" style={{ }}>
      <div id="img_holder">
        <img
          src={model?.picture ? model?.picture : "/images/avatar.jpg"}
          alt=""
        />
      </div>

      <motion.div id="card_body">
        <div id="title">MODEL</div>
        <div>
          <span id="name">{model?.fullName}</span>
          {model?.isVerified && <GoVerified color="green" size={14} />}
        </div>
        <div id="rating">
          <IconContext.Provider value={{ size: 18, color: "seagreen" }}>
            <GoStar />
            <GoStar />
            <GoStar />
            <GoStar />
            <GoStar />
          </IconContext.Provider>
        </div>
        <div id="categories">
          {model?.category}
        </div>
        <div id="address">
          <FaMapMarkerAlt size={12} />
          {model?.country && (
            <span>
              {model?.state}, {model?.country}
            </span>
          )}
        </div>
        <a href={`/agencypage/profile/${uuid}`}>
          <button id="card_btn">See Portfolio</button>
        </a>
      </motion.div>
    </div>
  );
};

export default ModelCard;
