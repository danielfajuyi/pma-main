import {
  forgotLoginFailure,
  forgotLoginStart,
  forgotLoginSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  processFailure,
  processStart,
  processSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { forgotRequest, userRequest } from "./requestMethod";
import { toast } from "react-toastify";

export const makePost = async (dispatch, url, data, setErrTxt) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, data);
    dispatch(processSuccess(res.data));
    alert(res.data);
  } catch (err) {
    dispatch(processFailure());
    setErrTxt(err?.response?.data);
    return alert(err?.response?.data);
  }
};

export const login = async (dispatch, user, setErrTxt) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (err) {
    dispatch(loginFailure());
    setErrTxt(err.response.data);
    return toast.error(err.response.data);
  }
};

export const update = async (dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put("/user/edit/user", user);
    dispatch(updateSuccess(res.data));
    // window.location.reload();
    return toast.success("Data updated successfully, kindly referesh.");
  } catch (err) {
    dispatch(updateFailure());
    return toast.error(err.response.data);
  }
};

export const loginForgot = async (dispatch, user) => {
  dispatch(forgotLoginStart());
  try {
    const res = await forgotRequest.post("/auth/forgot-password-request", user);
    dispatch(forgotLoginSuccess(res.data));
    // window.location.reload();
    return alert("Password reset link has been sent to your email.");
  } catch (err) {
    dispatch(forgotLoginFailure());
    return toast.error(err.response.data);
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
};
