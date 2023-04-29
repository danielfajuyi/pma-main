import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./styles.scss";
import { makeGet } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Blogs = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  // console.log(cat);

  useEffect(() => {
    const fetchData = () => {
      makeGet(dispatch, "/blog/blogs", setPosts);
    };
    fetchData();
  }, [cat]);

  const reversed = [...posts].reverse();

  return (
    <div className="home">
      <div className="posts">
        {reversed.map((post) => (
          <div className="post" key={post._id}>
            {post.photo && (
              <div className="img">
                <img src={post.photo} alt="" />
              </div>
            )}
            <div className="content">
              <Link className="link" to={`/post/${post._id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.text}</p>
              <Link className="link" to={`/post/${post._id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
