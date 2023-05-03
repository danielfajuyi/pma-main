import { useCallback, useEffect, useState } from "react";
import Chats from "./Chats/chats";
import Messages from "./Messages/messages";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../redux/apiCalls";
import { messageChange } from "../../redux/messageRedux";

function Inbox({ setPage }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [active, setActive] = useState("message");
  const [conversations, setConversations] = useState([]);

  const fetchConversations = useCallback(() => {
    makeGet(
      dispatch,
      `/conversation/conversations/${user._id}`,
      setConversations
    );
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchConversations();
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const notRead = conversations.filter((item) => !item.isRead);
    dispatch(messageChange(notRead?.length));
  }, [conversations]);

  const reversed = [...conversations].reverse();

  return (
    <>
      {active === "message" ? (
        <Messages setActive={setActive} setPage={setPage} reversed={reversed} />
      ) : active === "chat" ? (
        <Chats setActive={setActive} />
      ) : null}
    </>
  );
}

export default Inbox;
