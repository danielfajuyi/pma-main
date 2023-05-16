import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import moment from "moment";
import "./styles.scss";
import { makeGet } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Single = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = () => {
      makeGet(dispatch, `/blog/blog/${postId}`, setPost);
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.photo} alt="" />
        <div className="user">
          {post.photo && <img src={post?.photo} alt="" />}
          <div className="info">
            <span>Admin</span>
            <p>Posted {moment(post?.createdAt).fromNow()}</p>
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        {post?.paragraphs?.map((item, index) => (
          <div key={index}>
            {item?.text && <p>{getText(item?.text)}</p>}
            {item?.image && <img src={item?.image} alt="" />}
          </div>
        ))}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
