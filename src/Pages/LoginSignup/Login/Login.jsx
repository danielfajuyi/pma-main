import React, { useState } from "react";
import "./Login.scss";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLinkedin,
  FaLock,
  FaTwitter,
} from "react-icons/fa";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { login } from "../../../redux/apiCalls";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { AlertModal } from "../Sign-Up/signUpForm/Modal";
import log from "./img/model-log.png";
import register from "./img/model-register.png";
import axios from "axios";
import SignupSection from "../Sign-Up/Signup";
import SignUpForm from "../Sign-Up/signUpForm/SignUpForm";

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");
  const [user, setUser] = useState({});

  // For Signup
  const [userRole, setUserRole] = useState("");
  const [activeSignup, setActiveSignup] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current);
    // const { isFetching } = useSelector((state) => state.user);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(
      dispatch,
      "/auth/login",
      { ...inputs },
      setMessage,
      setUser,
      setIsLoading
    );
  };

  //paystack payment config
  const userRole1 = user?.userRole1;
  const amount =
    userRole1 === "model" ? 2000 : userRole1 === "agency" ? 49900 : null;
  const config = {
    email: inputs.email,

    amount: amount * 100,

    metadata: {
      name: inputs?.firstName,
      phone: inputs?.mobileNo,
    },

    publicKey: process.env.REACT_APP_PAYSTACK_KEY,

    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  };

  const TOKEN = user?.accessToken;
  const postRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });

  const handleInvoice = async () => {
    try {
      const res = await postRequest.post("/payment/make-payment", { amount });
      modalTxt(res.data);
      alert(res.data);
    } catch (error) {}
  };

  const initializePayment = usePaystackPayment(config);
  const handlePayment = () => {
    const onSuccess = () => {
      handleInvoice();
      setTimeout(() => {
        setModalTxt("confirm-payment");
      }, 2000);
      window.location.reload();
    };
    const onClose = () => {
      setModalTxt("close-payment");
    };
    initializePayment(onSuccess, onClose);
  };

  useEffect(() => {
    if (user?.userRole1) {
      handlePayment();
    }
  }, [user]);

  return (
    <>
      <section className="signups-section">
        <AlertModal
          modalTxt={modalTxt}
          setModalTxt={setModalTxt}
          message={message}
        />
        <div
          className={
            isActive ? "signups-container sign-up-mode" : "signups-container"
          }
        >
          <div className="signups-forms">
            <div
              className={
                isActive ? "signin-signup effect-mode " : "signin-signup"
              }
            >
              <div className="sign-line"></div>
              <div className="sign-line l2"></div>
              <form
                action=""
                className="sign-form sign-in-form "
                onSubmit={handleLogin}
              >
                <a
                  href="/"
                  // style={{
                  //   alignSelf: "flex-start",
                  //   cursor: "pointer",
                  //   marginLeft: "-2rem",
                  // }}
                  className="back-link"
                >
                  <AiOutlineArrowLeft size={25} />
                </a>
                <h2 className="sign-title">Sign in</h2>
                {message && (
                  <p className="login-error">{!message?.message && message}</p>
                )}

                <div className="sign-input-field">
                  <FaEnvelope />
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
                <div className="sign-input-field">
                  <FaLock />
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    spellCheck={false}
                    autoComplete="off"
                  />

                  <div className="view-password">
                    {showPassword ? (
                      <FaEye
                        onClick={() => setShowPassword((prev) => !prev)}
                        className=" viewPwd"
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={() => setShowPassword((prev) => !prev)}
                        className=" viewPwd"
                      />
                    )}
                  </div>
                </div>

                <button className="sign-btn">
                  {" "}
                  {isLoading ? "Please wait..." : "Login"}
                </button>
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  <a href="#" className="social-icon">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-icon">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-icon">
                    <FaGoogle />
                  </a>
                  <a href="#" className="social-icon">
                    <FaLinkedin />
                  </a>
                </div>
              </form>

              <SignupSection
                activeSignup={activeSignup}
                userRole={userRole}
                setActiveSignup={setActiveSignup}
                setUserRole={setUserRole}
              />
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="sign-content">
                <h3>New here? </h3>
                <p>
                  Welcome to the <b>"Uber of Modelling" </b> Create a
                  professional modeling portfolio on Premium Models App today
                  and showcase yourself to top brands and potential clients.
                  Connect with industry professionals and collaborate on
                  projects, find jobs, castings and photo shoots. Build your
                  network and gain visibility in the modeling market.
                </p>
                <button
                  className="sign-btn transparent"
                  id="sign-up-btn"
                  onClick={handleClick}
                >
                  Sign up
                </button>
              </div>
              <img src={log} className="sign-image" alt="" />
            </div>

            <div className="panel right-panel">
              <div className="sign-content">
                <h3>One of us? Welcome back! </h3>
                <p>
                  Good to see you again, a professional modeling portfolio is
                  essential to your career success.
                </p>
                <button
                  className="sign-btn transparent"
                  id="sign-in-btn"
                  onClick={handleClick}
                >
                  Sign in
                </button>
              </div>
              <img src={register} className="sign-image" alt="" />
            </div>
          </div>
        </div>
        {/* 
                      signup section starts
      ...because of the styles the signupform and loginform is now linked together 
      in one page titled "LoginSignup" and the route titled "/login" or "/signup" 

      */}
        <SignUpForm
          activeSignup={activeSignup}
          userRole={userRole}
          setActiveSignup={setActiveSignup}
        />
      </section>
    </>
  );
};

export default LoginSignup;
