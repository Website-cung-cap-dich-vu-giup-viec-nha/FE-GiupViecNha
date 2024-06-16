import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Edit from "../../../assets/icon/Edit.svg";
import Trash from "../../../assets/icon/Trash.svg";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import {
  deleteGroup,
  deleteGroupMember,
  deleteGroupPermission,
  getGroup,
  getGroupMember,
  getGroupPermission,
  insertGroup,
  insertGroupMember,
  insertGroupPermission,
  updateGroup,
} from "../../../api/admin/AuthAPI";
import GroupInsert from "./components/GroupInsert";
import GroupEdit from "./components/GroupEdit";
import GroupDelete from "./components/GroupDelete";
import GroupMember from "./components/GroupMember";
import { getPermissionIsNotAddNhom, getStaffIsNotAddNhom } from "../../../api/admin/StaffAPI";
import GroupPermission from "./components/GroupPermission";

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(224, 224, 224, 1)", // Màu của đường kẻ dọc
  },
});

const PermissionManager = ({ setPageName, setBreadCrumb }) => {
  const iconStyle = {
    fontSize: 20,
    marginRight: 8,
    color: "blue",
    cursor: "pointer",
  };
  const classes = useStyles();
  const handleIcon = (item) => {
    setSelectedRow(item);
  };
  // -- Start Alerts Setting -- //
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert((prev) => !prev);
  };

  const getIconAndColor = (message) => {
    if (message === 200) {
      return {
        icon: <CheckCircleOutlineIcon style={{ color: "white" }} />,
        color: "#39ac39",
      };
    }
    return {
      icon: <ErrorIcon style={{ color: "white" }} />,
      color: "#f44336",
    };
  };
  // --- End Alerts Setting --- //

  // eslint-disable-next-line
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [oldSearching, setOldSearching] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [openInsert, setOpenInsert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openGroupMember, setOpenGroupMember] = useState(false);
  const [openGroupPermission, setOpenGroupPermission] = useState(false);
  const [insertData, setInsertData] = useState({
    tenNhom: "",
  });
  const [groupMemberData, setGroupMemberData] = useState({
    idNhom: "",
    idNhanVien: "",
  });
  const [groupPermissionData, setGroupPermissionData] = useState({
    idNhom: "",
    idQuyen: "",
  });
  const [dataNhanVien, setDataNhanVien] = useState([]);
  const [dataQuyen, setDataQuyen] = useState([]);
  const [groupMember, setGroupMember] = useState([]);
  const [groupPermission, setGroupPermission] = useState([]);
  const setPageNameCallback = useCallback(
    () => setPageName("Quản lý phân quyền"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Phân quyền"]),
    [setBreadCrumb]
  );

  const handleInsertData = (event, propertyName) => {
    setInsertData({ ...insertData, [propertyName]: event.target.value });
  };

  const handleEditData = (event, propertyName) => {
    setSelectedRow({ ...selectedRow, [propertyName]: event.target.value });
  };

  const handleChange_Staff = (event, propertyName) => {
    if (propertyName === "idNhanVien") {
      setGroupMemberData({
        ...groupMemberData,
        [propertyName]: event?.idNhanVien,
      });
    }
  };

  const handleChange_Permission = (event, propertyName) => {
    if (propertyName === "idQuyen") {
      setGroupPermissionData({
        ...groupPermissionData,
        [propertyName]: event?.idQuyen,
      });
    }
  };

  const handleInsert = () => {
    insertGroup(insertData).then((response) => {
      if (response?.message?.status === 200) {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenInsert();
        if (response?.message?.status === 200) {
          if (page === 0) loadGroupTable();
          else setPage(0);
        }
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleEdit = () => {
    updateGroup(selectedRow, selectedRow?.idNhom).then((response) => {
      if (response?.message?.status === 200) {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenEdit();
        if (response?.message?.status === 200) {
          if (page === 0) loadGroupTable();
          else setPage(0);
        }
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleDelete = () => {
    deleteGroup(selectedRow?.idNhom).then((response) => {
      if (response?.message?.status === 200) {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenDelete();
        if (response?.message?.status === 200) {
          if (page === 0) loadGroupTable();
          else setPage(0);
        }
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleInsertGroupMember = (item) => {
    insertGroupMember(groupMemberData).then((response) => {
      if (response?.message?.status === 200) {
        loadStaffIsNotAddNhom(item?.idNhom);
        handleGroupMember();
        setGroupMemberData({
          ...groupMemberData,
          idNhanVien: null,
        });
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleInsertGroupPermission = (item) => {
    insertGroupPermission(groupPermissionData).then((response) => {
      if (response?.message?.status === 200) {
        loadPermissionIsNotAddNhom(item?.idNhom);
        handleGroupPermission();
        setGroupPermissionData({
          ...groupPermissionData,
          idQuyen: null,
        });
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleDeleteGroupMember = (item) => {
    deleteGroupMember(item?.idNhomNguoiDung).then((response) => {
      if (response?.message?.status === 200) {
        loadStaffIsNotAddNhom(item?.idNhom);
        handleGroupMember();
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleDeleteGroupPermission = (item) => {
    deleteGroupPermission(item?.idPhanQuyen).then((response) => {
      if (response?.message?.status === 200) {
        loadPermissionIsNotAddNhom(item?.idNhom);
        handleGroupPermission();
      } else {
        const str = response?.message?.data?.message
          ? response?.message?.data?.message.split(" (")
          : "";
        setMsg(str[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
      }
    });
  };

  const handleOpenInsert = () => {
    setOpenInsert((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const handleOpenDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  const handleOpenGroupMember = (item) => {
    if (item && item?.idNhom !== null && item?.idNhom !== undefined) {
      loadStaffIsNotAddNhom(item?.idNhom);
    }
    setGroupMemberData({
      ...groupMemberData,
      idNhom: item?.idNhom,
      idNhanVien: null,
    });
    setOpenGroupMember((prev) => !prev);
  };

  const handleOpenGroupPermission = (item) => {
    if (item && item?.idNhom !== null && item?.idNhom !== undefined) {
      loadPermissionIsNotAddNhom(item?.idNhom);
    }
    setGroupPermissionData({
      ...groupPermissionData,
      idNhom: item?.idNhom,
      idQuyen: null,
    });
    setOpenGroupPermission((prev) => !prev);
  };

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleSearching = () => {
    setOldSearching(searchData);
  };

  const loadGroupTable = () => {
    getGroup(oldSearching, page * rowsPerPage, rowsPerPage)
      .then((response) => {
        setData(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
        setTotalElements(
          response?.message?.status === 200 ? response?.message?.data?.total : 0
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadStaffIsNotAddNhom = (idNhom) => {
    getStaffIsNotAddNhom(idNhom)
      .then((response) => {
        setDataNhanVien(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPermissionIsNotAddNhom = (idNhom) => {
    getPermissionIsNotAddNhom(idNhom)
      .then((response) => {
        setDataQuyen(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGroupMember = () => {
    getGroupMember(groupMemberData?.idNhom)
      .then((response) => {
        setGroupMember(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGroupPermission = () => {
    getGroupPermission(groupPermissionData?.idNhom)
      .then((response) => {
        setGroupPermission(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (openGroupMember) {
      handleGroupMember();
    }
  }, [openGroupMember]);

  useEffect(() => {
    if (openGroupPermission) {
      handleGroupPermission();
    }
  }, [openGroupPermission]);

  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadGroupTable();
  }, [page]);

  useEffect(() => {
    if (isFirstLoad) return;
    setPage(0);
    loadGroupTable();
  }, [rowsPerPage, oldSearching]);

  useEffect(() => {
    if (openInsert) {
      setInsertData({
        tenNhom: "",
      });
    }
  }, [openInsert]);

  useEffect(() => {
    setIsFirstLoad(false);
    loadGroupTable();
  }, []);
  return (
    <Grid container>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={11} xl={11}>
            <TextField
              label="Tìm kiếm"
              placeholder="Nhập tên nhóm"
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
        </Grid>
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Danh sách nhóm
              </Typography>
            </Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Box color="text" px={1}>
                <Button
                  variant="contained"
                  onClick={handleOpenInsert}
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
                    Thêm mới
                  </Typography>
                </Button>
              </Box>
            </div>
          </Box>
          <Box p={3}>
            <TableContainer
              component={Paper}
              sx={{ overflow: "scroll", height: "calc(100vh - 400px)" }}
              style={{
                padding: "15px",
                boxShadow: "0px 4px 20px rgba(94, 98, 120, 0.04)",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={totalElements} // Số lượng dữ liệu trong danh sách
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage={`Số dòng mỗi trang`}
                      labelDisplayedRows={() => ""}
                    />
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "#E1E3E9" }}>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#606F89" }}
                    >
                      STT
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#606F89" }}
                    >
                      TÊN NHÓM
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#606F89" }}
                    >
                      Thêm người dùng
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#606F89" }}
                    >
                      Phân quyền
                    </TableCell>
                    {/* <TableCell
                    className={classes.tableCell}
                    align="center"
                    sx={{ fontWeight: "bold", color: "#606F89" }}
                  >
                    CHỨC VỤ
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    sx={{ fontWeight: "bold", color: "#606F89" }}
                  >
                    SỐ SAO
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    sx={{ fontWeight: "bold", color: "#606F89" }}
                  >
                    TÌNH TRẠNG
                  </TableCell> */}
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ fontWeight: "bold", color: "#606F89" }}
                    >
                      HÀNH ĐỘNG
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
                          "&:nth-of-type(even)": { backgroundColor: "#F8F8F8" },
                        }}
                      >
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          sx={{ color: "#606F89" }}
                        >
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        <TableCell
                          className={classes.tableCell}
                          sx={{ color: "#606F89" }}
                        >
                          {item.tenNhom}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          sx={{ color: "#606F89" }}
                        >
                          <IconButton
                            key={`${item.id}-iconbutton2-icon`}
                            onClick={() => {
                              handleOpenGroupMember(item);
                              handleIcon(item);
                            }}
                          >
                            <HowToRegIcon
                              sx={{ color: "#0072B8" }}
                              fontSize="small"
                              title="PersonAdd"
                              style={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          sx={{ color: "#606F89" }}
                        >
                          <IconButton
                            key={`${item.id}-iconbutton2-icon`}
                            onClick={() => {
                              handleOpenGroupPermission(item);
                              handleIcon(item);
                            }}
                          >
                            <AddModeratorIcon
                              sx={{ color: "#0072B8" }}
                              fontSize="small"
                              title="PersonAdd"
                              style={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          sx={{ color: "#606F89" }}
                        >
                          <IconButton
                            key={`${item.id}-iconbutton2-icon`}
                            onClick={() => {
                              handleOpenEdit();
                              handleIcon(item);
                            }}
                          >
                            <img
                              src={Edit}
                              alt=""
                              key={`${item.id}-edit-icon`}
                              style={iconStyle}
                            />
                          </IconButton>

                          <IconButton
                            key={`${item.id}-iconbutton3-icon`}
                            onClick={() => {
                              handleOpenDelete();
                              handleIcon(item);
                            }}
                          >
                            <img
                              src={Trash}
                              alt=""
                              key={`${item.id}-delete-icon`}
                              style={iconStyle}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
              {data?.length <= 0 && "Không tồn tại dữ liệu"}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <GroupInsert
        data={insertData}
        open={openInsert}
        setOpen={handleOpenInsert}
        handleChange={handleInsertData}
        handleInsert={handleInsert}
      />
      <GroupEdit
        data={selectedRow}
        open={openEdit}
        setOpen={handleOpenEdit}
        handleChange={handleEditData}
        handleEdit={handleEdit}
      />
      <GroupDelete
        open={openDelete}
        setOpen={handleOpenDelete}
        handleDelete={handleDelete}
      />
      <GroupMember
        open={openGroupMember}
        setOpen={handleOpenGroupMember}
        handleChange={handleChange_Staff}
        dataNhanVien={dataNhanVien}
        handleInsert={handleInsertGroupMember}
        data={groupMemberData}
        groupMemberData={groupMember}
        handleDelete={handleDeleteGroupMember}
      />
      <GroupPermission
        open={openGroupPermission}
        setOpen={handleOpenGroupPermission}
        handleChange={handleChange_Permission}
        dataQuyen={dataQuyen}
        handleInsert={handleInsertGroupPermission}
        data={groupPermissionData}
        groupPermissionData={groupPermission}
        handleDelete={handleDeleteGroupPermission}
      />
      <Snackbar
        open={openAlert}
        // autoHideDuration={3600}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: getIconAndColor(status).color,
          }}
          icon={getIconAndColor(status).icon}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PermissionManager;
