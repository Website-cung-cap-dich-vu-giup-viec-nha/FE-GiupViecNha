import axios from "axios";
import { useEffect, useState } from "react";


const DiaChi = () => {
    const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);

    // Filter districts based on selected city
    const selectedCityData = cities.find((city) => city.Id === cityId);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setSelectedDistrict("");

    // Reset wards
    setWards([]);
    setSelectedWard("");
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    // Filter wards based on selected district
    const selectedDistrictData = districts.find(
      (district) => district.Id === districtId
    );
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);

    // Reset selected ward
    setSelectedWard("");
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
        <div className="row mx-2 border-bottom py-3">
          <div className="col-12 col-lg-8">
            50 Nhất Chi Mai <br />
            Phường 13, Quận Tân Bình, TP.Hồ Chí Minh <br />
          </div>
          <div className="col-12 col-lg-4 text-end">
            <button className="btn border-0 link-primary">Cập nhật</button>
            <button className="btn border-0 link-primary">Xóa</button> <br />
            <button className="btn btn-outline-secondary">
              Thiết lập mặc định
            </button>
          </div>
        </div>

        <div className="row mx-2 border-bottom py-3">
          <div className="col-12 col-lg-8">
            50 Nhất Chi Mai <br />
            Phường 13, Quận Tân Bình, TP.Hồ Chí Minh <br />
            <div className="mt-2">
              <span className="border border-danger text-danger px-2 py-1">
                Mặc định
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-4 text-end">
            <button className="btn border-0 link-primary">Cập nhật</button>
            <button className="btn border-0 link-primary">Xóa</button> <br />
            <button className="btn btn-outline-secondary">
              Thiết lập mặc định
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="ModalThemDiaChi"
        tabindex="-1"
        role="dialog"
        aria-labelledby="lbThemDiaChi"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="lbThemDiaChi">
                Địa chỉ mới
              </h5>
            </div>
            <div className="modal-body">
            <div className="row mb-3">
              <div className="col-sm-6">
                <select
                  className="form-select form-select-sm mb-3 ps-3 p-2"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="" disabled>
                    Chọn tỉnh thành
                  </option>
                  {cities.map((city) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <select
                  className="form-select form-select-sm mb-3 ps-3 p-2"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="" disabled>
                    Chọn quận huyện
                  </option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Id}>
                      {district.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <select
                  className="form-select form-select-sm mb-3 ps-3 p-2 "
                  value={selectedWard}
                  onChange={(event) => setSelectedWard(event.target.value)}
                >
                  <option value="" disabled>
                    Chọn phường xã
                  </option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Id}>
                      {ward.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="phone"
                  className="d-block w-100 ps-3 p-2 form-control"
                  placeholder="Số nhà"
                  required
                />
              </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
              >
                Trở lại
              </button>
              <button type="button" className="btn btn-primary">
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaChi;
