import "./Agency-Acct.css";

import AgencyPage from "../Agency-Acct/Agency-Page/agency_page";
import AcctSetting from "./Acct-Setting/Agency-Acct-Setting";
import AgencyForms from "./Kyc-Section/Agency-Kyc-Forms";
import ModelsForms from "../../Model/Models-Acct/Kyc-Section/Models-Kyc-Forms";

import { useState } from "react";
import Inbox from "../../Inbox/Inbox";

function AgencyAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  const [agencyPage, setAgencyPage] = useState("dashboard");

  return (
    <>
      {/* {!user?.isUpdated ? (
        <AgencyForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <>
          {agencyPage === "dashboard" ? (
            <AgencyPage
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setAgencyPage={setAgencyPage}
              setNotice={setNotice}
              notice={notice}
            />
          ) : agencyPage === "setting" ? (
            <AcctSetting
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setAgencyPage={setAgencyPage}
            />
          ) : agencyPage === "add-model" ? (
            <ModelsForms
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
              setAgencyPage={setAgencyPage}
            />
          ) : agencyPage === "inbox" ? (
            <Inbox setPage={setAgencyPage} />
          ) : null}
        </>
      )} */}

      {/*---> this is used for testing  */}

      <>
        {agencyPage === "dashboard" ? (
          <AgencyPage
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setAgencyPage={setAgencyPage}
            setNotice={setNotice}
            notice={notice}
          />
        ) : agencyPage === "setting" ? (
          <AcctSetting
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setAgencyPage={setAgencyPage}
          />
        ) : agencyPage === "add-model" ? (
          <ModelsForms
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setAgencyPage={setAgencyPage}
          />
        ) : agencyPage === "inbox" ? (
          <Inbox setPage={setAgencyPage} />
        ) : null}
      </>
    </>
  );
}

export default AgencyAcct;
