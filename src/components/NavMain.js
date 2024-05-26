import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = ({ dangxuat, message }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <Link className="navbar-brand" to="/">
        <img width={"150px"} src={logo} alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav bg-white">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#dichvu">
              Dịch vụ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="sd">
              Liên hệ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="sd">
              Tuyển dụng
            </a>
          </li>
          <li className="nav-item">
            {message ? (
              <div
                className="nav-link d-md-none"
                role="button"
                onClick={dangxuat}
              >
                Đăng xuất
              </div>
            ) : (
              <Link className="nav-link d-md-none" to="/dangnhap">
                Đăng nhập
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
