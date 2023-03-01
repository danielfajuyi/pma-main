import "./client_card.scss";
import { useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const ClientCard = (props) => {
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
      {message?.map((item) => (
        <div className="client_card" key={item._id}>
          <div className="profile_img">
            <img src={props.img} alt="client-img" />
          </div>
          <div className="details">
            <div className="post">{item?.title}</div>
            <div className="name">{props.name}</div>
            <div className="location">{props.location}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientCard;
