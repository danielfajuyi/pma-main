import React from "react";
import "./Signup.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const SignupBtn = ({ btnText, setActiveSignup, setUserRole }) => {
  const handleUserRole = () => {
    switch (btnText) {
      case "As a model":
        setUserRole("model");
        setActiveSignup(true);
        break;
      case "As a client":
        setUserRole("client");
        setActiveSignup(true);
        break;
      case "As an agency":
        setUserRole("agency");
        setActiveSignup(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <button onClick={handleUserRole} className="sign-btn sign-up--btn">
        {btnText}
      </button>
    </>
  );
};

const SignupSection = ({
  userRole,
  setUserRole,
  activeSignup,
  setActiveSignup,
}) => {
  return (
    <>
      <section className="sign-form sign-up-form ">
        <a
          href="/"
          // style={{
          //   alignSelf: "flex-start",
          //   cursor: "pointer",
          //   marginLeft: "-2rem",
          // }}
          className="back-link-s"
        >
          <AiOutlineArrowLeft size={25} />
        </a>
        <h2 className="sign-title">Sign up</h2>
        {/* 
     <div className="sign-input-field">
      <FaUser />
      <input type="text" placeholder="Username" />
    </div>
    <div className="sign-input-field">
      <FaEnvelope />
      <input type="text" placeholder="Email" />
    </div>
    <div className="sign-input-field">
      <FaLock />
      <input type="password" placeholder="Password" />
    </div>
    */}

        <p className="info-text">I want to sign up</p>
        <div className="sign-btn-section">
          <SignupBtn
            btnText={"As a model"}
            setActiveSignup={setActiveSignup}
            setUserRole={setUserRole}
          />
          <SignupBtn
            btnText={"As a client"}
            setActiveSignup={setActiveSignup}
            setUserRole={setUserRole}
          />
          <SignupBtn
            btnText={"As an agency"}
            setActiveSignup={setActiveSignup}
            setUserRole={setUserRole}
          />
        </div>

        <div className="other-info">
          <p className="terms-text">
            By creating an account you agree to our Terms and Polices
          </p>
        </div>
      </section>
    </>
  );
};

export default SignupSection;
