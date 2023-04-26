import { useState } from "react";
import Chats from "./Chats/chats";
import Messages from "./Messages/messages";

function Inbox({ setPage }) {
  const [active, setActive] = useState("message");

  return (
    <>
      {active === "message" ? (
        <Messages setActive={setActive} setPage={setPage} />
      ) : active === "chat" ? (
        <Chats setActive={setActive} />
      ) : null}
    </>
  );
}

export default Inbox;
