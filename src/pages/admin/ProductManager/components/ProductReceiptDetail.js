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
import moment from "moment";

const ProductReceiptDetail = ({
  selectedRow,
  open,
  setOpen,
  handleTinhTrangLabel,
  handleTinhTrangThanhToanLabel,
}) => {
  return (
    <Dialog open={open} onClose={setOpen} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
        THÔNG TIN PHIẾU DỊCH VỤ
      </DialogTitle>
      <DialogContent>
        <Box py={3}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  ID Phiếu dịch vụ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.idPhieuDichVu}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Tổng tiền:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.Tongtien &&
                    selectedRow?.Tongtien.toLocaleString("vi-VN")}{" "}
                  đ
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Ngày bắt đầu:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.NgayBatDau &&
                    moment(selectedRow?.NgayBatDau).format("DD/MM/YYYY")}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Số buổi:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.SoBuoi}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Số giờ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.SoGio}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Số người được chăm sóc:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.SoNguoiDuocChamSoc}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Giờ băt đầu:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.GioBatDau}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Ghi chú:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.GhiChu}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Tình trạng:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {handleTinhTrangLabel(selectedRow?.TinhTrang)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Tình trạng thanh toán:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {handleTinhTrangThanhToanLabel(
                    selectedRow?.TinhTrangThanhToan
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Địa chỉ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.Duong ?? ""}, {selectedRow?.ward_name ?? ""}
                  {", "}
                  {selectedRow?.district_name ?? ""},{" "}
                  {selectedRow?.province_name ?? ""}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Khách hàng:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.name}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Dịch vụ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.tenDichVu}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} xl={2}>
                <Typography variant="caption" color="text" fontWeight="regular">
                  Buổi đăng ký dịch vụ:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <Typography variant="caption" color="text" fontWeight="bold">
                  {selectedRow?.BuoiDangKyDichVu}
                </Typography>
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

export default ProductReceiptDetail;
