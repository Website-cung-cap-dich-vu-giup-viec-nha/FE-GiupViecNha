import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import Header from "./components/Header";
import DangNhapView from "./pages/DangNhapView";
import Footer from "./components/Footer";
import TrangChuView from "./pages/TrangChuView";
import NotFound from "./components/NotFound";
import DangKyView from "./pages/DangKyView";
import { useEffect, useState } from "react";
import axios from "axios";
import Sorry from "./components/Sorry";
import HoSoView from "./pages/HoSoView";
import DoiMatKhauView from "./pages/DoiMatKhauView";

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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
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

  const handleReloadHeader = (data) => {
    setUser(data)
  };

 

  useEffect(() => {
    ktraDangNhap();
  }, [location]);

  const ktraDangNhap = async () => {
    const token = Cookies.get("token");
    if (token) {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row min-vh-100 align-content-center">
          <div className="col-12 text-center"><CircularProgress /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<TrangChuView />} />
        <Route path="/dangnhap" element={<DangNhapView />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dangky" element={<DangKyView />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/hoso" element={user ? <HoSoView user={user} handleReloadHeader={handleReloadHeader}/> : <Navigate to="/dangnhap" />} />
        <Route path='/doimatkhau' element={user ? <DoiMatKhauView user={user}/> : <Navigate to="/dangnhap" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
