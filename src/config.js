// src/config.js
import Cookies from "js-cookie";
const config = {
  apiBaseUrl: "https://begiupviecnhahuit.000webhostapp.com",
};

const removeToken = () => {
  Cookies.remove("token");
}

const getToken = () => {
  return Cookies.get("token");
}
export { getToken, removeToken, config };
