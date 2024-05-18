import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import NavMain from "./NavMain";
import avtUser from "../assets/icon/user.png";

const Header = ({ user }) => {
  const navigate = useNavigate()
  const handleDangXuat = async () => {
    const token = Cookies.get("token")
    if(token){
      try {
        await axios.get("http://127.0.0.1:8000/api/auth/logout",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      Cookies.remove("token");
      navigate("/dangnhap");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className="container-md">
      <div className="row align-items-center py-2">
        <div className="col-md-9">
          <NavMain dangxuat={handleDangXuat} message={user} />
        </div>
        <div className="col-md-3 d-none d-md-block text-end">
          {user ? (
            <button className="btn border-0">
            <div className="dropdown">
              <div
                id="dropdownMenuUser"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avtUser}
                  alt=""
                  width={40}
                  className="rounded-circle"
                />{" "}
                {user.name}
              </div>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                <li>
                  <a className="dropdown-item" href="#1">
                    Hồ sơ
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#2">
                    Giỏ hàng
                  </a>
                </li>
                <li>
                  <span className="dropdown-item" onClick={handleDangXuat}>
                    Đăng xuất
                  </span>
                </li>
              </ul>
            </div>
            </button>
          ) : (
            <button className="btn btn-warning d-none d-sm-block ms-auto">
              <Link to="/dangnhap" className="text-decoration-none text-dark">
                Đăng nhập
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
