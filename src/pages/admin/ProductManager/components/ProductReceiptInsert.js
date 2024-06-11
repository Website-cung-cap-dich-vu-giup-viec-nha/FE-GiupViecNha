import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import moment from "moment";

const ProductReceiptInsert = ({
  data,
  open,
  setOpen,
  dataChiTietDichVu,
  dataDichVu,
  handleChange,
  handleInsert,
  dataKhachHang,
  dataDiaChi,
  setOpenAddress,
  dataKieuDichVu,
}) => {
  const commonComboboxLabelStyle = {
    backgroundColor: "#FFF",
    "&.MuiInputLabel-root": {
      fontSize: "17px",
      "&.Mui-focused": {
        color: "#000",
        backgroundColor: "#FFF",
        fontWeight: 300,
      },
    },
  };
  return (
    <Dialog open={open} onClose={setOpen} maxWidth="xl" fullWidth>
      <DialogTitle
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "26px" }}
      >
        THÊM MỚI PHIẾU DỊCH VỤ
      </DialogTitle>
      <DialogContent>
        <Box py={3} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Dịch vụ
                </InputLabel>
                <Select
                  value={data?.idDichVu}
                  onChange={(event) => handleChange(event, "idDichVu")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Chọn dịch vụ
                  </MenuItem>
                  {dataDichVu ? (
                    dataDichVu.map((item) => (
                      <MenuItem key={item?.idDichVu} value={item?.idDichVu}>
                        {item?.tenDichVu}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  {data?.idDichVu !== 6 ? "Ngày làm việc trong tuần" : "Loại sofa"}
                </InputLabel>
                <Select
                  value={data?.idChiTietDichVu}
                  onChange={(event) => handleChange(event, "idChiTietDichVu")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                  displayEmpty
                  disabled={
                    // data?.idDichVu === 2 ||
                    // data?.idDichVu === 5 ||
                    // data?.idDichVu === 6 ||
                    data?.idDichVu === ""
                  }
                >
                  <MenuItem value="" disabled>
                    {data?.idDichVu !== 6 ? "Chọn ngày làm việc trong tuần" : "Chọn loại sofa"}
                  </MenuItem>
                  {dataChiTietDichVu ? (
                    dataChiTietDichVu.map((item) => (
                      <MenuItem
                        key={item?.idChiTietDichVu}
                        value={item?.idChiTietDichVu}
                      >
                        {data?.idDichVu === 5 ||
                        data?.idDichVu === 6 ||
                        data?.idDichVu === ""
                          ? item?.tenChiTietDichVu
                          : item?.BuoiDangKyDichVu}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Loại dịch vụ
                </InputLabel>
                <Select
                  value={data?.idKieuDichVu}
                  onChange={(event) => handleChange(event, "idKieuDichVu")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                  displayEmpty
                  disabled={
                    data?.idDichVu === 1 ||
                    data?.idDichVu === 3 ||
                    data?.idDichVu === 4 ||
                    data?.idDichVu === 5 ||
                    data?.idDichVu === ""
                  }
                >
                  <MenuItem value="" disabled>
                    Chọn loại dịch vụ
                  </MenuItem>
                  {dataKieuDichVu ? (
                    dataKieuDichVu.map((item) => (
                      <MenuItem
                        key={item?.idKieuDichVu}
                        value={item?.idKieuDichVu}
                      >
                        {item?.tenKieuDichVu}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ paddingTop: "0px" }}
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    // defaultValue={dayjs(new Date())}
                    format="DD/MM/YYYY"
                    value={data?.NgayBatDau}
                    onChange={(event) => handleChange(event, "NgayBatDau")}
                    sx={{
                      width: "100%",
                      "& .MuiFormLabel-root": { zIndex: 1 },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ paddingTop: "0px" }}
                >
                  <TimePicker
                    label="Giờ bắt đầu"
                    // defaultValue={dayjs(new Date())}
                    // format="DD/MM/YYYY"
                    value={
                      data?.GioBatDau ? dayjs(data.GioBatDau, "HH:mm:ss") : null
                    }
                    onChange={(event) => handleChange(event, "GioBatDau")}
                    sx={{
                      width: "100%",
                      "& .MuiFormLabel-root": { zIndex: 1 },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Số buổi"
                placeholder="Chọn số buổi"
                value={data?.SoBuoi}
                onChange={(event) => handleChange(event, "SoBuoi")}
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
                disabled={
                  data?.idDichVu === 5 ||
                  data?.idDichVu === 6 ||
                  data?.idDichVu === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Số giờ làm việc"
                placeholder="Chọn số giờ làm việc"
                value={data?.SoGio}
                onChange={(event) => handleChange(event, "SoGio")}
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
                disabled={
                  data?.idDichVu === 2 ||
                  data?.idDichVu === 5 ||
                  data?.idDichVu === 6 ||
                  data?.idDichVu === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Số người được chăm sóc"
                placeholder="Chọn số người được chăm sóc"
                value={data?.SoNguoiDuocChamSoc}
                onChange={(event) => handleChange(event, "SoNguoiDuocChamSoc")}
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
                disabled={
                  data?.idDichVu === 1 ||
                  data?.idDichVu === 2 ||
                  data?.idDichVu === 5 ||
                  data?.idDichVu === 6 ||
                  data?.idDichVu === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <Autocomplete
                options={dataKhachHang}
                getOptionLabel={(option) =>
                  `${option.name || ""} - ${option.SDT || ""}`
                }
                autoSelect
                fullWidth
                value={
                  dataKhachHang.find(
                    (kh) => kh.idKhachHang === data?.idKhachHang
                  ) || null
                }
                onChange={(event, newValue) => {
                  handleChange(newValue, "idKhachHang");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Khách hàng"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Chọn khách hàng"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.idKhachHang === value
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                value={data?.GhiChu}
                onChange={(event) => handleChange(event, "GhiChu")}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={7}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Địa chỉ
                </InputLabel>
                <Select
                  value={data?.idDiaChi}
                  onChange={(event) => handleChange(event, "idDiaChi")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Chọn địa chỉ
                  </MenuItem>
                  {dataDiaChi ? (
                    dataDiaChi.map((item) => (
                      <MenuItem key={item?.idDiaChi} value={item?.idDiaChi}>
                        {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                        {", "}
                        {item?.district_name ?? ""}, {item?.province_name ?? ""}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={1}>
              <Button
                sx={{
                  border: "1px solid gray",
                  borderColor: "gray",
                  fontWeight: 700,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  backgroundColor: "gray",
                  height: "100%",
                  width: "100%",
                }}
                onClick={setOpenAddress}
              >
                <Typography
                  whiteSpace="nowrap"
                  fontWeight="regular"
                  color="white"
                  fontSize="14px"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                >
                  <i
                    className="fa-solid fa-plus"
                    style={{ marginRight: "5px", fontSize: "40px" }}
                  ></i>
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={5}></Grid>
            <Grid item xs={12} sm={6} xl={1}>
              <Typography
                variant="caption"
                color="text"
                fontWeight="regular"
                fontSize={16}
              >
                Tổng tiền:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} xl={1}>
              <Typography
                variant="caption"
                color="red"
                fontWeight="bold"
                fontSize={16}
              >
                {data?.Tongtien && data?.Tongtien.toLocaleString("vi-VN")} đ
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} xl={5}></Grid>
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
            <HighlightOffIcon
              style={{ marginRight: "5px", fontSize: "20px" }}
            />
            Không
          </Typography>
        </Button>
        <Button
          sx={{
            border: "1px solid #80d4ff",
            borderColor: "#80d4ff !important",
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            color: "#80d4ff",
            backgroundColor: "#80d4ff",
          }}
          onClick={handleInsert}
        >
          <Typography
            whiteSpace="nowrap"
            color="white"
            fontSize="14px"
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            <CheckIcon style={{ marginRight: "5px", fontSize: "14px" }} />
            Có
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductReceiptInsert;
