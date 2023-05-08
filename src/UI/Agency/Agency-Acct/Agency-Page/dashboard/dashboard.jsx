import "./dashboard.scss";
import { MdEdit } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import TopModelHighlight from "../../../../../Components/Dashboard/Top-Model-Highlight/top_model_highlight";
import MessagePreviewCard from "../../../../../Components/Dashboard/Message-Preview-Card/message_preview_card";
import JobCard from "../../../../../Components/Dashboard/Job-Card/job_card";
import ModelCard from "../../../../../Components/ModelCard/model_card.jsx";
import BlogPreviewCard from "../../../../../Components/Dashboard/Blog-Preview-Card/blog_preview_card";
import BookingsCard from "../../../../../Components/Dashboard/Bookings-Card/bookings_card";
import VisitorStats from "../../../../../Components/Dashboard/Visitor-Stats/visitor_stats";
import profileImg from "../../../../../Images/model-profile/model.png";
import coverImg from "../../../../../Images/model/model-large.jpg";
import _ from "lodash";
import { Chart } from "chart.js/auto"; //Registering Charts ("Do not remove this import")
import FadeIn from "../../../../../Components/FadeIn/fade_in";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { makeGet } from "../../../../../redux/apiCalls";
import AgencyForms from "../../../Agency-Acct/Kyc-Section/Agency-Kyc-Forms";
import { Link } from "react-router-dom";

const AgencyDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [message, setMessage] = useState([]); // get model booking
  const [booking, setBooking] = useState([]);

  // get model booking
  const fetchModelBooking = useCallback(() => {
    makeGet(dispatch, `/book/model-booking/${user._id}`, setBooking);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = fetchModelBooking();
    return () => unsubscribed;
  }, []);
  const totalBooking = booking?.filter((item) => item);
  const rejectedBooking = booking?.filter((item) => item?.isRejected);
  const jobDone = booking?.filter((item) => item?.isJobDone);
  const rejectedPer = Math.round(
    (rejectedBooking?.length * 100) / totalBooking?.length
  );
  const donePer = Math.round((jobDone?.length * 100) / totalBooking?.length);

  // agency models
  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      const fetchData = () => {
        makeGet(dispatch, "/agency/models/all", setMessage);
      };
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
  }, [setMessage]);
  const reverse = [...message].reverse()
  console.log(message)

  // Visitor Stats Graph Data -> (VisitorStats Component) --> [STRAT]
  const data = {
    labels: ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        backgroundColor: "royalblue",
        data: [1200, 1700, 1000, 1200, 1000, 1000, 1700],
        barPercentage: 0.2,
        borderRadius: 4,
      },
      {
        backgroundColor: "lightgray",
        data: [600, 800, 500, 600, 500, 600, 800],
        barPercentage: 0.2,
        borderRadius: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        suggestedMax: 1800,
      },
    },
    maintainAspectRatio: false,
  };
  //   [END]

  // Bookings Card Line Graph Data -> (BookingsCard Component) --> [STRAT]
  const lineData1 = {
    labels: _.times(30, () => ""),
    datasets: [
      {
        data: _.times(30, () => _.random(900, 1800)),
        borderRadius: 4,
        pointRadius: 0,
        fill: "start",
        borderColor: "royalblue",
        backgroundColor: "#4169e130",
      },
    ],
  };
  const lineData2 = {
    labels: _.times(30, () => ""),
    datasets: [
      {
        data: _.times(30, () => _.random(900, 1700)),
        borderRadius: 4,
        pointRadius: 0,
        fill: "start",
        borderColor: "lightgreen",
        backgroundColor: "#90ee9090",
      },
    ],
  };
  const lineData3 = {
    labels: _.times(30, () => ""),
    datasets: [
      {
        data: _.times(30, () => _.random(1000, 1800)),
        borderRadius: 4,
        pointRadius: 0,
        fill: "start",
        borderColor: "hotpink",
        backgroundColor: "#ff69b430",
      },
    ],
  };
  const lineOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { display: false },
      y: {
        suggestedMin: -1500,
        display: false,
      },
    },
    tension: 0.4,
    maintainAspectRatio: false,
  };
  //[END]

  return (
    <FadeIn>
      <div id="agency_dashboard">
        {/* GRID  --> [START]*/}
        {user.isUpdated && (
          <div id="pane">
            {/* Grid Area 1 --> [START]*/}
            <div id="area_one">
              <VisitorStats data={data} options={options} />
              <div id="bookings">
                <BookingsCard
                  data={lineData1}
                  options={lineOptions}
                  type="All Bookings"
                  total={totalBooking?.length}
                  // percent="87.34%"
                />
                <BookingsCard
                  data={lineData2}
                  options={lineOptions}
                  type="Completed"
                  total={jobDone?.length}
                  percent={`${donePer ? donePer : 0}%`}
                />
                <BookingsCard
                  data={lineData3}
                  options={lineOptions}
                  type="Cancelled"
                  total={rejectedBooking?.length}
                  percent={`${rejectedPer ? rejectedPer : 0}%`}
                />
              </div>
            </div>
            {/* Grid Area 1 <-- [END] */}

            {/* PROFILE PANEL --> [START] */}
            <div id="profile_panel">
              <div id="cover" style={{ height: "220px", width: "400px" }}>
                <img
                  src={user?.agency?.coverPhoto}
                  alt="cover-pic"
                  style={{ height: "100%", width: "100%", objectFit: "fill" }}
                />
              </div>
              <div id="profile">
                <div id="img_holder">
                  <img src={user?.picture} alt="profile-pic" />
                </div>
                <div>
                  <div id="name">
                    Hello, {user?.firstName} {user?.lastName}
                  </div>
                  {/* <div id="handle">
                    {user?.username ? `@${user.username}` : "@username"}
                  </div> */}
                </div>
                <Link to="/agencypage/settings">
                  <button>
                    <MdEdit size={14} />
                    <span>Edit Portfolio</span>
                  </button>
                </Link>
              </div>
              {/* <div id="follow">
                <span>
                  Following{" "}
                  {user?.agency?.followings.length < 1
                    ? 0
                    : user?.agency?.followings}
                </span>
                <span>
                  Followers{" "}
                  {user?.agency?.followers.length < 1
                    ? 0
                    : user?.agency?.followers}
                </span>
              </div>
              <div id="top_models">
                <TopModelHighlight
                  img={profileImg}
                  name="Emilly Okoro"
                  views="13.6k"
                />
                <TopModelHighlight
                  img={profileImg}
                  name="Ikegwuru Ndiuwa"
                  views="12.4k"
                />
              </div> */}
            </div>
            {/* PROFILE PANEL <-- [END] */}

            {/* Grid Area 2 --> [START]*/}
            <div id="area_two">
              <div id="latest_offers">
                <header>
                  <h4>Latest Job Offer</h4>
                  {/* <a href="./seeall">See all</a> */}
                </header>
                <div id="body">
                  <JobCard />
                </div>
              </div>

              <div id="latest_blogs">
                <header>
                  <h4>Latest Blog News</h4>
                  <a href="/blog">See all</a>
                </header>
                <div id="body">
                  <BlogPreviewCard img={profileImg} model="Premium Models" />
                </div>
              </div>
            </div>
            {/* Grid Area 2 <-- [END] */}

            {/*Inbox --> [START]  */}
            {/* <div id="inbox">
              <header>
                <h4>Inbox</h4>
                <span className="msg">
                  <div className="notification">{25}</div>
                  <RiMessage2Fill size={28} />
                  <span>Messages</span>
                </span>
              </header>
              <MessagePreviewCard
                img={profileImg}
                online={true}
                sender="Micheal B"
                title="Project manager"
                msg="see you tomorrow"
                count="5"
              />
              <MessagePreviewCard
                img={profileImg}
                online={false}
                sender="Sarah Jay"
                title="Model"
                msg="I wanna work with you"
                count="2"
              />
              <MessagePreviewCard
                img={profileImg}
                online={true}
                sender="Micheal B"
                title="Project manager"
                msg="see you tomorrow"
              />
              <MessagePreviewCard
                img={profileImg}
                online={false}
                sender="Sarah Jay"
                title="Model"
                msg="I wanna work with you"
                count="5"
              />
            </div> */}
            {/*Inbox <-- [END]  */}

            {/*Our Models --> [START]  */}
            <div id="our_models">
              <header>
                <h4>Our Models</h4>
                {/* <a href="./seeall">See all</a> */}
              </header>
              <div id="body">
                {reverse?.slice(0, 5).map((item) => (
                  <ModelCard model={item} id={item?._id} />
                ))}
              </div>
            </div>
            {/*Our Models <-- [END]  */}
          </div>
        )}

        {/* [GRID <-- END] */}
      </div>
    </FadeIn>
  );
};

export default AgencyDashboard;
