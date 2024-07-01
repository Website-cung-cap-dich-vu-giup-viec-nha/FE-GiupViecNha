import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import DangNhapView from "./pages/DangNhapView";
import Users from "./pages/admin/users";
import TrangChuView from "./pages/TrangChuView";
import NotFound from "./components/NotFound";
import DangKyView from "./pages/DangKyView";
import { useEffect, useState } from "react";
import axios from "axios";
import Sorry from "./components/Sorry";
import HoSoView from "./pages/HoSoView";
import DefaultLayout from "./components/Layout/DefaultLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLoginAndRegister from "./ProtectedLoginAndRegister";
import ThueDichVuView from "./pages/ThueDichVuView";
import CamOn from "./components/CamOn";
import PhuongThucThanhToan from "./components/PhuongThucThanhToan";
import KetQuaThanhToan from "./components/KetQuaThanhToan";
import ThongKeView from "./pages/ThongKeView";
import GiupViecTheoGioView from "./pages/GiupViecTheoGioView";
import TongVeSinhView from "./pages/TongVeSinhView";
import TrongTreView from "./pages/TrongTreView";
import ChamSocNgCaoTuoiView from "./pages/ChamSocNgCaoTuoiView";
import VeSinhMayLanhView from "./pages/VeSinhMayLanhView";
import VeSinhSoFa from "./pages/VeSinhSoFa";
import ProductManager from "./pages/admin/ProductManager";
import Calendar from "./pages/admin/Calendar";
import ScrollToTop from "./components/ScrollToTop";
import TimKiemDVView from "./pages/TimKiemDVView";
import ProtectedPermission from "./ProtectedPermission";
import ProtectedCustomerLogin from "./ProtectedCustomerLogin";
import CalendarManager from "./pages/admin/CalendarManager";
import PermissionManager from "./pages/admin/PermissionManager";
import TienMat from "./components/TienMat";
import FeedbackManager from "./components/FeedbackManager";
import ThongKeGioView from "./pages/ThongKeGioView";
import ThongKe from "./pages/admin";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/refresh-token",
            { refresh_token: refreshToken }
          );
          Cookies.set("token", response.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error(refreshError);
          Cookies.remove("token");
          Cookies.remove("refreshToken");
        }
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [adminPagename, setAdminPageName] = useState("");
  const [adminBreadCrumb, setAdminBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const handleReloadHeader = (data) => {
    setUser(data);
  };

  useEffect(() => {
    const ktraDangNhap = async () => {
      const token = Cookies.get("token");
      if (token) {
        setLoading(true);
        try {
          const response = await axiosInstance.get("/auth/profile");
          setUser(response.data.user);
        } catch (error) {
          console.error(error);
          handleTokenExpired();
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    const handleTokenExpired = () => {
      // Xóa token ở đây (ví dụ: xóa cookie)
      Cookies.remove("token");
      // Đặt user thành null và chuyển hướng đến trang đăng nhập
      setUser(null);
      navigate("/dangnhap"); // Sử dụng navigate từ thư viện react-router-dom
    };

    ktraDangNhap();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="container">
        <div className="row min-vh-100 align-content-center">
          <div className="col-12 text-center">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes with Default Layout */}
        <Route path="/" element={<DefaultLayout user={user} />}>
          <Route element={<ProtectedLoginAndRegister />}>
            <Route path="/dangnhap" element={<DangNhapView />} />
            <Route path="/dangky" element={<DangKyView />} />
          </Route>
          <Route path="/" element={<TrangChuView />} />
          <Route path="/camon" element={<CamOn />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/feedbackmanager" element={<FeedbackManager />} /> */}
          <Route path="/sorry" element={<Sorry />} />
          <Route
            path="/phuongthucthanhtoan"
            element={<PhuongThucThanhToan />}
          />
          <Route path="/ketquathanhtoan" element={<KetQuaThanhToan />} />
          <Route path="/tienmat" element={<TienMat />} />
          {/* <Route path="/thongkesogiolam" element={<ThongKeGioView />} /> */}
          <Route path="/giupviectheogio" element={<GiupViecTheoGioView />} />
          <Route path="/tongvesinh" element={<TongVeSinhView />} />
          <Route path="/trongtre" element={<TrongTreView />} />
          <Route path="/vesinhmaylanh" element={<VeSinhMayLanhView />} />
          <Route path="/vesinhsofa" element={<VeSinhSoFa />} />
          <Route
            path="/chamsocnguoicaotuoi"
            element={<ChamSocNgCaoTuoiView />}
          />
          <Route
            path="/chamsocnguoicaotuoi"
            element={<ChamSocNgCaoTuoiView />}
          />
          <Route path="/search" element={<TimKiemDVView />} />
          <Route element={<ProtectedCustomerLogin />}>
            <Route
              path="/thuedichvu/:id"
              element={
                user ? (
                  <ThueDichVuView user={user} />
                ) : (
                  <Navigate to="/dangnhap" />
                )
              }
            />
          </Route>
          <Route
            path="/hoso"
            element={
              user ? (
                <HoSoView user={user} handleReloadHeader={handleReloadHeader} />
              ) : (
                <Navigate to="/dangnhap" />
              )
            }
          />
        </Route>

        {/* Routes with Admin Layout */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={
              <AdminLayout
                pageName={adminPagename}
                breadCrumb={adminBreadCrumb}
              />
            }
          >
            <Route element={<ProtectedPermission idQuyen={1} />}>
              <Route
                path="users"
                element={
                  <Users
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
            <Route element={<ProtectedPermission idQuyen={2} />}>
              <Route
                path="productmanager"
                element={
                  <ProductManager
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
            <Route
              path="calendar"
              element={
                <Calendar
                  setPageName={setAdminPageName}
                  setBreadCrumb={setAdminBreadCrumb}
                />
              }
            />
            <Route element={<ProtectedPermission idQuyen={0} />}>
              <Route
                path=""
                element={
                  <ThongKe
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
            <Route element={<ProtectedPermission idQuyen={4} />}>
              <Route
                path="calendarmanager"
                element={
                  <CalendarManager
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
            <Route element={<ProtectedPermission idQuyen={3} />}>
              <Route
                path="permissionmanager"
                element={
                  <PermissionManager
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
            <Route element={<ProtectedPermission idQuyen={0} />}>
              <Route
                path="feedbackmanager"
                element={
                  <FeedbackManager
                    setPageName={setAdminPageName}
                    setBreadCrumb={setAdminBreadCrumb}
                  />
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
