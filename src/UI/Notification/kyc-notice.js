import { useState } from "react";
import "./kyc-notice.css";

function KycNotice() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="kyc-notice" style={{ transform: toggle && `translateX(${100}%)` }}>
      <div className="alert-box">
        <h2 className="alert-title">welcome!</h2>
        <p className="alert-text">
          Please fill out the forms with all the required details, this will help you get a better
          experience.
        </p>

        <button
          onClick={() => setToggle((prev) => !prev)}
          className="del-alert-btn bold-text yes-btn">
          Got it
        </button>
      </div>
    </div>
  );
}

export default KycNotice;

/* please note that most of the styles for this component (kyc-notice) are in the models-Acct.css */
