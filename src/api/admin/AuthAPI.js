import { API, standardResponse } from "../middleware";

export async function getProfile() {
  const url = `/api/auth/profile`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function logout() {
    const url = `/api/auth/logout`;
  
    return API.get(url)
      .then((response) => standardResponse(true, response))
      .catch((error) => standardResponse(false, error.response?.data));
  }