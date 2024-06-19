import { API, standardResponse } from "./middleware";

export async function layPhieuDichVuTheoIdKhachHang(id) {
  const url = "/api/layPhieuDichVuTheoIdKhachHang/" + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function phieudichvu(value) {
  const url = "/api/phieudichvu/" + value;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}
