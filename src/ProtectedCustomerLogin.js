import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { isStaff } from "./api/admin/StaffAPI";

const ProtectedCustomerLogin = () => {
  const [staff, setStaff] = useState(true);
  const checking = async () => {
    try {
        const response = await isStaff();
        if (response?.message?.data?.data === true) {
          setStaff(true);
        } else {
          setStaff(false);
        }
    } catch (error) {
      console.log(error);
      setStaff(false);
    }
  };
  useEffect(() => {
    checking();
  }, []);

  if (staff === null) {
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
  if (staff === false) {
    return !staff ? <Outlet /> : <Navigate to="/admin" />;
  } else {
    return <Navigate to="/admin" />;  
  }
};

export default ProtectedCustomerLogin;
