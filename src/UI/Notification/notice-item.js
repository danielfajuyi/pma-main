function NoticeItem({ item, deleteNotice }) {
  return (
    <li className="noti">
      <a
        href={`/modelpage/notification/${item._id}`}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <div>
          <img className="noti-avater" src="/images/fav-icon.png" alt="" />
        </div>

        <div>
          <p
            style={{ color: item.isRead ? "#808080" : "#ff014f" }}
            className="noti-text"
          >
            {item.notTitle}
            ...
          </p>
        </div>
      </a>

      <i
        onClick={() => deleteNotice(item._id)}
        className="fa-solid fa-xmark del-notice colored-hover"
      ></i>
    </li>
  );
}

export default NoticeItem;
