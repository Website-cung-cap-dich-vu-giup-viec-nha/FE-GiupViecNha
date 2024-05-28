import { useEffect, useState, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import {
  capNhatMacDinh,
  getProvince,
  layDiaChiByIdNguoiDung,
  layHuyenByProvinceId,
  layXaByDistrictId,
  themDiaChi,
  xoaDiaChi,
} from "../api/DiaChiAPI";

const DiaChi = ({ user }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [duong, setDuong] = useState("");
  const [diaChis, setDiaChis] = useState([]);
  const modalRef = useRef(null); // Create a ref for the modal

  const layDSDiaChi = useCallback(async () => {
    try {
      const response = await layDiaChiByIdNguoiDung(user.id);
      console.log(response.message.data)
      setDiaChis(response.message.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    layDSDiaChi();

    const fetchData = async () => {
      try {
        const response = await getProvince();
        setCities(response.message.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [layDSDiaChi]);

  const handleCityChange = async (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);

    const selectedCityData = await layHuyenByProvinceId(cityId);
    setDistricts(selectedCityData.message.data);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const selectedDistrictData = await layXaByDistrictId(districtId);
    setWards(selectedDistrictData.message.data);
    setSelectedWard("");
  };

  const handleXoaDiaChi = async (e) => {
    try {
      const response = await xoaDiaChi(e.target.value);
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
        title: response.message.data.message,
      });
      await layDSDiaChi(); // Ensure the address list is updated after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleMacDinh = async (e) => {
    try {
      await capNhatMacDinh(e.target.value);
      await layDSDiaChi(); // Ensure the address list is updated after setting default
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
        title: response.message.data.message,
      });
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedWard("");
      setDuong("");
      await layDSDiaChi(); // Ensure the address list is updated after adding new address
      
      // Hide the modal
      if (modalRef.current) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
        modalInstance.hide();
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Thêm địa chỉ thất bại");
    }
  };

  return (
    <div className="container-fluid py-4 rounded border shadow bg-white">
      <div className="row border-bottom">
        <div className="col d-flex align-items-center justify-content-between mb-2">
          <h1 className="fs-3">Địa chỉ</h1>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#ModalThemDiaChi"
          >
            <i className="fa-solid fa-plus me-2"></i> Thêm địa chỉ mới
          </button>
        </div>
      </div>
      <div className="container">
        {diaChis.map((item, index) => {
          return (
            <div key={index} className="row mx-2 border-bottom py-3">
              <div className="col-12 col-lg-8">
                {item.Duong} <br />
                {item.ward_name}, {item.district_name}, {item.province_name}{" "}
                <br />
                <div className="mt-2">
                  {item.MacDinh === 1 ? (
                    <span className="border border-danger text-danger px-2 py-1">
                      Mặc định
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-4 text-end">
                <button
                  className="btn border-0 link-primary"
                  value={item.idDiaChi}
                  onClick={handleXoaDiaChi}
                  disabled={item.MacDinh === 1}
                >
                  Xóa
                </button>{" "}
                <br />
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleMacDinh}
                  value={item.idDiaChi}
                  disabled={item.MacDinh === 1}
                >
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          );
        })}
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
                      placeholder="Số nhà"
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

export default DiaChi;
