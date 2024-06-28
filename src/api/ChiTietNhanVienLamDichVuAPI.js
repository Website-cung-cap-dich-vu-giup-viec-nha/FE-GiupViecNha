import { API, standardResponse } from "./middleware";

export async function layChiTietNhanVienLamDichVu(id) {
  const url = "/api/ChiTietNhanVienLamDichVu/" + id;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}