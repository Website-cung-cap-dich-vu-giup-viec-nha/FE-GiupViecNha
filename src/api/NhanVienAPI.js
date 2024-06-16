import { API, standardResponse } from "./middleware";

export async function layThongTinNV(id) {
    const url = "/api/NhanVien/" + id;
  
    return API.get(url)
      .then((response) => standardResponse(true, response))
      .catch((error) => standardResponse(false, error.response?.data));
  }