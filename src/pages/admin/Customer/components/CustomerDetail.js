import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
  } from "@mui/material";
  import { config } from "../../../../config";
  
  const CustomerDetail = ({ selectedRow, open, setOpen }) => {
    return (
      <Dialog open={open} onClose={setOpen} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
          THÔNG TIN KHÁCH HÀNG
        </DialogTitle>
        <DialogContent>
          <Box py={3}>
            <Box mb={3}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  xl={12}
                  container // Thêm container để sử dụng các thuộc tính căn giữa
                  justifyContent="center" // Căn giữa theo chiều ngang
                  alignItems="center"
                >
                  <Avatar
                    alt={selectedRow?.name}
                    src={`${config.apiBaseUrl}/${selectedRow?.Anh}`}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Mã khách hàng:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.idKhachHang}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Họ và tên:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.name}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.email}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Số điện thoại:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.SDT}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Ngày sinh:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.NgaySinh}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Giới tính:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Typography variant="caption" color="text" fontWeight="bold">
                    {selectedRow?.GioiTinh}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sm={6} xl={2}>
                  <Typography variant="caption" color="text" fontWeight="regular">
                    Trạng Thái:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Box>
                    <span
                      style={{
                        backgroundColor: selectedRow?.status
                          ? "#F0FFF0"
                          : "#FFE4E1",
                        color: selectedRow?.status ? "green" : "red",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color={selectedRow?.status ? "green" : "red"}
                        fontWeight="bold"
                      >
                        {selectedRow?.status ? "Hoạt động" : "Khóa"}
                      </Typography>
                    </span>
                  </Box>
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
  
  export default CustomerDetail;
  