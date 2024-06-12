import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TimKiemDVView = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { search } = location.state || {};
  const [ketQuaSearch, setKetQuaSearch] = useState([]);
  useEffect(() => {
    const rsSearch = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dichvu/search/" + search
        );
        setKetQuaSearch(response.data);
        console.log(search);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    rsSearch();
  }, [search]);
  const getImage = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (err) {
      console.error("Image not found:", imageName);
      return null; // hoặc một hình ảnh mặc định nếu cần
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row min-vh-100 align-content-center">
          <div className="col-12 text-center">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container py-5">
        <div className="row">
        {ketQuaSearch.length<=0 && <h1 className="text-center">Không tìm thấy kết quả!</h1>}
          {ketQuaSearch &&
            ketQuaSearch.map((item, index) => (
              <div className="col-3 my-3">
                <div key={index} className="card">
                  <img
                    src={getImage(item.Anh)}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "171px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.tenDichVu}</h5>
                    <p className="card-text">{item.MoTa}</p>
                    {item.idDichVu === 1 && (
                      <Link
                        to="/giupviectheogio"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 2 && (
                      <Link
                        to="/tongvesinh"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 3 && (
                      <Link
                        to="/trongtre"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 4 && (
                      <Link
                        to="chamsocnguoicaotuoi"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 5 && (
                      <Link
                        to="/vesinhmaylanh"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                    {item.idDichVu === 6 && (
                      <Link
                        to="/vesinhsofa"
                        className="text-secondary text-decoration-underline"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TimKiemDVView;
