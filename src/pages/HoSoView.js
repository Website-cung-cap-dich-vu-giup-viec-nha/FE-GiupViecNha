import React, { useEffect, useState } from "react";
import HoSo from "../components/HoSo";
import pattern from "../assets/background/pattern.jpg";
import DoiMatKhau from "../components/DoiMatKhau";
import DiaChi from "../components/DiaChi";
import HoaDonKH from "../components/HoaDonKH";
import { isStaff } from "../api/admin/StaffAPI";
const HoSoView = ({ user, handleReloadHeader }) => {
  const [activeComponent, setActiveComponent] = useState("HoSo");
  const [staff, setStaff] = useState(false);
  const checking = async () => {
    try {
      const response = await isStaff();
      if (response?.message?.data?.data === true) {
        setStaff(true);
      } else {
        setStaff(false);
      }
    } catch (error) {
      console.log(error);
      setStaff(false);
    }
  };
  useEffect(() => {
    checking();
  }, []);
  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="container py-4">
        <div className="row d-block d-md-flex justify-content-center">
          <div className="col-md-3 col-12 me-3">
            <div className="row">
              <div className="col-md-10 col-12 p-0 mb-md-0 mb-4">
                <ul
                  id="sideBarUser"
                  className="nav flex-column rounded"
                  style={{ backgroundColor: "#FF8227" }}
                >
                  <li className="nav-item border-bottom border-secondary">
                    <span
                      className="nav-link"
                      onClick={() => setActiveComponent("HoSo")}
                    >
                      {" "}
                      <i className="fa-solid fa-address-card me-2"></i> Hồ sơ
                    </span>
                  </li>
                  <li className="nav-item border-bottom border-secondary">
                    <span
                      className="nav-link"
                      onClick={() => setActiveComponent("DoiMatKhau")}
                    >
                      {" "}
                      <i className="fa-solid fa-key me-2"></i> Đổi mật khẩu
                    </span>
                  </li>
                  <li className="nav-item border-bottom border-secondary" hidden={staff}>
                    <span
                      className="nav-link"
                      onClick={() => setActiveComponent("DiaChi")}
                    >
                      {" "}
                      <i className="fa-solid fa-map-location-dot me-2"></i> Địa
                      chỉ
                    </span>
                  </li>
                  <li className="nav-item" hidden={staff}>
                    <span
                      className="nav-link"
                      onClick={() => setActiveComponent("PhieuDichVu")}
                    >
                      {" "}
                      <i className="fa-solid fa-file-invoice me-2"></i> Phiếu
                      dịch vụ
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {activeComponent === "HoSo" && (
              <HoSo user={user} handleReloadHeader={handleReloadHeader} />
            )}
            {activeComponent === "DoiMatKhau" && <DoiMatKhau user={user} />}
            {activeComponent === "DiaChi" && <DiaChi user={user} />}
            {activeComponent === "PhieuDichVu" && <HoaDonKH user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoSoView;
