import React from "react";
import DangNhap from "../components/DangNhap";
import bg2 from "../assets/background/bg2.png"
const DangNhapView = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#FF8227",
      }}
    >
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-lg-block d-none d-lg-flex align-items-center justify-content-center"
          >
            <img src={bg2} alt="" />
          </div>
          <div className="col-lg-6 p-4">
            <DangNhap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangNhapView;
