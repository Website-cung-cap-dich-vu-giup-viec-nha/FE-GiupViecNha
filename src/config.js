// src/config.js
import Cookies from "js-cookie";
const config = {
  apiBaseUrl: "http://localhost:8000",
};

const removeToken = () => {
  Cookies.remove("token");
}

const getToken = () => {
  return Cookies.get("token");
}
export { getToken, removeToken, config };
