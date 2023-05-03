import "./Login-Form.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/apiCalls";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import { AlertModal } from "../Sign-Up/signUpForm/Modal";

function LoginForm() {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, "/auth/login", { ...inputs }, setMessage, setUser);
  };

  //paystack payment config
  const userRole = user?.userRole;
  const amount =
    userRole === "model" ? 2000 : userRole === "agency" ? 49900 : null;
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
    if (user?.userRole) {
      handlePayment();
    }
  }, [user]);

  return (
    <section className="login-container">
      <AlertModal
        modalTxt={modalTxt}
        setModalTxt={setModalTxt}
        message={message}
      />

      <form className="login-form" onSubmit={handleLogin}>
        {/* login title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{ textAlign: "center" }}>
            <span className="material-icons">arrow_back</span>
          </a>
          <h2 className="login-title">welcome Back!</h2>
        </div>
        {message && (
          <p className="login-error">{!message?.message && message}</p>
        )}

        {/* email input section  */}
        <div className="input-wrapper">
          <label htmlFor="email">Email Address</label>
          <div className="login-input">
            <input
              onChange={handleChange}
              className="login-email"
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
              required
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* password input section */}
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <div className="login-input">
            <input
              onChange={handleChange}
              className="login-pwd"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password..."
              required
              spellCheck={false}
              autoComplete="off"
            />
            {showPassword ? (
              <i
                onClick={() => setShowPassword((prev) => !prev)}
                className="fa-solid fa-eye viewPwd"
              ></i>
            ) : (
              <i
                onClick={() => setShowPassword((prev) => !prev)}
                className="fa-solid fa-eye-slash viewPwd"
              ></i>
            )}
          </div>
        </div>

        {/* button section  */}
        <button
          disabled={isFetching}
          className="btn-login dark--btn btn--Login"
        >
          {isFetching ? "Please wait..." : "Log in"}
        </button>
        <span>Forgot your password?</span>
        <div className="signup">
          <span className="Signup-text">Not a member yet?</span>
          <Link to="/sign-up" className="btn-login colored--btn btn--signup">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
