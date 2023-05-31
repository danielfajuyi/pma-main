import "./agency_profile.scss";

// Icons [START]
import {
  RiErrorWarningLine,
  RiBriefcase5Line,
  RiStackLine,
  RiGlobalLine,
} from "react-icons/ri";
import {
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
// [END]

// Components --> [START]
import SeeModels from "../../../Components/SeeModels/see_models";
import PreviousJobs from "../../../Components/PreviousJobs/previous_jobs";
// [END]

// Temporary Image
import profileImg from "../../../Images/model/model3.jpg";

// Other External NPM Packages --> [START]
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";
import { useLocation } from "react-router";
//[END];

// About Section (Gets rendered when 'page state' is 'about')
const ABOUT = ({ user }) => {
  return (
    <section id="about">
      <div>
        <h2>About Agency</h2>
        <p>{user?.agency?.about}</p>
      </div>
    </section>
  );
};

const AgencyPortfolio = ({ showNavbar, setShowNavbar }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [page, setPage] = useState("about");
  const [agency, setAgency] = useState({});

  const fetchAgency = useCallback(() => {
    makeGet(dispatch, `/user/${path}`, setAgency);
  }, [dispatch]);
console.log(agency)
  useEffect(() => {
    let unsubscribed = fetchAgency();
    return () => unsubscribed;
  }, []);

  return (
    <IconContext.Provider value={{ size: 24 }}>
      <div id="agency_profile">
        <div id="hero">
          <img
            src={agency?.agency?.coverPhoto && agency?.agency?.coverPhoto}
            alt="profile-img"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <div id="image_holder">
            <img
              src={agency?.picture ? agency?.picture : "./images/avatar2.png"}
              alt="profile-img"
            />
          </div>
          <nav id="navbar">
            <span id="left">
              <span
                className={page === "about" ? "active" : ""}
                onClick={() => setPage("about")}
              >
                <RiErrorWarningLine />
                <span>About</span>
              </span>
              {/* <span
                className={page === "see_models" ? "active" : ""}
                onClick={() => setPage("see_models")}
              >
                <RiBriefcase5Line />
                <span>See Models</span>
              </span> */}
              <span
                className={page === "prev_jobs" ? "active" : ""}
                onClick={() => setPage("prev_jobs")}
              >
                <RiStackLine />
                <span>Previous Jobs</span>
              </span>
            </span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <button className="btn">
                <FaEnvelope />
                <span>Inquiry</span>
              </button>
            </motion.div>
          </nav>
        </div>
        <main>
          <div id="sidebar">
            <header>
              <h1>{agency?.agency?.agencyName}</h1>
              <div id="location">
                <FaMapMarkerAlt color="#ff007a" size={16} />
                <span>
                  {agency?.agency?.state}, {agency?.agency?.country}
                </span>
              </div>
              <div id="link">
                <RiGlobalLine size={16} />
                <span>{agency?.agency?.agencyUrl}</span>
              </div>
            </header>
            {/* <div id="follow_container">
              <button className="btn">
                <IoPersonAddOutline />
                <span>Follow</span>
              </button>

              <div id="follow">
                <span>
                  <div>Following</div>
                  <div>106</div>
                </span>
                <div id="line"></div>
                <span>
                  <div>Followers</div>
                  <div>547</div>
                </span>
              </div>
            </div> */}
            <div id="socials">
              <a href={`https://www.instagram.com/${agency?.agency?.instagram}`} target="_blanc" >
                <FaInstagram />
              </a>
              {/* <a href="/social">
                <FaFacebook />
              </a>
              <a href="/social">
                <FaTwitter size={19} />
              </a> */}
            </div>
          </div>
          <ul id="navbar_body">
            <li
              className={page === "about" ? "active_two" : ""}
              onClick={() => setPage("about")}
            >
              About
            </li>
            {/* <li
              className={page === "see_models" ? "active_two" : ""}
              onClick={() => setPage("see_models")}
            >
              See Models
            </li> */}
            <li
              className={page === "prev_jobs" ? "active_two" : ""}
              onClick={() => setPage("prev_jobs")}
            >
              Previous Jobs
            </li>
          </ul>
          {page === "about" ? <ABOUT user={agency} /> : null}
          {page === "see_models" ? <SeeModels user={agency} /> : null}
          {page === "prev_jobs" ? <PreviousJobs user={agency} /> : null}
        </main>
      </div>
    </IconContext.Provider>
  );
};

export default AgencyPortfolio;
