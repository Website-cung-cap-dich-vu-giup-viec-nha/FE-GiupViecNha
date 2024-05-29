import axios from "axios";
import React, { useEffect, useState } from "react";
import { layIdKhachHang } from "../api/GiupViecAPI";

const HoaDonKH = ({ user }) => {
  const [phieuDVs, setPhieuDVs] = useState([]);
  const [phieuDV, setPhieuDV] = useState({});
  const [dchi, setDChi] = useState({});
  useEffect(() => {
    const layDSPhieuDV = async () => {
      const idKH = await layIdKhachHang(user.id);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/layPhieuDichVuTheoIdKhachHang/" +
          idKH.message.data[0]
      );
      setPhieuDVs(response.data);
    };
    layDSPhieuDV();
  }, [user.id]);
  const handleClick = async (e) => {
    const value = e.currentTarget.getAttribute("value");
    const response = await axios.get(
      "http://127.0.0.1:8000/api/phieudichvu/" + value
    );
    setPhieuDV(response.data[0]);
    const dc = await axios.get(
      "http://127.0.0.1:8000/api/diachi/" + response.data[0].idDiaChi
    );
    setDChi(dc.data);
  };
  return (
    <div className="container-fluid bg-light border p-3 rounded">
      <div className="row">
        {phieuDVs  ? (
          phieuDVs.map((item) => {
            return (
              <div key={item.idPhieuDichVu} className="col-lg-4 mb-3">
                <div
                  className="bg-white border-top border-4 border-primary rounded p-2"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                  data-bs-target="#xemThongTin"
                  data-bs-toggle="modal"
                  value={item.idPhieuDichVu}
                >
                  <h5>{item.tenDichVu}</h5>
                  <div className="border-top d-flex">
                    <div
                      className="d-flex flex-column border-end"
                      style={{ flex: 1 }}
                    >
                      <small className="">Mã hóa đơn</small>
                      <div className="d-flex justify-content-center align-items-center flex-fill">
                        <span className="">{item.idPhieuDichVu}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column " style={{ flex: 1 }}>
                      <small className="ps-2">Tình trạng</small>
                      <div className="text-end mt-1">
                        {item.TinhTrang === 1 ? (
                          <span className="text-warning">Đang duyệt</span>
                        ) : (
                          <span className="text-success">Đã duyệt</span>
                        )}
                      </div>
                      {item.TinhTrangThanhToan === 1 ? (
                        <p className="border-top m-0 pt-2 text-success text-end text-danger">
                          Chưa thanh toán
                        </p>
                      ) : (
                        <p className="border-top m-0 pt-2 text-success text-end text-success">
                          Đã thanh toán
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className="text-center">Bạn chưa đặt dịch vụ nào</h3>
        )}

        <div
          class="modal fade"
          id="xemThongTin"
          tabindex="-1"
          aria-labelledby="xemThongTin"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="xemThongTin">
                  Thông tin phiếu dịch vụ
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h3 className="text-center mb-3">{phieuDV.tenDichVu}</h3>
                {/* <label className="form-label" htmlFor="NgayLamViec">
                  Ngày làm việc trong tuần
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={phieuDV.BuoiDangKyDichVu}
                  readOnly
                /> */}
                <p>Ngày làm việc trong tuần: {phieuDV.BuoiDangKyDichVu}</p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    {/* <label htmlFor="NgayBatDau" className="form-label">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      id="NgayBatDau"
                      className="form-control"
                      value={phieuDV.NgayBatDau}
                      disabled
                    /> */}
                    <p>Ngày bắt đầu: {phieuDV.NgayBatDau}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    {/* <label htmlFor="SoBuoi" className="form-label">
                      Số buổi
                    </label>
                    <input
                      type="text"
                      id="SoBuoi"
                      className="form-control"
                      value={phieuDV.SoBuoi}
                      readOnly
                    /> */}
                    <p>Số buổi: {phieuDV.SoBuoi}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    {/* <label htmlFor="SoGioLamViec" className="form-label">
                      Số giờ làm việc
                    </label>
                    <input
                      type="text"
                      id="SoGioLamViec"
                      className="form-control"
                      value={phieuDV.SoGio}
                      readOnly
                    /> */}
                    <p>Số giờ làm việc: {phieuDV.SoGio}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    {/* <label htmlFor="GioBatDau" className="form-label">
                      Giờ bắt đầu
                    </label>
                    <input
                      type="text"
                      id="GioBatDau"
                      className="form-control"
                      value={phieuDV.GioBatDau}
                      readOnly
                    /> */}
                    <p>Giờ bắt đầu: {phieuDV.GioBatDau}</p>
                  </div>
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="GhiChu" className="form-label">
                    Ghi chú
                  </label> */}
                  <p>Ghi chú: {phieuDV.GhiChu ? phieuDV.GhiChu : ""}</p>
                  {/* <textarea
                    className="form-control"
                    id="GhiChu"
                    rows={5}
                    value={phieuDV.GhiChu ? phieuDV.GhiChu : ""}
                    readOnly
                  ></textarea> */}
                </div>
                {/* <label className="form-label"></label> */}
                {/* <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={`${dchi.Duong}, ${dchi.ward_name}, ${dchi.district_name}, ${dchi.province_name}`}
                /> */}
                <p>
                  Địa chỉ:{" "}
                  {`${dchi.Duong}, ${dchi.ward_name}, ${dchi.district_name}, ${dchi.province_name}`}
                </p>
                <p>Tổng tiền: {phieuDV.Tongtien}</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-primary">Chi tiết ngày làm</button>
                {phieuDV.TinhTrang === 1 ? (
                  ""
                ) : phieuDV.TinhTrangThanhToan === 1 ? (
                  <button className="btn btn-primary">Thanh toán</button>
                ) : (
                  <button className="btn btn-primary" disabled>
                    Thanh toán
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoaDonKH;
