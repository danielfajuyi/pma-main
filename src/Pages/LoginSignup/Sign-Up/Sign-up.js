import "./Sign-up.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./signUpForm/SignUpForm";
import { AlertModal } from "./signUpForm/Modal";

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
    <button onClick={handleUserRole} className="sign-up--btn">
      {btnText}
    </button>
  );
};

function SignUp() {
  const [userRole, setUserRole] = useState("");
  const [activeSignup, setActiveSignup] = useState(false);

  //Jsx render section
  return (
    <section className="sign-up-container">
      <AlertModal />
      <section className="sign-up-info">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{ textAlign: "center" }}>
            <span className="material-icons">arrow_back</span>
          </a>
          <h2 className="info-title">Sign up</h2>
        </div>
        <p className="info-text">I want to sign up</p>
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

        <div className="other-info">
          <p className="terms-text">
            By creating an account you agree to our Terms and Polices
          </p>
          <span className="info-text">Already a member?</span>
          <Link to="/login" className="login-btn colored--btn">
            Login
          </Link>
        </div>
      </section>
      <SignUpForm
        activeSignup={activeSignup}
        userRole={userRole}
        setActiveSignup={setActiveSignup}
      />
    </section>
  );
}

export default SignUp;
