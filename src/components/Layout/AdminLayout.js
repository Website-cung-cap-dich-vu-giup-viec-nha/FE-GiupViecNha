import React from "react";
import { Outlet } from "react-router-dom";
import AdminMenuItem from "../admin/AdminMenuItem";

const AdminLayout = ({ pageName, breadCrumb }) => {
  return (
    <>
      <AdminMenuItem pageName={pageName} breadCrumb={breadCrumb}>
        <Outlet />
      </AdminMenuItem>
    </>
  );
};

export default AdminLayout;
