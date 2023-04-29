import React, { useEffect, useState } from "react";
import { makeGet } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Menu = ({ cat }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      makeGet(dispatch, `/blog/blogs/query?cat=${cat}`, setPosts);
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts?.map((post) => (
        <div key={post._id}>
          {post._id !== postId && (
            <div className="post" key={post._id}>
              <img src={post?.photo} alt="" />
              <h2>{post.title}</h2>
              <a className="link" href={`/post/${post._id}`}>
                <button>Read More</button>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
