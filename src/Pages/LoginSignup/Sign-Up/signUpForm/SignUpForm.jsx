import { useEffect, useState } from "react";
import { AlertModal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../../redux/apiCalls";
import { userRequest_2 } from "../../../../redux/requestMethod";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer } from "react-toastify";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import axios from "axios";
import forDark from "./img/logo.png";
import forLight from "./img/logo.png";
import SignUpInput from "./FormInputs";
import "react-toastify/dist/ReactToastify.css";
import "./SignUpForm.css";
import "./SignUpForm.scss";
import "./svg/svg.scss";

const SignUpForm = ({ activeSignup, setActiveSignup, userRole }) => {
  const [darkmode, setDarkMode] = useState(false);
  const [modalTxt, setModalTxt] = useState("");
  const [inputs, setInputs] = useState({});
  const [isChecked, setIschecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // This function handles form transitions on light and dark mode
  const TransitionHandler = () => {
    const allElement = document.querySelectorAll("*");
    allElement.forEach((el) => {
      el.classList.add("form-transition");
      setTimeout(() => {
        el.classList.remove("form-transition");
      }, 1000);
    });
  };

  // This function handles onfocus and onblur mode on form inputs
  const FocusBlur = () => {
    const inputs = document.querySelectorAll(".input-textarea");
    inputs.forEach((ipt) => {
      ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
      });

      ipt.addEventListener("blur", () => {
        if (ipt.value == "") {
          ipt.parentNode.classList.remove("not-empty");
          ipt.parentNode.classList.remove("focus");
        }
      });
    });
  };

  // This function handles dark and light mode onclick on forms
  const HandleTheme = (event) => {
    // 👇️ toggle darkmode state on click
    setDarkMode((current) => !current);
    TransitionHandler();
  };

  useEffect(() => {
    FocusBlur();
  }, []);

  //input error state
  const [error, setError] = useState({
    fNameErr: "",
    lNameErr: "",
    emailErr: "",
    passErr: "",
    confirmErr: "",
    mobileErr: "",
    termsErr: "",
  });

  // handles onchange on forms inouts
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //submit form and creating account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    register(dispatch, "/auth/register", { ...inputs, role: userRole }, setMessage, setUser);
  };

  //paystack payment config
  const amount =
    inputs.referral === "AMB2023"
      ? 1500
      : inputs.coupon === "PMA24"
      ? 25000
      : userRole === "model"
      ? 2000
      : userRole === "agency"
      ? 49900
      : null;
  const config = {
    email: inputs.email,

    amount: amount * 100,

    metadata: {
      name: inputs.firstName,
      phone: inputs.mobileNo,
    },

    publicKey: process.env.REACT_APP_PAYSTACK_KEY,

    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  };

  const TOKEN = user?.accessToken;
  const postRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL_V2,
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
    if (userRole !== "client" && user?.accessToken) {
      handlePayment();
    }
  }, [user]);

  // handles progress state
  let newprogress = 16.67;
  {
    /* 
    according to "const [progress, setProgress] = useState(0);" above
    the initial (progress) value is 0, 
    the min progress value is 0 
    the max progress value will be 100;
    the (newprogress) variable declared above will either adds
    or substact (16.67) from the (progress)
    
    when it adds 
    16.67 approximately to 16 
    16 * 0 = 0 min (initial state)
    16 * 1 = 16 
    16 * 2 = 33
    16 * 3 = 50 
    16 * 4 = 66 
    16 * 5 = 83 
    16 * 6 = 100 max ( all required input are filled and 
                      completed without errors)
    */
  }

  // validating inputs
  useEffect(() => {
    const nameRegex = /^[A-Z]+$/i;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    const numRegex = /^[0-9]+$/;

    if (inputs.firstName) {
      function validateFName() {
        inputs.firstName.length < 3 ||
        inputs.firstName.length > 15 ||
        !nameRegex.test(inputs.firstName)
          ? setError((prevErr) => ({
              ...prevErr,
              fNameErr:
                "Name should have a min of (3), max of (15) characters and must contain only letter A-Z!",
            })) || setProgress(0)
          : setError((prevErr) => ({ ...prevErr, fNameErr: null })) || setProgress(newprogress);
      }
      inputs.firstName && validateFName();
    }
    if (inputs.lastName) {
      function validateLName() {
        inputs.lastName.length < 3 ||
        inputs.lastName.length > 12 ||
        !nameRegex.test(inputs.lastName)
          ? setError((prevErr) => ({
              ...prevErr,
              lNameErr:
                "Name should have a min of (3), max of (15) characters and must contain only letter A-Z!",
            })) || setProgress(newprogress)
          : setError((prevErr) => ({ ...prevErr, lNameErr: null })) || setProgress(newprogress * 2);
      }
      inputs.lastName && validateLName();
    }
    if (inputs.email) {
      function validateEmail() {
        !emailRegex.test(inputs.email)
          ? setError((prevErr) => ({
              ...prevErr,
              emailErr: "Please ensure you enter a valid email",
            })) || setProgress(newprogress * 2)
          : setError((prevErr) => ({ ...prevErr, emailErr: null })) || setProgress(newprogress * 3);
      }
      inputs.email && validateEmail();
    }
    if (inputs.password) {
      function validatePassword() {
        inputs.password.length < 6 ||
        inputs.password.length > 15 ||
        !passRegex.test(inputs.password)
          ? setError((prevErr) => ({
              ...prevErr,
              passErr:
                "Password should have a min of (6), max of (15) characters must contain at least 1 Uppercase and Lowercase letter",
            }))
          : setError((prevErr) => ({ ...prevErr, passErr: null }));
      }

      // validating confirm-password inputs
      function confirmPassword() {
        inputs.confirm !== inputs.password
          ? setError((prevErr) => ({
              ...prevErr,
              confirmErr: "Ensure password corresponds to previous  password entered ",
            })) || setProgress(newprogress * 3)
          : setError((prevErr) => ({ ...prevErr, confirmErr: null })) ||
            setProgress(newprogress * 4);
      }

      inputs.password && validatePassword();
      inputs.confirm && confirmPassword();
    }
    if (inputs.mobileNo) {
      function validateMobileNum() {
        !numRegex.test(inputs.mobileNo) || inputs.mobileNo.length < 6
          ? setError((prevErr) => ({
              ...prevErr,
              mobileErr:
                "Mobile-No should have at least six(6) digits and must contains only numbers 0-9",
            })) || setProgress(newprogress * 4)
          : setError((prevErr) => ({ ...prevErr, mobileErr: null })) ||
            setProgress(newprogress * 5);
      }
      inputs.mobileNo && validateMobileNum();
    }
    isChecked
      ? setError((prevErr) => ({
          ...prevErr,
          termsErr: null,
        }))
      : setError((prevErr) => ({
          ...prevErr,
          termsErr: "Please click the above button to Accept our terms of service",
        }));

    if (
      error.confirmErr === null &&
      error.emailErr === null &&
      error.fNameErr === null &&
      error.lNameErr === null &&
      error.mobileErr === null &&
      error.passErr === null &&
      isChecked === true
    ) {
      setIsError(false) || setProgress(newprogress * 6);
    } else {
      setIsError(true);
    }
  }, [
    inputs,
    isChecked,
    error.confirmErr,
    error.emailErr,
    error.fNameErr,
    error.lNameErr,
    error.mobileErr,
    error.passErr,
  ]);

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      setModalTxt(message);
    }
    return () => (unsubscribed = true);
  }, [message]);

  let progressNum = Math.trunc(progress); // returns the exact value of progress without decimal number

  return (
    <>
      <section
        style={{
          transform: activeSignup && `translateX(${0}%)`,
          display: message && "none",
          transition: "0.9s ease-in-out",
        }}
        className="sign-up form-transition">
        <ToastContainer position="top-center" reverseOrder={false} />
        <section className={darkmode ? "Forms light-theme dark-theme " : "Forms light-theme "}>
          <header>
            <section className="signupforms">
              <div className="signupform-container">
                <ul>
                  <li>
                    <a href="#" className="form-logo">
                      <div className="form-images">
                        <img src={forDark} alt="" className="logo-forDark" />
                        <img src={forLight} alt="" className="logo-forLight" />
                      </div>
                      <h2>
                        <div className="logo-01">
                          <span className="logo-color-change">Premium</span>
                        </div>
                        <div className="logo-02">
                          <span className="logo-color">models</span>
                          <span className="logo-color ">.</span>
                        </div>
                      </h2>
                    </a>
                  </li>

                  <li>
                    <a href="/" className="formnav-link">
                      Home
                    </a>
                  </li>

                  <li>
                    <a href="/login" className="formnav-link">
                      login
                    </a>
                  </li>

                  <li className="darkmode-li">
                    <span className="formnav-link theme-toggle " onClick={HandleTheme}>
                      {darkmode ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
                    </span>
                  </li>

                  <li className="close-li">
                    <span className="formnav-link">
                      <FaTimes className="closeform-icon" onClick={() => setActiveSignup(false)} />
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </header>

          <main>
            <section className="signupform-contact">
              <div className="signupform-container">
                <div className="form-left">
                  <div className="form-left-wrapper">
                    <div className="form-left-heading">
                      <h1>
                        Uber of modelling <span className="dots-hide-on-mobile">.</span>
                      </h1>
                      <p className="form-text">
                        fill in your information for
                        <a href="#">
                          {userRole === "model"
                            ? " model signup"
                            : userRole === "client"
                            ? " client signup"
                            : userRole === "agency"
                            ? " agency signup"
                            : null}
                        </a>
                      </p>
                    </div>

                    <form method="post" className="form-left-form" onSubmit={handleCreateAccount}>
                      <div className="form-input-column">
                        <SignUpInput
                          type="text"
                          id="firstName"
                          placeholder=""
                          label="First Name"
                          handleChange={handleChange}
                          error={error.fNameErr}
                          className=""
                        />

                        <SignUpInput
                          type="text"
                          id="lastName"
                          placeholder=""
                          label="Last Name"
                          handleChange={handleChange}
                          error={error.lNameErr}
                          className=""
                        />
                      </div>

                      <SignUpInput
                        type="email"
                        id="email"
                        placeholder=""
                        label="Email"
                        handleChange={handleChange}
                        error={error.emailErr}
                        className=""
                      />
                      <div className="form-input-column">
                        <SignUpInput
                          type="password"
                          id="password"
                          placeholder=""
                          label="Password"
                          handleChange={handleChange}
                          error={error.passErr}
                          className=""
                        />

                        <SignUpInput
                          type="password"
                          id="confirm"
                          placeholder=""
                          label="Confirm Password"
                          handleChange={handleChange}
                          error={error.confirmErr}
                          className=""
                        />
                      </div>

                      <div className="form-input-column">
                        <SignUpInput
                          type="tel"
                          id="mobileNo"
                          placeholder=""
                          label="Phone Number"
                          handleChange={handleChange}
                          error={error.mobileErr}
                          className=""
                        />

                        <SignUpInput
                          type="tel"
                          id="referral"
                          placeholder=""
                          label="Referral (optional)"
                          handleChange={handleChange}
                          className=""
                        />
                      </div>

                      {userRole === "agency" ? (
                        <SignUpInput
                          type="text"
                          id="coupon"
                          placeholder=""
                          label="Coupon code (optional)"
                          handleChange={handleChange}
                          className=""
                        />
                      ) : null}

                      <div className="form-check-box">
                        <div className="check-box-wrapper">
                          <input
                            className="terms-check"
                            onChange={() => setIschecked(!isChecked)}
                            type="checkbox"
                            id="model"
                            name="terms"
                            checked={inputs.terms}
                          />
                          <label htmlFor="model">I agree to the Policy & Terms of Service</label>
                        </div>
                        <p className="form-error-text">{error.termsErr}</p>
                      </div>

                      <div className="form-buttons ">
                        <div
                          className="progress-wrapper"
                          style={{
                            border: `${
                              progressNum === 100
                                ? "1px solid #808080 "
                                : "1px solid var(--main-color)"
                            }`,
                          }}>
                          <div
                            className="form-btn progress-btn"
                            style={{
                              width: `${progressNum}%`,
                              backgroundColor:
                                progressNum === 100 ? "#808080" : "var(--main-color)",
                            }}>
                            <span>{progressNum}%</span>
                          </div>
                        </div>

                        <button
                          className="form-btn "
                          style={{
                            backgroundColor: !isError ? "var(--main-color)" : "#808080",
                            color: "#fff",
                          }}
                          onClick={() => {
                            isError && setModalTxt("sign-up-Err");
                          }}
                          type="submit"
                          disabled={isFetching}>
                          {isFetching ? "please wait..." : "Continue"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-img-wrapper">
                    <img
                      src={
                        userRole === "model"
                          ? "/images/sign-up/model1.jpg"
                          : userRole === "client"
                          ? "/images/sign-up/client1.jpg"
                          : userRole === "agency"
                          ? "/images/sign-up/agent1.jpeg"
                          : null
                      }
                      className="form-img"
                      alt={`${userRole} img`}
                    />

                    <div className="wave-wrap">
                      <svg
                        className="wave"
                        viewBox="0 0 783 1536"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="wave"
                          d="M236.705 1356.18C200.542 1483.72 64.5004 1528.54 1 1535V1H770.538C793.858 63.1213 797.23 196.197 624.165 231.531C407.833 275.698 274.374 331.715 450.884 568.709C627.393 805.704 510.079 815.399 347.561 939.282C185.043 1063.17 281.908 1196.74 236.705 1356.18Z"
                        />
                      </svg>
                    </div>
                    <svg
                      viewBox="0 0 345 877"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dashed-wave">
                      <path
                        id="dashed-wave"
                        d="M0.5 876C25.6667 836.167 73.2 739.8 62 673C48 589.5 35.5 499.5 125.5 462C215.5 424.5 150 365 87 333.5C24 302 44 237.5 125.5 213.5C207 189.5 307 138.5 246 87C185 35.5 297 1 344.5 1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </section>
      </section>
      <AlertModal
        modalTxt={modalTxt}
        setModalTxt={setModalTxt}
        userRole={userRole}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};
export default SignUpForm;
