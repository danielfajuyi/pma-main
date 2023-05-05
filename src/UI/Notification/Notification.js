import "./Notification.css";
import NoticeItem from "./notice-item";
import JobItem from "./Job-Notice";
import { useCallback, useEffect, useState } from "react";
import DeleteWarning from "./Notice-Delete-warning";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../redux/apiCalls";
import { userRequest } from "../../redux/requestMethod";
import { notificationChange } from "../../redux/notificationRedux";

function Notification({ toggleNotice, setToggleNotice, setNotice, notice }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [toggleDelete, setToggleDelete] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(() => {
    makeGet(dispatch, `/notification/${user._id}`, setNotifications);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchNotifications();
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const notRead = notifications.filter((item) => !item.isRead);
    dispatch(notificationChange(notRead?.length));
  }, [notifications]);

  const reversed = [...notifications].reverse();

  const handleDelete = async () => {
    try {
      await userRequest.delete(`/notification/delete/${deleteId}`);
      fetchNotifications();
      setToggleDelete("");
    } catch (error) {
      setToggleDelete("error");
    }
  };

  const deleteNotice = (id) => {
    setToggleDelete((prev) => (id === "" ? "" : "warning"));
    setDeleteId(id);
  };

  return (
    <div style={{ transform: toggleNotice && `translateX(${0}%)` }} className="noti-container">
      <div className="notification">
        <div className="noti-top-text">
          <h3>Notifications</h3>
          <i
            onClick={() => setToggleNotice((prev) => !prev)}
            className="fa-solid fa-xmark noti-close colored-hover"></i>
        </div>

        <ul className="noti-wrapper">
          {/* list of notifications */}

          {notifications?.length === 0 ? (
            <li className="no-noti">No Notification!</li>
          ) : (
            reversed?.map((item, index) => (
              <NoticeItem key={index} item={item} deleteNotice={() => deleteNotice(item._id)} />
            ))
          )}

          <li style={{ display: toggleDelete === "warning" ? "block" : "none" }}>
            <DeleteWarning
              title="Delete?"
              text="Are you sure you want delete this notification?"
              setToggleDelete={setToggleDelete}
              handleDelete={handleDelete}
            />
          </li>
          <li style={{ display: toggleDelete === "error" ? "block" : "none" }}>
            <DeleteWarning
              title="Error!"
              text=" Accept or decline job request before you proceed with this action"
              setToggleDelete={setToggleDelete}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Notification;
