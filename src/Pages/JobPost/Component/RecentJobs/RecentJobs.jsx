import { AiFillDollarCircle } from "react-icons/ai";
import { FaClock, FaAlignLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import { Link } from "react-router-dom";

import "./RecentJobs.scss";

const RecentJobs = ({ job }) => {
  function handleRefresh() {
    setTimeout(() => window.location.reload(), 500);
  }
  return (
    <>
      <main className="job__card__container mtop container">
        {job &&
          job.map((jobdata, index) => {
            const { id, title, country, city, duedate, status, jobtype, img } =
              jobdata;

            return (
              index <= 3 && (
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
                    <Link to={`/jobpost/post/${id}`} onClick={handleRefresh}>
                      <button className="more-btn  linkBtn btn-shadow">
                        More Details
                      </button>
                    </Link>
                  </div>
                </section>
              )
            );
          })}
      </main>
    </>
  );
};

export default RecentJobs;
