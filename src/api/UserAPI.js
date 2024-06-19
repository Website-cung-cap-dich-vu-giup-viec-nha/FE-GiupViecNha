import { API, standardResponse } from "./middleware";

export async function capNhatUser(id, data) {
  const url = "/api/user/" + id;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
