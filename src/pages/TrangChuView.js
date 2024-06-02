import { React, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cleaners from "../assets/icon/cleaners.svg";
import anhnen from "../assets/background/anhnen.png";
import fast from "../assets/icon/fast.svg";
import quality from "../assets/icon/quality.svg";
import secure from "../assets/icon/secure.svg";
import supplies from "../assets/icon/supplies.svg";
import pattern from "../assets/background/pattern.jpg";
import bannernew from "../assets/banner/banner-new.jpg";

import axios from "axios";
import { Link } from "react-router-dom";
const TrangChuView = ({ dichvu }) => {
  const [dichvus, setDichvus] = useState([]);
  const dichvuRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.location.hash === "#dichvu") {
        if (dichvuRef.current) {
          window.scrollTo({
            top: dichvuRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const layDanhSachDV = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dichvu");
        setDichvus(response.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách dịch vụ");
        return null;
      }
    };

    layDanhSachDV();
  }, []);

  const getImage = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (err) {
      console.error("Image not found:", imageName);
      return null; // hoặc một hình ảnh mặc định nếu cần
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const settings2 = {
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
    <div style={{backgroundImage:`url(${pattern})`}}>
      {/* banner */}

      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${bannernew})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="text-white text-center">
            <p className="m-0" style={{textShadow: ".13em .02em .1em rgba(0, 0, 0, .4)", letterSpacing:"2px"}}>DỊCH VỤ VIỆC NHÀ VÀ VỆ SINH ĐƯỢC ĐÁNH GIÁ CAO NHẤT</p>
            <h1
              className="lh-lg"
              style={{
                textShadow: ".03em .02em .1em rgba(0, 0, 0, .4)",
                fontWeight: "700",
                fontSize: "3rem"
              }}
            >
              HÃY ĐỂ VIỆC NHÀ CHO CHÚNG TÔI
            </h1>
            <p style={{
              textShadow:"-.06em .07em .1em rgba(0, 0, 0, .4)",
              lineHeight:"1.4em",
              fontWeight: "500",}}>
              Bạn có thể tập trung vào những việc quan trọng hơn.
            </p>
          </div>
        </div>
      </div>

      {/* <div
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
      </div> */}

      {/* Lý do vì sao nên chọn chúng tôi */}
      <div className="container-md py-5">
        <h2 className="text-center maucam">Những lý do bạn nên chọn chúng tôi</h2>
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3 mt-5">
            <img src={supplies} height={40} alt="" />
            <div className="text-center mt-3 text-secondary">
              Chúng tôi mang theo tất cả vật tư và thiết bị của riêng mình
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3 mt-5">
            <img src={cleaners} height={40} alt="" />
            <div className="text-center mt-3 text-secondary">
              Người giúp việc đáng tin cậy, mỗi khi bạn đặt chỗ
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3 mt-5">
            <img src={quality} height={40} alt="" />
            <div className="text-center mt-3 text-secondary">
              Sử dụng các giải pháp làm sạch chất lượng cao, an toàn và hiệu quả
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3 mt-5">
            <img src={fast} height={40} alt="" />
            <div className="text-center mt-3 text-secondary">
              Đặt dịch vụ đơn giản chưa đầy 60 giây
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2 d-flex flex-column align-items-center px-3 mt-5">
            <img src={secure} height={40} alt="" />
            <div className="text-center mt-3 text-secondary">
              Bảo mật thanh toán trực tuyến 100%
            </div>
          </div>
        </div>
      </div>

      {/* Các dịch vụ */}
      <div
        id="dichvu"
        ref={dichvuRef}
        className="container-fluid"
        style={{ backgroundImage: `url(${anhnen})` }}
      >
        <div className="container-md py-5">
          <h2 className="text-center mb-5 maucam">Dịch vụ của chúng tôi</h2>
          <Slider {...settings2}>
            {dichvus &&
              dichvus.map((item, index) => (
                <div key={index} className="card" style={{ width: "18rem" }}>
                  <img
                    src={getImage(item.Anh)}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "171px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.tenDichVu}</h5>
                    <p className="card-text">{item.MoTa}</p>
                    {item.idDichVu === 1 && (
                      <Link
                        to="/giupviectheogio"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 2 && (
                      <Link
                        to="/tongvesinh"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 3 && (
                      <Link
                        to="/trongtre"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 4 && (
                      <Link
                        to="chamsocnguoicaotuoi"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 5 && (
                      <Link
                        to="/vesinhmaylanh"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 6 && (
                      <Link
                        to="/vesinhsofa"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>

      {/* About */}
      <div className="container-md py-5">
        <h2 className="text-center maucam">Những con số ấn tượng</h2>
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

      {/*Phản hồi của khách hàng*/}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="container">
          <h2 className="text-center mb-4 maucam">Phản hồi của khách hàng</h2>

          <div
            className="slider-container"
            style={{ maxWidth: "900px", margin: "auto" }}
          >
            <Slider {...settings}>
              <div className="bg-white rounded p-2 me-lg-3 mb-3">
                <div className="border rounded py-3 px-2 h-100 d-flex flex-column justify-content-between align-items-center">
                  <img
                    src={require("../assets/user/people-1-420x420.jpg")}
                    width={80}
                    height={80}
                    className="rounded-circle"
                    alt=""
                  />
                  <p className="text-center mt-2">
                    Nhân viên nhiệt tình, lễ phép, dọn dẹp sạch; nhà mình rất
                    hài lòng. Các bạn tư vấn cũng nhiệt tình và trả lời nhanh
                    chóng. Mong các bạn luôn duy trì được chất lượng như vậy
                  </p>
                  <h4 className="">Kim Kim</h4>
                  <div className="text-warning">
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded p-2 me-lg-3 mb-3">
                <div className="border rounded py-3 px-2 h-100 d-flex flex-column justify-content-between align-items-center">
                  <img
                    src={require("../assets/user/people-2-420x420.jpg")}
                    width={80}
                    height={80}
                    className="rounded-circle"
                    alt=""
                  />
                  <p className="text-center mt-2">
                    Dịch vụ khá linh động phù hợp với những gia đình bận rộn như
                    nhà mình, giá cả hợp lý.... mình có nhiều thời gian hơn để
                    dành cho gia đình và công việc. Mình đã giới thiệu với nhiều
                    bạn bè mình và mọi người cũng thấy rất hài lòng. Chúc quý
                    công ty ngày càng phục vụ được nhiều Khách hàng hơn.
                  </p>
                  <h4 className="">Khuê Ngọc</h4>
                  <div className="text-warning">
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded p-2 me-lg-3 mb-3">
                <div className="border rounded py-3 px-2 h-100 d-flex flex-column justify-content-between align-items-center">
                  <img
                    src={require("../assets/user/people-3-420x420.jpg")}
                    width={80}
                    height={80}
                    className="rounded-circle"
                    alt=""
                  />
                  <p className="text-center mt-2">
                    Tôi đã sử dụng dịch vụ của công ty rất hài lòng về chất
                    lượng dịch vụ và nhân viên tư vấn rất vừa ý cảm ơn công ty
                    tôi sẽ sử dụng lâu dài.
                  </p>
                  <h4 className="">Vũ Bình</h4>
                  <div className="text-warning">
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star me-1"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* Câu hỏi thường gặp */}
      <div className="container mt-5">
        <h2 className="text-center maucam">Các câu hỏi thường gặp</h2>
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
                    bTaskee hoạt động xuyên suốt tất cả các ngày trong tuần và
                    lễ Tết nên bạn hoàn toàn có thể đặt dịch vụ vào những ngày
                    này. Để đảm bảo luôn có người nhận công việc của bạn vào
                    cuối tuần, lễ Tết, bTaskee khuyến khích bạn nên đặt lịch sớm
                    từ 1 – 2 ngày.
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
    </div>
  );
};

export default TrangChuView;
