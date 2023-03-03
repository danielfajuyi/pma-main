import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function Details({ job }) {
  const [jobdetail, setJobDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://formapi-4wry.onrender.com/postjob/${id}`).then((res) => {
      setJobDetails(res.data);
    });
  }, []);

  const { id } = useParams();

  const HandleNavigate = () => {
    navigate("/jobpost");
  };

  return (
    <>
      <Line className="jobs-line" />
      <section className="Jobdetail-container mtop-2 container ">
        {jobdetail && (
          <div className="jobdetail-view">
            <header>
              <div className="titlebar">
                <span onClick={HandleNavigate}>
                  <FaArrowLeft />
                  <span> Job Listing</span>
                </span>
                <h1>{jobdetail.title}</h1>
              </div>

              <div className="desc-status">
                {jobdetail.jobtype === "Online" ? (
                  <span id="job-online">Online</span>
                ) : (
                  <span id="job-offline">Online</span>
                )}

                {jobdetail.jobtype === "Offline" ? (
                  <span id="job-online">Offline</span>
                ) : (
                  <span id="job-offline">Offline</span>
                )}
              </div>

              <div className="desc-bar">
                <div className="info-wrapper">
                  <div className="info-box">
                    <MdLocationOn />
                    <span> {`${jobdetail.city}, ${jobdetail.country}`} </span>
                  </div>
                </div>

                <div className="info-wrapper">
                  <div className="info-box">
                    <FaRegClock />
                    <span> casting ends {jobdetail.date} </span>
                  </div>
                </div>

                <div className="info-wrapper">
                  <div className="info-box">
                    <AiFillDollarCircle />
                    <span> {jobdetail.status} </span>
                  </div>
                </div>
              </div>

              <div className="button-wrapper">
                <button className="btn-shadow ">Apply Now</button>
              </div>
            </header>

            <main>
              <article className="left">
                <div className="top jobdetail-box">
                  <div>
                    <h4>Image reference for this job</h4>
                  </div>
                  <JobImageSlider jobdetail={jobdetail} />
                </div>

                <div className="bottom jobdetail-box">
                  <div>
                    <h4>Requirements</h4>
                  </div>
                  <span style={{ fontWeight: "500" }}>{jobdetail.desc}</span>
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
                      <span>{jobdetail.gender}</span>
                    </div>

                    <div className="info-box">
                      <span>Age Grade</span>
                      <span>{jobdetail.age}</span>
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
                      <span>{jobdetail.status}</span>
                    </div>

                    <div className="info-box">
                      <span>Online or Offline job</span>
                      <span>{jobdetail.jobtype}</span>
                    </div>

                    <div className="info-box">
                      <span>Shoot location</span>
                      <span>{jobdetail.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            </main>

            <div className="button-section mtop-2 ">
              <button className="btn-shadow">Apply Now</button>
            </div>
          </div>
        )}
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
