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
import { useSelector } from "react-redux";

const Listing = ({ job }) => {
  const user = useSelector((state) => state.user.currentUser);

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
              {/* <Link to="/jobpost/post-a-job">
                <button id="post-job">
                  <RiCalendarTodoFill />
                  Post Job
                </button>
              </Link> */}

              <button id="recent-job btn_shadow">
                <FaAlignLeft />
                Recent
                <BsChevronDown />
              </button>
            </div>
          </header>
        </section>

        <main className="job__card__container mtop container">
          {job?.map((item, index) => (
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
                  to={user ? `/jobpost/post/${item?._id}` : ""}
                  onClick={() => {
                    if (!user) {
                      alert("Please login to see job details");
                    }
                  }}
                >
                  <button className="more-btn  linkBtn btn-shadow">
                    More Details
                  </button>
                </Link>
              </div>
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Listing;
