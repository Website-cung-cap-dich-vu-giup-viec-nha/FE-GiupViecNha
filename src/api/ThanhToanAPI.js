import { API, standardResponse } from "./middleware";

export async function thanhToanVnPay(data) {
  const url = "/api/thanhtoanvnpay";

  return API.post(url,data)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}

export async function xacNhanThanhToan(data) {
    const url = "/api/xacnhanthanhtoan" + data;
  
    return API.get(url)
      .then((response) => standardResponse(true, response))
      .catch((error) => standardResponse(false, error.response?.data));
  }
