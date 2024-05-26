import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getNextDayOfWeek = (dayOfWeek, date = new Date()) => {
  const resultDate = new Date(date.getTime());
  resultDate.setDate(
    date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7 || 7)
  );
  return resultDate;
};

const ThueDichVu = ({ dsChiTietDV, user }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [soBuoi, setSoBuoi] = useState(1);
  const [soGio, setSoGio] = useState(2);
  const [gioBatDau, setGioBatDau] = useState("");

  const navigate = useNavigate();

  const handleDayChange = (event) => {
    const selectedDayOfWeek = event.target.value;
    setSelectedDay(selectedDayOfWeek);

    if (selectedDayOfWeek !== "") {
      const dayOfWeekMap = {
        "Chủ Nhật": 0,
        "Thứ 2": 1,
        "Thứ 3": 2,
        "Thứ 4": 3,
        "Thứ 5": 4,
        "Thứ 6": 5,
        "Thứ 7": 6,
      };

      const nextDate = getNextDayOfWeek(dayOfWeekMap[selectedDayOfWeek]);
      const formattedDate = nextDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
      setNgayBD(formattedDate);
    } else {
      setNgayBD("");
    }
  };

  useEffect(() => {
    const tinhTongTien = () => {
      const selectedService = dsChiTietDV.find(
        (item) => item.BuoiDangKyDichVu === selectedDay
      );
      console.log(selectedService);
      if (selectedService) {
        const total = selectedService.GiaTien * soBuoi * soGio;
        setTongTien(total);
      } else {
        setTongTien(0);
      }
    };
    tinhTongTien();
  }, [selectedDay, soBuoi, soGio, dsChiTietDV]);

  const handleSoBuoiChange = (event) => {
    setSoBuoi(Number(event.target.value));
  };

  const handleSoGioChange = (event) => {
    setSoGio(Number(event.target.value));
  };

  const handleGioBatDauChange = (event) => {
    setGioBatDau(event.target.value);
  };

  const handleDatDichVu = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/layIdKhachHang/" + user.id
      );

      const phieuDVData = {
        Tongtien: tongTien,
        NgayBatDau: ngayBD,
        SoBuoi: soBuoi,
        SoGio: soGio,
        GioBatDau: gioBatDau,
        idKhachHang: response.data[0],
        Thu: selectedDay,
      };
      await axios.post("http://127.0.0.1:8000/api/phieudichvu", phieuDVData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <form
            className="mx-auto bg-white border rounded py-3 px-5 shadow"
            onSubmit={handleDatDichVu}
          >
            <h3 className="text-center mb-3">Giúp việc theo giờ</h3>
            <label className="form-label" htmlFor="NgayLamViec">
              Chọn ngày làm việc trong tuần
            </label>
            <select
              id="NgayLamViec"
              className="form-select mb-3"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option selected value="">
                Select an option
              </option>
              {dsChiTietDV.map((item) => (
                <option
                  key={item?.idChiTietDichVu}
                  value={item.BuoiDangKyDichVu}
                >
                  {item.BuoiDangKyDichVu}
                </option>
              ))}
            </select>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="NgayBatDau" className="form-label">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  id="NgayBatDau"
                  className="form-control"
                  value={ngayBD}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="SoBuoi" className="form-label">
                  Số buổi
                </label>
                <input
                  type="number"
                  id="SoBuoi"
                  className="form-control"
                  min={1}
                  max={182}
                  value={soBuoi}
                  onChange={handleSoBuoiChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="SoGioLamViec" className="form-label">
                  Số giờ làm việc
                </label>
                <input
                  type="number"
                  id="SoGioLamViec"
                  className="form-control"
                  min={2}
                  max={4}
                  value={soGio}
                  onChange={handleSoGioChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="GioBatDau" className="form-label">
                  Giờ bắt đầu
                </label>
                <input
                  type="time"
                  id="GioBatDau"
                  className="form-control"
                  value={gioBatDau}
                  onChange={handleGioBatDauChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="GhiChu" className="form-label">
                Ghi chú
              </label>
              <textarea
                className="form-control"
                placeholder="Bạn có yêu cầu gì thêm, hãy nhập ở đây nhé"
                id="GhiChu"
                rows={5}
              ></textarea>
            </div>
            <div className="text-end mb-3">
              Tổng tiền:{" "}
              <span className="text-danger fw-bold fs-4 ms-1">
                {tongTien.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <div className="text-end">
              <button className="btn btn-info me-0" type="submit">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThueDichVu;
