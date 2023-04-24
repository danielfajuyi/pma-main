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
  handlePayment
) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post(url, user);
    dispatch(loginSuccess(res.data));
    setMessage("Registration successful!");
    userRole !== "client" && handlePayment();
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(loginFailure());
  }
};

export const update = async (dispatch, url, user, setMessage, setModalTxt) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(url, user);
    dispatch(updateSuccess(res.data));
    toast.success("Data updated successfully, kindly referesh.");
    setModalTxt("save");
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(updateFailure());
  }
};

export const update2 = async (dispatch, url, user, setMessage, setModalTxt) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.post(url, user);
    dispatch(updateSuccess(res.data));
    setModalTxt("save");
    return toast.success("Data updated successfully, kindly referesh.");
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(updateFailure());
  }
};

export const loginForgot = async (dispatch, user) => {
  dispatch(forgotLoginStart());
  try {
    const res = await forgotRequest.post("/auth/forgot-password-request", user);
    dispatch(forgotLoginSuccess(res.data));
    // window.location.reload();
    alert("Password reset link has been sent to your email.");
  } catch (err) {
    toast.error(err?.response?.data);
    dispatch(forgotLoginFailure());
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
};

export const makePost = async (dispatch, url, data, setInputs) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, data);
    dispatch(processSuccess());
    toast.success(res.data);
    setInputs({})
    // console.log(res.data);
  } catch (err) {
    toast.error(err?.response?.data);
    dispatch(processFailure());
  }
};

export const makeGet = async (dispatch, url, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.get(url);
    dispatch(processSuccess());
    setMessage(res.data);
    // toast.success("Job has been posted successfully!");
  } catch (err) {
    toast.error(err?.response?.data);
    dispatch(processFailure());
  }
};

export const makeEdit = async (dispatch, url, setMessage, inputs) => {
  dispatch(processStart());
  try {
    const res = await userRequest.put(url, inputs);
    dispatch(processSuccess());
    setMessage(res.data);
    toast.success("Data uploaded successfully.");
    // console.log(res.data);
  } catch (err) {
    dispatch(processFailure());
  }
};
