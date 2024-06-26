import {
    Autocomplete,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
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
  import Trash from "../../../../assets/icon/Trash.svg";
  import { makeStyles } from "@mui/styles";
  
  const useStyles = makeStyles({
    tableCell: {
      border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
    },
  });
  
  const StaffCapacity = ({
    open,
    setOpen,
    dataNangLuc,
    handleChange,
    handleInsert,
    data,
    handleDelete,
    staffCapacityData,
  }) => {
    const iconStyle = {
      fontSize: 20,
      marginRight: 8,
      color: "blue",
      cursor: "pointer",
    };
    const classes = useStyles();
    return (
      <Dialog open={open} onClose={setOpen} maxWidth="xl" fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          THÊM NĂNG LỰC THỰC HIỆN DỊCH VỤ CHO NHÂN VIÊN
        </DialogTitle>
        <DialogContent>
          <Box py={3} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={10} xl={10}>
                <Autocomplete
                  options={dataNangLuc}
                  getOptionLabel={(option) =>
                    `${option.tenDichVu || ""}`
                  }
                  autoSelect
                  fullWidth
                  value={
                    (dataNangLuc &&
                        dataNangLuc.find(
                        (item) => item.idDichVu === data?.idDichVu
                      )) ||
                    null
                  }
                  onChange={(event, newValue) => {
                    handleChange(newValue, "idDichVu");
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
              <Grid item xs={12} sm={2} xl={2}>
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
                  onClick={() => {
                    handleInsert(data);
                  }}
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
                    Thêm dịch vụ
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} xl={12}>
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
                              STT
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              sx={{ fontWeight: "bold", color: "#606F89" }}
                            >
                              TÊN DỊCH VỤ
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
                          {staffCapacityData &&
                            Array.isArray(staffCapacityData) &&
                            staffCapacityData.length > 0 &&
                            staffCapacityData.map((item, index) => (
                              <TableRow
                                key={item.id}
                                sx={{
                                  "&:nth-of-type(odd)": {
                                    backgroundColor: "#FFFFFF",
                                  },
                                  "&:nth-of-type(even)": {
                                    backgroundColor: "#F8F8F8",
                                  },
                                }}
                              >
                                <TableCell
                                  className={classes.tableCell}
                                  align="center"
                                  sx={{ color: "#606F89" }}
                                >
                                  {index + 1}
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
                                    key={`${item.id}-iconbutton2-icon`}
                                    onClick={() => {
                                      handleDelete(item);
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
                      {staffCapacityData?.length <= 0 && "Không tồn tại dữ liệu"}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            sx={{
              border: "1px solid #80d4ff",
              borderColor: "#80d4ff",
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              backgroundColor: "white",
            }}
            onClick={setOpen}
          >
            <Typography
              whiteSpace="nowrap"
              fontWeight="regular"
              color="#80d4ff"
              fontSize="14px"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Đóng
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default StaffCapacity;
  