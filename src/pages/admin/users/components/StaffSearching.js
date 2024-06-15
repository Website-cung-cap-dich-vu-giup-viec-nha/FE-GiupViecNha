import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const StaffSearching = ({ searchData, handleChange, handleSearching }) => {
  return (
    <Box py={3} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9} xl={11}>
          <TextField
            label="Tìm kiếm"
            placeholder="Nhập họ tên, SDT"
            value={searchData}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={1} xl={1}>
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
        {/* <Grid item xs={12} sm={1} xl={1}>
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
            onClick={null}
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
              Nhập dữ liệu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={1} xl={1}>
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
            onClick={null}
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
              Xuất dữ liệu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={1} xl={1}>
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
            onClick={null}
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
              Xuất excel mẫu
            </Typography>
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default StaffSearching;
