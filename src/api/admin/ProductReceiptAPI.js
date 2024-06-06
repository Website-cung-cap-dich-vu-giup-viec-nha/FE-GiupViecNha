import { API, standardResponse } from "../middleware";

export async function getProductReceipt(searchData, start, take) {
  const url = `/api/PhieuDichVu?startDate=${searchData?.startDate}&endDate=${searchData?.endDate}&idPhieuDichVu=${searchData?.idPhieuDichVu}&TinhTrang=${searchData?.TinhTrang}&TinhTrangThanhToan=${searchData?.TinhTrangThanhToan}&idDichVu=${searchData?.idDichVu}&start=${start}&take=${take}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function deleteProductReceipt(id) {
  const url = `/api/PhieuDichVu/${id}`;

  return API.delete(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function updateProductReceiptTinhTrang(idPhieuDichVu, TinhTrang) {
  const url = `/api/PhieuDichVu/updateTinhTrang/${idPhieuDichVu}/${TinhTrang}`;

  return API.put(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}