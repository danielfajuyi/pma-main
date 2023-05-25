import "./client_card.scss";
import { useCallback, useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const ClientCard = () => {
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  // get top rated models
  const fetchData = useCallback(() => {
    makeGet(dispatch, "/model/", setMessage);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = fetchData();
    return () => unsubscribed;
  }, []);
  const ratedReversed = [...message].reverse();

  return (
    <div>
      {ratedReversed?.slice(0, 5).map((item) => (
        <>
          {item?.isFeatured && (
            <a
              href={`/find-model/profile/${item._id}`}
              className="client_card"
              key={item._id}
            >
              <div className="profile_img">
                <img src={item?.picture} alt="client-img" />
              </div>
              <div className="details">
                <div className="post">{item?.title}</div>
                <div className="name">{item?.fullName}</div>
                <div className="location">
                  {item?.state}, {item?.country}
                </div>
              </div>
            </a>
          )}
        </>
      ))}
    </div>
  );
};

export default ClientCard;
