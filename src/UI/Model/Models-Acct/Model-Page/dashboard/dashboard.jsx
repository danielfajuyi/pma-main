import "./dashboard.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { MdEdit } from "react-icons/md";
import BookingsCard from "../../../../../Components/Dashboard/Bookings-Card/bookings_card";
import JobCard from "../../../../../Components/Dashboard/Job-Card/job_card";
import EarningCard from "../../../../../Components/Dashboard/Earning-Card/earning_card";
import VisitorStats from "../../../../../Components/Dashboard/Visitor-Stats/visitor_stats";
import _ from "lodash";
import FadeIn from "../../../../../Components/FadeIn/fade_in";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { makeGet, update } from "../../../../../redux/apiCalls";
import { storage } from "../../../../../firebase";
import BlogCard from "../../../../../Components/Dashboard/Blog-Card/Blog_card";
import { userRequest } from "../../../../../redux/requestMethod";

const ModelDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState({});
  const [picture, setPicture] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState([]);
  const [booking, setBooking] = useState([]);
  //  get user stat
  const [stat, setStat] = useState([]);

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
  const fetchData = useCallback(() => {
    makeGet(dispatch, "/model/", setMessage);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = fetchData();
    return () => unsubscribed;
  }, []);
  const ratedReversed = [...message].reverse();

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

  useEffect(() => {
    const fetchStat = async () => {
      const res = await userRequest.get("/model/stats");
      setStat(res.data);
    };
    fetchStat();
  }, []);
  
  const dataList = Array(12).fill(null); // Initialize the array with default value "Dec"
  stat.forEach((s) => {
    if (s.month >= 1 && s.month <= 12) {
      dataList[s.month - 1] = s.visitors;
    }
  });

  // Visitor Stats Graph Data -> (VisitorStats Component) --> [STRAT]
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "VISITORS",
        backgroundColor: "royalblue",
        data: dataList,
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
                  {/* <a href="./seeall"> See all</a> */}
                </header>
                <div id="body">
                  <BlogCard />
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
              <VisitorStats data={data} options={options} user={user} />
            </div>
            {/* [END] */}
            {/* Grid Area 3  --> [START] */}
            <div id="area_three">
              <div className="top_rated two">
                <header>
                  <h4>Top Rated</h4>
                  {/* <a href="./seeall">See all</a> */}
                </header>
                <div className="body">
                  {ratedReversed?.slice(0, 5).map((item) => (
                    <>
                      {item.isFeatured && (
                        <div key={item._id}>
                          <a href={`/find-model/profile/${item._id}`}>
                            <div className="img_holder">
                              <img src={item?.picture} alt="model-img" />
                            </div>
                            <div className="name">{item.firstName}</div>
                          </a>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div id="job_posted">
                <header>
                  <h4>Latest Job Posts</h4>
                  {/* <a href="./seeall">See all</a> */}
                </header>
                <div id="body">
                  <JobCard />
                </div>
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
