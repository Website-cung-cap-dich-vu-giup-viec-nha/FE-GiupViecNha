import { API, standardResponse } from "../middleware";

export async function getPositionByDepartment(idPhongBan) {
  const url = `/api/ChucVu/getPositionByDepartment/${idPhongBan}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}