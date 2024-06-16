import { API, standardResponse } from "../middleware";

export async function getDataByIdPhieuDichVu(idPhieuDichVu) {
  const url = `/api/ChiTietNgayLam/getDataByIdPhieuDichVu/${idPhieuDichVu}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function updateTinhTrangDichVu(idChiTietNgayLam, TinhTrangDichVu) {
  const url = `/api/ChiTietNgayLam/updateTinhTrangDichVu/${idChiTietNgayLam}/${TinhTrangDichVu}`;

  return API.put(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}