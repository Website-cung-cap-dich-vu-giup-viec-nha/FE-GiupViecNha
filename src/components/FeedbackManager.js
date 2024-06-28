import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../config";
import DescriptionIcon from "@mui/icons-material/Description";
import { layChiTietNhanVienLamDichVu } from "../api/ChiTietNhanVienLamDichVuAPI";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const FeedbackManager = () => {
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [modalChiTiet, setModalChiTiet] = useState(false);
  const [chitiet, setChiTiet] = useState({});
  const [sortBy, setSortBy] = useState("new");

  const handleChiTiet = async (e) => {
    try {
      const response = await layChiTietNhanVienLamDichVu(e.target.value);
      setChiTiet(response.message.data[0]);
      setModalChiTiet(!modalChiTiet);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSort = (e) => {
    setSortBy(e.target.value);
    console.log(e.target.value)
  };

  useEffect(() => {
    const loadFeedbackTable = async () => {
      
      try {
        let response;
        if(sortBy==="new"){
          response = await axios.get("http://localhost:8000/api/danhgia");
        }else{
          response = await axios.get("http://localhost:8000/api/layDanhGiaTheoSapXep/"+sortBy);
        }
        setData(response.data);
        setTotalElements(response.data.length);
      } catch (error) {
        console.log();
      }
    };
    loadFeedbackTable();
  }, [sortBy]);
  return (
    <div className="container py-5">
      <div className="row">
      <div className="col">
      <div className="d-flex align-items-center">
        <label>Sắp xếp theo: </label>
        <select className="form-select ms-2" style={{maxWidth:200}} aria-label="Sort by" onChange={handleChangeSort}>
            <option value="new">Mới nhất</option>
            <option value="desc">Tốt</option>
            <option value="asc">Tệ</option>
          </select>
      </div>
      </div>
      </div>
      <div className="row">
        <div className="col">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={totalElements} // Số lượng dữ liệu trong danh sách
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    labelRowsPerPage={`Số dòng mỗi trang`}
                    labelDisplayedRows={() => ""}
                  />
                </TableRow>
                <TableRow sx={{ backgroundColor: "#E1E3E9" }}>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#606F89",
                      border: "1px solid rgba(210, 210, 210, 1)",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#606F89",
                      border: "1px solid rgba(210, 210, 210, 1)",
                    }}
                  >
                    Khách hàng
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#606F89",
                      border: "1px solid rgba(210, 210, 210, 1)",
                    }}
                  >
                    Đánh giá
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#606F89",
                      border: "1px solid rgba(210, 210, 210, 1)",
                    }}
                  >
                    Ý kiến
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#606F89",
                      border: "1px solid rgba(210, 210, 210, 1)",
                    }}
                  >
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <TableRow
                      key={item.idDanhGia}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
                        "&:nth-of-type(even)": { backgroundColor: "#F8F8F8" },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          color: "#606F89",
                          border: "1px solid rgba(210, 210, 210, 1)",
                        }}
                      >
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#606F89",
                          border: "1px solid rgba(210, 210, 210, 1)",
                        }}
                      >
                        <Avatar
                          alt={item.Anh}
                          src={`${config.apiBaseUrl}/${item.Anh}`}
                          sx={{ width: 60, height: 60, margin: "auto" }}
                        />
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#606F89",
                          border: "1px solid rgba(210, 210, 210, 1)",
                        }}
                      >
                        {Array.from({ length: item.SoSao }, (_, i) => (
                          <span className="text-warning mx-1" key={i}>
                            ★
                          </span>
                        ))}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#606F89",
                          border: "1px solid rgba(210, 210, 210, 1)",
                        }}
                      >
                        {item.YKien}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#606F89",
                          border: "1px solid rgba(210, 210, 210, 1)",
                        }}
                      >
                        <IconButton
                          value={item.idChiTietNhanVienLamDichVu}
                          onClick={handleChiTiet}
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal
        open={modalChiTiet}
        onClose={() => setModalChiTiet(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            THÔNG TIN NHÂN VIÊN THỰC HIỆN
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontWeight: "bold", fontSize: "18px" }}
            align="center"
          >
            {chitiet?.tenDichVu}
          </Typography>
          <div className="row mt-2">
            <div className="col">
              <p>Mã HD: {chitiet?.idPhieuDichVu}</p>
              <p>Nhân viên: {chitiet?.name}</p>
              <p>Ngày làm: {moment(chitiet?.NgayLam).format("DD/MM/YYYY")}</p>
              <p className="m-0">Giờ bắt đầu: {chitiet?.GioBatDau}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackManager;
