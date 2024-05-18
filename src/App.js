import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./App.css";
import Header from "./components/Header";
import DangNhapView from "./pages/DangNhapView";
import Footer from "./components/Footer";
import TrangChuView from "./pages/TrangChuView";
import NotFound from "./components/NotFound";
import DangKyView from "./pages/DangKyView";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  let location = useLocation();

  const ktraDangNhap = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    ktraDangNhap();
  }, [location]);

  if (loading) {
    return(<div class="d-flex align-items-center min-vh-100">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <Box sx={{ display: "flex" }}>
                <CircularProgress className="w-50"/>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
  }
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<TrangChuView />} />
        <Route path="/dangnhap" element={<DangNhapView />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dangky" element={<DangKyView />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
