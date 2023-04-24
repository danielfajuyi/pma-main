import { Link } from "react-router-dom";
import { FaHome, FaRegStar, FaStar } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import "./Items.css";

function ListItem({
  img,
  fullName,
  firstCategory,
  secondCategory,
  agency,
  state,
  country,
  uuid,id
}) {
  return (
    <div className=" modelportfolio__wrapper column">
      <div className=" single-card single-property">
        <div className="card1 card">
          <div className=" modelportfolio__imgwrapper property-thumb">
            <img
              className="model__imgs"
              src={img ? img : "/images/avatar2.png"}
              alt="./model-img"
            />
          </div>

          <div className="modelportfolio__textwrapper ">
            <div className="text1 model__namewrap">
              <span className="model__names">{fullName}</span>
              <BsPatchCheckFill />
            </div>

            <div className="text2 model__ratings">
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
              </span>

              <span>
                <FaRegStar />
                <FaRegStar />
              </span>

              <span>(3.0)</span>
            </div>

            <div className="text3 model__categorys">
              <div id="agencylable">
                <FaHome />
                <span className="value">{agency}</span>
              </div>
              {secondCategory ? (
                <div id="categorylable">
                  <span>
                    {" "}
                    <BiCategoryAlt />{" "}
                  </span>
                  <span className="value">
                    {firstCategory}, {secondCategory} Model
                  </span>
                </div>
              ) : (
                <div id="categorylable"> Category: {firstCategory}</div>
              )}
            </div>

            <div className="text4 model__locations">
              <MdLocationPin />
              <span>
                {state}, {country}
              </span>
            </div>

            <div className="text5 model__viewprofiles">
              <button type="button" className="viewprofile__btn shadow-fit">
                <Link to={`/find-model/profile/${uuid? uuid : id}`}>View Portfolio</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
