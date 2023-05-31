import "./dashboard.scss";
import { MdEdit } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import BookingsCard from "../../../../../Components/Dashboard/Bookings-Card/bookings_card";
import MessagePreviewCard from "../../../../../Components/Dashboard/Message-Preview-Card/message_preview_card";
import JobCard from "../../../../../Components/Dashboard/Job-Card/job_card";
import ClientCard from "../../../../../Components/Dashboard/Client-Card/client_card";
import VisitorStats from "../../../../../Components/Dashboard/Visitor-Stats/visitor_stats";
import FadeIn from "../../../../../Components/FadeIn/fade_in";
import profileImg from "../../../../../Images/model-profile/model.png";
import coverImg from "../../../../../Images/model/model-large.jpg";
import _ from "lodash";
import { Chart } from "chart.js/auto"; //Registering Charts ("Do not remove this import")
import { useDispatch, useSelector } from "react-redux";
//import ClientsForms from "../../Client-Acct/Kyc-Section/Client-Kyc-Forms";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { makeGet } from "../../../../../redux/apiCalls";

const ClientDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [booking, setBooking] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState();

  //   // get logged in user
  //   const fetchLogedInuser = useCallback(() => {
  //     makeGet(dispatch, `/user/${user._id}`, setLoggedInUser);
  //   }, [dispatch]);
  //   // console.log(loggedInUser)
  
    // useEffect(() => {
    //   let unsubscribed = fetchLogedInuser();
    //   return () => unsubscribed;
    // }, []);

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
  //[END]

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
      {user.isUpdated && !user?.isVerified && (
        <h1 style={{ color: "white", textAlign: "center", margin: "40px" }}>
          Your account is undergoing verification, please hang-on awhile for us
          to finish the verification process, thanks.
        </h1>
      )}
      {user?.isVerified && (
        <div id="client_dashboard">
          {/* GRID  --> [START]*/}
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
              <div id="cover">
                <img src={user?.client?.coverPicture ? user?.client?.coverPicture : "https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png"} alt="cover-pic" />
              </div>
              <div id="profile">
                <div id="img_holder">
                  <img src={user?.picture} alt="profile-pic" />
                </div>
                <div>
                  <div id="name">
                    Hello, {user?.firstName} {user?.lastName}
                  </div>
                  {/* <div id="handle">{`@${user?.username}`}</div> */}
                </div>
                <Link to="/client-Acct-setting">
                  <button>
                    <MdEdit size={14} />
                    <span>Edit Profile</span>
                  </button>
                </Link>
              </div>
              <div id="status">{user?.client?.bio}</div>
              {/* <div id="follow">
              <span>Following {772}</span>
              <span>Followers {772}</span>
            </div> */}
            </div>
            {/* PROFILE PANEL <-- [END] */}

            {/* Grid Area 2 --> [START]*/}
            <div id="area_two">
              <div id="top_rated">
                <header>
                  <h4>Top Rated</h4>

                  {/* <a href="./seeall"> See all</a> */}
                </header>
                <div id="body">
                  <ClientCard />
                </div>
              </div>

              {/* <div id="newly_posted">
                <header>
                  <h4>Newly Posted</h4>
                  <a href="./seeall"> See all</a>
                </header>
                <div id="body">
                  <ClientCard
                    img={profileImg}
                    name="Eke Kara"
                    location="Lagos, Nigeria"
                  />
                </div>
              </div> */}

              <div id="job_posted">
                <header>
                  <h4>Job Posted</h4>
                  <a href="/jobpost">See all</a>
                </header>
                <div id="body">
                  <JobCard
                    note="Female model needed for shoot"
                    // views="12.6k"
                    // applied="26"
                  />
                </div>
              </div>
            </div>
            {/* Grid Area 2 <-- [END] */}

            {/*Inbox --> [START]  */}
            {/* <div id="inbox">
              <header>
                <h4>Inbox</h4>
                <span className="msg">
                  <div className="notification">25</div>
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
                online={true}
                sender="Micheal B"
                title="Project manager"
                msg="see you tomorrow"
                count="10"
              />
              <MessagePreviewCard
                img={profileImg}
                online={false}
                sender="Sarah Jay"
                title="Model"
                msg="I wanna work with you"
                count="2"
              />
            </div> */}
            {/*Inbox <-- [END]  */}
          </div>
          {/* [GRID <-- END] */}
        </div>
      )}
    </FadeIn>
  );
};

export default ClientDashboard;
