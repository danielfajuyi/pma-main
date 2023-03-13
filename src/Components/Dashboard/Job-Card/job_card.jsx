import "./job_card.scss";
import { FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";
import moment from "moment";

const JobCard = (props) => {
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubsribed = false;
    if (!unsubsribed) {
      const fetchJob = () => {};
      makeGet(dispatch, "/job/jobs/all", setMessage);
      fetchJob();
    }
    return () => {
      unsubsribed = true;
    };
  }, [dispatch]);

  const reversed  = [...message].reverse()

  return (
    <div>
      {reversed?.slice(0, 5).map((item) => (
        <div className="job_card" key={item._id}>
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

          <div className="time">{moment(item.createdAt).format("DD-MM-YYYY")}</div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
