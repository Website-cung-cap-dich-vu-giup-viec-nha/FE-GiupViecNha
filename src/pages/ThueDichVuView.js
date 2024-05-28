import React, { useEffect, useState } from "react";
import GiupViec from "../components/GiupViec";
import pattern from "../assets/background/pattern.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
const ThueDichVuView = ({ user }) => {
  const { id } = useParams();
  const [dsChiTietDV, setDSChiTietDV] = useState([]);
  useEffect(() => {
    const layDanhSachChiTietDVTheoId = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/layChiTietDVTheoIdDV/" + id
        );
        setDSChiTietDV(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    layDanhSachChiTietDVTheoId();
  }, [id]);
  return (
    <div style={{ backgroundImage: `url(${pattern})` }}>
      {id === "1" && <GiupViec dsChiTietDV={dsChiTietDV} user={user} />}
    </div>
  );
};

export default ThueDichVuView;
