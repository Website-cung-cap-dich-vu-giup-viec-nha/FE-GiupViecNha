import { API, standardResponse } from "./middleware";

export async function layChiTietNLTheoIdPDV(id) {
  const url = "/api/layChiTietNLTheoIdPDV/" + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layChiTietNgayLamKH(data) {
  const url = "/api/layChiTietNgayLamKH/";
  return API.get(url, { params: data })
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data || error.message));
}
