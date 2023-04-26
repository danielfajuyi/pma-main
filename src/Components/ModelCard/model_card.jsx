import profileImg from "../../Images/model/model3.jpg";
import "./model_card.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoVerified, GoStar } from "react-icons/go";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const ModelCard = (props,{model}) => {
  return (
    <div id="model_card" style={{ height: props.ch }} key={props.id} >
      <div id="img_holder">
        <img
          src={model?.picture ? model?.picture : "/images/avatar.jpg"}
          alt="proilepic"
        />
      </div>

      <motion.div id="card_body">
        <div id="title">MODEL</div>
        <div>
          <span id="name">
            {model?.fullName}
          </span>
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
        <div id="categories">{model?.category[0]}, {model?.category[1]}</div>
        <div id="address">
          <FaMapMarkerAlt size={12} />
          {model?.country && <span>{model?.state}, {model?.country}</span>}
        </div>
        <button id="card_btn">See Portfolio</button>
      </motion.div>
    </div>
  );
};

export default ModelCard;
