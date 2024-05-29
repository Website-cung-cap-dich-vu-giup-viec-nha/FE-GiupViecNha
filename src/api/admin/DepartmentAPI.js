import { API, standardResponse } from "../middleware";

export async function getDepartment() {
  const url = `/api/PhongBan`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}