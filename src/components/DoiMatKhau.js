import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const DoiMatKhau = ({ user }) => {
  const [doimatkhau, setDoiMatKhau] = useState({
    id: user.id,
    password: "",
    newPass: "",
    rePass: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/api/auth/doimatkhau",
        doimatkhau
      );
      if (!response.data.status) {
        setError(response.data.message);
        return;
      }

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });

      navigate("/hoso");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", backgroundColor: "white" }}
      className="p-4 rounded m-auto shadow  border"
    >
      <p className="text-start mb-3 fs-4">Đổi mật khẩu</p>
      {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div>
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </div>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) =>
                setDoiMatKhau({ ...doimatkhau, password: e.target.value })
              }
              className="form-control"
              placeholder=""
              required
            />
            <label htmlFor="password">Mật khẩu cũ</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="newPass"
              value={user.newPass}
              onChange={(e) =>
                setDoiMatKhau({ ...doimatkhau, newPass: e.target.value })
              }
              className="form-control"
              placeholder=""
              required
            />
            <label htmlFor="newPass">Mật khẩu mới</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="rePass"
              value={user.rePass}
              onChange={(e) =>
                setDoiMatKhau({ ...doimatkhau, rePass: e.target.value })
              }
              className="form-control"
              placeholder=""
              required
            />
            <label htmlFor="rePass">Nhập lại mật khẩu</label>
          </div>

          <input
            type="submit"
            className="d-block w-100 ps-3 p-2 text-white"
            value={"ĐỔI MẬT KHẨU"}
            style={{
              backgroundColor: "#ffbe3d",
              backgroundImage:
                "linear-gradient(315deg, #ffbe3d 0%, #f06543 74%)",
              border: "none",
              borderRadius: "5px",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default DoiMatKhau;
