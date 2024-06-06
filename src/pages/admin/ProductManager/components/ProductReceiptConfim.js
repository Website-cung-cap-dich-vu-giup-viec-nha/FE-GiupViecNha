import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import questionsIcon from "../../../../assets/icon/question.svg";

const ProductReceiptConfim = ({
  open = false,
  setOpen = null,
  handleUpdateTinhTrang,
  selectedRow,
}) => {
  return [
    <Dialog
      open={open}
      onClose={() => setOpen((prevState) => !prevState)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle style={{ textAlign: "right", fontWeight: "bold" }}>
        <IconButton
          onClick={() => {
            setOpen();
          }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box py={3}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={12}>
                <img
                  src={questionsIcon}
                  alt="Questions Icon"
                  style={{
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={12}>
                <Typography
                  variant="caption"
                  color="text"
                  fontWeight="bold"
                  fontSize="16px"
                  verticalAlign="middle"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Xác nhận
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} xl={12}>
                <Typography
                  variant="caption"
                  color="text"
                  fontWeight="regular"
                  fontSize="13px"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Bạn muốn thực hiện duyệt phiếu dịch vụ số {selectedRow?.idPhieuDichVu} không?
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
          onClick={() => handleUpdateTinhTrang(selectedRow, 2)}
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
    </Dialog>,
  ];
};

export default ProductReceiptConfim;
