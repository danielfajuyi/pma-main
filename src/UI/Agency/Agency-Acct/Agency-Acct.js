import "./Agency-Acct.css";
import AgencyPage from "../Agency-Acct/Agency-Page/agency_page";
import AgencyForms from "./Kyc-Section/Agency-Kyc-Forms";
import KycNotice from "../../Notification/kyc-notice";

function AgencyAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  return (
    <>
      {!user?.isUpdated && <KycNotice />}

      {!user?.isUpdated ? (
        <AgencyForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <AgencyPage
          showNavbar={showNavbar}
          setShowNavbar={setShowNavbar}
          setNotice={setNotice}
          notice={notice}
        />
      )}

      {/*---> this is used for testing  */}

      {/* <AgencyPage
        showNavbar={showNavbar}
        setShowNavbar={setShowNavbar}
        setNotice={setNotice}
        notice={notice}
      /> */}
    </>
  );
}

export default AgencyAcct;
