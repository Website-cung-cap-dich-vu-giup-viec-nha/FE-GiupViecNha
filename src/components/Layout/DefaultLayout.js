import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const DefaultLayout = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
