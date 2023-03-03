import profileImg from "../../Images/model/model3.jpg";
import "./model_card.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoVerified, GoStar } from "react-icons/go";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const ModelCard = (props) => {
  return (
    <div id="model_card" style={{ height: props.ch }} key={props.id} >
      <div id="img_holder">
        <img
          src={props.item?.picture ? props.item?.picture : "/images/avatar.jpg"}
          alt="proilepic"
        />
      </div>

      <motion.div id="card_body">
        <div id="title">MODEL</div>
        <div>
          <span id="name">
            {props.item?.fullName}
          </span>
          {props.item?.isVerified && <GoVerified color="green" size={14} />}
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
        <div id="categories">Commercial Model, Fashion Model</div>
        <div id="address">
          <FaMapMarkerAlt size={12} />
          {props.item?.country && <span>{props.item?.state}, {props.item?.country}</span>}
        </div>
        <button id="card_btn">See Portfolio</button>
      </motion.div>
    </div>
  );
};

export default ModelCard;
