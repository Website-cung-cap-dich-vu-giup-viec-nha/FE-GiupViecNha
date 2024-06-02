import {
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import View from "../../../../assets/icon/View.svg";
import Edit from "../../../../assets/icon/Edit.svg";
import Trash from "../../../../assets/icon/Trash.svg";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

const ProductReceiptList = ({
  data,
  totalElements,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setSelectedRow,
  setOpenDetail,
  setOpenDelete,
  setOpenInsert,
  setOpenEdit,
  handleTinhTrangLabel,
  handleTinhTrangThanhToanLabel,
  setOpenCustomerDetail,
}) => {
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
  };
  const classes = useStyles();
  const handleIcon = (item) => {
    setSelectedRow(item);
    setSelectedRow({ ...item, NgaySinh: dayjs(item?.NgaySinh) });
    setSelectedRow({ ...item, password: "" });
  };
  return (
    <Card>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Danh sách phiếu dịch vụ
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={setOpenInsert}
              sx={{
                flex: 1,
                height: "100%",
                marginTop: 0,
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#80d4ff",
                color: "white",
              }}
            >
              <Typography
                whiteSpace="nowrap"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                Thêm mới
              </Typography>
            </Button>
          </Box>
        </div>
      </Box>
      <Box
        // sx={{
        //   "& .MuiTableRow-root:not(:last-child)": {
        //     "& td": {
        //       borderBottom: ({ borders: { borderWidth, borderColor } }) =>
        //         `${borderWidth[1]} solid ${borderColor}`,
        //     },
        //   },
        // }}
        p={3}
      >
        <TableContainer
          component={Paper}
          sx={{ overflow: "scroll", height: "calc(100vh - 400px)" }}
          style={{
            padding: "15px",
            boxShadow: "0px 4px 20px rgba(94, 98, 120, 0.04)",
            borderRadius: "8px",
            overflowX: "auto",
          }}
        >
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
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  STT
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  MÃ PHIẾU DỊCH VỤ
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  TỔNG TIỀN
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  NGÀY BẮT ĐẦU
                </TableCell>
                {/* <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ BUỔI
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ GIỜ
                </TableCell> */}
                {/* <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ NGƯỜI ĐƯỢC CHĂM SÓC
                </TableCell> */}
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  GIỜ BẮT ĐẦU
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  GHI CHÚ
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  TÌNH TRẠNG
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  TÌNH TRẠNG THANH TOÁN
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  ĐỊA CHỈ
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  KHÁCH HÀNG
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  DỊCH VỤ
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  HÀNH ĐỘNG
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                Array.isArray(data) &&
                data.length > 0 &&
                data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
                      "&:nth-of-type(even)": { backgroundColor: "#F8F8F8" },
                    }}
                  >
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.idPhieuDichVu}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.Tongtien.toLocaleString("vi-VN")} đ
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.NgayBatDau && moment(item?.NgayBatDau).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.GioBatDau}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      sx={{ color: "#606F89" }}
                    >
                      {item?.GhiChu}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {handleTinhTrangLabel(item?.TinhTrang)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {handleTinhTrangThanhToanLabel(item?.TinhTrangThanhToan)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                      {", "}
                      {item?.district_name ?? ""}, {item?.province_name ?? ""}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      <IconButton
                        key={`${item.id}-iconbutton1-icon`}
                        onClick={() => {
                          setOpenCustomerDetail();
                          handleIcon(item);
                        }}
                      >
                        <img
                          src={View}
                          alt=""
                          key={`${item.id}-visibility-icon`}
                          style={iconStyle}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.tenDichVu}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      <IconButton
                        key={`${item.id}-iconbutton1-icon`}
                        onClick={() => {
                          setOpenDetail();
                          handleIcon(item);
                        }}
                      >
                        <img
                          src={View}
                          alt=""
                          key={`${item.id}-visibility-icon`}
                          style={iconStyle}
                        />
                      </IconButton>
                      <IconButton
                        key={`${item.id}-iconbutton2-icon`}
                        onClick={() => {
                          setOpenEdit();
                          handleIcon(item);
                        }}
                      >
                        <img
                          src={Edit}
                          alt=""
                          key={`${item.id}-edit-icon`}
                          style={iconStyle}
                        />
                      </IconButton>

                      <IconButton
                        key={`${item.id}-iconbutton3-icon`}
                        onClick={() => {
                          setOpenDelete();
                          handleIcon(item);
                        }}
                      >
                        <img
                          src={Trash}
                          alt=""
                          key={`${item.id}-delete-icon`}
                          style={iconStyle}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Table
              key={`${rowsCount}--${oldSearching.fromDate}--${oldSearching.untilDate}--${oldSearching.agent}--${oldSearching.content}`}
              columns={columns}
              rows={rows}
              isPagination={true}
              totalElements={totalElements}
              rowsPerPageOptions={options}
              rowsCount={rowsCount}
              setRowsCount={setRowsCount}
              curPage={page}
              setCurPage={setPage}
            /> */}
        <Typography
          whiteSpace="nowrap"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            textTransform: "none",
            alignItems: "center",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {data?.length <= 0 && "Không tồn tại dữ liệu"}
        </Typography>
      </Box>
    </Card>
  );
};

export default ProductReceiptList;
