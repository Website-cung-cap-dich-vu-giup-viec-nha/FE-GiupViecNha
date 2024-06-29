import {
  Autocomplete,
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
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useCallback, useEffect, useState } from "react";
import {
  getCalendarByManager,
  getCalendarByManager_v2,
} from "../../../api/admin/Calendar";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getStaffIsNotAddChiTietNgayLam } from "../../../api/admin/StaffAPI";
import { getProduct } from "../../../api/admin/ProductAPI";
import CalendarDetail from "./CalendarDetail";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

dayjs.extend(isoWeek);

const LegendItem = ({ color, name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: 2,
        marginBottom: 1,
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          backgroundColor: color,
          marginRight: 1,
          borderRadius: "50%",
        }}
      />
      <Typography variant="body1">{name}</Typography>
    </Box>
  );
};

const CalendarManager = ({ setPageName, setBreadCrumb }) => {
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
  const [startOfWeek, setStartOfWeek] = useState(
    dayjs().startOf("isoWeek").format("YYYY-MM-DD")
  );
  const [endOfWeek, setEndOfWeek] = useState(
    dayjs().endOf("isoWeek").format("YYYY-MM-DD")
  );
  const [oldSearchData, setOldSearchData] = useState();
  const [searchData, setSearchData] = useState({
    idNhanVien: "",
    idDichVu: "",
  });
  const [dataNhanVien, setDataNhanVien] = useState([]);
  const [dataDichVu, setDataDichVu] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ]);
  const [selectedData, setSelectedData] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const colors = [
    "#E7ECF0",
    "#00ffff",
    "#ffc966",
    "#66ff66",
    "#ff9999",
    "#ffb3ff",
  ];

  const handleOpenDetail = () => {
    setOpenDetail((prev) => !prev);
  };

  const handleSelectedData = (item) => {
    setSelectedData(item);
    handleOpenDetail();
  };

  const handleSearching = () => {
    setOldSearchData(searchData);
  };

  const handleNext = () => {
    const newToday = today.add(7, "day");
    setToday(newToday);
    const newStartOfWeek = newToday.startOf("isoWeek").format("YYYY-MM-DD");
    const newEndOfWeek = newToday.endOf("isoWeek").format("YYYY-MM-DD");
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
    loadCalendar(newStartOfWeek, newEndOfWeek);
  };

  const handleBack = () => {
    const newToday = today.subtract(7, "day");
    setToday(newToday);
    const newStartOfWeek = newToday.startOf("isoWeek").format("YYYY-MM-DD");
    const newEndOfWeek = newToday.endOf("isoWeek").format("YYYY-MM-DD");
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
    loadCalendar(newStartOfWeek, newEndOfWeek);
  };

  const handleChange = (event, propertyName) => {
    if (propertyName === "idDichVu") {
      setSearchData({
        ...searchData,
        [propertyName]: event,
      });
    } else if (propertyName === "idNhanVien") {
      setSearchData({
        ...searchData,
        [propertyName]: event,
      });
    }
  };

  const loadStaff = () => {
    getStaffIsNotAddChiTietNgayLam(null)
      .then((response) => {
        setDataNhanVien(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProduct = () => {
    getProduct()
      .then((response) => {
        setDataDichVu(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCalendar = (startDate, endDate) => {
    getCalendarByManager_v2(searchData, startDate, endDate)
      .then((response) => {
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
            ? response?.message?.data?.data?.[0]
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBackgroundColor = (idDichVu) => {
    // if (idDichVu === 1) return "#E7ECF0";
    // else if (idDichVu === 2) return "#1f77b4";
    // else if (idDichVu === 3) return "#ff7f0e";
    // else if (idDichVu === 4) return "#2ca02c";
    // else if (idDichVu === 5) return "#d62728";
    // else return "#9467bd";
    return colors[idDichVu - 1];
  };

  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);

  useEffect(() => {
    if (isFirstLoad) return;
    setToday(dayjs());
    const newStartOfWeek = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
    const newEndOfWeek = dayjs().endOf("isoWeek").format("YYYY-MM-DD");
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
    loadCalendar(newStartOfWeek, newEndOfWeek);
  }, [oldSearchData]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadCalendar(startOfWeek, endOfWeek);
  }, [searchData]);

  useEffect(() => {
    setIsFirstLoad(false);
    loadStaff();
    loadProduct();
    loadCalendar(startOfWeek, endOfWeek);
  }, []);
  return (
    <Grid container>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <Box py={3} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <Autocomplete
                options={dataNhanVien}
                getOptionLabel={(option) =>
                  `${option.name || ""} - ${option.SDT || ""}`
                }
                autoSelect
                fullWidth
                value={
                  (dataNhanVien &&
                    dataNhanVien.find(
                      (nv) => nv.idNhanVien === searchData?.idNhanVien
                    )) ||
                  null
                }
                onChange={(event, newValue) => {
                  handleChange(newValue?.idNhanVien, "idNhanVien");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nhân viên"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Chọn nhân viên"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.idNhanVien === value
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <Autocomplete
                options={dataDichVu}
                getOptionLabel={(option) => `${option.tenDichVu || ""}`}
                autoSelect
                fullWidth
                value={
                  (dataDichVu &&
                    dataDichVu.find(
                      (nv) => nv.idDichVu === searchData?.idDichVu
                    )) ||
                  null
                }
                onChange={(event, newValue) => {
                  handleChange(newValue?.idDichVu, "idDichVu");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dịch vụ"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Chọn dịch vụ"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.idDichVu === value
                }
              />
            </Grid>
            {/* <Grid item xs={12} sm={1} xl={1}>
              <Button
                variant="contained"
                sx={{
                  height: "100%",
                  width: "100%",
                  fontWeight: "bold",
                  backgroundColor: "primary",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={handleSearching}
              >
                <Typography
                  whiteSpace="nowrap"
                  color="white"
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                >
                  Xem lịch
                </Typography>
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
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
                  onClick={handleSearching}
                >
                  <Typography
                    whiteSpace="nowrap"
                    color="white"
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                  >
                    Hiện tại
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
          <Box
            p={2}
            sx={{ display: "grid", overflowX: "auto", maxWidth: "100%" }}
          >
            <TableContainer
              component={Paper}
              sx={{
                overflow: "auto",
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
                    {dayOfWeek &&
                      Array.isArray(dayOfWeek) &&
                      dayOfWeek.length > 0 &&
                      dayOfWeek.map((item, index) => (
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          sx={{ fontWeight: "bold", color: "#606F89" }}
                        >
                          {item}
                          <br />
                          {dayjs(startOfWeek)
                            .add(index, "day")
                            .format("DD/MM/YYYY")}
                        </TableCell>
                      ))}
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {monday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    monday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  monday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  monday?.[index]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {tuesday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    tuesday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  tuesday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  tuesday?.[
                                    index
                                  ]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {wednesday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    wednesday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  wednesday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  wednesday?.[
                                    index
                                  ]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {thursday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    thursday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  thursday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  thursday?.[
                                    index
                                  ]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {friday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    friday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  friday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  friday?.[index]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {saturday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    saturday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  saturday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  saturday?.[
                                    index
                                  ]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
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
                          <>
                            <Card
                              sx={{
                                minWidth: 300,
                                padding: "10px",
                                backgroundColor: getBackgroundColor(
                                  item?.idDichVu
                                ),
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleSelectedData(item);
                              }}
                            >
                              <Grid container>
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
                                    {item?.GioBatDau}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Mã nhân viên:
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} xl={6} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Tên nhân viên
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3} paddingTop={1}>
                                  <Typography
                                    variant="caption"
                                    color="text"
                                    fontWeight="bold"
                                  >
                                    Số điện thoại
                                  </Typography>
                                </Grid>
                                {sunday?.[index]?.ChiTietNhanVienLamDichVu &&
                                  Array.isArray(
                                    sunday?.[index]?.ChiTietNhanVienLamDichVu
                                  ) &&
                                  sunday?.[index]?.ChiTietNhanVienLamDichVu
                                    .length > 0 &&
                                  sunday?.[index]?.ChiTietNhanVienLamDichVu.map(
                                    (item, index) => (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.idNhanVien}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          xl={6}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          xl={3}
                                          paddingTop={1}
                                        >
                                          <Typography
                                            variant="caption"
                                            color="text"
                                            fontWeight="regular"
                                          >
                                            {item?.SDT}
                                          </Typography>
                                        </Grid>
                                      </>
                                    )
                                  )}
                              </Grid>
                            </Card>
                          </>
                        ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      {dataDichVu.map((item) => (
        <Grid item xs={12} sm={1.9} xl={1.9} sx={{ marginTop: "10px" }}>
          <LegendItem
            key={item?.idDichVu}
            color={getBackgroundColor(item?.idDichVu)}
            name={item?.tenDichVu}
          />
        </Grid>
      ))}
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <CalendarDetail
        open={openDetail}
        setOpen={handleOpenDetail}
        item={selectedData}
      />
    </Grid>
  );
};

export default CalendarManager;
