import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import NavMain from "./NavMain";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleDangXuat = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        await axios.get("http://127.0.0.1:8000/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Cookies.remove("token");
        navigate("/dangnhap");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                      src={user.Anh?`http://127.0.0.1:8000/${user.Anh}`:require("../assets/icon/user.png")}
                      alt=""
                      width={40}
                      className="rounded-circle"
                    />{" "}
                    {console.log(`http://127.0.0.1:8000/${user.Anh}`)}
                    {user.name}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuUser"
                  >
                    <li>
                      <Link className="dropdown-item" to="/hoso">
                        Hồ sơ
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/giohang">
                        Giỏ hàng
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
