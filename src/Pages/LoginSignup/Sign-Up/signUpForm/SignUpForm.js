import { useEffect, useState } from "react";
import SignUpInput from "./FormInputs";
import "./SignUpForm.css";
import { AlertModal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { makePost, register } from "../../../../redux/apiCalls";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUpForm = ({ activeSignup, setActiveSignup, userRole }) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [modalTxt, setModalTxt] = useState("");
  const [inputs, setInputs] = useState({});
  const [isChecked, setIschecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

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

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //submit form and creating account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    register(
      dispatch,
      "/auth/register",
      { ...inputs, role: userRole },
      setMessage,
      setUser
    );
  };

  //paystack payment config
  const amount =
    userRole === "model" ? 2000 : userRole === "agency" ? 49900 : null;
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
    if (userRole !== "client" && user?.accessToken) {
      handlePayment();
    }
  }, [user]);

  //validating inputs
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
            }))
          : setError((prevErr) => ({ ...prevErr, fNameErr: null }));
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
            }))
          : setError((prevErr) => ({ ...prevErr, lNameErr: null }));
      }
      inputs.lastName && validateLName();
    }
    if (inputs.email) {
      function validateEmail() {
        !emailRegex.test(inputs.email)
          ? setError((prevErr) => ({
              ...prevErr,
              emailErr: "Please ensure you enter a valid email",
            }))
          : setError((prevErr) => ({ ...prevErr, emailErr: null }));
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
              confirmErr:
                "Ensure password corresponds to previous  password entered ",
            }))
          : setError((prevErr) => ({ ...prevErr, confirmErr: null }));
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
            }))
          : setError((prevErr) => ({ ...prevErr, mobileErr: null }));
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
          termsErr:
            "Please click the above button to Accept our terms of service",
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
      setIsError(false);
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

  return (
    <>
      <section
        style={{
          transform: activeSignup && `translateX(${0}%)`,
          display: message && "none",
        }}
        className="sign-up"
      >
        <ToastContainer position="top-center" reverseOrder={false} />

        <form className="model-sign-up" onSubmit={handleCreateAccount}>
          <div className="sign-up-img">
            <img
              src={
                userRole === "model"
                  ? "/images/sign-up/model.jpg"
                  : userRole === "client"
                  ? "/images/sign-up/client.jpg"
                  : userRole === "agency"
                  ? "/images/sign-up/agent.jpg"
                  : null
              }
              alt={`${userRole} img`}
            />
            <div className="image-text-rapper">
              <h4 className="image-title">Almost there!</h4>
              <p className="image-text">
                You are moments away from Awesomeness!!
              </p>
            </div>
          </div>

          <section className="sign-up-section">
            <i
              onClick={() => setActiveSignup(false)}
              className="fa-solid fa-xmark close-sign-up"
            ></i>
            <h2 className="sign-up-text">Sign-up</h2>
            <div className="input-sections">
              <div className="name-section">
                <div className="input-container">
                  <SignUpInput
                    type="text"
                    id="firstName"
                    placeholder="Enter FirstName..."
                    label="FirstName"
                    handleChange={handleChange}
                    error={error.fNameErr}
                  />
                </div>
                <div className="input-container">
                  <SignUpInput
                    type="text"
                    id="lastName"
                    placeholder="Enter LastName..."
                    label="LastName"
                    handleChange={handleChange}
                    error={error.lNameErr}
                  />
                </div>
              </div>

              <div className="email-section">
                <SignUpInput
                  type="email"
                  id="email"
                  placeholder="Enter your email..."
                  label="Email"
                  handleChange={handleChange}
                  error={error.emailErr}
                />
              </div>
              <div className="other-section">
                <div className="input-container">
                  <SignUpInput
                    type="password"
                    id="password"
                    placeholder="Enter password..."
                    label="Password"
                    handleChange={handleChange}
                    error={error.passErr}
                  />
                </div>
                <div className="input-container">
                  <SignUpInput
                    type="password"
                    id="confirm"
                    placeholder="Confirm password..."
                    label="Confirm"
                    handleChange={handleChange}
                    error={error.confirmErr}
                  />
                </div>
                <div className="input-container">
                  <SignUpInput
                    type="tel"
                    id="mobileNo"
                    placeholder="Mobile Num..."
                    label="Mobile-No"
                    handleChange={handleChange}
                    error={error.mobileErr}
                  />
                </div>
                <div className="input-container">
                  <SignUpInput
                    type="tel"
                    id="referral"
                    placeholder="Enter referral..."
                    label="Referral"
                    handleChange={handleChange}
                  />
                </div>
              </div>

              <div className="other-container">
                <div>
                  <input
                    className="terms-check"
                    onChange={() => setIschecked(!isChecked)}
                    type="checkbox"
                    id="model"
                    name="terms"
                    checked={inputs.terms}
                  />
                  <label className="colored-hover" htmlFor="model">
                    I Agree to the Policy & Terms of Service
                  </label>
                  <p className="error-text">{error.termsErr}</p>
                </div>

                <button
                  style={{
                    backgroundColor: !isError ? "#ff007a" : "#808080",
                    color: "#fff",
                  }}
                  onClick={() => {
                    isError && setModalTxt("sign-up-Err");
                  }}
                  className="sign-up-btn bold-text colored-hover"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching ? "please wait..." : "Continue"}
                </button>
              </div>
            </div>
          </section>
        </form>
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
