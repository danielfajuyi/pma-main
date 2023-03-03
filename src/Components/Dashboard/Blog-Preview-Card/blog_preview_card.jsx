import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";
import "./blog_preview_card.scss";

const BlogPreviewCard = (props) => {
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubsribed = false;
    if (!unsubsribed) {
      const fetchJob = () => {};
      makeGet(dispatch, "/blog/blogs", setMessage);
      fetchJob();
    }
    return () => {
      unsubsribed = true;
    };
  }, [dispatch]);

  return (
    <div>
      {message.map((item) => (
        <div className="blog_preview_card" key={item._id}>
          <div className="author_img">
            <img src={props.img} alt="author-img" />
          </div>
          <div className="body">
            <div className="blog_title">{item.title}</div>
            {/* <div className="blog_title">{item.text}</div> */}
            <div className="blog_info">
              <span className="model">{props.model}</span>
              <span className="date">
                {" "}
                {moment(item.createdAt).format("D-MM-YYYY")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPreviewCard;
