import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "./api/admin/AuthAPI";
import { Box, CircularProgress } from "@mui/material";
import { getToken } from "./config";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null để biểu thị trạng thái tải ban đầu
  const checkToken = async () => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const response = await getProfile();
      if (response.message.data != null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/dangnhap" />;
};

export default ProtectedRoute;
