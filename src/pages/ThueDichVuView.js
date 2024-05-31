import React from "react";
import GiupViec from "../components/GiupViec";
import TongVeSinh from "../components/TongVeSinh";
import TrongTreVaNguoiGia from "../components/TrongTreVaNguoiGia";
import MayLanh from '../components/MayLanh';
import SoFa from '../components/SoFa';
import pattern from "../assets/background/pattern.jpg";
import { useParams } from "react-router-dom";
const ThueDichVuView = ({ user }) => {
  const { id } = useParams();

  return (
    <div style={{ backgroundImage: `url(${pattern})` }}>
      {id === "1" && <GiupViec user={user} />}
      {id === "2" && <TongVeSinh user={user} />}
      {id === "3" && <TrongTreVaNguoiGia user={user} />}
      {id === "4" && <TrongTreVaNguoiGia user={user} />}
      {id === "5" && <MayLanh user={user} />}
      {id === "6" && <SoFa user={user} />}
    </div>
  );
};

export default ThueDichVuView;
