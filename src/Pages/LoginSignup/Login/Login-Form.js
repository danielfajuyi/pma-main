import "./Login-Form.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRegister } from "../../../redux/apiCalls";

function LoginForm() {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginRegister(dispatch, "/auth/login", { ...inputs }, setMessage);
  };

  return (
    <section className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        {/* login title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{textAlign:'center'}}>
            <span className="material-icons">arrow_back</span>
          </a>
          <h2 className="login-title">welcome Back!</h2>
        </div>
        {message && <p className="login-error">{message}</p>}

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
