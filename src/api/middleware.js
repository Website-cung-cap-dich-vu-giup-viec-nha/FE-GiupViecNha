/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import config from '../config';

export const API = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: config.apiBaseUrl,
  timeout: 300000,
  headers: {
    "Accept": "application/json",
  },
  validateStatus: (status) => {
    return true;
  },
});

API.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      if (response.data.title === "Unauthorized") Cookies.remove("token");
    }
    return response;
  },
  (error) => {
    console.warn("Error status: ", error.response.status);
  }
);

API.interceptors.request.use((request) => {
  const token = Cookies.get("token");
  if (token) 
    request.headers.Authorization = "Bearer " + token;
  return request;
});

/**
 *
 * @param {boolean} success
 * @param {object} message
 * @property {boolean} success
 * @property {object} message
 */
export function standardResponse(success, message) {
  return {
    success,
    message,
  };
}

export const API_PROVINCE = axios.create({
  baseURL: "https://vapi.vnappmob.com/api",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return true;
  },
});
