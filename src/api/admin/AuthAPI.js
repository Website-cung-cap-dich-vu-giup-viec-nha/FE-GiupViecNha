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

export async function getPermissionByIdNhanVien() {
  const url = `/api/Quyen/getQuyenByIdNhanVien`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getGroup(searchData, start, take) {
  const url = `/api/Nhom?searchData=${searchData}&start=${start}&take=${take}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertGroup(data) {
  const url = `/api/Nhom`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function updateGroup(data, id) {
  const url = `/api/Nhom/${id}`;

  return API.put(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteGroup(id) {
  const url = `/api/Nhom/${id}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getGroupMember(idNhom) {
  const url = `/api/NhomNguoiDung?idNhom=${idNhom}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getGroupPermission(idNhom) {
  const url = `/api/PhanQuyen?idNhom=${idNhom}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertGroupMember(data) {
  const url = `/api/NhomNguoiDung`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteGroupMember(idNhomNguoiDung) {
  const url = `/api/NhomNguoiDung/${idNhomNguoiDung}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteGroupPermission(idPhanQuyen) {
  const url = `/api/PhanQuyen/${idPhanQuyen}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertGroupPermission(data) {
  const url = `/api/PhanQuyen`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}