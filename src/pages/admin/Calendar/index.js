import {
  Box,
  Button,
  Card,
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
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

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
  const today = moment();
  const startOfWeek = today.startOf('isoWeek').format('YYYY-MM-DD');
  const endOfWeek = today.endOf('isoWeek').format('YYYY-MM-DD');
  const loadCalendar = (startDate, endDate) => {
    getCalendar(startDate, endDate)
      .then((response) => {
        console.log(response);
        setMonday(
          response?.message?.status === 200 ? response?.message?.data?.[1] : []
        );
        setTuesday(
          response?.message?.status === 200 ? response?.message?.data?.[2] : []
        );
        setWednesday(
          response?.message?.status === 200 ? response?.message?.data?.[3] : []
        );
        setThursday(
          response?.message?.status === 200 ? response?.message?.data?.[4] : []
        );
        setFriday(
          response?.message?.status === 200 ? response?.message?.data?.[5] : []
        );
        setSatuday(
          response?.message?.status === 200 ? response?.message?.data?.[6] : []
        );
        setSunday(
          response?.message?.status === 200 ? response?.message?.data?.[7] : []
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
              onClick={null}
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
              onClick={() => {
                document.getElementById("fileInput").click();
              }}
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
                  Thứ 2
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 3
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 4
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 5
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 6
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Thứ 7
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#606F89" }}
                >
                  Chủ nhật
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
                  align="center"
                  sx={{ color: "#606F89" }}
                >
                  {monday &&
                    Array.isArray(monday) &&
                    monday.length > 0 &&
                    monday.map((item, index) => (
                      <Card>
                        <Box>
                          {item?.idPhieuDichVu}
                        </Box>
                      </Card>
                    ))}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                ></TableCell>

                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                ></TableCell>
                <TableCell
                  className={classes.tableCell}
                  sx={{ color: "#606F89" }}
                ></TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ color: "#606F89" }}
                ></TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ color: "#606F89" }}
                ></TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  sx={{ color: "#606F89" }}
                ></TableCell>
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
