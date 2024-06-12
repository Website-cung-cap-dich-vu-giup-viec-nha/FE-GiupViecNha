import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useCallback, useEffect, useState } from "react";
import { getCalendar } from "../../../api/admin/Calendar";
import moment from "moment";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

dayjs.extend(isoWeek);

const Calendar = ({ setPageName, setBreadCrumb }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const setPageNameCallback = useCallback(
    () => setPageName("Lịch làm việc"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Lịch làm việc"]),
    [setBreadCrumb]
  );
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
  };
  const classes = useStyles();
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSatuday] = useState([]);
  const [sunday, setSunday] = useState([]);
  const [today, setToday] = useState(dayjs());
  const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf('isoWeek').format('YYYY-MM-DD'));
  const [endOfWeek, setEndOfWeek] = useState(dayjs().endOf('isoWeek').format('YYYY-MM-DD'));

  const handleNext = () => {
    const newToday = today.add(7, 'day');
    setToday(newToday);
    const newStartOfWeek = newToday.startOf('isoWeek').format('YYYY-MM-DD');
    const newEndOfWeek = newToday.endOf('isoWeek').format('YYYY-MM-DD');
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
    loadCalendar(newStartOfWeek, newEndOfWeek);
  };

  const handleBack = () => {
    const newToday = today.subtract(7, 'day');
    setToday(newToday);
    const newStartOfWeek = newToday.startOf('isoWeek').format('YYYY-MM-DD');
    const newEndOfWeek = newToday.endOf('isoWeek').format('YYYY-MM-DD');
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
    loadCalendar(newStartOfWeek, newEndOfWeek);
  };

  const loadCalendar = (startDate, endDate) => {
    getCalendar(startDate, endDate)
      .then((response) => {
        console.log(response, startDate, endDate);
        setMonday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[1]
            : []
        );
        setTuesday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[2]
            : []
        );
        setWednesday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[3]
            : []
        );
        setThursday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[4]
            : []
        );
        setFriday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[5]
            : []
        );
        setSatuday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[6]
            : []
        );
        setSunday(
          response?.message?.status === 200
            ? response?.message?.data?.data?.[7]
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);

  useEffect(() => {
    setIsFirstLoad(false);
    loadCalendar(startOfWeek, endOfWeek);
  }, []);
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
            Lịch làm việc
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={handleBack}
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
              <ArrowBackIosIcon />
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
                Trở về
              </Typography>
            </Button>
          </Box>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={handleNext}
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
                Tiếp
              </Typography>
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </div>
      </Box>
      <Box p={3}>
        <TableContainer
          component={Paper}
          sx={{
            overflow: "auto",
            height: "calc(100vh - 400px)",
            width: "calc(167vh)",
          }}
          style={{
            padding: "15px",
            boxShadow: "0px 4px 20px rgba(94, 98, 120, 0.04)",
            borderRadius: "8px",
            overflow: "auto",
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
                  Thứ 2<br />
                  {dayjs(startOfWeek).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 3<br />
                  {dayjs(startOfWeek).add(1, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 4<br />
                  {dayjs(startOfWeek).add(2, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 5<br />
                  {dayjs(startOfWeek).add(3, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 6<br />
                  {dayjs(startOfWeek).add(4, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 7<br />
                  {dayjs(startOfWeek).add(5, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Chủ nhật
                  <br />
                  {dayjs(startOfWeek).add(6, "day").format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
                  "&:nth-of-type(even)": { backgroundColor: "#F8F8F8" },
                }}
              >
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {monday &&
                    Array.isArray(monday) &&
                    monday.length > 0 &&
                    monday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ justifyContent: "center" }}
                >
                  {tuesday &&
                    Array.isArray(tuesday) &&
                    tuesday.length > 0 &&
                    tuesday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>

                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {wednesday &&
                    Array.isArray(wednesday) &&
                    wednesday.length > 0 &&
                    wednesday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {thursday &&
                    Array.isArray(thursday) &&
                    thursday.length > 0 &&
                    thursday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {friday &&
                    Array.isArray(friday) &&
                    friday.length > 0 &&
                    friday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {saturday &&
                    Array.isArray(saturday) &&
                    saturday.length > 0 &&
                    saturday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                >
                  {sunday &&
                    Array.isArray(sunday) &&
                    sunday.length > 0 &&
                    sunday.map((item, index) => (
                      <Card sx={{ width: 300, margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            xl={12}
                            container // Thêm container để sử dụng các thuộc tính căn giữa
                            justifyContent="center" // Căn giữa theo chiều ngang
                            alignItems="center"
                          >
                            <Typography
                              align="center"
                              fontWeight={"bold"}
                              fontSize={"16px"}
                            >
                              {item?.tenDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              ID Phiếu dịch vụ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.idPhieuDichVu}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Giờ bắt đầu:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.GioBatDau}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Tên khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Số điện thoại khách hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.SDT}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                            >
                              Địa chỉ:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} xl={6}>
                            <Typography
                              variant="caption"
                              color="text"
                              fontWeight="bold"
                            >
                              {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                              {", "}
                              {item?.district_name ?? ""},{" "}
                              {item?.province_name ?? ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
        ></Typography>
      </Box>
    </Card>
  );
};

export default Calendar;