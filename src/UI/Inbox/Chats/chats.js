import { BsChevronCompactLeft, BsGear } from "react-icons/bs";
import "./chats.css";
import { UserChat, PartnerChat } from "./chat-item";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeGet, makePost } from "../../../redux/apiCalls";
import { useLocation } from "react-router";
import moment from "moment";
import { userRequest } from "../../../redux/requestMethod";

function Chats({ setActive }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});
  const [message, setMessage] = useState("");
  const [senderItem, setSenderItem] = useState({});
  const [receiverItem, setReceiverItem] = useState({});

  // get conversation
  const fetchConversation = useCallback(() => {
    makeGet(dispatch, `/conversation/conversation/${path}`, setConversation);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchConversation();
    return () => unsubscribe;
  }, []);

  // get messages
  const fetchMessages = useCallback(() => {
    makeGet(dispatch, `/conversation/open/${path}`, setMessages);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchMessages();
    return () => unsubscribe;
  }, []);

  // fetch user item
  const fetchUserItem = useCallback(() => {
    const conversationId = conversation?.sender;
    const receiverId = conversation?.receiver;
    makeGet(dispatch, `/user/${conversationId}`, setSenderItem);
    makeGet(dispatch, `/user/${receiverId}`, setReceiverItem);
  }, [dispatch, messages, conversation]);

  useEffect(() => {
    let unsubscribe = fetchUserItem();
    return () => unsubscribe;
  }, [messages, conversation]);

  // send a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message) {
        await userRequest.post(`/conversation/send/${path}`, { message });
        fetchMessages();
        setMessage("");
      }
    } catch {}
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      style={{ backgroundColor: "white", height: "500px", overflowY: "scroll" }}
    >
      <div className="chat-nav">
        <BsChevronCompactLeft onClick={() => setActive("message")} />
        {user._id === conversation?.sender && <span className="partner-name">{receiverItem.firstName}</span>}
        {user._id === conversation?.receiver && <span className="partner-name">{senderItem.firstName}</span>}
        <BsGear className="chat-set" />
      </div>
      <div className="chat-container">
        {/* <div className="current-day">Today</div> */}
        {messages.length < 1 && (
          <p
            style={{
              fontSize: "2.5em",
              textAlign: "center",
              color: "lightgray",
            }}
          >
            Start a new conversation...
          </p>
        )}
        <ul className="chat-wrapper">
          {messages.map((item) =>
            item.sender === user._id ? (
              <UserChat
                avatar={senderItem?.picture}
                text={item.message}
                time={moment(item.createdAt).format("LLL")}
                key={item._id}
              />
            ) : (
              <PartnerChat
                avatar={receiverItem?.picture}
                text={item.message}
                time={moment(item.createdAt).format("LLL")}
                key={item._id}
              />
            )
          )}
        </ul>
        <br />
        <br />
      </div>

      <form className="chat-text-area" onSubmit={handleSendMessage}>
        <textarea
          className="chat-area"
          name="message"
          id="chat"
          cols="10"
          rows="2"
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            conversation?.isClosed
              ? "This conversation is closed"
              : "write your message..."
          }
          // spellCheck="false"
          disabled={conversation?.isClosed}
          value={message}
        />

        <button className="chat-sent-icon">
          <i className="fa-sharp fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}
export default Chats;
