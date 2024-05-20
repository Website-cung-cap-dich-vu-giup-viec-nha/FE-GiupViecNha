import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HoSo = ({ user }) => {
  const [name, setName] = useState(user.name);
  //const [gender, setGender] = useState('');
  const avatarFile = useRef(null);

  // useEffect(() => {
  //   setGender();
  // }, []);

  const handleChonAnh = (e) => {
    e.preventDefault();
    avatarFile.current.click();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userData = { name };
      await axios.put(`http://127.0.0.1:8000/api/user/${user.id}`, userData);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center text-sm-start">
        <div className="col-lg-6 border-bottom">
          <h1 className="fs-3 lead">Hồ Sơ Của Tôi</h1>
          <div className="mb-2">Quản lý thông tin cá nhân</div>
        </div>
      </div>
      <form className="row justify-content-center mt-4">
        <div className="col-lg-3 d-flex flex-column align-items-center">
          <img
            src={require("../assets/icon/sorry.png")}
            width={100}
            alt=""
            className="my-3"
          />
          <input
            ref={avatarFile}
            type="file"
            name="Chọn ảnh"
            hidden
            accept=".jpg,.jpeg,.png"
          />
          <button className="btn border" onClick={handleChonAnh}>
            Chọn ảnh
          </button>
          <p className="mt-3 text-secondary">
            Dụng lượng file tối đa 1 MB <br />
            Định dạng: .JPEG, .PNG
          </p>
        </div>
        <div className="col-lg-3">
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Khách hàng
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
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
                //     checked={gender === 'Nam'}
                // onChange={handleGenderChange}
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
                //     checked={gender === 'Nữ'}
                // onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Nữ
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="inlineRadio3"
                value="Khác"
                //     checked={gender === 'Khác'}
                // onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Khác
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="birthdayInput" className="form-label">
              Ngày sinh
            </label>
            <input className="form-control" type="date" id="birthdayInput" />
          </div>
          <button className="btn btn-success" onClick={handleSubmitForm}>
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoSo;
