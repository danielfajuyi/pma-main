import { React, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { FaArrowLeft, FaClock, FaRegClock } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import Line from "../../../Components/Line/line";
import RecentJobs from "../Component/RecentJobs/RecentJobs";
import JobImageSlider from "../Component/JobImageSlider/JobImageSlider";
import Footer from "../../Home/Layout/FooterSection/Footer/footer";
import "./Details.scss";
import "../JobListing/Listing.scss";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";

function Details({ job }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[3];

  const [message, setMessage] = useState({});

  const fetchJob = useCallback(() => {
    makeGet(dispatch, `/job/job/${path}`, setMessage);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      fetchJob();
    }
    return () => {
      unsubscribed = true;
    };
  }, [setMessage]);
  // console.log(message);

  const HandleNavigate = () => {
    navigate("/jobpost");
  };

  return (
    <>
      <Line className="jobs-line" />
      <section className="Jobdetail-container mtop-2 container ">
        <div className="jobdetail-view">
          <header>
            <div className="titlebar">
              <span onClick={HandleNavigate}>
                <FaArrowLeft />
                <span> Job Listing</span>
              </span>
              <h1>{message?.title}</h1>
            </div>

            <div className="desc-status">
              {message?.type === "online" ? (
                <span id="job-online">Online</span>
              ) : (
                <span id="job-offline">Online</span>
              )}

              {message?.type === "offline" ? (
                <span id="job-online">Offline</span>
              ) : (
                <span id="job-offline">Offline</span>
              )}
            </div>

            <div className="desc-bar">
              <div className="info-wrapper">
                <div className="info-box">
                  <MdLocationOn />
                  <span> {`${message?.state}, ${message?.country}`} </span>
                </div>
              </div>

              <div className="info-wrapper">
                <div className="info-box">
                  <FaRegClock />
                  <span> casting ends {message?.expire} </span>
                </div>
              </div>

              <div className="info-wrapper">
                <div className="info-box">
                  <AiFillDollarCircle />
                  <span> {message?.price} </span>
                </div>
              </div>
            </div>

            <div className="button-wrapper">
              {user && user?.role !== "client" && (
                <button className="btn-shadow ">Apply Now</button>
              )}
            </div>
          </header>

          <main>
            <article className="left">
              <div className="top jobdetail-box">
                <div>
                  <h4>Image reference for this job</h4>
                </div>
                <JobImageSlider message={message} />
              </div>

              <div className="bottom jobdetail-box">
                <div>
                  <h4>Requirements</h4>
                </div>
                <span style={{ fontWeight: "500" }}>{message?.desc}</span>
              </div>
            </article>

            <article className="right ">
              <div className="top jobdetail-box">
                <div>
                  <h4>Preference</h4>
                </div>

                <div className="info-wrapper ">
                  <div className="info-box">
                    <span>Gender</span>
                    <span>{message.gender}</span>
                  </div>

                  <div className="info-box">
                    <span>Age Grade</span>
                    <span>{message.age}</span>
                  </div>
                </div>
              </div>

              <div className="bottom jobdetail-box">
                <div>
                  <h4>Status</h4>
                </div>

                <div className="info-wrapper ">
                  <div className="info-box">
                    <span>Payment</span>
                    <span>{message?.paymentInfo}</span>
                  </div>

                  <div className="info-box">
                    <span>Online or Offline job</span>
                    <span>{message?.type}</span>
                  </div>

                  <div className="info-box">
                    <span>Shoot location</span>
                    <span>{message?.location}</span>
                  </div>
                </div>
              </div>
            </article>
          </main>

          <div className="button-section mtop-2 ">
            {user && user?.role !== "client" && (
              <button className="btn-shadow ">Apply Now</button>
            )}
          </div>
        </div>
        <footer className="mtop-3">
          <h3>Related Job Post</h3>
        </footer>
        <RecentJobs job={job} />
      </section>

      <Footer />
    </>
  );
}

export default Details;
