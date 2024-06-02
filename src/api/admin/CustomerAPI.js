import { API, standardResponse } from "../middleware";

export async function getAllCustomer() {
  const url = `/api/KhachHang`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}