import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  layDanhSachChiTietDVTheoId,
  layIdKhachHang,
  taoPhieuDichVu,
} from "../api/GiupViecAPI";
import {
  getProvince,
  layDiaChiByIdNguoiDung,
  layHuyenByProvinceId,
  layXaByDistrictId,
  themDiaChi,
} from "../api/DiaChiAPI";
import Swal from "sweetalert2";

const ThueDichVu = ({ user }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [allowedDates, setAllowedDates] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [soBuoi, setSoBuoi] = useState(1);
  const [soGio, setSoGio] = useState(3);
  const [gioBatDau, setGioBatDau] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [minBuoi, setMinBuoi] = useState(1);
  const [diaChis, setDiaChis] = useState([]);
  const [idAddress, setIdAddress] = useState();
  const [idChiTietDV, setIdChiTietDV] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [duong, setDuong] = useState("");
  const [dsChiTietDV, setDSChiTietDV] = useState([]);
  const [soLg, setSoLg] = useState(1);
  const { id } = useParams();
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const handleDayChange = (event) => {
    const selectedDayOfWeek = event.target.value;
    setSelectedDay(selectedDayOfWeek);

    if (selectedDayOfWeek !== "") {
      const chiTietDichVu = dsChiTietDV.find(
        (item) => item.BuoiDangKyDichVu === selectedDayOfWeek
      );
      setIdChiTietDV(chiTietDichVu.idChiTietDichVu);
      const daysOfWeek = selectedDayOfWeek.split(" - ");
      setSoBuoi(daysOfWeek.length);
      setMinBuoi(daysOfWeek.length);
      const nextAvailableDates = getNextAvailableDates(daysOfWeek);
      setAllowedDates(nextAvailableDates);
    } else {
      setAllowedDates([]);
    }

    setNgayBD("");
  };

  const handleNgayBDChange = (e) => {
    if (allowedDates.includes(e.target.value)) {
      setNgayBD(e.target.value);
      setGioBatDau("");
    } else {
      setNgayBD("");
      setGioBatDau("");
    }
  };

  const getNextAvailableDates = (daysOfWeek) => {
    const currentDate = new Date();
    const dayMap = {
      "chủ nhật": 0,
      "thứ 2": 1,
      "thứ 3": 2,
      "thứ 4": 3,
      "thứ 5": 4,
      "thứ 6": 5,
      "thứ 7": 6,
    };

    const daysOfWeekNumbers = daysOfWeek.map(
      (day) => dayMap[day.toLowerCase()]
    );
    let nextDates = [];

    for (let i = 0; i < 60; i++) {
      // Looking ahead 60 days
      let tempDate = new Date(currentDate);
      tempDate.setDate(tempDate.getDate() + i);

      if (daysOfWeekNumbers.includes(tempDate.getDay())) {
        let year = tempDate.getFullYear();
        let month = (tempDate.getMonth() + 1).toString().padStart(2, '0');
        let day = tempDate.getDate().toString().padStart(2, '0');
        nextDates.push(`${year}-${month}-${day}`);
      }
    }

    return nextDates;
  };

  const layDSDiaChi = useCallback(async () => {
    try {
      const response = await layDiaChiByIdNguoiDung(user.id);
      setDiaChis(response?.message?.data);
      const dc = response?.message?.data.find((item) => item.MacDinh === 1);
      if (dc) {
        setIdAddress(dc.idDiaChi);
      } else {
        console.warn("No default address found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    const loadCombobox = async () => {
      try {
        const response = await layDanhSachChiTietDVTheoId(id);
        setDSChiTietDV(response?.message?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await getProvince();
        setCities(response?.message?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadCombobox();
    fetchData();
    layDSDiaChi();
  }, [layDSDiaChi, id]);

  useEffect(() => {
    const tinhTongTien = () => {
      const selectedService = dsChiTietDV.find(
        (item) => item.BuoiDangKyDichVu === selectedDay
      );
      if (selectedService) {
        let total = selectedService.GiaTien * soBuoi * soGio;
        if (soLg >= 2) {
          total += 0.3 * total * (soLg - 1);
        }
        setTongTien(total);
      } else {
        setTongTien(0);
      }
    };
    tinhTongTien();
  }, [selectedDay, soBuoi, soGio, soLg, dsChiTietDV]);

  const handleSoBuoiChange = (event) => {
    setSoBuoi(Number(event.target.value));
  };

  const handleSoLgChange = (event) => {
    setSoLg(Number(event.target.value));
  };

  const handleSoGioChange = (event) => {
    setSoGio(Number(event.target.value));
    setGioBatDau("");
  };

  const handleGioBatDauChange = (event) => {
    const selectedTime = event.target.value;
    const gioBatDauHour = parseInt(selectedTime.split(":")[0], 10);
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedDate = new Date(ngayBD);

    if (currentMinute > 0) {
      currentHour += 1;
    }
    if (
      selectedDate.toDateString() === now.toDateString() &&
      gioBatDauHour <= currentHour
    ) {
      setGioBatDau("");
      return;
    }

    const formattedHour =
      gioBatDauHour < 10 ? `0${gioBatDauHour}` : gioBatDauHour;
    const formattedTime = `${formattedHour}:00`;

    if (gioBatDauHour >= 7 && gioBatDauHour < 22) {
      if (gioBatDauHour + soGio <= 22) {
        setGioBatDau(formattedTime);
      } else {
        setGioBatDau("");
      }
    } else {
      setGioBatDau("");
    }
  };

  const handleGhiChuChange = (event) => {
    setGhiChu(event.target.value);
  };

  const handleChangeDiaChi = (event) => {
    setIdAddress(event.target.value);
  };

  const handleDatDichVu = async (e) => {
    e.preventDefault();
    try {
      const response = await layIdKhachHang(user.id);
      const phieuDVData = {
        Tongtien: tongTien,
        NgayBatDau: ngayBD,
        SoBuoi: soBuoi,
        SoGio: soGio,
        SoNguoiDuocChamSoc: soLg,
        GioBatDau: gioBatDau,
        GhiChu: ghiChu,
        idKhachHang: response?.message?.data[0],
        Thu: selectedDay,
        idChiTietDichVu: idChiTietDV,
        idDiaChi: idAddress,
      };
      console.log(phieuDVData);
      await taoPhieuDichVu(phieuDVData);
      navigate("/camon");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const macDinhValue = diaChis.length === 0 ? 1 : 0;
      const response = await themDiaChi({
        Duong: duong,
        Phuong: selectedWard,
        idNguoiDung: user.id,
        MacDinh: macDinhValue,
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: response?.message?.data?.message,
      });
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedWard("");
      setDuong("");
      layDSDiaChi(); // Ensure the address list is updated after adding new address

      // Hide the modal
      if (modalRef.current) {
        const modalInstance = window.bootstrap.Modal.getInstance(
          modalRef.current
        );
        modalInstance.hide();
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Thêm địa chỉ thất bại");
    }
  };

  const handleCityChange = async (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);

    const selectedCityData = await layHuyenByProvinceId(cityId);
    setDistricts(selectedCityData?.message?.data);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const selectedDistrictData = await layXaByDistrictId(districtId);
    setWards(selectedDistrictData?.message?.data);
    setSelectedWard("");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <form
            className="mx-auto bg-white border rounded py-3 px-5 shadow"
            onSubmit={handleDatDichVu}
          >
            <h3 className="text-center mb-3">
              {id === "3" ? "Trông trẻ" : "Chăm sóc người cao tuổi"}
            </h3>
            <label className="form-label" htmlFor="NgayLamViec">
              Chọn ngày làm việc trong tuần
            </label>
            <select
              id="NgayLamViec"
              className="form-select mb-3"
              value={selectedDay}
              onChange={handleDayChange}
              required
            >
              <option defaultValue={true} value="">
                Tùy chọn
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
                  onChange={handleNgayBDChange}
                  min={new Date().toISOString().split("T")[0]} // Disallow past dates
                  required
                  list="allowed-dates"
                />
                <datalist id="allowed-dates">
                  {allowedDates.map((date) => (
                    <option key={date} value={date} />
                  ))}
                </datalist>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="SoBuoi" className="form-label">
                  Số buổi
                </label>
                <input
                  type="number"
                  id="SoBuoi"
                  className="form-control"
                  min={minBuoi}
                  max={182}
                  value={soBuoi}
                  onChange={handleSoBuoiChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="SoGioLamViec" className="form-label">
                  Số giờ làm việc <br />
                  <small className="text-danger">(Từ 3 - 8 giờ)</small>
                </label>
                <input
                  type="number"
                  id="SoGioLamViec"
                  className="form-control"
                  min={3}
                  max={8}
                  value={soGio}
                  onChange={handleSoGioChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="GioBatDau" className="form-label">
                  Giờ bắt đầu <br />
                  <small className="text-danger">(Trong khoảng 7h - 22h)</small>
                </label>
                <input
                  type="time"
                  id="GioBatDau"
                  className="form-control"
                  value={gioBatDau}
                  onChange={handleGioBatDauChange}
                  step={3600}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="SoLg" className="form-label">
                {id === "3" ? "Số Trẻ" : "Số người"} <small className="text-danger">(Tối đa 2)</small>
              </label>
              <input
                type="number"
                id="SoLg"
                className="form-control"
                min={1}
                max={2}
                value={soLg}
                onChange={handleSoLgChange}
                required
              />
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
                value={ghiChu}
                onChange={handleGhiChuChange}
              ></textarea>
            </div>

            <label className="form-label" htmlFor="DiaChi">
              Địa chỉ
            </label>

            <div className="input-group mb-3">
              <select
                id="DiaChi"
                className="form-select"
                value={idAddress}
                onChange={handleChangeDiaChi}
                required
              >
                {diaChis.map((item) => (
                  <option key={item.idDiaChi} value={item.idDiaChi}>
                    {`${item.Duong}, ${item.ward_name}, ${item.district_name}, ${item.province_name}`}
                  </option>
                ))}
              </select>
              <span
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#ModalThemDiaChi"
              >
                <i className="fa-solid fa-plus"></i>
              </span>
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

      <div
        className="modal fade"
        id="ModalThemDiaChi"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="lbThemDiaChi"
        aria-hidden="true"
        ref={modalRef} // Attach the ref to the modal
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="lbThemDiaChi">
                Địa chỉ mới
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <select
                      className="form-select form-select-sm mb-3 ps-3 p-2"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                    >
                      <option value="" disabled>
                        Chọn tỉnh thành
                      </option>
                      {cities.map((city) => (
                        <option key={city.province_id} value={city.province_id}>
                          {city.province_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <select
                      className="form-select form-select-sm mb-3 ps-3 p-2"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      required
                    >
                      <option value="" disabled>
                        Chọn quận huyện
                      </option>
                      {districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {district.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <select
                      className="form-select form-select-sm mb-3 ps-3 p-2"
                      value={selectedWard}
                      onChange={(event) => setSelectedWard(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Chọn phường xã
                      </option>
                      {wards.map((ward) => (
                        <option key={ward.ward_id} value={ward.ward_id}>
                          {ward.ward_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="d-block w-100 ps-3 p-2 form-control"
                      placeholder="Đường"
                      value={duong}
                      onChange={(e) => setDuong(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-bs-dismiss="modal">
                  Trở lại
                </button>
                <button type="submit" className="btn btn-primary">
                  Hoàn thành
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThueDichVu;
