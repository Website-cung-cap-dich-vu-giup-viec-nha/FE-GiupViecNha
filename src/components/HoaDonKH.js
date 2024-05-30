import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layIdKhachHang } from "../api/GiupViecAPI";
import { config } from "../config";

const HoaDonKH = ({ user }) => {
  const [phieuDVs, setPhieuDVs] = useState([]);
  const [phieuDV, setPhieuDV] = useState({});
  const [dchi, setDChi] = useState({});
  const [chiTietNL, setChiTietNL] = useState([]);
  const navigate = useNavigate();

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
  }, []);

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

  const handleChiTiet = async (e) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/layChiTietNLTheoIdPDV/" +
          phieuDV.idPhieuDichVu
      );
      setChiTietNL(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleThanhToan = () =>{
    navigate("/phuongthucthanhtoan", { state: { phieuDV } })
  }

  return (
    <div className="container-fluid bg-light border p-3 rounded">
      <div className="row">
        {phieuDVs ? (
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
          className="modal fade"
          id="xemThongTin"
          tabIndex="-1"
          aria-labelledby="xemThongTin"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="xemThongTin">
                  Thông tin phiếu dịch vụ
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h3 className="text-center mb-3">{phieuDV.tenDichVu}</h3>
                <p>Ngày làm việc trong tuần: {phieuDV.BuoiDangKyDichVu}</p>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p>Ngày bắt đầu: {phieuDV.NgayBatDau}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p>Số buổi: {phieuDV.SoBuoi}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p>Số giờ làm việc: {phieuDV.SoGio}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p>Giờ bắt đầu: {phieuDV.GioBatDau}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p>Ghi chú: {phieuDV.GhiChu ? phieuDV.GhiChu : ""}</p>
                </div>

                <p>
                  Địa chỉ:{" "}
                  {`${dchi.Duong}, ${dchi.ward_name}, ${dchi.district_name}, ${dchi.province_name}`}
                </p>
                <p>Tổng tiền: {phieuDV.Tongtien}</p>
              </div>

              {phieuDV.TinhTrang === 1 ? (
                ""
              ) : (
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    data-bs-target="#xemThongTinChiTiet"
                    data-bs-toggle="modal"
                    onClick={handleChiTiet}
                  >
                    Chi tiết dịch vụ
                  </button>
                  {phieuDV.TinhTrangThanhToan === 1 ? (
                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleThanhToan}>Thanh toán</button>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      Thanh toán
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="xemThongTinChiTiet"
          tabIndex="-1"
          aria-labelledby="xemThongTinChiTiet"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="xemThongTinChiTiet">
                  Thông tin chi tiết ngày thực hiện dịch vụ
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-target="#xemThongTin"
                  data-bs-toggle="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-light">
                <div className="container-fluid">
                  <div className="row">
                    {chiTietNL.map((item) => {
                      return (
                        <div key={item.idChiTietNgayLam} className="col-md-6">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td colSpan={2}>Ngày làm: {item.NgayLam}</td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src={`${config.apiBaseUrl}/${item.Anh}`}
                                    alt=""
                                    width={40}
                                    className="rounded-circle"
                                  />
                                </td>
                                <td>{item.name}</td>
                              </tr>
                              <tr>
                                {item.TinhTrangDichVu === 1 && (
                                  <td colSpan={2} className="text-danger text-end">
                                    Chưa thực hiện
                                  </td>
                                )}
                                {item.TinhTrangDichVu === 2 && (
                                  <td colSpan={2} className="text-warning text-end">
                                    Đang thực hiện
                                  </td>
                                )}
                                {item.TinhTrangDichVu === 3 && (
                                  <td colSpan={2} className="text-success text-end">
                                    Đã xong
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoaDonKH;
