import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const HoSo = ({ user, handleReloadHeader }) => {
  const [userData, setUserData] = useState(user);
  const avatarFile = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        // 1 MB
        setError("Dung lượng file vượt quá 1 MB.");
        setSelectedImage(null);
      } else {
        setError("");
        setSelectedImage(URL.createObjectURL(file));
        setUserData({ ...userData, Anh: file });
      }
    }
  };



  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    if(userData.GioiTinh)
      formData.append("GioiTinh", userData.GioiTinh);
    if(userData.NgaySinh)
      formData.append("NgaySinh", userData.NgaySinh);
    if (userData) {
      console.log(userData.Anh)
      formData.append("Anh", userData.Anh);
    }
    try {
      console.log(formData)
      const response = await axios.post(`http://127.0.0.1:8000/api/user/${user.id}`, formData);
      handleReloadHeader(response.data.user);
      Swal.fire({
        title: "Đã cập nhật!",
        icon: "success",
      });
      console.log(userData);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleNameChange = (e) => {
    setUserData({ ...userData, name: e.target.value });
  };
  const handleChangeNgaySinh = (e) => {
    const newDate = e.target.value;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, NgaySinh: newDate };
      return updatedUserData;
    });
  };

  const handleGenderChange = (e) => {
    setUserData({ ...userData, GioiTinh: e.target.value });
    console.log(userData.GioiTinh);
  };

  const handleChonAnh = (e) => {
    e.preventDefault();
    avatarFile.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitForm(e);
    }
  };

  return (
    <div className="container py-4 rounded border shadow bg-white">
      <div className="row justify-content-center text-sm-start">
        <div className="col-lg-10 border-bottom">
          <h1 className="fs-3 lead">Hồ Sơ Của Tôi</h1>
          <div className="mb-2">Quản lý thông tin cá nhân</div>
        </div>
      </div>
      <form
        className="row justify-content-center mt-4 "
        onKeyDown={handleKeyDown}
      >
        <div className="col-lg-5 d-flex flex-column align-items-center">
          <img
            src={selectedImage || `http://127.0.0.1:8000/${userData.Anh}`}
            width={150}
            alt=""
            className="my-3"
          />
          <input
            ref={avatarFile}
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <button className="btn border" onClick={handleChonAnh}>
            Chọn ảnh
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
          <p className="mt-3 text-secondary">
            Dụng lượng file tối đa 1 MB <br />
            Định dạng: .JPEG, .PNG
          </p>
        </div>
        <div className="col-lg-5">
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Khách hàng
            </label>
            <input
              className="form-control"
              type="text"
              value={userData.name}
              id="nameInput"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneInput" className="form-label">
              Số điện thoại
            </label>
            <p id="phoneInput">
              {user.SDT} <Link to="/sorry">Thay đổi</Link>
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Giới tính
            </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="inlineRadio1"
                value="Nam"
                checked={userData.GioiTinh === "Nam"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Nam
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="inlineRadio2"
                value="Nữ"
                checked={userData.GioiTinh === "Nữ"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Nữ
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="birthdayInput" className="form-label">
              Ngày sinh
            </label>
            <input
              className="form-control"
              value={userData.NgaySinh}
              type="date"
              id="birthdayInput"
              onChange={handleChangeNgaySinh}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmitForm}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoSo;
