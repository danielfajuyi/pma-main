import "./job_card.scss";
import { FiEye } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  const fetchJob = useCallback(() => {
    makeGet(
      dispatch,
      user && user?.role === "client" ? "/job/jobs" : "/job/jobs/all",
      setMessage
    );
  }, [dispatch, user]);

  useEffect(() => {
    let unsubsribed = fetchJob();
    return () => unsubsribed;
  }, []);

  const reversed = [...message].reverse();

  return (
    <div>
      {reversed?.slice(0, 5).map((item) => (
        <Link
          to={`/jobpost/post/${item._id}`}
          className="job_card"
          key={item._id}
        >
          <div className="note">{item.title}</div>

          {props.views && props.applied && (
            <div className="involved">
              <span>
                <FiEye size={14} style={{ marginRight: "0.4em" }} />
                {props.views}
              </span>
              <span className="applied">Applied {props.applied}</span>
            </div>
          )}

          <div className="time">
            {moment(item.createdAt).format("DD-MM-YYYY")}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobCard;
