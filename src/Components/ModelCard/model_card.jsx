import profileImg from "../../Images/model/model3.jpg";
import "./model_card.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoVerified, GoStar } from "react-icons/go";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const ModelCard = (props) => {
  const uuid = props?.model?._id;

  return (
    <div id="model_card" style={{ height: props.ch }} key={props.id}>
      <div id="img_holder">
        <img
          src={
            props?.model?.picture ? props?.model?.picture : "/images/avatar.jpg"
          }
          alt="proilepic"
        />
      </div>

      <motion.div id="card_body">
        <div id="title">MODEL</div>
        <div>
          <span id="name">{props?.model?.fullName}</span>
          {props?.model?.isVerified && <GoVerified color="green" size={14} />}
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
          {props?.model?.category[0]}, {props?.model?.category[1]}
        </div>
        <div id="address">
          <FaMapMarkerAlt size={12} />
          {props?.model?.country && (
            <span>
              {props?.model?.state}, {props?.model?.country}
            </span>
          )}
        </div>
        <a href={`/find-model/profile/${uuid}`}>
          <button id="card_btn">See Portfolio</button>
        </a>
      </motion.div>
    </div>
  );
};

export default ModelCard;
