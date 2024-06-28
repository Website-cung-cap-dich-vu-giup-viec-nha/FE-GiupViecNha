import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layIdKhachHang } from "../api/GiupViecAPI";
import moment from "moment";
import {
  layPhieuDichVuTheoIdKhachHang,
  phieudichvu,
} from "../api/PhieuDichVuAPI";
import { layDiaChi } from "../api/DiaChiAPI";
import Swal from "sweetalert2";
import { deleteProductReceipt } from "../api/admin/ProductReceiptAPI";

const HoaDonKH = ({ user }) => {
  const [phieuDVs, setPhieuDVs] = useState([]);
  const [phieuDV, setPhieuDV] = useState({});
  const [dchi, setDChi] = useState({});
  const [load, setLoad] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const layDSPhieuDV = async () => {
      try {
        const idKH = await layIdKhachHang(user.id);
        const response = await layPhieuDichVuTheoIdKhachHang(
          idKH.message.data[0]
        );
        setPhieuDVs(response.message.data);
      } catch (error) {
        console.log(error);
      }
    };
    layDSPhieuDV();
  }, [load]);

  const handleClick = async (e) => {
    const value = e.currentTarget.getAttribute("value");
    try {
      const response = await phieudichvu(value);
      setPhieuDV(response.message.data[0]);

      const dc = await layDiaChi(response.message.data[0].idDiaChi);
      setDChi(dc.message.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleThanhToan = () => {
    navigate("/phuongthucthanhtoan", { state: { phieuDV } });
  };

  const handleHuyPhieu = async () => {
    try {
      Swal.fire({
        icon: "warning",
        cancelButtonText: "Trở lại",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xác nhận",
        title: "Bạn có chắc là muốn hủy phiếu dịch vụ này?",
        text: "Bạn sẽ không thể hoàn tác sau khi hủy!",
        input: "select",
        inputOptions: {
          reason1: "Tôi đã đặt nhầm ngày",
          reason2: "Tôi phát hiện trùng lịch, sẽ đặt vào hôm khác",
          reason3: "Khác",
        },
        inputPlaceholder: "Vì sao bạn lại hủy ?",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProductReceipt(phieuDV.idPhieuDichVu);
          setLoad(!load);
          if (modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getInstance(
              modalRef.current
            );
            modalInstance.hide();
          }
          Swal.fire({
            title: "Đã hủy!",
            text: "Phiếu dịch vụ của bạn đã được hủy.",
            icon: "success",
          });
        }
      });
    } catch (error) {}
  };

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
                        {item.TinhTrang === 1 && (
                          <span className="text-warning">Đang duyệt</span>
                        )}
                        {item.TinhTrang === 2 && (
                          <span className="text-success">Đã duyệt</span>
                        )}
                        {item.TinhTrang === 3 && (
                          <span className="text-danger">Đã hủy</span>
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
          ref={modalRef}
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
                <h3 className="text-center">{phieuDV.tenDichVu}</h3>
                <p>Ngày làm việc trong tuần: {phieuDV.BuoiDangKyDichVu}</p>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      Ngày bắt đầu:{" "}
                      {moment(phieuDV.NgayBatDau).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>Số buổi: {phieuDV.SoBuoi}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>Số giờ làm việc: {phieuDV.SoGio}</p>
                  </div>
                  <div className="col-md-6">
                    <p>Giờ bắt đầu: {phieuDV.GioBatDau}</p>
                  </div>
                </div>
                {phieuDV.SoNguoiDuocChamSoc && (
                  <p>Số người được chăm sóc: {phieuDV.SoNguoiDuocChamSoc}</p>
                )}
                {phieuDV.tenChiTietDichVu && (
                  <p>
                    Loại máy: {phieuDV.tenKieuDichVu} -{" "}
                    {phieuDV.tenChiTietDichVu}
                  </p>
                )}
                {phieuDV.tenKieuDichVu?.includes("Sofa") && (
                  <p>Loại SoFa: {phieuDV.tenKieuDichVu}</p>
                )}
                <p>
                  Địa chỉ:{" "}
                  {`${dchi.Duong}, ${dchi.ward_name}, ${dchi.district_name}, ${dchi.province_name}`}
                </p>
                <div className="mb-3">
                  <p>Ghi chú: {phieuDV.GhiChu ? phieuDV.GhiChu : ""}</p>
                </div>
                <p className="text-end">
                  Tổng tiền:{" "}
                  <strong>
                    {(phieuDV?.Tongtien || 0).toLocaleString("vi-VN")} đồng
                  </strong>
                </p>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                {phieuDV.TinhTrang !== 3 &&  phieuDV.TinhTrangThanhToan !== 2 && (
                  <button className="btn btn-danger" onClick={handleHuyPhieu}>
                    Hủy phiếu
                  </button>
                )}

                {phieuDV.TinhTrang === 2 ? (
                  phieuDV.TinhTrangThanhToan === 1 ? (
                    <button
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleThanhToan}
                    >
                      Thanh toán
                    </button>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      Thanh toán
                    </button>
                  )
                ) : (
                  ""
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
