import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/admin/AuthAPI";

const DangNhap = () => {
  const [user, setUser] = useState({ SDT: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      if (response.message.data.message.includes("SDT")) {
        console.log(response.message.data.message)
        setError("Số điện thoại không hợp lệ!");
        return;
      }
      if (response.message.data.message.includes("details")) {
        console.log(response.message.data.message)
        setError("Số điện thoại hoặc mật khẩu không đúng!");
        return;
      }
      Cookies.set("token", response.message.data.token, {
        expires: response.message.data.expires_in,
        secure: true,
        sameSite: "Strict",
      });
      navigate("/");
    } catch (error) {
      setError("Đăng nhập thất bại!");
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
          <div>
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </div>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              style={{ borderRadius: "5px", border: "1px solid" }}
              type="text"
              name="SDT"
              value={user.SDT}
              onChange={(e) => setUser({ ...user, SDT: e.target.value })}
              className="d-block w-100 ps-3 p-2"
              placeholder="Số điện thoại"
              required
            />
          </div>
          <div className="mb-4">
            <input
              style={{ borderRadius: "5px", border: "1px solid" }}
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="d-block w-100 ps-3 p-2"
              placeholder="Mật khẩu"
              required
            />
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
      <div className="mt-4 text-center" style={{ color: "rgba(0, 0, 0, .26)" }}>
        Bạn mới biết đến bTaskee?
        <Link to="/dangky" style={{ color: "#ee4d2d", cursor: "pointer" }}>
          {" "}
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default DangNhap;
