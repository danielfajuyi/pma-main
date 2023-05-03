import "./Models-Acct.css";

import ModelPage from "../Models-Acct/Model-Page/model_page";
import AcctSetting from "./Acct-Setting/Models-Acct-Setting";
import ModelsForms from "./Kyc-Section/Models-Kyc-Forms";
import { useState } from "react";

import Inbox from "../../Inbox/Inbox";

function ModelsAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  const [modelPage, setModelPage] = useState("dashboard");

  return (
    <>
      {!user?.isUpdated ? (
        <ModelsForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <>
          {modelPage === "dashboard" ? (
            <ModelPage
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setModelPage={setModelPage}
              setNotice={setNotice}
              notice={notice}
            />
          ) : modelPage === "setting" ? (
            <AcctSetting
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setModelPage={setModelPage}
            />
          ) : modelPage === "inbox" ? (
            <Inbox setPage={setModelPage} />
          ) : null}
        </>
      )}
    </>
  );
}

export default ModelsAcct;
