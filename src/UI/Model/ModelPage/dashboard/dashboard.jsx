import "./dashboard.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { MdEdit } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import BookingsCard from "../../../../Components/Dashboard/Bookings-Card/bookings_card";
import MessagePreviewCard from "../../../../Components/Dashboard/Message-Preview-Card/message_preview_card";
import JobCard from "../../../../Components/Dashboard/Job-Card/job_card";
import ClientCard from "../../../../Components/Dashboard/Client-Card/client_card";
import EarningCard from "../../../../Components/Dashboard/Earning-Card/earning_card";
import VisitorStats from "../../../../Components/Dashboard/Visitor-Stats/visitor_stats";
import profileImg from "../../../../Images/model-profile/model.png";
import _ from "lodash";
import FadeIn from "../../../../Components/FadeIn/fade_in";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeGet, update } from "../../../../redux/apiCalls";
import { storage } from "../../../../firebase";
import ModelsForms from "../../Models-Acct/Kyc-Section/Models-Kyc-Forms";

const ModelDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState({}); 
  const [picture, setPicture] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState([]);

  // update profile
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "picture" && setProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    picture && uploadFile(picture, "picture");
  }, [picture]);

  const handleUpdateProfile = () => {
    update(dispatch, "/model/", { ...inputs });
    setIsEdit(false);
  };

  // get top rated models
  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      const fetchData = () => {
        makeGet(dispatch, "/model/", setMessage);
      };
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
  }, [dispatch]);

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
      {!user?.isUpdated && <ModelsForms />}
      {user?.isUpdated && (
        <div id="model_dashboard">
          {/* GRID  --> [START]*/}
          <div id="pane">
            {/* Grid Area 1 */}
            <div id="area_one">
              <div className="profile">
                <div className="head">
                  <div className="profile_img">
                    <img
                      src={
                        picture
                          ? URL.createObjectURL(picture)
                          : user?.model?.picture
                          ? user.model.picture
                          : "https://cdn.imgbin.com/8/20/20/imgbin-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-pvE7Qhr6Zk7kLJpGiWZ9FFRVf.jpg"
                      }
                      alt="model-img"
                    />
                    <input
                      type="file"
                      id="profilePic"
                      name="picture"
                      onChange={(e) => setPicture(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    {isEdit && (
                      <label htmlFor="profilePic" className="ppLabel">
                        <span className="material-icons photo_icon">
                          add_a_photo
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="body">
                  <h3 className="name">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <div className="model">{user?.role}</div>
                  <div className="edit_holder">
                    Edit
                    <span className="edit" onClick={() => setIsEdit(!isEdit)}>
                      <MdEdit size={12} />
                    </span>
                  </div>
                  <div className="mDet">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      value={user?.email}
                      readOnly
                    />
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      disabled={!isEdit && true}
                      onChange={handleChange}
                    >
                      <option value="">
                        {user?.model?.gender === "m" ? "MALE" : "FEMALE"}
                      </option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                    </select>
                    <label htmlFor="bio">Model Bio</label>
                    <input
                      id="bio"
                      name="bio"
                      defaultValue={
                        user?.model?.bio
                          ? user?.model?.bio
                          : "A little about myself"
                      }
                      readOnly={!isEdit && true}
                      autoFocus={isEdit}
                      onChange={handleChange}
                    />
                    {isEdit && (
                      <button
                        type="submit"
                        className="update"
                        onClick={handleUpdateProfile}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div id="latest_post">
                <header>
                  <h4>Latest Blog Post</h4>
                  <a href="./seeall"> See all</a>
                </header>
                <div id="body">
                  <ClientCard img={profileImg} />
                </div>
              </div>
            </div>
            {/* [END] */}
            {/* Grid Area 2 */}
            <div id="area_two">
              <div id="bookings">
                <BookingsCard
                  data={lineData1}
                  options={lineOptions}
                  type="All Bookings"
                  total="16"
                  percent="87.34%"
                />
                <BookingsCard
                  data={lineData2}
                  options={lineOptions}
                  type="Completed"
                  total="11"
                  percent="48%"
                />
                <BookingsCard
                  data={lineData3}
                  options={lineOptions}
                  type="Cancelled"
                  total="5"
                  percent="17%"
                />
              </div>
              <div className="earnings">
                <EarningCard type="total" amount={`#${user?.model?.total}`} />
                <EarningCard
                  type="pending"
                  amount={`#${user?.model?.pending}`}
                />
                <EarningCard
                  type="withdraw"
                  amount={`#${user?.model?.withdrawn}`}
                />
                <EarningCard
                  type="available"
                  amount={`#${user?.model?.wallet}`}
                />
              </div>
              <VisitorStats data={data} options={options} />
              <div className="top_rated one">
                <header>
                  <h4>Top Rated</h4>
                  <a href="./seeall">See all</a>
                </header>
                <div className="body">
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                  <div>
                    <div className="img_holder">
                      <img src={profileImg} alt="model-img" />
                    </div>
                    <div className="name">Eke Kara</div>
                  </div>
                </div>
              </div>
            </div>
            {/* [END] */}
            {/* Grid Area 3  --> [START] */}
            <div id="area_three">
              <div className="top_rated two">
                <header>
                  <h4>Top Rated</h4>
                  <a href="./seeall">See all</a>
                </header>
                <div className="body">
                  {message?.map((item) => (
                    <div key={item._id}>
                      <div className="img_holder">
                        <img src={profileImg} alt="model-img" />
                      </div>
                      <div className="name">{item.firstName}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="job_posted">
                <header>
                  <h4>Latest Job Posts</h4>
                  <a href="./seeall">See all</a>
                </header>
                <div id="body">
                  <JobCard />
                </div>
              </div>
              <div id="inbox">
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
              </div>
            </div>
            {/* [END] */}
          </div>
          {/* [GRID <-- END] */}
        </div>
      )}
    </FadeIn>
  );
};

export default ModelDashboard;
