import React, { useEffect } from "react";
import vesinhsofa from "../assets/banner/upholstery-cleaning-banner-update.jpg";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
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
const VeSinhSoFa = () => {
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
          backgroundImage: `url(${vesinhsofa})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-6 text-white">
              <h1 className="fw-bold mb-3 ">Vệ sinh SoFa</h1>
              <p className="mb-3 fw-medium">
                Vệ sinh sofa, rèm, đệm, thảm định kỳ là công việc cần thực hiện
                để đảm bảo an toàn cho không gian sống của gia đình luôn sạch
                sẽ, an toàn, loại bỏ mọi vết bẩn cứng đầu khiến bạn mệt mỏi.
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
                    to="/thuedichvu/6"
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
        <img src={vesinhsofa} alt="" className="w-100 h-auto" />
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-12">
              <h1 className="fw-bold mb-3 ">Vệ sinh SoFa</h1>
              <p className="mb-3 fw-medium">
                Vệ sinh sofa, rèm, đệm, thảm định kỳ là công việc cần thực hiện
                để đảm bảo an toàn cho không gian sống của gia đình luôn sạch
                sẽ, an toàn, loại bỏ mọi vết bẩn cứng đầu khiến bạn mệt mỏi.
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
                    to="/thuedichvu/6"
                  >
                    Trải nghiệm dịch vụ
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-xl-6">
            <h2 className="mb-4">
              Tại sao nên chọn dịch vụ vệ sinh Sofa của bTaskee?
            </h2>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-md-5">
            <img
              src={require("../assets/banner/tai-sao-chon-upholstery-cleaning-ver3.png")}
              alt=""
              className="w-100 h-auto"
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>Đặt lịch nhanh chóng</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>Máy móc vệ sinh hiện đại</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>Chất tẩy rửa có nguồn gốc rõ ràng, đảm bảo</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>Quy trình xử lý hóa chất, tẩy ẩm mốc theo chuẩn quốc tế</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>Giá cả minh bạch</div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div>
                Ngoài vệ sinh rèm, đệm, thảm, sofa - bTaskee còn được tích hợp
                dịch vụ giúp việc theo giờ và nhiều dịch vụ tiện ích khác cho
                gia đình bạn.
              </div>
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
                    <Tab label="Sofa" {...a11yProps(0)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="row">
                    <div className="col-12">
                      <span>◆</span> Kiểm tra tình trạng, số lượng. Xác nhận đơn
                      hàng.
                      <br />
                      <span>◆</span> Hút bụi trên mặt ghế, các kẽ ghế bằng máy
                      hút chuyên dụng.
                      <br />
                      <span>◆</span> Phun dung dịch làm sạch chuyên dụng lên bề
                      mặt ghế sofa.
                      <br />
                      <span>◆</span> Sử dụng máy chà cầm tay chuyên dụng loại bỏ
                      các vết ố bẩn bám trên mặt ghế.
                      <br />
                      <span>◆</span> Dùng máy hút chuyên dụng hút sạch chất bẩn
                      và dung dịch hóa chất bám trên bề mặt sau khi được làm
                      sạch.
                      <br />
                      <span>◆</span> Phun xả lại 1 lần nước để loại bỏ hoàn toàn
                      dung dịch hóa chất tẩy. Hút khô.
                      <br />
                      <span>◆</span> Phun khử khuẩn hơi nước nóng lên sofa với
                      dung dịch Cloramin B.
                      <br />
                      <span>◆</span> Phun thêm chất dưỡng ẩm bóng da đối với sản
                      phẩm bằng da.
                      <br />
                      <span>◆</span> Vệ sinh, lau khô sàn nhà và sắp xếp lại bàn
                      ghế về vị trí cũ.
                      <br />
                      <span>◆</span> Bàn giao và nghiệm thu với khách hàng.
                    </div>
                  </div>
                </CustomTabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="py-5">Bảng giá vệ sinh sofa</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <table className="table table-striped table-bordered">
              <thead className="t">
                <tr>
                  <th>STT</th>
                  <th>LOẠI GHẾ SOFA</th>
                  <th>GIÁ VỆ SINH SOFA NỈ/VẢI/DA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bộ Sofa 1 ghế dài 2 – 3 chỗ ngồi</td>
                  <td>360.000đ – 400.000đ</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Bộ Sofa gồm có 2 ghế. Trong đó mỗi ghế dài 2 – 3 chỗ ngồi
                    (hoặc ghế góc L).
                  </td>
                  <td>450.000đ – 500.000đ</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Bộ Sofa gồm có 3 ghế. Trong đó có 2 ghế dài 2 – 3 chỗ ngồi
                    và 1 ghế tựa (hoặc bộ ghế chữ U){" "}
                  </td>
                  <td>600.000đ – 650.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    </>
  );
};

export default VeSinhSoFa;
