import { API, standardResponse } from "./middleware";

export async function taoPhieuDichVu(data) {
  const url = `/api/phieudichvu`;

  return API.post(url, data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function layIdKhachHang(data) {
    const url = "/api/layIdKhachHang/"+data;
  
    return API.get(url)
      .then((response) => standardResponse(true, response))
      .catch((error) => standardResponse(false, error.response?.data));
  }