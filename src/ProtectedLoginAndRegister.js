import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "./api/admin/AuthAPI";
import { Box, CircularProgress } from "@mui/material";
import { getToken } from "./config";

const ProtectedLoginAndRegister = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedLoginAndRegister;
