import React from "react";
import GiupViec from "../components/GiupViec";
import TongVeSinh from "../components/TongVeSinh";
import pattern from "../assets/background/pattern.jpg";
import { useParams } from "react-router-dom";
const ThueDichVuView = ({ user }) => {
  const { id } = useParams();
  
  return (
    <div style={{ backgroundImage: `url(${pattern})` }}>
      {id === "1" && <GiupViec user={user} />}
      {id === "2" && <TongVeSinh user={user} />}
    </div>
  );
};

export default ThueDichVuView;
