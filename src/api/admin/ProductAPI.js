import { API, standardResponse } from "../middleware";

export async function getProduct() {
  const url = `/api/dichvu`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function searchDichVu(search) {
  const url = `/api/dichvu/search/` + search;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}