import React from "react";
import NavMain from "./NavMain";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="container-md">
      <div className="row align-items-center py-2">
        <div className="col-md-9">
          <NavMain />
        </div>
        <div className="col-md-3 d-none d-md-block">
          
            <button className="btn btn-warning d-none d-sm-block ms-auto"><Link to="/dangnhap" className="text-decoration-none text-dark">Đăng nhập</Link></button>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
