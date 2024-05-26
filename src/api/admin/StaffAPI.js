import { API, standardResponse } from "../middleware";

export async function getStaff(searchData) {
  const url = `/api/NhanVien?searchData=${searchData}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
