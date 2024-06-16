import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import * as React from "react";
  import HighlightOffIcon from "@mui/icons-material/HighlightOff";
  import CheckIcon from "@mui/icons-material/Check";
  
  const GroupEdit = ({
    data,
    open,
    setOpen,
    handleChange,
    handleEdit,
  }) => {
    return (
      <Dialog open={open} onClose={setOpen} maxWidth="sm" fullWidth>
        <DialogTitle
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "26px" }}
        >
          SỬA NHÓM
        </DialogTitle>
        <DialogContent>
          <Box py={3} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} xl={12}>
                <TextField
                  label="Tên nhóm"
                  placeholder="Nhập tên nhóm"
                  value={data?.tenNhom}
                  onChange={(event) => handleChange(event, "tenNhom")}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            onClick={handleEdit}
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
  
  export default GroupEdit;
  