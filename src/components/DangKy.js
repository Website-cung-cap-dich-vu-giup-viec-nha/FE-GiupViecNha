import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import googleLogo from "../assets/icon/google.png";
import fbLogo from "../assets/icon/facebook.png";

const DangKy = () => {
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
    <div>
      <div
        style={{ maxWidth: "600px", backgroundColor: "white" }}
        className="p-4 rounded m-auto"
      >
        <p className="text-start mb-3 fs-3">Đăng ký</p>
        {/* {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div><i className="fa-solid fa-triangle-exclamation"></i> Đăng ký thất bại</div>
        </div>
      )} */}
        <div>
          <form className="mb-4">
          <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="hoTenInput"
                placeholder="Nguyen Van A"
              />
              <label for="hoTenInput" >Họ và tên</label>
            </div> 
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="name@example.com"
              />
              <label for="emailInput">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="phoneInput"
                placeholder=""
              />
              <label for="phoneInput">Số điện thoại </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder=""
              />
              <label for="passwordInput">Mật khẩu</label>
            </div>

            
            <fieldset className="row mb-3">
                <legend className="fs-5">Thông tin địa chỉ:</legend>
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
              </fieldset>
            
            <input
              type="submit"
              className="form-control text-white"
              value={"ĐĂNG KÝ"}
              style={{
                backgroundColor: "#ee4d2d",
                border: "none",
                borderRadius: "5px",
              }}
            />
          </form>

          <div className="d-flex align-items-center pb-3">
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#dbdbdb",
                flex: "1",
              }}
            ></div>
            <span
              style={{
                color: "#ccc",
                padding: " 0 16px",
                fontSize: "14px",
              }}
            >
              HOẶC
            </span>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#dbdbdb",
                flex: "1",
              }}
            ></div>
          </div>

          <div className="d-flex justify-content-between ">
            <button className="flex-grow-1 m-2 buttonDangNhap">
              <img width={"30px"} src={fbLogo} alt="facebook" />
              Facebook
            </button>
            <button className="flex-grow-1 m-2 buttonDangNhap d-flex align-items-center justify-content-center">
              <img width={"24px"} src={googleLogo} alt="google" />
              <div className="ms-1">Google</div>
            </button>
          </div>
        </div>
        <div
          className="mt-4 text-center"
          style={{ color: "rgba(0, 0, 0, .26)" }}
        >
          Bạn đã có tài khoản?
          <Link to="/dangnhap" style={{ color: "#ee4d2d", cursor: "pointer" }}>
            {" "}
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DangKy;
