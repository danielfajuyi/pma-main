import "./Client-Acct.css";
import ClientPage from "../Client-Acct/Client-Page/client_page";
import ClientForms from "./Kyc-Section/Client-Kyc-Forms";
import KycNotice from "../../Notification/kyc-notice";

//---> re-using the ClientAcct function
function ClientsAcct({ showNavbar, setShowNavbar, user, setNotice, notice }) {
  return (
    <>
      {!user?.isUpdated && <KycNotice />}

      {!user?.isUpdated ? (
        <ClientForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <ClientPage
          showNavbar={showNavbar}
          setShowNavbar={setShowNavbar}
          setNotice={setNotice}
          notice={notice}
        />
      )}

      {/*--->  this is used for testing  */}

      {/* <ClientPage
        showNavbar={showNavbar}
        setShowNavbar={setShowNavbar}
        setNotice={setNotice}
        notice={notice}
      /> */}
    </>
  );
}

export default ClientsAcct;
