import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { userRequest } from "./requestMethod";
import { toast } from "react-toastify";
import { processFailure, processStart, processSuccess } from "./processRedux";

export const register = async (dispatch, url, user, setMessage, setUser) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, user);
    setUser(res.data);
    dispatch(processSuccess());
    setMessage("Registration successful!");
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(processFailure());
  }
};

export const login = async (dispatch, url, user, setMessage, setUser) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post(url, user);
    dispatch(loginSuccess(res.data));
    setMessage("Login successful!");
    window.location.reload();
  } catch (err) {
    setUser(err?.response?.data);
    setMessage(err?.response?.data);
    err?.response?.data?.message && alert(err?.response?.data?.message);
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

export const userLogout = async (dispatch) => {
  dispatch(logout());
};

export const makePost = async (dispatch, url, data, setInputs) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, data);
    dispatch(processSuccess());
    toast.success(res.data);
    setInputs({});
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
    // toast.error(err?.response?.data);
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
