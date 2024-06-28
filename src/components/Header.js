import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import NavMain from "./NavMain";
import { config } from "../config";
import { isStaff } from "../api/admin/StaffAPI";
import { logout } from "../api/admin/AuthAPI";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleDangXuat = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await logout();
        if(response){
          Cookies.remove("token");
          navigate("/dangnhap");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [staff, setStaff] = useState(false);
  const checking = async () => {
    try {
      const response = await isStaff();
      if (response?.message?.data?.data === true) {
        setStaff(true);
      } else {
        setStaff(false);
      }
    } catch (error) {
      console.log(error);
      setStaff(false);
    }
  };
  useEffect(() => {
    checking();
  }, []);

  return (
    <div className="container-fluid border-bottom">
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
                      src={
                        user.Anh
                          ? `${config.apiBaseUrl}/${user.Anh}`
                          : require("../assets/icon/user.png")
                      }
                      alt=""
                      width={40}
                      className="rounded-circle"
                    />{" "}
                    {user.name}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuUser"
                  >
                    <li hidden={!staff}>
                      <Link className="dropdown-item" to="/admin">
                        Trang quản lý
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hoso">
                        Hồ sơ
                      </Link>
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
    </div>
  );
};

export default Header;
