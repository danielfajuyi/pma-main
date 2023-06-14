import React from "react";
import { Link } from "react-router-dom";
import CategoryLabel from "../../../../../Components/CategoryLabel/CategoryLable";
import "./NewsItem.css";
import UilArrow from "@iconscout/react-unicons/icons/uil-arrow-circle-right";
import moment from "moment";

const NewsItem = ({ Newsitem }) => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="newsItem-wrap ">
      <div className="overlay newsItem-img">
        <img src={Newsitem?.photo} alt="cover" className="newsItem-cover " />
      </div>
      <CategoryLabel lable={Newsitem?.cat} />
      <div>
        <h3>{Newsitem?.title}</h3>

        {Newsitem?.text && (
          <p className="newsItem-description">{Newsitem?.text}</p>
        )}
        <p className="newsItem-description">
          {Newsitem?.paragraphs?.slice(0, 1).map((item, index) => (
            <p key={index}>{getText(item?.text)}</p>
          ))}
        </p>
      </div>

      <div className="newsItem-footer">
        <div className="newsItem-author">
          <img
            src="./images/fav-icon.png"
            alt="avatar"
            style={{ width: "50px", height: "50px" }}
          ></img>
          <div>
            <h6>Admin</h6>
            <p>{moment(Newsitem?.createdAt).fromNow()}</p>
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
