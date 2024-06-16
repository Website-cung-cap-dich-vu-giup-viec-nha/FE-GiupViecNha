import {
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

const StaffInsert = ({
  data,
  open,
  setOpen,
  dataChucVu,
  dataPhongBan,
  handleChange,
  handleInsert,
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
        THÊM MỚI NHÂN VIÊN
      </DialogTitle>
      <DialogContent>
        <Box py={3} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                value={data?.name}
                onChange={(event) => handleChange(event, "name")}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Email"
                placeholder="Nhập email"
                value={data?.email}
                onChange={(event) => handleChange(event, "email")}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Số Điện Thoại"
                placeholder="Nhập số điện thoại"
                value={data?.SDT}
                onChange={(event) => handleChange(event, "SDT")}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={data?.password}
                onChange={(event) => handleChange(event, "password")}
                variant="outlined"
                fullWidth
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <TextField
                label="Nhập Lại Mật khẩu"
                placeholder="Nhập Mật khẩu"
                value={data?.password_confirmation}
                onChange={(event) =>
                  handleChange(event, "password_confirmation")
                }
                variant="outlined"
                fullWidth
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ paddingTop: "0px" }}
                >
                  <DatePicker
                    label="Ngày sinh"
                    // defaultValue={dayjs(new Date())}
                    format="DD/MM/YYYY"
                    value={data?.NgaySinh}
                    onChange={(event) => handleChange(event, "NgaySinh")}
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
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Phòng ban
                </InputLabel>
                <Select
                  value={data?.idPhongBan}
                  onChange={(event) => handleChange(event, "idPhongBan")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                >
                  <MenuItem value="" disabled>
                    Chọn phòng ban
                  </MenuItem>
                  {dataPhongBan ? (
                    dataPhongBan.map((item) => (
                      <MenuItem key={item?.idPhongBan} value={item?.idPhongBan}>
                        {item?.tenPhongBan}
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
                  Chức Vụ
                </InputLabel>
                <Select
                  value={data?.idChucVu}
                  onChange={(event) => handleChange(event, "idChucVu")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        overflow: "auto !important",
                      },
                    },
                    style: { maxHeight: "40VH", overflow: "auto !important" },
                  }}
                >
                  <MenuItem value="" disabled>
                    Chọn chức vụ
                  </MenuItem>
                  {dataChucVu ? (
                    dataChucVu.map((item) => (
                      <MenuItem key={item?.idChucVu} value={item?.idChucVu}>
                        {item?.tenChucVu}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={1} xl={1}>
              <Typography variant="caption" color="text" fontWeight="regular">
                Giới tính nam:
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3} xl={3}>
              <Typography variant="caption" color="text" fontWeight="bold">
                <Switch
                  color="primary"
                  checked={data?.GioiTinh === "Nam" ? true : false}
                  onChange={(event) => handleChange(event, "GioiTinh")}
                />
              </Typography>
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

export default StaffInsert;
