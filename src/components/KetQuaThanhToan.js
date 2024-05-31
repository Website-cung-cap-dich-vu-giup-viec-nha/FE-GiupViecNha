import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { xacNhanThanhToan } from "../api/ThanhToanAPI";

const KetQuaThanhToan = () => {
  const [ketQua, setKetQua] = useState({});
  const location = useLocation();
  const queryParams = location.search;
  useEffect(() => {
    const ktraKetQua = async () => {
      const response = await xacNhanThanhToan(queryParams)
      console.log(response.message.data.data)
      setKetQua(response.message.data.data);
    };
    ktraKetQua();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">
        {ketQua.RspCode !== "00"
          ? "Thanh toán thất bại!"
          : "Thanh toán thành công!"}
      </h2>
    </div>
  );
};

export default KetQuaThanhToan;
