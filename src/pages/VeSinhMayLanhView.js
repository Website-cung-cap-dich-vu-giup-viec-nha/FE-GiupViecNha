import React, { useEffect } from "react";
import Slider from "react-slick";
import bannervesinhmaylanh from "../assets/banner/ve-sinh-may-lanh-banner.jpg";
import { Link, useLocation } from "react-router-dom";

const VeSinhMayLanhView = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  var settings = {
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
      <div
        className="container-fluid d-none d-lg-block"
        style={{
          backgroundImage: `url(${bannervesinhmaylanh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-6 text-white">
              <h1 className="fw-bold mb-3 ">
                App Đặt Dịch Vụ Vệ Sinh Máy Lạnh Chỉ Với 30s, Bảo Hành 7 Ngày
              </h1>
              <p className="mb-3">Đặt lịch nhanh chóng, có mặt tức thì!</p>
              <p className="mb-3">
                Dịch vụ vệ sinh máy lạnh chuẩn 5 sao của bTaskee cam kết đem đến
                trải nghiệm tốt nhất cho Khách hàng!
              </p>
              <div>
                <button
                  style={{
                    padding: "12px 24px",
                    borderRadius: "30px",
                    backgroundColor: "#FF8228",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Link
                    className="text-decoration-none text-white"
                    to="/thuedichvu/5"
                  >
                    Trải nghiệm dịch vụ
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-block d-lg-none">
        <img src={bannervesinhmaylanh} alt="" className="w-100 h-auto" />
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-12">
              <h1 className="fw-bold mb-3 ">
                App Đặt Dịch Vụ Vệ Sinh Máy Lạnh Chỉ Với 30s, Bảo Hành 7 Ngày
              </h1>
              <p className="mb-3">Đặt lịch nhanh chóng, có mặt tức thì!</p>
              <p className="mb-3">
                Dịch vụ vệ sinh máy lạnh chuẩn 5 sao của bTaskee cam kết đem đến
                trải nghiệm tốt nhất cho Khách hàng!
              </p>
              <div>
                <button
                  style={{
                    padding: "12px 24px",
                    borderRadius: "30px",
                    backgroundColor: "#FF8228",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Link
                    className="text-decoration-none text-white"
                    to="/thuedichvu/5"
                  >
                    Trải nghiệm dịch vụ
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Bảng giá dịch vụ vệ sinh máy lạnh mới nhất</h2>
        <div className="slider-container">
          <Slider {...settings}>
            <div className="text-center maylanh">
              <p className="fw-bold">Máy lạnh treo tường</p>
              <small>Vệ sinh / máy</small>
              <h3>245.000đ</h3>
              <small>Bơm ga / lần</small>
              <h3>160.000đ</h3>
            </div>
            <div className="text-center maylanh">
              <p className="fw-bold">Máy lạnh tủ đứng</p>
              <small>Vệ sinh / máy</small>
              <h3>336.000đ</h3>
              <small>Bơm ga / lần</small>
              <h3>220.000đ</h3>
            </div>
            <div className="text-center maylanh">
              <p className="fw-bold">Máy lạnh âm trần</p>
              <small>Vệ sinh / máy</small>
              <h3>420.000đ</h3>
              <small>Bơm ga / lần</small>
              <h3>200.000đ</h3>
            </div>
            <div className="text-center maylanh">
              <p className="fw-bold">Máy lạnh áp trần</p>
              <small>Vệ sinh / máy</small>
              <h3>660.000đ</h3>
              <small>Bơm ga / lần</small>
              <h3>220.000đ</h3>
            </div>
            <div className="text-center maylanh">
              <p className="fw-bold">Máy lạnh giấu trần</p>
              <small>Vệ sinh / máy</small>
              <h3>204.000đ</h3>
              <small>Bơm ga / lần</small>
              <h3>200.000đ</h3>
            </div>
          </Slider>
        </div>
      </div>

      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12">
            <h2>Vì sao nên chọn dịch vụ vệ sinh máy lạnh bTaskee?</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              src={require("../assets/banner/tai-sao-chon-ve-sinh-may-lanh-btaskee.png")}
              className="w-100 h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-touch.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Sự chuyên nghiệp</h3>
              <p>
                Với sự am hiểu sâu sắc về cách hoạt động của các loại máy lạnh,
                những chuyên gia nhà bTaskee tự tin trong khả năng vệ sinh máy
                lạnh và bơm gas một cách gọn gàng, nhanh chóng và hiệu quả.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-insurrance.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>An toàn</h3>
              <p>
                Với dịch vụ rửa máy lạnh bTaskee, mọi công việc đều luôn được
                tuân thủ các quy trình kỹ thuật và tiêu chuẩn chất lượng nhằm
                đảo bảo an toàn tuyệt đối cho khách hàng. Ngoài ra, mọi trang
                thiết bị, hóa chất tẩy rửa và dụng cụ vệ sinh đều có nhãn mác và
                nguồn gốc xuất xứ rõ ràng.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-chat.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Giải quyết khối lượng công việc lớn</h3>
              <p>
                bTaskee cam kết bảo hành 7 ngày sau khi hoàn thành chu trình vệ
                sinh điều hòa. Đối với mọi vấn đề kỹ thuật xảy ra, khách hàng
                hãy gọi ngay đến hotline tổng đài 1900 636736 để được hỗ trợ
                nhanh nhất!
              </p>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
};

export default VeSinhMayLanhView;
