import { API, standardResponse } from "../middleware";

export async function getProductReceiptStaffByIDChiTietNgayLam(idChiTietNgayLam) {
  const url = `/api/ChiTietNhanVienLamDichVu/getDataByIdChiTietNgayLam/${idChiTietNgayLam}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function insertProductReceiptStaff(data) {
  const url = `/api/ChiTietNhanVienLamDichVu`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteProductReceiptStaff(id) {
  const url = `/api/ChiTietNhanVienLamDichVu/${id}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}