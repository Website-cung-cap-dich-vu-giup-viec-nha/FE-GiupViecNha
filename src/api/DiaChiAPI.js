import { API, standardResponse } from "./middleware";

export async function layDiaChiByIdNguoiDung(id) {
  const url = "/api/layDiaChiByIdNguoiDung/" + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getProvince() {
  const url = `/api/province`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layHuyenByProvinceId(id) {
  const url = `/api/layHuyenByProvinceId/` + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layXaByDistrictId(id) {
  const url = `/api/layXaByDistrictId/` + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layDiaChi(id) {
  const url = `/api/diachi/` + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function xoaDiaChi(id) {
  const url = `/api/diachi/` + id;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function capNhatMacDinh(id) {
  const url = `/api/diachi/` + id;

  return API.put(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function themDiaChi(diachi) {
  const url = `/api/diachi/`;

  return API.post(url, diachi)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
