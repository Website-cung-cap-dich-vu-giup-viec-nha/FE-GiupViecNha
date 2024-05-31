import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { thanhToanVnPay } from "../api/ThanhToanAPI";

const PhuongThucThanhToan = () => {
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const location = useLocation();
  const { phieuDV } = location.state || {};
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.id);
  };

  const handleThanhToan = async () =>{
    try {
        const response = await thanhToanVnPay({hd: phieuDV.idPhieuDichVu, tt: phieuDV.Tongtien});
        
        if (response.message.data && response.message.data.data) {
          window.location.href = response.message.data.data;
        } else {
          console.error("Invalid response data:", response.message.data);
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="container py-5">
      <div className="mb-3">
        <label className="form-label lead">Chọn phương thức thanh toán</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="momo"
            checked={paymentMethod === "momo"}
            onChange={handlePaymentChange}
          />
          <label className="form-check-label" htmlFor="momo">
            <img
              width={30}
              src={require("../assets/icon/icons8-cash-48.png")}
              alt=""
            />{" "}
            Thanh toán bằng MoMo
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="vnpay"
            checked={paymentMethod === "vnpay"}
            onChange={handlePaymentChange}
          />
          <label className="form-check-label" htmlFor="vnpay">
            <img
              width={30}
              src={require("../assets/icon/icon-vnpay.png")}
              alt=""
            />{" "}
            Thanh toán bằng VNPAY
          </label>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleThanhToan}>Xác nhận</button>
    </div>
  );
};

export default PhuongThucThanhToan;
