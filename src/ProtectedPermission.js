import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkPermission } from "./api/admin/AuthAPI";
import { Box, CircularProgress } from "@mui/material";
import { isStaff } from "./api/admin/StaffAPI";

const ProtectedPermission = ({ idQuyen }) => {
  const [isPermmission, setIsPermission] = useState(null); // null để biểu thị trạng thái tải ban đầu
  const [staff, seStaff] = useState(true);
  const checking = async () => {
    try {
      if (idQuyen === 0) {
        const response = await isStaff();
        if (response?.message?.data?.data === true) {
          seStaff(true);
          setIsPermission(true);
        } else {
          seStaff(false);
          setIsPermission(false);
        }
      } else {
        const response = await checkPermission(idQuyen);
        if (response?.message?.data?.message === true) {
          setIsPermission(true);
        } else {
          setIsPermission(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsPermission(false);
    }
  };
  useEffect(() => {
    checking();
  }, []);

  if (isPermmission === null) {
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
    return <Navigate to="/" />;
  } else {
    return isPermmission ? <Outlet /> : <Navigate to="/admin" />;
  }
};

export default ProtectedPermission;
