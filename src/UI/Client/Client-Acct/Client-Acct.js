import "./Client-Acct.css";

import ClientPage from "../Client-Acct/Client-Page/client_page";
import AcctSetting from "./Acct-Setting/Client-Acct-Setting";
import ClientForms from "./Kyc-Section/Client-Kyc-Forms";
import { useState } from "react";
import Inbox from "../../Inbox/Inbox";

//---> re-using the ClientAcct function
function ClientsAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  const [clientPage, setClientPage] = useState("dashboard");

  return (
    <>
      {!user?.isUpdated ? (
        <ClientForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <>
          {clientPage === "dashboard" ? (
            <ClientPage
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setClientPage={setClientPage}
              setNotice={setNotice}
              notice={notice}
            />
          ) : clientPage === "setting" ? (
            <AcctSetting
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setClientPage={setClientPage}
            />
          ) : clientPage === "inbox" ? (
            <Inbox setPage={setClientPage} />
          ) : null}
        </>
      )}

      {/*--->  this is used for testing  */}

      {/* <>
        {clientPage === "dashboard" ? (
          <ClientPage
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setClientPage={setClientPage}
            setNotice={setNotice}
            notice={notice}
          />
        ) : clientPage === "setting" ? (
          <AcctSetting
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setClientPage={setClientPage}
          />
        ) : clientPage === "inbox" ? (
          <Inbox setPage={setClientPage} />
        ) : null}
      </> */}
    </>
  );
}

export default ClientsAcct;
