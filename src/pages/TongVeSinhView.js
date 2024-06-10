import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import bannertongvesinh from "../assets/banner/deep-cleaning-banner-ver25.jpg";
import { Link, useLocation } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import phongbep from "../assets/banner/deep-cleaning-nha-bep.png";
import phongtam from "../assets/banner/deep-cleaning-nha-tam.png";
import phongkhach from "../assets/banner/deep-cleaning-ve-sinh-chung.png";
import phongngu from "../assets/banner/deep-cleaning-phong-ngu.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TongVeSinhView = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          backgroundImage: `url(${bannertongvesinh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-6 text-white">
              <h1 className="fw-bold mb-3">
                Dịch Vụ <br /> Tổng Vệ Sinh
              </h1>
              <p className="mb-3">Môi trường sạch hơn,</p>
              <p className="mb-3">bạn khỏe mạnh hơn.</p>
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
                    to="/thuedichvu/2"
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
        <img src={bannertongvesinh} alt="" className="w-100 h-auto" />
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-6">
              <h1 className="fw-bold mb-3">
                Dịch Vụ <br /> Tổng Vệ Sinh
              </h1>
              <p className="mb-3">Môi trường sạch hơn,</p>
              <p className="mb-3">bạn khỏe mạnh hơn.</p>
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
                    to="/thuedichvu/2"
                  >
                    Trải nghiệm dịch vụ
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row mb-5">
          <div className="col-sm-6">
            <h2>
              Khác biệt của dịch vụ tổng vệ sinh so với giúp việc theo giờ
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-clean.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Tính chất công việc</h3>
              <p>
                Không chỉ thực hiện vệ sinh nhà cửa căn bản (dọn dẹp, quét, lau
                nhà,...); dịch vụ tổng vệ sinh, người giúp việc sẽ làm sạch đến
                từng chi tiết nhỏ nhất trong nhà bạn từ vệ sinh trần nhà, lau
                kính, vệ sinh lỗ thông hơi, gầm tủ, nội thất và các góc khuất
                trong nhà,... đều sẽ được làm sạch bằng quy trình chuyên biệt
                phù hợp.
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-checked.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Đội ngũ</h3>
              <p>
                So với việc chỉ có một người giúp việc đến thực hiện dọn dẹp như
                dịch vụ giúp việc theo giờ, dịch vụ tổng vệ sinh luôn có ít nhất
                2 - 3 người giúp việc đến thực hiện công việc, có nhóm trưởng
                phụ trách phân công, kiểm tra, đảm bảo tiến độ và chất lượng
                công việc.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-times.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Thời gian</h3>
              <p>
                Nếu như dọn dẹp, lau chùi nhà cửa là công việc thường ngày thì
                tổng vệ sinh nhà ở là việc được khuyến khích thực hiện định kỳ 2
                - 3 tháng/lần và vào các dịp đặc biệt, lễ Tết.
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-cleaning-tools.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Dụng cụ</h3>
              <p>
                Đội ngũ giúp việc bắt buộc phải mang theo các thiết bị, dụng cụ
                chuyên dụng hỗ trợ cho công việc khi đến thực hiện nhiệm vụ. Bạn
                sẽ hoàn toàn không mất phí cho dụng cụ tổng vệ sinh như dịch vụ
                giúp việc theo giờ.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-6">
            <h2>Tại sao nên sử dụng dịch vụ tổng vệ sinh của bTaskee?</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              src={require("../assets/banner/deep-cleaning-tai-sao-chon-btaskee.png")}
              className="w-100 h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-md-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-service.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Giải quyết khối lượng công việc lớn</h3>
              <p>
                Tổng vệ sinh nhà cửa là giải pháp tối ưu để “đánh tan” khối
                lượng công việc quá lớn dàn trải toàn bộ ngôi nhà mà dịch vụ
                Giúp việc nhà theo giờ khó có thể đáp ứng được.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-hourglass.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Tiết kiệm thời gian</h3>
              <p>
                Nếu bạn muốn hoàn thành khối lượng công việc lớn trong thời gian
                ngắn, chỉ cần một lần đặt dịch vụ tổng vệ sinh, bạn sẽ có ngay
                đội ngũ nhân viên để xử lý khối công việc đó thay cho bạn.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-wash.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Không tốn chi phí công cụ, dụng cụ</h3>
              <p>
                Người giúp việc sẽ chuẩn bị đầy đủ dụng cụ khi đến dọn dẹp, bạn
                không cần phải chọn thêm bộ dụng cụ như dịch vụ Giúp việc nhà
                theo giờ.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/badge-diamond.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Cải thiện không gian sống</h3>
              <p>
                Việc tổng vệ sinh nhà cửa không chỉ giúp đảm bảo môi trường sống
                luôn an toàn, sạch sẽ mà còn “phá tan” nơi trú ngụ của những vi
                khuẩn gây bệnh.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid my-5"
        style={{
          backgroundColor: "transparent",
          backgroundImage: "linear-gradient(180deg, #FF8228 65%, #FFFFFF 0%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-12">
              <div className="row my-5">
                <div className="col-sm-6">
                  <h2 className="text-white">
                    Tổng vệ sinh nhà cửa bao gồm những công việc gì?
                  </h2>
                </div>
              </div>
              <div className="bg-white border">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Công việc chung" {...a11yProps(0)} />
                    <Tab label="Nhà bếp" {...a11yProps(1)} />
                    <Tab label="Phòng ngủ" {...a11yProps(2)} />
                    <Tab label="Nhà tắm" {...a11yProps(3)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongbep} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Vệ sinh chung</h3>
                      <span>◆</span> Quét mạng nhện <br />
                      <span>◆</span> Lau sạch quạt trần <br />
                      <span>◆</span> Phủi bụi trên rèm cửa, kẽ cửa sổ
                      <br />
                      <span>◆</span> Làm sạch bụi trên tất cả bề mặt đồ nội
                      thất, đồ trang trí
                      <br />
                      <span>◆</span> Lau gương soi, cửa kính
                      <br />
                      <span>◆</span> Dọn sạch rác
                      <br />
                      <span>◆</span> Quét và lau sàn
                      <br />
                      <span>◆</span> Dọn sạch bậc cầu thang
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongtam} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Nhà bếp</h3>
                      <span>◆</span> Làm sạch bàn ghế
                      <br />
                      <span>◆</span> Làm sạch mặt bếp và quạt hút mùi
                      <br />
                      <span>◆</span> Làm sạch các thiết bị gia dụng
                      <br />
                      <span>◆</span> Làm sạch mặt bàn
                      <br />
                      <span>◆</span> Lau sạch thiết bị điện tử
                      <br />
                      <span>◆</span> Cọ và làm sạch bồn rửa
                      <br />
                      <span>◆</span> Hút bụi và lau sàn
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongkhach} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Phòng ngủ</h3>
                      <span>◆</span> Lau bụi và lau tất cả các bề mặt có thể
                      tiếp cận
                      <br />
                      <span>◆</span> Lau công tắc và tay cầm
                      <br />
                      <span>◆</span> Lau sạch gương
                      <br />
                      <span>◆</span> Sắp xếp lại giường cho gọn gàng (để lại
                      khăn trải giường mới nếu bạn muốn chúng tôi thay)
                      <br />
                      <span>◆</span> Hút bụi và lau sàn
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongngu} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Nhà tắm</h3>
                      <span>◆</span> Làm sạch toilet
                      <br />
                      <span>◆</span> Lau chùi sạch vòi sen, bồn tắm và bồn rửa
                      <br />
                      <span>◆</span> Làm sạch bên ngoài tủ, gương và đồ đạc
                      <br />
                      <span>◆</span> Lau công tắc và tay cầm
                    </div>
                  </div>
                </CustomTabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light pb-5">
        <div className="container">
          <h2 className="py-5">Giá dịch vụ</h2>
          <div className="slider-container">
            <Slider {...settings}>
            <div className="bg-white p-2 px-4 rounded">
              <h4>
                60m<sup>2</sup>
              </h4>
              <p>(2 người - 3 tiếng)</p>
              <h4 className="border-top pt-2">
                450.000<sup>đ</sup> - 570.000<sup>đ</sup>
              </h4>
            </div>
            <div className="bg-white p-2 px-4 rounded">
              <h4>
                80m<sup>2</sup>
              </h4>
              <p>(2 người - 4 tiếng)</p>
              <h4 className="border-top pt-2">
                600.000<sup>đ</sup> - 760.000<sup>đ</sup>
              </h4>
            </div>
            <div className="bg-white p-2 px-4 rounded">
              <h4>
                100m<sup>2</sup>
              </h4>
              <p>(3 người - 3 tiếng)</p>
              <h4 className="border-top pt-2">
                675.000<sup>đ</sup> - 855.000<sup>đ</sup>
              </h4>
            </div>
            <div className="bg-white p-2 px-4 rounded">
              <h4>
                150m<sup>2</sup>
              </h4>
              <p>(3 người - 4 tiếng)</p>
              <h4 className="border-top pt-2">
                900.000<sup>đ</sup> - 1.140.000<sup>đ</sup>
              </h4>
            </div>
            </Slider>
          </div>
          {/* <div className="row justify-content-around">
            <div className="col-lg-3 bg-white p-2 px-4 rounded">
              <h4>
                80m<sup>2</sup>
              </h4>
              <p>(2 người - 4 tiếng)</p>
              <h4 className="border-top pt-2">
                600.000<sup>đ</sup> - 760.000<sup>đ</sup>
              </h4>
            </div>
            <div className="col-lg-3 bg-white p-2 px-4 rounded mt-3">
              <h4>
                100m<sup>2</sup>
              </h4>
              <p>(3 người - 3 tiếng)</p>
              <h4 className="border-top pt-2">
                675.000<sup>đ</sup> - 855.000<sup>đ</sup>
              </h4>
            </div>
            <div className="col-lg-3 bg-white p-2 px-4 rounded mt-3">
              <h4>
                150m<sup>2</sup>
              </h4>
              <p>(3 người - 4 tiếng)</p>
              <h4 className="border-top pt-2">
                900.000<sup>đ</sup> - 1.140.000<sup>đ</sup>
              </h4>
            </div>
          </div> */}
          <div className="row mt-5 justify-content-center">
            <div className="col-md-6">
              <h3>
                <i className="fa-solid fa-circle-exclamation"></i> Lưu ý
              </h3>
              <p>
                * Bảng giá giúp việc theo giờ trên mang tính chất tham khảo ở
                thời điểm hiện tại.
              </p>
              <p>
                * Giá dịch vụ có thể tự động điều chỉnh tùy vào giờ cao điểm,
                cuối tuần hay lễ tết.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-sm-12">
            <h2>Đội ngũ cộng tác viên tổng vệ sinh là ai?</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-experience.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Người dọn nhà chuyên nghiệp</h3>
              <p>
                Mỗi cộng tác viên dọn dẹp nhà cửa đều có ít nhất 6 tháng kinh
                nghiệm.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-checked-man.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Đã kiểm tra và xác minh lý lịch</h3>
              <p>
                Cộng tác viên dọn dẹp được phỏng vấn trực tiếp và trải qua 3
                bước kiểm tra lý lịch
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-rating-man.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Được đánh giá cao bởi các khách hàng khác</h3>
              <p>
                Chúng tôi thu thập các đánh giá và phản hồi của khách hàng sau
                mỗi lần dọn dẹp để đảm bảo tất cả cộng tác viên dọn dẹp đều có
                chất lượng tốt nhất.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-polite.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Thân thiện và lịch sự</h3>
              <p>
                Cộng tác viên dọn dẹp của bTaskee được đào tạo về chuyên môn,
                cách ứng xử và giao tiếp với khách hàng để đảm bảo rằng, thời
                gian dọn dẹp tại nhà khách hàng luôn thoải mái và vui vẻ nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TongVeSinhView;
