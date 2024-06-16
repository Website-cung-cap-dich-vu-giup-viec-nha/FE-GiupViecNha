import axios from "axios";
import React, { useEffect, useState } from "react";
import { layIdKhachHang } from "../api/GiupViecAPI";
import moment from "moment";
import { layThongTinNV } from "../api/NhanVienAPI";
import { config } from "../config";

const LichKH = ({ user }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weekData, setWeekData] = useState([]);
  const [nv, setNV] = useState({});
  const [loading, setLoading] = useState(true);

  const weekDays = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  // Tìm ngày đầu tuần (thứ Hai)
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    today.getDate() - ((today.getDay() + 6) % 7) + currentWeek * 7
  );

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchWeekData = async (start, end) => {
    try {
      const idKH = await layIdKhachHang(user.id);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/layChiTietNgayLamKH",
        {
          params: {
            idKH: idKH.message.data[0],
            startDate: moment(start).format("YYYY/MM/DD"),
            endDate: moment(end).format("YYYY/MM/DD"),
          },
        }
      );
      console.log(response.data);
      response.data.sort((a, b) => new Date(a.NgayLam) - new Date(b.NgayLam));
      setWeekData(response.data);
    } catch (error) {
      console.error("Error fetching week data", error);
    }
  };

  useEffect(() => {
    fetchWeekData(startOfWeek, endOfWeek);
  }, [currentWeek]);

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleMouseOver = (e) => {
    e.target.style.textDecoration = "underline";
  };

  const handleMouseOut = (e) => {
    e.target.style.textDecoration = "none";
  };

  const hanleClickNV = async (e) => {
    setLoading(true);
    const value = e.currentTarget.getAttribute("value");
    try {
      const response = await layThongTinNV(value);
      setNV(response.message.data);
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false);
    }
  };

  const getBackgroundColor = (TinhTrangDichVu) => {
    switch (TinhTrangDichVu) {
      case 1:
        return "#e7ecf0"; // Màu nền thứ nhất
      case 2:
        return "#fdff9a"; // Màu nền thứ hai
      case 3:
        return "#92d6ff"; // Màu nền thứ ba
      default:
        return "#ffffff"; // Màu nền mặc định (trắng)
    }
  };

  return (
    <div className="container-fluid bg-light border p-3 rounded">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="px-2 me-2 rounded" style={{backgroundColor:"#e7ecf0"}}>Chưa thực hiện</p>
            <p className="px-2 me-2 rounded" style={{backgroundColor:"#fdff9a"}}>Đang thực hiện</p>
            <p className="px-2 me-2 rounded" style={{backgroundColor:"#92d6ff"}}>Đã hoàn tất</p>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-outline-primary me-2"
              onClick={handlePreviousWeek}
            >
              <i className="fa-solid fa-angle-left"></i> Trở về
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleNextWeek}
            >
              Tiếp <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  {week.map((day, index) => (
                    <td key={index}>
                      <div className="d-flex flex-column align-items-center fw-bold text-primary">
                        <span>{weekDays[index]}</span>
                        <span>{formatDate(day)}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weekDays.map((_, dayIndex) => (
                    <td key={dayIndex} className="py-0">
                      {weekData
                        .filter((item) => {
                          const itemDate = new Date(item.NgayLam);
                          return itemDate.getDay() === dayIndex + 1; // Ngày trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
                        })
                        .map((item, index) => (
                          <div
                            key={index}
                            className="p-2 rounded text-start my-1"
                            style={{backgroundColor:getBackgroundColor(item.TinhTrangDichVu)}}
                          >
                            <p className="m-0 fw-bold">{item.tenDichVu}</p>
                            <p className="m-0">Mã HD: {item.idPhieuDichVu}</p>
                            <p className="m-0">Giờ bắt đầu: {item.GioBatDau}</p>
                            <p className="m-0">
                              NV:{" "}
                              <span
                                style={{ cursor: "pointer" }}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={hanleClickNV}
                                data-bs-target="#xemThongTinNV"
                                data-bs-toggle="modal"
                                value={item.idNhanVien}
                              >
                                {item.name}
                              </span>
                            </p>
                          </div>
                        ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="xemThongTinNV"
        tabIndex="-1"
        aria-labelledby="xemThongTinNV"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="xemThongTinNV">
                Thông tin nhân viên
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!loading && <div className="row">
                <div className="col-sm-4 text-center">
                  <img
                    className="rounded m-auto"
                    src={`${config.apiBaseUrl}/${nv.Anh}`}
                    alt=""
                    width={150}
                  />
                </div>
                <div className="col-sm-8 mt-3 mt-sm-0">
                  <p>
                    Họ và tên: <strong>{nv.name}</strong>
                  </p>
                  <div className="d-flex justify-content-between">
                    <p>
                      Ngày sinh:{" "}
                      <strong>
                        {moment(nv.NgaySinh).format("DD/MM/YYYY")}
                      </strong>
                    </p>
                    <p>
                      Giới tính: <strong>{nv.GioiTinh}</strong>
                    </p>
                  </div>
                  <p>
                    Số sao: <strong>{nv.SoSao}</strong>
                  </p>
                  <p>
                    Chức vụ: <strong>{nv.tenChucVu}</strong>
                  </p>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichKH;
