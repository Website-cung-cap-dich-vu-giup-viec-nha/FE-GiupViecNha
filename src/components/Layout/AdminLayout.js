import React from "react";
import { Outlet } from "react-router-dom";
import AdminMenuItem from "../admin/AdminMenuItem";

const AdminLayout = () => {
  return (
    <>
      <AdminMenuItem>
        <Outlet />
      </AdminMenuItem>
    </>
  );
};

export default AdminLayout;
