import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";

function MsgItem({ item, setActive }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [conversation, setConversation] = useState({});

  const conversationId = user?._id ? item?.receiver : item?.sender;
  const fetchConversation = useCallback(() => {
    makeGet(dispatch, `/user/${conversationId}`, setConversation);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchConversation();
    return () => unsubscribe;
  }, []);

  return (
    <a href={`/modelpage/chat/${item._id}`} className="message">
      {/* <li onClick={() => setActive("chat")}> */}
      <div>
        <img className="msg-avater" src={conversation?.picture} alt="" />
      </div>

      <div>
        <h3 className="msg-title">
          {conversation.firstName} {conversation?.lastName}
        </h3>
        <p
          className="msg-text"
          style={{
            fontSize: "12px",
            color: item?.isRead ? "lightgray" : "ff007a",
          }}
        >
          {item?.lastMessage
            ? item?.lastMessage
            : "Open to start a conversation"}
        </p>
      </div>
      {/* </li> */}
    </a>
  );
}

export default MsgItem;
