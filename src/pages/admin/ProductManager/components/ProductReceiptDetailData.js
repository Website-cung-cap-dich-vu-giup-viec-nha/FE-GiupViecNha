import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ProductReceiptDetailDataWorkDayList from "./ProductReceiptDetailDataWorkDayList";
import ProductReceiptDetailDataWorkerList from "./ProductReceiptDetailDataWorkerList";
import Return from "../../../../assets/icon/return.svg";
import { useState, useEffect } from "react";
import CalendarManager from "../../CalendarManager";
import { checkPermission } from "../../../../api/admin/AuthAPI";

const ProductReceiptDetailData = ({
  data_WorkDay,
  dataNhanVien,
  handleChange,
  handleSearching,
  selectedWorkDayItem,
  setSelectedWorkDayItem,
  data_Staff,
  setSelectedStaffItem,
  handleDeleteStaffWork,
  handleReturn,
}) => {
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
  };
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => {
    setOpenCalendar((prev) => !prev);
  };
  const [isPermmission, setIsPermission] = useState(null);
  const checking = async () => {
    try {
      const response = await checkPermission(4);
      if (response?.message?.data?.message === true) {
        setIsPermission(true);
      } else {
        setIsPermission(false);
      }
    } catch (error) {
      console.log(error);
      setIsPermission(false);
    }
  };
  useEffect(() => {
    checking();
  }, []);
  return (
    <>
      <Box py={3} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1} xl={1}>
            <Button
              variant="contained"
              sx={{
                height: "100%",
                width: "100%",
                fontWeight: "bold",
                backgroundColor: "red",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => handleReturn(false, null)}
            >
              <img src={Return} alt="" style={iconStyle} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} xl={4}>
            <Autocomplete
              options={dataNhanVien}
              getOptionLabel={(option) =>
                `${option.name || ""} - ${option.SDT || ""} - ${option.soSao || "0"} sao`
              }
              autoSelect
              fullWidth
              value={
                (dataNhanVien &&
                  dataNhanVien.find(
                    (nv) => nv.idNhanVien === selectedWorkDayItem?.idNhanVien
                  )) ||
                null
              }
              onChange={(event, newValue) => {
                handleChange(newValue, "idNhanVien");
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
                Thêm nhân viên
              </Typography>
            </Button>
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
              onClick={handleOpenCalendar}
              visible={isPermmission}
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
                Kiểm tra lịch nhân viên
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={2} xl={2}>
            <Typography
              whiteSpace="nowrap"
              color="red"
              align="center"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Ngày làm: {selectedWorkDayItem?.NgayLam}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} xl={6}>
            <ProductReceiptDetailDataWorkDayList
              data={data_WorkDay}
              setSelectedItem={setSelectedWorkDayItem}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={6}>
            <ProductReceiptDetailDataWorkerList
              data={data_Staff}
              setSelectedItem={setSelectedStaffItem}
              handleDeleteStaffWork={handleDeleteStaffWork}
            />
          </Grid>
        </Grid>
        <Dialog
          open={openCalendar}
          onClose={handleOpenCalendar}
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "26px",
            }}
          >
            KIỂM TRA LỊCH NHÂN VIÊN
          </DialogTitle>
          <DialogContent>
            <CalendarManager setPageName={() => {}} setBreadCrumb={() => {}} />
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
              onClick={handleOpenCalendar}
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
      </Box>
    </>
  );
};

export default ProductReceiptDetailData;
