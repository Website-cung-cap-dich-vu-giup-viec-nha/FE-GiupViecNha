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
import Trash from "../../../../assets/icon/Trash.svg";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

const ProductReceiptDetailDataWorkerList = ({ data, setSelectedItem, handleDeleteStaffWork }) => {
  const classes = useStyles();
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
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
                  HỌ VÀ TÊN
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  EMAIL
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ ĐIỆN THOẠI
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  SỐ SAO
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
                      {item?.name}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.email}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.SDT}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ color: "#606F89" }}
                    >
                      {item?.SoSao}
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
                          handleDeleteStaffWork(item);
                        }}
                      >
                        <img
                          src={Trash}
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

export default ProductReceiptDetailDataWorkerList;
