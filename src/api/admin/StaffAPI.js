import { API, standardResponse } from "../middleware";

export async function getStaff(searchData, start, take) {
  const url = `/api/NhanVien?searchData=${searchData}&start=${start}&take=${take}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertStaff(data) {
  const url = `/api/NhanVien`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function editStaff(data, id) {
  const url = `/api/NhanVien/${id}`;

  return API.put(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteStaff(id) {
  const url = `/api/NhanVien/${id}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getExampleExportStaffData() {
  const url = `/api/NhanVien/exportImportHeaderData`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function importStaffData(data) {
  const url = `/api/NhanVien/importData`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getStaffIsNotAddChiTietNgayLam(idChiTietNgayLam) {
  const url = `/api/NhanVien/getStaffIsNotAddChiTietNgayLam?idChiTietNgayLam=${idChiTietNgayLam}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function isStaff() {
  const url = `/api/NhanVien/isStaff`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getStaffIsNotAddNhom(idNhom) {
  const url = `/api/NhanVien/getStaffIsNotAddNhom?idNhom=${idNhom}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function getPermissionIsNotAddNhom(idNhom) {
  const url = `/api/Quyen/getPermissionIsNotAddNhom?idNhom=${idNhom}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}