import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import downloadIcon from "../../../../assets/icon/downloadIcon.svg";
import uploadIcon from "../../../../assets/icon/uploadIcon.svg";
import StaffData from "../data/StaffData";

const StaffList = ({
  data,
  totalElements,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleDownload,
  handleImport,
  oldSearching,
}) => {
  const { columns, rows } = StaffData({ data });
  const options = [5, 10, 20, 30, 50, 100];
  return (
    <Card>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Danh sách nhân viên
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={handleDownload}
              sx={{
                flex: 1,
                height: "100%",
                marginTop: 0,
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#80d4ff",
                color: "white",
              }}
            >
              <img src={downloadIcon} alt="" />
              <Typography
                whiteSpace="nowrap"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                Xuất dữ liệu
              </Typography>
            </Button>
          </Box>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={() => {
                document.getElementById("fileInput").click();
              }}
              sx={{
                flex: 1,
                height: "100%",
                marginTop: 0,
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#80d4ff",
                color: "white",
              }}
            >
              <img src={uploadIcon} alt="" />
              <Typography
                whiteSpace="nowrap"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                Nhập dữ liệu
              </Typography>
              <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleImport}
              />
            </Button>
          </Box>
          <Box color="text" px={1}>
            <Button
              variant="contained"
              onClick={null}
              sx={{
                flex: 1,
                height: "100%",
                marginTop: 0,
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#80d4ff",
                color: "white",
              }}
            >
              <img src={downloadIcon} alt="" />
              <Typography
                whiteSpace="nowrap"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                Xuất file mẫu
              </Typography>
            </Button>
          </Box>
        </div>
      </Box>
      <Box
        // sx={{
        //   "& .MuiTableRow-root:not(:last-child)": {
        //     "& td": {
        //       borderBottom: ({ borders: { borderWidth, borderColor } }) =>
        //         `${borderWidth[1]} solid ${borderColor}`,
        //     },
        //   },
        // }}
        p={3}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>{/* Định nghĩa các header */}</TableHead>
            <TableBody>{/* Render các dòng dữ liệu */}</TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length} // Số lượng dữ liệu trong danh sách
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* <Table
          key={`${rowsCount}--${oldSearching.fromDate}--${oldSearching.untilDate}--${oldSearching.agent}--${oldSearching.content}`}
          columns={columns}
          rows={rows}
          isPagination={true}
          totalElements={totalElements}
          rowsPerPageOptions={options}
          rowsCount={rowsCount}
          setRowsCount={setRowsCount}
          curPage={page}
          setCurPage={setPage}
        /> */}
        <Typography
          whiteSpace="nowrap"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            textTransform: "none",
            alignItems: "center",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {data.length <= 0 && "Không tồn tại dữ liệu"}
        </Typography>
      </Box>
    </Card>
  );
};

export default StaffList;
