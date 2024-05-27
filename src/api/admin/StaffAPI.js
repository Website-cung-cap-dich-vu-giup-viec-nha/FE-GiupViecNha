import { API, standardResponse } from "../middleware";

export async function getStaff(searchData, start, take) {
  const url = `/api/NhanVien?searchData=${searchData}&start=${start}&take=${take}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
