import React, { useEffect, useState } from "react";
import Edit from "./img/edit.png";
import Delete from "./img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";
import moment from "moment";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import "./styles.scss";

const Single = () => {
  //   const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  //   const { currentUser } = useContext(AuthContext);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await axios.get(`/posts/${postId}`);
  //         setPost(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, [postId]);

  const post = {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }

  const PF = process.env.REACT_APP_PUBLIC_FILE_FOLDER;

  return (
    <div className="single">
      <div className="content">
        <img src={ post?.img} alt="" />
        <div className="user">
          {post.img && <img src={post?.img} alt="" />}
          <div className="info">
            <span>username</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {/* {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )} */}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>{" "}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
