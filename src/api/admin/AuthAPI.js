import { API, standardResponse } from "../middleware";

export async function getProfile() {
  const url = `/api/auth/profile`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function logout() {
  const url = `/api/auth/logout`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function doiMatKhau(doimatkhau) {
  const url = `/api/auth/doimatkhau`;

  return API.put(url, doimatkhau)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function checkPermission(idQuyen) {
  const url = `/api/PhanQuyen/${idQuyen}/checkQuyen`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}