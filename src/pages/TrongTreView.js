import React, { useEffect } from "react";
import bannertrongtre from "../assets/banner/dich-vu-trong-tre-tai-nha-theo-gio-cover.jpg";
import { Link, useLocation } from "react-router-dom";
const TrongTreView = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div
        className="container-fluid d-none d-lg-block"
        style={{
          backgroundImage: `url(${bannertrongtre})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "15% 0% 15% 0%",
        }}
      >
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-6">
              <h1 className="fw-bold mb-3" style={{ color: "#FF8228" }}>
                Dịch vụ trông trẻ tại nhà theo giờ uy tín
              </h1>
              <p className="mb-3">
                Bạn đang cần tìm người trông trẻ chuyên nghiệp phụ giúp bạn chăm
                sóc bé ngay tại nhà mình?
              </p>
              <p className="mb-3">
                Chỉ với 60 giây bTaskee sẽ giúp bạn có ngay một chuyên gia giữ
                trẻ tại nhà có trách nhiệm, kỹ năng chuyên môn, chuyên nghiệp và
                đã được xác minh nhân thân kỹ lưỡng.
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
                    to="/thuedichvu/3"
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
        <img src={bannertrongtre} alt="" className="w-100 h-auto" />
        <div className="m-auto" style={{ maxWidth: "1140px" }}>
          <div className="row p-3">
            <div className="col-12">
              <h1 className="fw-bold mb-3" style={{ color: "#FF8228" }}>
                Dịch vụ trông trẻ tại nhà theo giờ uy tín
              </h1>
              <p className="mb-3">
                Bạn đang cần tìm người trông trẻ chuyên nghiệp phụ giúp bạn chăm
                sóc bé ngay tại nhà mình?
              </p>
              <p className="mb-3">
                Chỉ với 60 giây bTaskee sẽ giúp bạn có ngay một chuyên gia giữ
                trẻ tại nhà có trách nhiệm, kỹ năng chuyên môn, chuyên nghiệp và
                đã được xác minh nhân thân kỹ lưỡng.
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
                    to="/thuedichvu/3"
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
          <div className="col-sm-6">
            <h2>
              Tại sao ba mẹ nên sử dụng dịch vụ trông trẻ tại nhà của bTaskee?
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              src={require("../assets/banner/ly-do-lua-chon-trong-tre-tai-nha.png")}
              className="w-100 h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-xl-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/icon-fast.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Nhanh chóng tìm được người chăm sóc trẻ em chuyên nghiệp</h3>
              <p>
                Các ba mẹ sẽ nhanh chóng tìm được những chuyên gia chăm sóc bé
                có kinh nghiệm, kiến thức chuyên môn trong việc trông giữ trẻ.
                Chỉ với vài thao tác đặt lịch khoảng 60s trên ứng dụng, bTaskee
                sẽ giúp bạn có ngay một chuyên gia trông trẻ tận tâm - chuyên
                nghiệp.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/icon-shield.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Đảm bảo an toàn tuyệt đối cho bé</h3>
              <p>
                Sự an toàn của trẻ sẽ là yếu tố quan trọng nhất trong việc chăm
                sóc trẻ em, bTaskee quản lý nghiêm ngặt tất cả các cộng tác
                viên. Họ cần phải trải qua đầy đủ quá trình tuyển lựa khắt khe
                và kiểm tra nhân thân kỹ lưỡng.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/icon-heart.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Tận tình và chu đáo khi làm việc</h3>
              <p>
                Cộng tác viên của bTaskee sẽ chăm sóc trẻ em một cách chuyên
                nghiệp nhất. Chủ động với công việc của mình - Hỗ trợ cho trẻ
                vui chơi, đưa đón trẻ đi học, vệ sinh cá nhân, ăn uống theo ghi
                chú, yêu cầu của phụ huynh. Các bảo mẫu trông trẻ đều là các chị
                em độ tuổi 22 tới 45, được tuyển chọn và đào tạo kỹ càng.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <img
              width={80}
              height={80}
              src={require("../assets/icon/icon-phone.png")}
              alt="icon-language"
              loading="lazy"
            ></img>
            <div className="mt-3">
              <h3>Giám sát và hỗ trợ kịp thời</h3>
              <p>
                bTaskee sẽ thường xuyên cập nhật thông tin qua ứng dụng, gọi
                điện thăm hỏi cộng tác viên và phụ huynh thường xuyên. bTaskee
                sẵn sàng hỗ trợ với mọi nhu cầu của phụ huynh thông các tổng đài
                hoặc các kênh liên lạc khác.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 pt-5">
        <div className="row mb-4">
          <div className="col-xl-6">
            <h2 className="mb-4">
              Cộng tác viên bTaskee sẽ làm những công việc gì khi giữ trẻ?
            </h2>
            <p>
              Sau đây là những công việc mà Cộng tác viên của bTaskee sẽ thực
              hiện trong gói dịch vụ trông trẻ tại nhà theo giờ
            </p>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <img
              src={require("../assets/banner/cong-viec-cua-ctv-trong-tre-tai-nha.png")}
              alt=""
              className="w-100 h-auto"
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">Trông trẻ từ 12 tháng đến 11 tuổi</div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">Giữ trẻ luôn được an toàn</div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Nấu ăn và cho trẻ ăn theo yêu cầu của phụ huynh
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">Vệ sinh cá nhân cho trẻ</div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Loại bỏ các vật dụng có thể gây nguy hại cho trẻ
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Giao tiếp và tham gia các hoạt động cùng trẻ
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Dọn dẹp vệ sinh đồ chơi và các dụng cụ nấu nướng, pha chế đồ ăn,
                thức uống cho trẻ
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Pha sữa cho bé theo hướng dẫn của phụ huynh
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">Cho trẻ ngủ</div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Hỗ trợ đưa trẻ đi học hoặc các địa điểm khác theo yêu cầu của
                phụ huynh theo yêu cầu
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center lh-lg">
              <i
                className="fa-solid fa-check me-2 fs-5"
                style={{ color: "#FF8228" }}
              ></i>
              <div className="fw-medium">
                Thông báo cập nhật tình hình của trẻ cho phụ huynh
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="py-5">Bảng giá trông trẻ tại nhà</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>Thời gian</td>
                  <td>3 giờ</td>
                  <td>4 giờ</td>
                  <td>8 giờ</td>
                </tr>
                <tr>
                  <td>Giá</td>
                  <td>240.000đ - 312.000đ</td>
                  <td>300.000đ - 410.000đ</td>
                  <td>560.000đ - 846.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrongTreView;
