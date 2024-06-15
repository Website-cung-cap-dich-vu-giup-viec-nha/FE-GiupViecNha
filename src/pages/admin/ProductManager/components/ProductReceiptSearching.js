import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ProductReceiptSearching = ({
  searchData,
  handleChange,
  handleSearching,
  dataDichVu,
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
    <Box py={3} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} xl={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "DatePicker"]}
              sx={{ paddingTop: "10px" }}
            >
              <DatePicker
                label="Ngày bắt đầu"
                // defaultValue={dayjs(new Date())}
                format="DD/MM/YYYY"
                value={searchData?.startDate}
                onChange={(event) => handleChange(event, "startDate")}
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
              sx={{ paddingTop: "10px" }}
            >
              <DatePicker
                label="Ngày kết thúc"
                // defaultValue={dayjs(new Date())}
                format="DD/MM/YYYY"
                value={searchData?.endDate}
                onChange={(event) => handleChange(event, "endDate")}
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
            label="ID Phiếu dịch vụ"
            placeholder="Nhập ID Phiếu dịch vụ"
            value={searchData?.idPhieuDichVu}
            onChange={(event) => handleChange(event, "idPhieuDichVu")}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={4}>
          <FormControl fullWidth className="formControl">
            <InputLabel
              shrink={true}
              sx={commonComboboxLabelStyle}
              id="ward-label"
            >
              Tình trạng
            </InputLabel>
            <Select
              value={searchData?.TinhTrang}
              onChange={(event) => handleChange(event, "TinhTrang")}
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
                Chọn tình trạng
              </MenuItem>
              <MenuItem value="-1">Chọn tất cả</MenuItem>
              <MenuItem value="1">Đang duyệt</MenuItem>
              <MenuItem value="2">Đã duyệt</MenuItem>
              <MenuItem value="3">Đã hủy phiếu dịch vụ</MenuItem>
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
              Tình trạng thanh toán
            </InputLabel>
            <Select
              value={searchData?.TinhTrangThanhToan}
              onChange={(event) => handleChange(event, "TinhTrangThanhToan")}
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
                Chọn tình trạng thanh toán
              </MenuItem>
              <MenuItem value="-1">Chọn tất cả</MenuItem>
              <MenuItem value="1">Chưa thanh toán</MenuItem>
              <MenuItem value="2">Đã thanh toán</MenuItem>
              <MenuItem value="3">Đã hoàn tiền</MenuItem>
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
              Dịch vụ
            </InputLabel>
            <Select
              value={searchData?.idDichVu}
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
              <MenuItem value="-1">
                Chọn tất cả
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
        <Grid item xs={12} sm={12} xl={5}></Grid>
        <Grid item xs={12} sm={12} xl={2}>
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
              Tìm kiếm
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} xl={5}></Grid>
      </Grid>
    </Box>
  );
};

export default ProductReceiptSearching;
