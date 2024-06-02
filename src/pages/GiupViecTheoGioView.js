import React, { useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import bannerGiupViec from "../assets/banner/banner-giupviec.jpg";
import bannerlydochon from "../assets/banner/home-cleaning-tai-sao-lua-chon-btaskee.png";
import phongbep from "../assets/banner/deep-cleaning-nha-bep.png";
import phongtam from "../assets/banner/deep-cleaning-nha-tam.png";
import phongkhach from "../assets/banner/deep-cleaning-ve-sinh-chung.png";
import phongngu from "../assets/banner/deep-cleaning-phong-ngu.png";
import { Link, useLocation } from "react-router-dom";

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

const GiupViecTheoGioView = () => {
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
          backgroundImage: `url(${bannerGiupViec})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
          height: "auto",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-white py-2 ">
              <h1 className="mb-3">Giúp Việc Theo Giờ</h1>
              <p>
                Nhịp sống đô thị đang dần trở nên bận rộn hơn với công việc và
                xã hội. Đặc biệt thời gian của người phụ nữ dành cho gia đình và
                chăm sóc nhà cửa cũng càng trở nên eo hẹp hơn. Vậy làm sao để
                cân bằng được giữa công việc và gia đình luôn là vấn đề khúc mắc
                của nhiều gia đình Việt. Đã có nhiều gia đình bỏ ra một khoản
                tiền lớn hằng tháng chỉ để thuê giúp việc cố định nhưng đôi lúc
                việc này trở nên không thực sự cần thiết vì không phải lúc nào
                cũng có việc để người giúp việc làm liên tục. Lúc này giúp việc
                nhà theo giờ sẽ là giải pháp hợp lý cho mọi gia đình!
              </p>
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
                  to={"/thuedichvu/1"}
                >
                  Trải nghiệm dịch vụ
                </Link>
              </button>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>

      <div className="container d-block d-lg-none">
        <img src={bannerGiupViec} alt="" className="w-100 h-auto" />
        <div className="row mt-3">
          <div className="col-12">
            <h1 className="mb-3">Giúp Việc Theo Giờ</h1>
            <p>
              Nhịp sống đô thị đang dần trở nên bận rộn hơn với công việc và xã
              hội. Đặc biệt thời gian của người phụ nữ dành cho gia đình và chăm
              sóc nhà cửa cũng càng trở nên eo hẹp hơn. Vậy làm sao để cân bằng
              được giữa công việc và gia đình luôn là vấn đề khúc mắc của nhiều
              gia đình Việt. Đã có nhiều gia đình bỏ ra một khoản tiền lớn hằng
              tháng chỉ để thuê giúp việc cố định nhưng đôi lúc việc này trở nên
              không thực sự cần thiết vì không phải lúc nào cũng có việc để
              người giúp việc làm liên tục. Lúc này giúp việc nhà theo giờ sẽ là
              giải pháp hợp lý cho mọi gia đình!
            </p>
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
                  to={"/thuedichvu/1"}
                >
                  Trải nghiệm dịch vụ
                </Link>
              </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>Giải pháp giúp việc theo giờ</h2>
            <div>
              <p>
                Mỗi khi có nhu cầu tìm kiếm người giúp việc hoặc hỗ trợ việc nhà
                phù hợp với giờ giấc, công việc của mình thì người tiêu dùng
                thường tìm đến các trung tâm, công ty môi giới nguồn nhân lực.
                Do chỉ đóng vai trò trung gian nên người tiêu dùng không được
                các bên môi giới đảm bảo tính an toàn, xác minh nhân thân kỹ
                càng của người lao động. Chưa kể chất lượng của người giúp việc
                không đồng đều dẫn tới hư hại nhà cửa, bỏ việc tự ý, khiến tiền
                mất tật mang.
              </p>
              <p>
                Giúp việc theo giờ của bTaskee ra đời đã giải quyết tất cả các
                khâu liên hệ và thủ tục xác nhận người giúp việc phức tạp ở
                trên. Hoạt động tương tự như Grab hay Uber, chỉ từ 60 giây đặt
                lịch ngay trên ứng dụng bTaskee quý khách hàng đã có thể hoàn
                thành xong thao tác đặt người giúp việc theo giờ một cách đơn
                giản và tiết kiệm thời gian.
              </p>
              <p>
                Tất cả các thông tin liên hệ, giờ giấc, hình ảnh người giúp việc
                và giá cả sẽ được hiển thị trên ứng dụng bTaskee rõ ràng, minh
                bạch giúp chủ nhà yên tâm hơn với chất lượng dịch vụ giúp việc
                theo giờ tại bTaskee. Đặc biệt ứng dụng còn có các tiện ích như
                kết nối các cổng thanh toán trực tuyến, Premium,….
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="mb-3">Lý do nên chọn giúp việc theo giờ</h2>
        <img src={bannerlydochon} alt="" className="w-100 h-auto mb-3" />
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-safe.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>An toàn</h3>
              <p>
                Các cộng tác viên giúp việc theo giờ đều được bTaskee trực tiếp
                xác minh danh tính, nhân thân tốt và đều đã tiêm 2 mũi vắc-xin
                ngừa Co-vid trước khi được cho nhận việc.
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
              <h3>Chuyên gia</h3>
              <p>
                Các cộng tác viên đều là các chuyên gia giúp việc được đào tạo
                kỹ năng dọn dẹp nhà cửa bài bản và luôn đảm bảo chất lượng trên
                từng công việc.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-times.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Tiết kiệm thời gian</h3>
              <p>
                Chỉ từ 60 giây thao tác nhanh chóng trên ứng dụng là khách hàng
                đã có ngay người giúp việc.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-support.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Hỗ trợ</h3>
              <p>
                Các kiến nghị của khách hàng sẽ được giải đáp nhanh chóng qua
                các kênh liên hệ như tổng đài, email hoặc trò chuyện trực tuyến.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-diversity.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Kinh nghiệm</h3>
              <p>
                Với tổng thời gian đạt hơn 6 triệu giờ làm trong 6 năm qua là
                con số đủ để khách hàng an tâm khi sử dụng dịch vụ.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <img
              width={30}
              height={30}
              src={require("../assets/icon/icon-quality.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Niềm tin</h3>
              <p>
                Hơn 300.000+ khách hàng đã và đang tin tưởng sử dụng dịch vụ
                giúp việc theo giờ thông qua ứng dụng bTaskee.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <img
              width={30}
              height={30}
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
                Hòa và Cần Thơ. Ngoài ra bTaskee cũng đang có kế hoạch mở rộng
                dịch vụ ra các quốc gia lân cận trong khu vực Đông Nam Á như
                Indonesia, Malaysia, Philipin …
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
                    <Tab label="Dọn nhà bếp" {...a11yProps(0)} />
                    <Tab label="Dọn phòng tắm" {...a11yProps(1)} />
                    <Tab
                      label="Phòng khách và khu vực chung"
                      {...a11yProps(2)}
                    />
                    <Tab label="Phòng ngủ" {...a11yProps(3)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongbep} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Nhà bếp</h3>
                      <span> ◆ </span>Rửa chén và xếp chén đĩa <br />
                      <span> ◆ </span>Lau bụi và lau tất cả các bề mặt có thể
                      tiếp cận <br />
                      <span> ◆ </span>Lau mặt ngoài của tủ bếp, các thiết bị gia
                      dụng <br />
                      <span> ◆ </span>Lau các công tắc và tay cầm <br />
                      <span> ◆ </span>Cọ rửa bếp <br />
                      <span> ◆ </span>Lau mặt bàn <br />
                      <span> ◆ </span>Làm sạch bồn rửa <br />
                      <span> ◆ </span>Đổ rác <br />
                      <span> ◆ </span>Quét và lau sàn nhà
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongtam} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Phòng tắm</h3>
                      <span>◆ </span>Làm sạch toilet <br />
                      <span>◆ </span>Lau chùi sạch vòi sen, bồn tắm và bồn rửa{" "}
                      <br />
                      <span>◆ </span>Làm sạch bên ngoài tủ, gương và đồ đạc{" "}
                      <br />
                      <span>◆ </span>Lau công tắc và tay cầm <br />
                      <span>◆ </span>Sắp xếp ngăn nắp các vật dụng <br />
                      <span>◆ </span>Đổ rác <br />
                      <span>◆ </span>Quét và lau sàn <br />
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongkhach} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Phòng khách và khu vực chung</h3>
                      <span> ◆ </span>Quét bụi và lau tất cả các bề mặt có thể
                      tiếp cận <br />
                      <span> ◆ </span>Lau công tắc và tay cầm <br />
                      <span> ◆ </span>Đổ rác <br />
                      <span> ◆ </span>Quét và lau sàn
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <img src={phongngu} alt="" className="w-100 h-auto" />
                    </div>
                    <div className="col-12 col-md-6">
                      <h3>Phòng ngủ</h3>
                      <span> ◆ </span>Lau bụi và lau tất cả các bề mặt có thể
                      tiếp cận <br />
                      <span> ◆ </span>Lau công tắc và tay cầm <br />
                      <span> ◆ </span>Lau sạch gương <br />
                      <span> ◆ </span>Sắp xếp lại giường cho gọn gàng (để lại
                      khăn trải giường mới nếu bạn muốn chúng tôi thay) <br />
                      <span> ◆ </span>Hút bụi và lau sàn
                    </div>
                  </div>
                </CustomTabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2>Phẩm chất người giúp việc</h2>
        <p>
          Các cộng tác viên giúp việc của bTaskee được trang bị phẩm chất tốt
          như đúng giờ, trung thực, chăm chỉ và linh hoạt trong công việc đảm
          bảo khách hàng yên tâm giao phó công việc mà không cần đắn đo về việc
          phải giám sát người giúp việc liên tục trong suốt ca làm.
        </p>
      </div>

      <div className="container my-5">
        <h2 className="mb-3">Bảng giá giúp việc theo giờ</h2>
        <div className="row justify-content-center">
          <div className="col-md-6 col-12">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Giá/h</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thứ 2 đến thứ 6</td>{" "}
                  <td className="text-end">80.000 đ</td>
                </tr>
                <tr>
                  <td>Thứ 7 và Chủ Nhật</td>{" "}
                  <td className="text-end">100.000 đ</td>
                </tr>
                <tr>
                  <td>Gói T2 - T4 - T6</td>{" "}
                  <td className="text-end">75.000 đ</td>
                </tr>
                <tr>
                  <td>Gói T3 - T5 - T7</td>{" "}
                  <td className="text-end">80.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiupViecTheoGioView;
