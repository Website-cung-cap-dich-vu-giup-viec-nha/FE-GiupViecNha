import React, { useState } from "react";
import googleLogo from "../assets/icon/google.png";
import fbLogo from "../assets/icon/facebook.png";
import { Link } from "react-router-dom";
const DangNhap = () => {
  const [user, setUser] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.phone || !user.password) {
      setError("Dang nhap khong thanh cong");
    } else {
      setError("Dang nhap khong thanh cong");
    }
  };
  return (
    <div
      style={{ maxWidth: "400px", backgroundColor: "white" }}
      className="p-4 rounded m-auto"
    >
      <p className="text-start mb-3 fs-4">Đăng nhập</p>
      {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div><i className="fa-solid fa-triangle-exclamation"></i> Đăng nhập thất bại</div>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              style={{ borderRadius: "5px", border: "1px solid" }}
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="d-block w-100 ps-3 p-2"
              placeholder="Số điện thoại"
              required
            />
            {/* {errors.phone && <span className='text-danger position-absolute' style={{fontSize:"14px"}}>Vui lòng nhập số điện thoại</span>} */}
          </div>
          <div className="mb-4">
            <input
              style={{ borderRadius: "5px", border: "1px solid" }}
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="d-block w-100 ps-3 p-2"
              placeholder="Mật khẩu"
              required
            />
            {/* {passwordErr && <span className='text-danger position-absolute' style={{fontSize:"14px"}}>Vui lòng nhập mật khẩu</span>} */}
          </div>

          <input
            type="submit"
            className="d-block w-100 ps-3 p-2 text-white"
            value={"ĐĂNG NHẬP"}
            style={{
              backgroundColor: "#ee4d2d",
              border: "none",
              borderRadius: "5px",
            }}
          />
        </form>
        <div className="text-start mt-2 mb-2 text-primary fs-6">
          Quên mật khẩu
        </div>

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
      <div className="mt-4 text-center" style={{ color: "rgba(0, 0, 0, .26)" }}>
        Bạn mới biết đến bTaskee?
        <Link to="/dangky" style={{ color: "#ee4d2d", cursor: "pointer" }}> Đăng ký</Link>
      </div>
    </div>
  );
};

export default DangNhap;
