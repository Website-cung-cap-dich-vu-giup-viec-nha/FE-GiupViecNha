import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cleaners from "../assets/icon/cleaners.svg";
import anhnen from "../assets/background/anhnen.png";
import fast from "../assets/icon/fast.svg";
import quality from "../assets/icon/quality.svg";
import secure from "../assets/icon/secure.svg";
import supplies from "../assets/icon/supplies.svg";
import axios from "axios";
const TrangChuView = () => {

  const [dichvus, setDichvus] = useState([]);

  useEffect(() => {
    const layDanhSachDV = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/dichvu');
      setDichvus(response.data);
    };

    layDanhSachDV();
  }, []);

  const getImage = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (err) {
      console.error('Image not found:', imageName);
      return null; // hoặc một hình ảnh mặc định nếu cần
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* banner */}
      <div
        id="carouselBanner"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={require("../assets/banner/banner1.jpg")}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../assets/banner/banner2.jpg")}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../assets/banner/banner3.jpg")}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Lý do vì sao nên chọn chúng tôi */}
      <div className="container-md py-5">
        <h2 className="text-center">Những lý do bạn nên chọn chúng tôi</h2>
        <div className="row justify-content-center mt-5">
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3">
            <img src={supplies} height={40} alt="" />
            <div className="text-center mt-4 text-secondary">
              Chúng tôi mang theo tất cả vật tư và thiết bị của riêng mình
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3">
            <img src={cleaners} height={40} alt="" />
            <div className="text-center mt-4 text-secondary">
              Người giúp việc đáng tin cậy, mỗi khi bạn đặt chỗ
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3">
            <img src={quality} height={40} alt="" />
            <div className="text-center mt-4 text-secondary">
              Sử dụng các giải pháp làm sạch chất lượng cao, an toàn và hiệu quả
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3">
            <img src={fast} height={40} alt="" />
            <div className="text-center mt-4 text-secondary">
              Đặt dịch vụ đơn giản chưa đầy 60 giây
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3">
            <img src={secure} height={40} alt="" />
            <div className="text-center mt-4 text-secondary">
              Bảo mật thanh toán trực tuyến 100%
            </div>
          </div>
        </div>
      </div>

      {/* Các dịch vụ */}
      <div
        className="container-fluid"
        style={{ backgroundImage: `url(${anhnen})` }}
      >
        <div className="container-md py-5">
          <h2 className="text-center mb-5">Dịch vụ của chúng tôi</h2>
          <Slider {...settings} className="h-100">
            {dichvus.map((item, index) => (
              <div key={index} className="card h-100" style={{ width: "18rem" }}>
              <img
                src={getImage(item.Anh)}
                className="card-img-top"
                alt="..."
                style={{ height: "171px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.tenDichVu}</h5>
                <p className="card-text">
                {item.MoTa}
                </p>
                <a href="#d" className="text-secondary">
                  Chi tiết dịch vụ
                </a>
              </div>
            </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* About */}
      <div className="container-md py-5">
        <h2 className="text-center">Những con số ấn tượng</h2>
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-6 col-lg-3 d-flex flex-column p-4">
            <i className="fa-solid fa-user-group fs-3"></i>
            <span className="fs-1 fw-bolder" style={{ color: "#FF8227" }}>
              500.000+
            </span>
            <p className="fw-bold">Khách hàng sử dụng dịch vụ</p>
          </div>
          <div className="col-sm-6 col-lg-3 d-flex flex-column p-4">
            <i className="fa-solid fa-face-smile fs-3"></i>
            <span className="fs-1 fw-bolder" style={{ color: "#FF8227" }}>
              97%
            </span>
            <p className="fw-bold">Khách hàng hài lòng</p>
          </div>
          <div className="col-sm-6 col-lg-3 d-flex flex-column p-4">
            <i className="fa-solid fa-list-check fs-3 "></i>
            <span className="fs-1 fw-bolder" style={{ color: "#FF8227" }}>
              2.600.000+
            </span>
            <p className="fw-bold">Công việc được hoàn thành</p>
          </div>
          <div className="col-sm-6 col-lg-3 d-flex flex-column p-4">
            <i className="fa-solid fa-clock fs-3 "></i>
            <span className="fs-1 fw-bolder" style={{ color: "#FF8227" }}>
              8.000.000+
            </span>
            <p className="fw-bold">Giờ làm việc</p>
          </div>
        </div>
      </div>

      {/* Câu hỏi thường gặp */}
      <div className="container-md pb-5">
        <h2 className="text-center">Các câu hỏi thường gặp</h2>
        <div className="row justify-content-center py-5">
          <div className="col-lg-6">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Làm sao để nhận dạng người giúp việc
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Vào ngày Lễ, Tết, người giúp việc có đến dọn dẹp nhà không?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Làm sao để sử dụng dịch vụ một cách hoàn hảo?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrangChuView;
