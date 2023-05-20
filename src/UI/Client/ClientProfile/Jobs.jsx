import { useCallback, useEffect, useState } from "react";
import portfolio1 from "../ClientProfile/assets/clientimg.jpg";
import "../ClientProfile/jobs.css";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const About = () => {
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
    <div className="jobCard">
      {reversed.map((data, index) => (
        <div className="jobContent" key={index}>
          <img src={data.image} alt="" className="jobImg" />
          <div className="jobDetails">
            <h4>{data.title}</h4>
            <p>{data.location}</p>
            <p>{data.type}</p>
            <p>{moment(data.createdAt).format("DD-MM-YYYY")}</p>
            <button className="jobBtn">
              <Link
                to={`/jobpost/post/${data._id}`}
                className="job_card"
                key={data._id}
              >
                See job details
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
