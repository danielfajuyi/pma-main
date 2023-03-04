import { AiFillDollarCircle } from "react-icons/ai";
import { FaClock, FaAlignLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import { Link } from "react-router-dom";

import "./RecentJobs.scss";

const RecentJobs = ({ job }) => {
  function handleRefresh() {
    setTimeout(() => window.location.reload(), 500);
  }

  function getRelatedJobs(arr) {
    const subset = [];
    while (subset.length < 4) {
      const index = Math.floor(Math.random() * arr.length);
      subset.push(arr[index]);
    }
    return subset;
  }
  const relatedJobs = getRelatedJobs(job);
  // console.log(relatedJobs)

  return (
    <>
      <main className="job__card__container mtop container">
        {relatedJobs?.map(
          (item, index) =>
            index <= 3 && (
              <section className="job__card" key={index}>
                <div className="job__card-img ">
                  {item?.photos?.slice(0, 1).map((img, index) => (
                    <img src={img} alt="jobpost - premium-models" key={index} />
                  ))}
                </div>
                <div className="job__card-info">
                  <div className="jobcard__card-btn">
                    {item?.type === "online" ? (
                      <span id="job-online">Online</span>
                    ) : (
                      <span id="job-offline">Online</span>
                    )}

                    {item?.type === "offline" ? (
                      <span id="job-online">Offline</span>
                    ) : (
                      <span id="job-offline">Offline</span>
                    )}
                  </div>

                  <div className="job__card-desc">
                    <h2>{item?.title}</h2>

                    <div>
                      <div id="job__card-location">
                        <span>
                          <MdLocationOn />
                          {item?.state}, {item?.country}
                        </span>
                      </div>
                      <div id="job__card-date">
                        <span>
                          <FaClock />
                          Casting ends {item?.expire}
                        </span>
                      </div>

                      <div id="job__card-status">
                        <span>
                          <AiFillDollarCircle />
                          {item?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/jobpost/post/${item?._id}`}
                    onClick={handleRefresh}
                  >
                    <button className="more-btn  linkBtn btn-shadow">
                      More Details
                    </button>
                  </Link>
                </div>
              </section>
            )
        )}
      </main>
    </>
  );
};

export default RecentJobs;
