import React from "react";
import logo from "../assets/Logo.png";
import bocongthuong from "../assets/icon/bocongthuong.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="container-fluid bg-light" style={{ padding: "50px 0px" }}>
      <div className="container pb-4">
        <div className="row">
          <div className="col-6 col-md-6 col-xl-3">
            <div>
              <img width={"120px"} src={logo} alt="" />
            </div>
            <div className="mt-3">
              <p>
                Công Ty TNHH bTaskee <br />
                284/25/20 Lý Thường Kiệt, Phường 14, Quận 10, Tp.Hồ Chí Minh
                72506
                <br />
                Mã số doanh nghiệp: 0313723825
                <br />
                Đại Diện Công Ty: Ông Đỗ Đắc Nhân Tâm
                <br />
                Chức vụ: Giám Đốc
                <br />
                Số điện thoại: 1900 636 736
                <br />
                Email: support@btaskee.com
              </p>
            </div>
          </div>
          <div className="col-6 col-md-6 col-xl-3"></div>
          <div className="col-6 col-md-6 col-xl-3">
            <h5>Công ty</h5>
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  bRewards
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  bPay
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  Tuyển dụng
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  Khuyến mãi
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  Điều khoản sử dụng
                </a>
              </li>
              <li className="nav-item">
                <a className="text-dark nav-link p-0 pb-2" href="ds">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-6 col-xl-3">
            <h5>Dịch vụ</h5>
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/giupviectheogio">
                  Giúp việc nhà theo giờ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/chamsocnguoicaotuoi">
                  Chăm sóc ngưới cao tuổi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/tongvesinh">
                  Tổng vệ sinh
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/vesinhmaylanh">
                  Vệ sinh máy lạnh
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/trongtre">
                  Trông trẻ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-dark nav-link p-0 pb-2" to="/vesinhsofa">
                  Vệ sinh SoFa
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="row mt-4"
          style={{ paddingTop: "30px", borderTop: "1px solid #dbdbdb" }}
        >
          <div className="col-12 col-md-3">
            <p>© 2016 - 2023 bTaskee Co., Ltd.</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="d-flex gap-2 w-100">
              <p>FOLLOW US</p>
              <a href="sd" className="nav-link">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="sd" className="nav-link">
                <i className="fa-brands fa-square-instagram"></i>
              </a>
              <a href="sd" className="nav-link">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="sd" className="nav-link">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <p></p>
          </div>
          <div className="col-12 col-md-3">
            <img src={bocongthuong} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
