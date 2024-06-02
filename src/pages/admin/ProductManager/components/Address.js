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
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

const Address = ({
  open,
  setOpen,
  handleInsert,
  data,
  handleChange,
  dataProvince,
  dataDistrict,
  dataWard,
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
    <Dialog open={open} onClose={setOpen} maxWidth="sm" fullWidth>
      <DialogTitle
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "26px" }}
      >
        THÊM MỚI ĐỊA CHỈ
      </DialogTitle>
      <DialogContent>
        <Box py={3} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Tỉnh/Thành phố
                </InputLabel>
                <Select
                  value={data?.province_id}
                  onChange={(event) => handleChange(event, "province_id")}
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
                    Chọn tỉnh/thành phố
                  </MenuItem>
                  {dataProvince ? (
                    dataProvince.map((item) => (
                      <MenuItem
                        key={item?.province_id}
                        value={item?.province_id}
                      >
                        {item?.province_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Quận/Huyện
                </InputLabel>
                <Select
                  value={data?.district_id}
                  onChange={(event) => handleChange(event, "district_id")}
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
                    Chọn quận/huyện
                  </MenuItem>
                  {dataDistrict ? (
                    dataDistrict.map((item) => (
                      <MenuItem
                        key={item?.district_id}
                        value={item?.district_id}
                      >
                        {item?.district_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <FormControl fullWidth className="formControl">
                <InputLabel
                  shrink={true}
                  sx={commonComboboxLabelStyle}
                  id="ward-label"
                >
                  Phường/Xã
                </InputLabel>
                <Select
                  value={data?.Phuong}
                  onChange={(event) => handleChange(event, "Phuong")}
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
                    Chọn phường/xã
                  </MenuItem>
                  {dataWard ? (
                    dataWard.map((item) => (
                      <MenuItem key={item?.ward_id} value={item?.ward_id}>
                        {item?.ward_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>nothing</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <TextField
                label="Đường"
                placeholder="Nhập đường"
                value={data?.Duong}
                onChange={(event) => handleChange(event, "Duong")}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textAlign="center"
              />
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

export default Address;
