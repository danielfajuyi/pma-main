import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const forgetPassword = user && JSON.parse(user).forgetPassword;
const TOKEN = currentUser?.accessToken;
const FORGOTTOKEN = forgetPassword?.forgotToken;

export const baseURL = process.env.REACT_APP_API_URL;

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const userRequest_2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL_V2,
  headers: { token: `Bearer ${TOKEN}` },
});

export const forgotRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${FORGOTTOKEN}` },
});
