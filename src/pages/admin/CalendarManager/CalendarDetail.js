import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

const CalendarDetail = ({ item, open, setOpen }) => {
  return (
    <Dialog open={open} onClose={setOpen} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
      {item?.tenDichVu}
      </DialogTitle>
      <DialogContent>
        <Box py={3}>
          <Box mb={3}>
            <Grid container>
              <Grid item xs={12} sm={5} xl={5} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  ID Phiếu dịch vụ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {item?.idPhieuDichVu}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={5} xl={5} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Giờ bắt đầu:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {item?.GioBatDau}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={5} xl={5} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Khách hàng:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {item?.name}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={5} xl={5} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {item?.SDT}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={5} xl={5} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Địa chỉ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {item?.Duong ?? ""}, {item?.ward_name ?? ""}
                  {", "}
                  {item?.district_name ?? ""}, {item?.province_name ?? ""}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={7} xl={7} paddingTop={1}>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          sx={{
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            backgroundColor: "#80d4ff",
          }}
          onClick={setOpen}
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
            Đóng
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarDetail;
