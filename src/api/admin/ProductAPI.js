import { API, standardResponse } from "../middleware";

export async function getProduct() {
  const url = `/api/DichVu`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}