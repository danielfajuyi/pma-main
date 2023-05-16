import React from "react";
import { Link } from "react-router-dom";
import CategoryLabel from "../../../../../Components/CategoryLabel/CategoryLable";
import "./NewsItem.css";
import UilArrow from "@iconscout/react-unicons/icons/uil-arrow-circle-right";

const NewsItem = ({ Newsitem }) => {
  return (
    <div className="newsItem-wrap ">
      <div className="overlay newsItem-img">
        <img src={Newsitem?.photo} alt="cover" className="newsItem-cover " />
      </div>
      <CategoryLabel lable={Newsitem?.cat} />
      <div>
        <h3>{Newsitem?.title}</h3>
        <p className="newsItem-description">{Newsitem?.text}</p>
      </div>

      <div className="newsItem-footer">
        <div className="newsItem-author">
          <img src="./images/logo.png" alt="avatar" style={{width: '50px', height:'50px'}}></img>
          <div>
            <h6>Admin</h6>
            <p>{Newsitem?.createdAt}</p>
          </div>
        </div>
        <Link className="newsItem-link" to={`/post/${Newsitem._id}`}>
          <UilArrow />
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
