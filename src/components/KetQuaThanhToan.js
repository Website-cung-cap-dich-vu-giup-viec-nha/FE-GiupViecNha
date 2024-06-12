import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { xacNhanThanhToan } from "../api/ThanhToanAPI";
import { CircularProgress } from "@mui/material";

const KetQuaThanhToan = () => {
  const [ketQua, setKetQua] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = location.search;
  const params = new URLSearchParams(queryParams);
  const amountString = params.get("vnp_Amount");
  const amount = amountString ? parseInt(amountString, 10) / 100 : null;

  useEffect(() => {
    const ktraKetQua = async () => {
      try {
        const response = await xacNhanThanhToan(queryParams);
        console.log(response.message.data.data);
        setKetQua(response.message.data.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    ktraKetQua();
  }, [queryParams]);

  if (loading) {
    return (
      <div className="container">
        <div className="row min-vh-100 align-content-center">
          <div className="col-12 text-center">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* <h2 className="text-center">
        {ketQua.RspCode !== "00"
          ? "Thanh toán thất bại!"
          : "Thanh toán thành công!"}
      </h2> */}

      <div className="row justify-content-center">
        <div className="col-lg-4 border rounded text-center">
          <div className="" style={{ marginTop: "-30px" }}>
            {ketQua.RspCode === "00" && (
              <img
                className="shadow rounded-circle"
                width={60}
                src={require("../assets/icon/icons8-success-96.png")}
                alt=""
              />
            )}
            {ketQua.RspCode === "02" && (
              <img
                className="shadow rounded-circle"
                width={60}
                src={require("../assets/icon/icons8-success-96.png")}
                alt=""
              />
            )}
            {ketQua.RspCode !== "02" && ketQua.RspCode !== "00" && (
              <img
                className="shadow rounded-circle"
                width={60}
                src={require("../assets/icon/icons8-close-100.png")}
                alt=""
              />
            )}
          </div>
          <p className="mt-3 mb-2 fw-bold">
            {ketQua.RspCode === "00" && "Giao dịch thành công"}
            {ketQua.RspCode === "02" && "Giao dịch thành công"}
            {ketQua.RspCode !== "02" &&
              ketQua.RspCode !== "00" &&
              "Giao dịch thất bại"}
          </p>
          <h3>{amount.toLocaleString("vi-VN")}đ</h3>
        </div>
      </div>
    </div>
  );
};

export default KetQuaThanhToan;
