import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import bannernguoigia from "../assets/banner/new-head-image-cham-soc-nguoi-gia.png";
import sang from "../assets/banner/cong-viec-cham-soc-nguoi-benh-buoi-sang.png";
import chieu from "../assets/banner/cong-viec-cham-soc-nguoi-benh-buoi-chieu.png";

import { Box, Tab, Tabs, Typography } from "@mui/material";

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
const ChamSocNgCaoTuoiView = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div
        className="container-fluid d-none d-lg-block"
        style={{
          backgroundImage: `url(${bannernguoigia})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-5 text-white">
              <h1 className="fw-bold mb-3">
                Dịch vụ chăm sóc <br /> người cao tuổi tại nhà <br />
                chuyên nghiệp
              </h1>

              <p className="mb-3">
                Bạn đang tìm kiếm một dịch vụ chăm sóc cho người cao tuổi tại
                nhà? bTaskee – Mang đến cho bạn sự hỗ trợ tuyệt vời nhất đem lại
                sự thoải mái tối đa cho những người bạn yêu thương. Chỉ với 60
                giây lướt chạm ứng dụng trên thiết bị di động, bạn sẽ có ngay
                chuyên gia chăm sóc người cao tuổi đến từ bTaskee.
              </p>
              <div>
                <button
                  style={{
                    backgroundColor: "white",
                    borderRadius: "30px",
                    padding: "14px 24px",
                    border: "none",
                  }}
                >
                  <Link
                    style={{ color: "#FF8228" }}
                    className="text-decoration-none"
                    to={"/thuedichvu/4"}
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
        <img src={bannernguoigia} alt="" className="w-100 h-auto" />
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-12">
              <h1 className="fw-bold mb-3">
                Dịch vụ chăm sóc <br /> người cao tuổi tại nhà <br />
                chuyên nghiệp
              </h1>

              <p className="mb-3">
                Bạn đang tìm kiếm một dịch vụ chăm sóc cho người cao tuổi tại
                nhà? bTaskee – Mang đến cho bạn sự hỗ trợ tuyệt vời nhất đem lại
                sự thoải mái tối đa cho những người bạn yêu thương. Chỉ với 60
                giây lướt chạm ứng dụng trên thiết bị di động, bạn sẽ có ngay
                chuyên gia chăm sóc người cao tuổi đến từ bTaskee.
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
                    to="/thuedichvu/4"
                  >
                    Trải nghiệm dịch vụ
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <h2>Người cao tuổi cần được quan tâm chăm sóc nhiều hơn</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>
              <p>
                Ở mỗi độ tuổi, con người sẽ có một nhu cầu, mong muốn và mục
                tiêu sống khác nhau. So với tuổi trẻ sôi động, mạnh mẽ với đầy
                nhiệt huyết, hoài bão phát triển thì khi về già con người ta
                thường trầm lặng hơn, họ rất dễ rơi vào trầm cảm, cô đơn và dễ
                bị tổn thương. Vì vậy, người già rất cần sự quan tâm và yêu
                thương từ những người thân yêu đặc biệt là con cháu.
              </p>
              <p>
                Thế nhưng trong cuộc sống hiện đại hiện nay, những người trưởng
                thành luôn bận rộn với công việc lao động mưu sinh, chăm sóc,
                nuôi dạy con cái và hàng tá những công việc nhà không tên.
              </p>
              <p>
                Hiếm có một người con nào có đủ thời gian để thực hiện những
                công việc chăm sóc bố mẹ như chuẩn bị các bữa ăn với chế độ dinh
                dưỡng phù hợp, phụ giúp vệ sinh cá nhân, tâm sự, động viên, chia
                sẻ với các cụ…. Do đó, phần lớn người cao tuổi trong xã hội ngày
                nay không được chăm sóc một cách toàn diện.
              </p>
              <p>
                Thấu hiểu được những nỗi vất vả và bất tiện của những gia đình
                có người cao tuổi, bTaskee đã cho ra mắt dịch vụ chăm sóc người
                cao tuổi với đội ngũ chuyên gia uy tín, chuyên nghiệp và quy
                trình đặt lịch đơn giản, tiết kiệm thời gian cho quý khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="">
              Lợi ích của dịch vụ người chăm sóc người cao tuổi
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="">
                Người già sống vui, sống khỏe, nâng cao chất lượng cuộc sống và
                tuổi thọ. Các cụ không cần phải đến viện dưỡng lão và có thể
                sống vui, sum vầy cùng con cháu.
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="">Con cháu có thể yên tâm làm việc, học tập.</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="">
                Kịp thời phát hiện các dấu hiệu bất thường khi người cao tuổi
                lên cơn bệnh thông qua các triệu chứng dễ nhận biết. Do đó, giúp
                hạn chế tối đa rủi ro xảy đến với các cụ và tiết kiệm thêm các
                khoản chi phí điều trị những căn bệnh nguy hiểm.
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="">
                Tiết kiệm thời gian, công sức và chi phí di chuyển.
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="">
                Linh hoạt và phù hợp với mọi lịch trình của gia đình.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-5">
            <h2>bTaskee giải pháp chăm sóc người cao tuổi tại nhà</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              src={require("../assets/banner/tai-sao-chon-cham-soc-nguoi-gia.png")}
              className="w-100 h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-search.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Nhanh chóng</h3>
              <p>
                Khách hàng sẽ không mất thời gian, công sức để tìm kiếm dịch vụ
                chăm sóc người già hay người cao tuổi đang cần đến sự giúp đỡ.
                Chỉ cần 60 giây đặt lịch trên ứng dụng là tìm được chuyên gia hỗ
                trợ chăm sóc cho người già ngay tại nhà.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-safe.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Tuyệt đối an toàn</h3>
              <p>
                Các chuyên gia chăm sóc đều được trải qua quá trình tuyển lọc
                khắt khe và kiểm tra danh tính.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-polite.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Yêu thương</h3>
              <p>
                Các chuyên gia chăm sóc được trang bị kỹ năng nghề và yêu thương
                người cao tuổi. Sẵn sàng hỗ trợ tốt nhất mọi thứ trong điều kiện
                cho phép.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-support.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Hỗ trợ kịp thời</h3>
              <p>
                Để đáp ứng tối đa nhu cầu của khách hàng, bTaskee sẵn sàng tiếp
                nhận mọi yêu cầu của khách hàng qua tổng đài 1900 636 736.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-quality.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Niềm tin</h3>
              <p>
                Hơn 300.000+ khách hàng đã và đang tin tưởng sử dụng dịch vụ
                tiện ích gia đình thông qua ứng dụng bTaskee
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <img
              width={40}
              height={40}
              src={require("../assets/icon/icon-language.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Quy mô</h3>
              <p>
                Hiện tại bTaskee đã phủ khắp các thành phố lớn tại Việt Nam và
                Thái Lan. Trong đó các tỉnh thành tại Việt Nam bao gồm: TPHCM,
                Hà Nội, Hải Phòng, Đà Nẵng, Nha Trang, Đà Lạt, Bình Dương, Biên
                Hòa và Cần Thơ. Ngoài ra bTaskee đang có kế hoạch mở rộng dịch
                vụ ra các quốc gia như Indonesia, Malaysia, Philipin …
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
              <div style={{ margin: "50px 0px 50px 0px" }}>
                <h2 className="text-white">
                  Cộng tác viên giúp việc theo giờ sẽ làm những gì?
                </h2>
              </div>
              <div className="bg-white border">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Chăm sóc tại nhà buổi sáng" {...a11yProps(0)} />
                    <Tab
                      label="Chăm sóc tại nhà buổi chiều"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={sang} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Chăm sóc tại nhà buổi sáng</h3>
                      <span>◆</span> Giúp người cao tuổi thức dậy vệ sinh cá
                      nhân
                      <br />
                      <span>◆</span> Ăn Sáng
                      <br />
                      <span>◆</span> Kiểm tra sức khỏe hàng ngày
                      <br />
                      <span>◆</span> Hỗ trợ uống thuốc theo đơn thuốc và điều
                      trị bệnh theo chỉ định bác sĩ
                      <br />
                      <span>◆</span> Hoạt động giải trí
                      <br />
                      <span>◆</span> Ăn trưa
                      <br />
                      <span>◆</span> Kiểm tra lại sức khỏe
                      <br />
                      <span>◆</span> Nghỉ trưa
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={chieu} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Chăm sóc tại nhà buổi chiều</h3>
                      <span>◆</span> Giúp người cao tuổi thức dậy
                      <br />
                      <span>◆</span> Luyện tập sức khoẻ
                      <br />
                      <span>◆</span> Vệ sinh cá nhân
                      <br />
                      <span>◆</span> Ăn tối
                      <br />
                      <span>◆</span> Chăm sóc buổi tối
                      <br />
                      <span>◆</span> Thư giãn đi ngủ
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
          <div className="row">
            <div className="col-md-5">
              <h2 className="py-5">Bảng giá dịch vụ chăm sóc người cao tuổi</h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3 bg-white p-2 px-4 rounded mx-3">
              <h4>Theo buổi</h4>
              <p>04 tiếng/ buổi</p>
              <h4 className="border-top pt-2">240.000 VND</h4>
            </div>
            <div className="col-lg-3 bg-white p-2 px-4 rounded mt-3 mt-lg-0">
              <h4>Theo ngày</h4>
              <p>8 tiếng/ ngày</p>
              <h4 className="border-top pt-2">440.000 VND</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChamSocNgCaoTuoiView;
