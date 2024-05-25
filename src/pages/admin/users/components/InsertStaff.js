import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  
  const UsersSearching = ({ searchData, handleChange, dataChucVu }) => {
    const handleSelectChange = (event) => {
      handleChange(event.target.value);
    };
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
            <TextField
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={searchData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <TextField
              label="Email"
              placeholder="Nhập email"
              value={searchData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              textAlign="center"
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <TextField
              label="Số Điện Thoại"
              placeholder="Nhập số điện thoại"
              value={searchData.SDT}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              textAlign="center"
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <TextField
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={searchData.password}
              onChange={handleChange}
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
              value={searchData.password_confirmation}
              onChange={handleChange}
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
            <FormControl fullWidth className="formControl">
              <InputLabel
                shrink={true}
                sx={commonComboboxLabelStyle}
                id="ward-label"
              >
                Chức Vụ
              </InputLabel>
              <Select
                value={searchData.idChucVu}
                onChange={handleSelectChange}
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
                    <MenuItem key={item.id} value={item.tenChucVu}>
                      {item.tenChucVu}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>nothing</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default UsersSearching;
  