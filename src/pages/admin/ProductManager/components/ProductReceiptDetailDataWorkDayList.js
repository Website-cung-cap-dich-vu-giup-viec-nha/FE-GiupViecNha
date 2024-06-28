import {
  Box,
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Edit from "../../../../assets/icon/Edit.svg";
import moment from "moment";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

const ProductReceiptDetailDataWorkDayList = ({
  data,
  setSelectedItem,
}) => {
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
  };
  const classes = useStyles();
  const handleTinhTrangLabel = (idTinhTrang) => {
    if (idTinhTrang === 1) {
      return "Chưa thực hiện";
    } else if (idTinhTrang === 2) {
      return "Đang thực hiện";
    } else if (idTinhTrang === 3) {
      return "Đã hoàn tất";
    }
  };
  const handleIcon = (item) => {
    setSelectedItem(item);
  };
  return (
    <Card>
      <Box p={3}>
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
              <TableRow sx={{ backgroundColor: "#E1E3E9" }}>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  NGÀY LÀM
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  ID PHIẾU DỊCH VỤ
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
                  TÌNH TRẠNG DỊCH VỤ
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ LƯỢNG NHÂN VIÊN
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
                      {moment(item?.NgayLam).format("DD/MM/yyyy") }
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
                      {item?.GhiChu}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {handleTinhTrangLabel(item?.TinhTrangDichVu)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.soNhanVien}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      <IconButton
                        key={`${item.id}-iconbutton2-icon`}
                        onClick={() => {
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default ProductReceiptDetailDataWorkDayList;
