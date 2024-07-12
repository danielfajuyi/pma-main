import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { userRequest, userRequest_2 } from "./requestMethod";
import { toast } from "react-toastify";
import { processFailure, processStart, processSuccess } from "./processRedux";

export const register = async (dispatch, url, user, setMessage, setUser) => {
  dispatch(processStart());
  try {
    const res = await userRequest_2.post(url, user);
    setUser(res.data);
    dispatch(processSuccess());
    setMessage("Registration successful!");
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(processFailure());
  }
};

export const login = async (dispatch, url, user, setMessage, setUser, setIsLoading) => {
  dispatch(loginStart());
  setIsLoading(true);
  try {
    const res = await userRequest.post(url, user);
    dispatch(loginSuccess(res.data));
    setIsLoading(false);
    setMessage("Login successful!");
    window.location.reload();
  } catch (err) {
    setUser(err?.response?.data);
    setMessage(err?.response?.data);
    err?.response?.data?.message && alert(err?.response?.data?.message);
    dispatch(loginFailure());
    setIsLoading(false);
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
    window.location.reload();
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

export const makeEdit = async (dispatch, url, inputs, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.put(url, inputs);
    dispatch(processSuccess());
    setMessage(res.data);
    toast.success("Data uploaded successfully.");
    window.location.reload();
    // console.log(res.data);
  } catch (err) {
    dispatch(processFailure());
  }
};
