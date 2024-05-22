import React from "react";
import HoSo from "../components/HoSo";
import pattern from "../assets/background/pattern.jpg";
const HoSoView = ({ user, handleReloadHeader }) => {
  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="container py-4">
        <div className="row d-block d-md-flex justify-content-center">
          <div className="col-md-3 col-12 me-3">
            <div className="row">
                <div className="col-md-10 col-12 bg-secondary">
                    <div style={{height:"515px"}}>

                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-8">
            <HoSo user={user} handleReloadHeader={handleReloadHeader} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoSoView;
