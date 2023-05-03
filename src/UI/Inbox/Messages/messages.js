import "./Inbox.css";
import {
  BsFillTriangleFill,
  BsChevronCompactLeft,
  BsSearch,
} from "react-icons/bs";
import MsgItem from "./msg-item";

function Messages({ setActive, setPage, reversed }) {
  return (
    <>
      <div className="inbox-container">
        <div className="inbox-nav">
          <BsChevronCompactLeft
            className="nav-icon"
            onClick={() => setPage("dashboard")}
          />
          <div>Inbox</div>
          <BsSearch className="nav-icon" />
        </div>

        <div className="inbox-title">
          All messages
          <BsFillTriangleFill className="title-icon" />
        </div>

        <ul className="msg-wrapper">
          {reversed?.map((item, index) => (
            <MsgItem item={item} setActive={setActive} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Messages;
