import { API, standardResponse } from "../middleware";

export async function getStaffCapacity(idnhanvien) {
  const url = `/api/nanglucnhanvien?idnhanvien=${idnhanvien}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertStaffCapacity(data) {
  const url = `/api/nanglucnhanvien`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteStaffCapacity(idNangLucNhanVien) {
  const url = `/api/nanglucnhanvien/${idNangLucNhanVien}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
