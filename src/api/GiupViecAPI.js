import { API, standardResponse } from "./middleware";

export async function taoPhieuDichVu(data) {
  const url = `/api/phieudichvu`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layIdKhachHang(data) {
  const url = "/api/layIdKhachHang/" + data;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layDanhSachChiTietDVTheoId(data){
  const url = "/api/layChiTietDVTheoIdDV/" + data;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layChiTietDVTheoIdKieuDV(data){
  const url = "/api/layChiTietDVTheoIdKieuDV/" + data;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layKieuDVByIdDV(data){
  const url = "/api/layKieuDVByIdDV/" + data;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}