import "./blog_card.scss";
import { useCallback, useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const BlogCard = () => {
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  // get top rated models
  const fetchData = useCallback(() => {
    makeGet(dispatch, "/blog/blogs", setMessage);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = fetchData();
    return () => unsubscribed;
  }, []);
  const ratedReversed = [...message].reverse();

  return (
    <div>
      {ratedReversed?.slice(0, 4).map((item) => (
        <>
          <a
            href={`/post/${item._id}`}
            className="client_card"
            key={item._id}
          >
            <div className="profile_img">
              <img src={item?.photo} alt="client-img" />
            </div>
            <div className="details">
              <div className="post">{item?.title}</div>
            </div>
          </a>
        </>
      ))}
    </div>
  );
};

export default BlogCard;
