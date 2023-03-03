import { AiFillDollarCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { FaClock, FaAlignLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { RiCalendarTodoFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Line from "../../../Components/Line/line";
import "./Topbar.scss";
import "./Listing.scss";
import Footer from "../../Home/Layout/FooterSection/Footer/footer";

const Listing = ({ job }) => {
  return (
    <>
      <Line className="jobs-line" />
      <div>
        <section className="container Jobpostview-container">
          <header className="Jobpost-header">
            <div className="left">
              <h1>Job Post</h1>
              <h2>Modeling Post</h2>

              <div className="left-btn">
                <button className="btn_shadow">
                  Gender
                  <BsChevronDown />
                </button>

                <button className="btn_shadow">
                  Country
                  <BsChevronDown />
                </button>

                <button className="btn_shadow">
                  City
                  <BsChevronDown />
                </button>

                <button className="btn_shadow">
                  Payment
                  <BsChevronDown />
                </button>
              </div>
            </div>

            <div className="right">
              <Link to="/jobpost/post-a-job">
                <button id="post-job">
                  <RiCalendarTodoFill />
                  Post Job
                </button>
              </Link>

              <button id="recent-job btn_shadow">
                <FaAlignLeft />
                Recent
                <BsChevronDown />
              </button>
            </div>
          </header>
        </section>

        <main className="job__card__container mtop container">
          {job &&
            job.map((jobdata, index) => {
              const {
                id,
                title,
                country,
                city,
                duedate,
                status,
                jobtype,
                img,
              } = jobdata;

              return (
                <section className="job__card" key={index}>
                  <div className="job__card-img ">
                    <img src={img} alt="jobpost - premium-models" />
                  </div>
                  <div className="job__card-info">
                    <div className="jobcard__card-btn">
                      {jobtype === "Online" ? (
                        <span id="job-online">Online</span>
                      ) : (
                        <span id="job-offline">Online</span>
                      )}

                      {jobtype === "Offline" ? (
                        <span id="job-online">Offline</span>
                      ) : (
                        <span id="job-offline">Offline</span>
                      )}
                    </div>

                    <div className="job__card-desc">
                      <h2>{title}</h2>

                      <div>
                        <div id="job__card-location">
                          <span>
                            <MdLocationOn />
                            {city}, {country}
                          </span>
                        </div>
                        <div id="job__card-date">
                          <span>
                            <FaClock />
                            Casting ends {duedate}
                          </span>
                        </div>

                        <div id="job__card-status">
                          <span>
                            <AiFillDollarCircle />
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/jobpost/post/${id}`}>
                      <button className="more-btn  linkBtn btn-shadow">
                        More Details
                      </button>
                    </Link>
                  </div>
                </section>
              );
            })}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Listing;
