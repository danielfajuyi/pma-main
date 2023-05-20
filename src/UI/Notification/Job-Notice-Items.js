import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { makeEdit, makeGet } from "../../redux/apiCalls";
import moment from "moment";
import { AlertModal } from "../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { userRequest } from "../../redux/requestMethod";

function JobNotice({ setToggle }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [modalTxt, setModalTxt] = useState("general");
  const [notification, setNotification] = useState({});
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState({});
  const [bookId, setBookId] = useState("");
  const [notFrom, setNotFrom] = useState({});

  const getNotification = useCallback(() => {
    makeGet(dispatch, `/notification/single-not/${path}`, setNotification);
  }, [dispatch]);

  useEffect(() => {
    setBookId(notification?.notification?._id);
  }, [notification]);

  useEffect(() => {
    let unsubscribe = getNotification();
    return () => unsubscribe;
  }, []);

  const getNotFrom = useCallback(() => {
    makeGet(dispatch, `/user/user/${notification?.notFrom}`, setNotFrom);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = getNotFrom();
    return () => unsubscribe;
  }, []);
  console.log(notification);

  const handleAcceptRequest = () => {
    makeEdit(dispatch, `/book/accept/${bookId}`, setMessage);
  };

  const handleDeclineRequest = () => {
    makeEdit(dispatch, `/book/decline/${bookId}`, setMessage);
  };

  const fetchBooking = async () => {
    const res = await userRequest.get(`/book/booking/${bookId}`);
    setBooking(res.data);
  };

  useEffect(() => {
    let unsubscribe = fetchBooking();
    return () => unsubscribe;
  }, [notification, message]);

  return (
    <div className="noti-job">
      {!booking?.isAccepted && !booking?.isRejected && (
        <>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <a href={ notFrom.role === "model"
          ? `/find-model/profile/${notification?.notFrom}`
          : notFrom.role === "agency"
          ? `/find-agency/profile/${notification?.notFrom}`
          : `/find-client/profile/${notification?.notFrom}`}>
              <img
                className="noti-avater"
                src="/images/fav-icon.png"
                alt=""
                style={{ marginTop: "30px", cursor: "pointer" }}
              />
            </a>
            <p className="noti-job-title">{notification?.notTitle}</p>
          </div>

          {notification?.notification && (
            <div className="noti-job-list">
              <span className="job-item">
                <p className="job-item-label">From:</p>
                <p>
                  {moment(notification?.notification?.from).format(
                    "DD-MM-YYYY"
                  )}
                </p>
              </span>
              <span className="job-item">
                <p className="job-item-label">To:</p>
                <p>
                  {moment(notification?.notification?.to).format("DD-MM-YYYY")}
                </p>
              </span>
              <span className="job-item">
                <p className="job-item-label">Price:</p>
                <p>{notification?.notification?.price}</p>
              </span>
              <span className="job-item">
                <p className="job-item-label">State:</p>
                <p>{notification?.notification?.state}</p>
              </span>
              <span className="job-item">
                <p className="job-item-label">Country:</p>
                <p>{notification?.notification?.country}</p>
              </span>
            </div>
          )}

          {notification?.notification && (
            <div>
              <p className="job-item-label">Job Description:</p>
              <p className="noti-job-description">
                {notification?.notification?.jobDescription}
              </p>
            </div>
          )}

          {notification?.notification && (
            <div className="noti-job-btn">
              <button onClick={handleAcceptRequest} className="accept-btn">
                Accept
              </button>
              <button onClick={handleDeclineRequest} className="decline-btn">
                Decline
              </button>
            </div>
          )}
        </>
      )}

      {booking?.isAccepted && (
        <p>
          You have accepted this job request, proceed to start a conversation
        </p>
      )}
      {booking?.isRejected && (
        <p>
          You have rejected this job request, conversation can no longer be
          started
        </p>
      )}

      {message && (
        <AlertModal
          modalTxt={modalTxt}
          note={message}
          setModalTxt={setModalTxt}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default JobNotice;
