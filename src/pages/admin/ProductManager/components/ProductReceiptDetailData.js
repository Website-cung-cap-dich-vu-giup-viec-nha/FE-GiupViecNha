import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ProductReceiptDetailDataWorkDayList from "./ProductReceiptDetailDataWorkDayList";
import ProductReceiptDetailDataWorkerList from "./ProductReceiptDetailDataWorkerList";

const ProductReceiptDetailData = ({
  data_WorkDay,
  dataNhanVien,
  handleChange,
  handleSearching,
  selectedWorkDayItem,
  setSelectedWorkDayItem,
  data_Staff,
  setSelectedStaffItem,
}) => {
  return (
    <>
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
          <Grid item xs={12} sm={6} xl={2}>
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
          <Grid item xs={12} sm={6} xl={4}>
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
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductReceiptDetailData;
