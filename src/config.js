// src/config.js
import Cookies from "js-cookie";
const config = {
  apiBaseUrl: "http://be-giup-viec-nha.infinityfreeapp.com",
};

const removeToken = () => {
  Cookies.remove("token");
}

const getToken = () => {
  return Cookies.get("token");
}
export { getToken, removeToken, config };
