import {
  forgotLoginFailure,
  forgotLoginStart,
  forgotLoginSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { forgotRequest, userRequest } from "./requestMethod";
import { toast } from "react-toastify";
import { processFailure, processStart, processSuccess } from "./processRedux";

export const loginRegister = async (
  dispatch,
  url,
  user,
  setMessage,
  userRole,
  setModalTxt,
  handlePayment
) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post(url, user);
    dispatch(loginSuccess(res.data));
    setMessage("Registration successful!");
    setModalTxt("Registration successful!");
    userRole !== "client" && handlePayment();
  } catch (err) {
    dispatch(loginFailure());
    return setMessage(err.response.data);
  }
};

export const update = async (dispatch, url, user, setMessage, setModalTxt) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(url, user);
    dispatch(updateSuccess(res.data));
    setModalTxt("save");
    return toast.success("Data updated successfully, kindly referesh.");
  } catch (err) {
    dispatch(updateFailure());
    return setMessage(err.response.data);
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

export const makePost = async (dispatch, url, data, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, data);
    dispatch(processSuccess());
    setMessage(res.data);
    // console.log(res.data);
  } catch (err) {
    dispatch(processFailure());
    return setMessage(err.response.data);
  }
};

export const makeGet = async (dispatch, url, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.get(url);
    dispatch(processSuccess());
    setMessage(res.data);
    // console.log(res.data);
  } catch (err) {
    dispatch(processFailure());
    // console.log(err.response.data)
    return toast.error(err.response.data);
  }
};

export const makeEdit = async (dispatch, url, setMessage, inputs) => {
  dispatch(processStart());
  try {
    const res = await userRequest.put(url, inputs);
    dispatch(processSuccess());
    setMessage(res.data);
    // console.log(res.data);
  } catch (err) {
    dispatch(processFailure());
  }
};
