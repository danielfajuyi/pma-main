import { useState, useEffect } from "react";

function NoticeItem({ item, handleStatus, handleDelete }) {
  const { id, avatar, type, details, status } = item;

  const [caption, setCaption] = useState("");

  useEffect(() => {
    function captionFun() {
      let fullCapt = "";
      const name = details.name;
      const captLength = 25 - name.length;

      type === "comment"
        ? (fullCapt = " commented on your post")
        : type === "like"
        ? (fullCapt = " liked your post")
        : type === "follow"
        ? (fullCapt = " followed your page")
        : type === "post"
        ? (fullCapt = " posted a new photo")
        : type === "share"
        ? (fullCapt = " shared your post")
        : type === "favorite"
        ? (fullCapt = " favorites your profile")
        : type === "update"
        ? (fullCapt = " updated their profile")
        : (fullCapt = "");

      const newCapt = fullCapt.slice(0, captLength);
      setCaption(newCapt);
    }

    captionFun();
  }, [type, details.name]);

  return (
    <li className="noti">
      <div>
        <img className="noti-avater" src={avatar} alt="" />
      </div>

      <div onClick={() => handleStatus()}>
        <h4 className="noti-title">
          {type === "job-request"
            ? "job request"
            : type === "comment"
            ? "commented"
            : type === "like"
            ? "liked"
            : type === "follow"
            ? "followed"
            : type === "post"
            ? "posted"
            : type === "share"
            ? "shared"
            : type === "favorite"
            ? "favorite"
            : type === "update"
            ? "update"
            : null}
        </h4>
        <p
          style={{ color: status === "read" ? "#808080" : "#ff014f" }}
          className="noti-text"
        >
          <span> {details.name}</span>
          {caption}
          ...
        </p>
      </div>

      <i
        onClick={() => handleDelete(id)}
        className="fa-solid fa-xmark del-notice colored-hover"
      ></i>
    </li>
  );
}

export default NoticeItem;
