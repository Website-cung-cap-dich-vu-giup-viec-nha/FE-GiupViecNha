import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ dangxuat, message }) => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const handleSearch = async (e) =>{
    navigate("/search", { state: { search } })
  }
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
      <div
        className="collapse navbar-collapse justify-content-between"
        id="collapsibleNavbar"
      >
        <ul className="navbar-nav bg-white">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#dichvu">
              Dịch vụ
            </a>
          </li>

          {message ? (
            <>
              <li className="nav-item">
                <Link className="nav-link d-md-none" to="/hoso">
                  Hồ sơ
                </Link>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-md-none"
                  role="button"
                  onClick={dangxuat}
                >
                  Đăng xuất
                </div>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link d-md-none" to="/dangnhap">
                Đăng nhập
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm ở đây"
            aria-label="Search"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className="btn btn-outline-success" onClick={handleSearch}>
            Tìm
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
