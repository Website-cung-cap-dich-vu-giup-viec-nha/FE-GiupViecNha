import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../api/admin/AuthAPI";

const DangKy = () => {
  const [user, setUser] = useState({name:"", SDT:"", password:"", password_confirmation:""})
 const [error, setError] = useState("")
 const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();
  if(user.password !== user.password_confirmation)
    {
      setError("Mật khẩu không trùng khớp")
      return;
    }

    try{
      const response = await register(user);
      console.log(response.message.data.message);
      if(response.message.data.message.includes("SDT")){
        setError("Số điện thoại không hợp lệ!");
        return;
      }
      if(response.message.data.message.includes("already")){
        setError("Số điện thoại này đã được đăng ký!");
        return;
      }
      navigate("/dangnhap");
    }
    catch(error){
      console.log(error);
    }
}

  return (
    <div>
      <div
        style={{ maxWidth: "600px", backgroundColor: "white" }}
        className="p-4 rounded m-auto"
      >
        <p className="text-start mb-3 fs-3">Đăng ký</p>
        {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div><i className="fa-solid fa-triangle-exclamation"></i> {error}</div>
        </div>
      )}
        <div>
          <form className="mb-4" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="hoTenInput"
                placeholder=""
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                required
              />
              <label htmlFor="hoTenInput" >Họ và tên</label>
            </div> 
            {/* <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder=""
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                required
              />
              <label htmlFor="emailInput">Email</label>
            </div> */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                placeholder=""
                value={user.SDT}
                onChange={(e) => setUser({...user, SDT: e.target.value})}
                required
              />
              <label htmlFor="phoneInput">Số điện thoại </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder=""
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                required
              />
              <label htmlFor="passwordInput">Mật khẩu</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordConfirmInput"
                placeholder=""
                value={user.password_confirmation}
                onChange={(e) => setUser({...user, password_confirmation: e.target.value})}
                required
              />
              <label htmlFor="passwordConfirmInput">Nhập lại mật khẩu</label>
            </div>

            
            
            
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

          <div className="row">
          <div className="col">
          <div className="rounded border border-secondary w-100 d-flex justify-content-center btn btn-light">
              <Link to="/sorry" className="text-decoration-none text-dark">
                <img
                  width={"30px"}
                  src={require("../assets/icon/facebook.png")}
                  alt="google"
                />
                Facebook
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="rounded border border-secondary w-100 d-flex justify-content-center btn btn-light">
              <Link to="/sorry" className="text-decoration-none text-dark">
                <img
                  width={"30px"}
                  src={require("../assets/icon/google.png")}
                  alt="google"
                />
                Google
              </Link>
            </div>
          </div>
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
