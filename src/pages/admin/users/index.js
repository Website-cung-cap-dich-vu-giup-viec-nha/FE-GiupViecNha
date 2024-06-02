import { Alert, Grid, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCallback, useEffect, useState } from "react";
import StaffSearching from "./components/StaffSearching";
import StaffList from "./components/StaffList";
import {
  deleteStaff,
  editStaff,
  getExampleExportStaffData,
  getStaff,
  importStaffData,
  insertStaff,
} from "../../../api/admin/StaffAPI";
import * as XLSX from "xlsx";
import StaffDetail from "./components/StaffDetail";
import StaffDelete from "./components/StaffDelete";
import StaffInsert from "./components/StaffInsert";
import { getDepartment } from "../../../api/admin/DepartmentAPI";
import { getPositionByDepartment } from "../../../api/admin/PositionAPI";
import StaffEdit from "./components/StaffEdit";

const Users = ({ setPageName, setBreadCrumb }) => {
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
  const [downloadData, setDownloadData] = useState([]);
  const [importData, setImportData] = useState([]);
  const [exampleExportData, setExampleExportData] = useState([]);
  const [oldSearching, setOldSearching] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [openInsert, setOpenInsert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [insertData, setInsertData] = useState({
    name: "",
    email: "",
    SDT: "",
    password: "",
    password_confirmation: "",
    GioiTinh: "Nữ",
    idPhongBan: "",
    idChucVu: "",
    NgaySinh: null,
  });
  const [dataPhongBan, setDataPhongBan] = useState([]);
  const [dataChucVu, setDataChucVu] = useState([]);
  const setPageNameCallback = useCallback(
    () => setPageName("Quản lý nhân viên"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Nhân viên"]),
    [setBreadCrumb]
  );

  const handleDataChucVu = (idPhongBan) => {
    getPositionByDepartment(idPhongBan)
      .then((response) => {
        setDataChucVu(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataPhongBan = () => {
    getDepartment()
      .then((response) => {
        setDataPhongBan(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsertData = (event, propertyName) => {
    if (propertyName === "NgaySinh")
      setInsertData({ ...insertData, [propertyName]: event });
    else if (propertyName === "idChucVu" || propertyName === "idPhongBan")
      setInsertData({ ...insertData, [propertyName]: event.target.value });
    else if (propertyName === "GioiTinh")
      setInsertData({
        ...insertData,
        [propertyName]: event.target.checked ? "Nam" : "Nữ",
      });
    else setInsertData({ ...insertData, [propertyName]: event.target.value });
  };

  const handleEditData = (event, propertyName) => {
    if (propertyName === "NgaySinh")
      setSelectedRow({ ...selectedRow, [propertyName]: event });
    else if (propertyName === "idChucVu" || propertyName === "idPhongBan")
      setSelectedRow({ ...selectedRow, [propertyName]: event.target.value });
    else if (propertyName === "GioiTinh")
      setSelectedRow({
        ...selectedRow,
        [propertyName]: event.target.checked ? "Nam" : "Nữ",
      });
    else setSelectedRow({ ...selectedRow, [propertyName]: event.target.value });
  };

  const handleOpenInsert = () => {
    setOpenInsert((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const handleOpenDetail = () => {
    setOpenDetail((prev) => !prev);
  };

  const handleOpenDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  const handleInsert = () => {
    insertStaff(insertData)
      .then((response) => {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenInsert();
        if (response?.message?.status === 200) {
          if (page === 0) loadStaffTable();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = () => {
    editStaff(selectedRow, selectedRow?.idNhanVien)
      .then((response) => {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenEdit();
        if (response?.message?.status === 200) {
          if (page === 0) loadStaffTable();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    deleteStaff(selectedRow.id)
      .then((response) => {
        setMsg(response?.message?.data?.message[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenDelete();
        if (response?.message?.status === 200) {
          if (page === 0) loadStaffTable();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleDownload = () => {
    getStaff(oldSearching, "", "")
      .then((response) => {
        console.log(response);
        setDownloadData(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImport = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Lấy dữ liệu từ sheet đầu tiên (sheet index 0)
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      // Đặt dữ liệu vào state sử dụng setImportUnitData
      setImportData(
        excelData?.map((item) => ({
          idNhanVien: item[0] || null,
          name: item[1] || null,
          email: item[2] || null,
          SDT: item[3] || null,
          GioiTinh: item[4] || null,
          tenChucVu: item[5] || null,
        }))
      );
    };
    if (file !== null) reader.readAsArrayBuffer(file);
  };

  const handleExportExampleHeader = () => {
    getExampleExportStaffData()
      .then((response) => {
        console.log(response);
        setExampleExportData(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadStaffTable = () => {
    getStaff(oldSearching, page * rowsPerPage, rowsPerPage)
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

  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadStaffTable();
  }, [page]);

  useEffect(() => {
    if (isFirstLoad) return;
    setPage(0);
    loadStaffTable();
  }, [rowsPerPage, oldSearching]);

  useEffect(() => {
    if (downloadData.length !== 0) {
      const ws = XLSX.utils.json_to_sheet(downloadData, {
        skipHeader: true,
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Xuất file Excel
      // const filename = `${moment(new Date()).format("YYYYddMMHHmmss")}.xlsx`;
      const filename = `DanhSachNhanVien.xlsx`;
      XLSX.writeFile(wb, filename);
      setDownloadData([]);
    }
  }, [downloadData]);

  useEffect(() => {
    if (importData.length !== 0) {
      importStaffData(importData)
        .then((response) => {
          console.log(response);
          setMsg(response?.message?.data?.message[0]);
          setStatus(response?.message?.status);
          handleCloseAlert();
          setPage(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [importData]);

  useEffect(() => {
    if (exampleExportData.length !== 0) {
      const ws = XLSX.utils.json_to_sheet(exampleExportData, {
        skipHeader: true,
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Xuất file Excel
      // const filename = `${moment(new Date()).format("YYYYddMMHHmmss")}.xlsx`;
      const filename = `DanhSachNhapDuLieuMau.xlsx`;
      XLSX.writeFile(wb, filename);
      setExampleExportData([]);
    }
  }, [exampleExportData]);

  useEffect(() => {
    if (isFirstLoad) return;
    if (openInsert) {
      handleDataChucVu(insertData?.idPhongBan);
      setInsertData({ ...insertData, "idChucVu": null });
    } else if (openEdit) {
      handleDataChucVu(selectedRow?.idPhongBan);
      setSelectedRow({ ...selectedRow, "idChucVu": null });
    }
  }, [insertData?.idPhongBan, selectedRow?.idPhongBan]);

  useEffect(() => {
    if (isFirstLoad) return;
    if (selectedRow?.idPhongBan !== null || selectedRow?.idPhongBan !== "") {
      handleDataChucVu(selectedRow?.idPhongBan);
    }
  }, [openEdit]);

  useEffect(() => {
    if (openInsert) {
      setInsertData({
        name: "",
        email: "",
        SDT: "",
        password: "",
        password_confirmation: "",
        GioiTinh: "Nữ",
        idPhongBan: "",
        idChucVu: "",
        NgaySinh: null,
      });
    }
  }, [openInsert]);

  useEffect(() => {
    setIsFirstLoad(false);
    loadStaffTable();
    handleDataPhongBan();
  }, []);
  return (
    <Grid container>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <StaffSearching
          searchData={searchData}
          handleChange={handleChange}
          handleSearching={handleSearching}
        />
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <StaffList
          data={data}
          totalElements={totalElements}
          page={page}
          setPage={handleChangePage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleChangeRowsPerPage}
          handleDownload={handleDownload}
          handleImport={handleImport}
          oldSearching={oldSearching}
          handleExportExampleHeader={handleExportExampleHeader}
          setSelectedRow={setSelectedRow}
          setOpenDetail={handleOpenDetail}
          setOpenDelete={handleOpenDelete}
          setOpenInsert={handleOpenInsert}
          setOpenEdit={handleOpenEdit}
        />
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
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
      <StaffInsert
        open={openInsert}
        setOpen={handleOpenInsert}
        data={insertData}
        handleChange={handleInsertData}
        dataPhongBan={dataPhongBan}
        dataChucVu={dataChucVu}
        handleInsert={handleInsert}
      />
      <StaffEdit
        open={openEdit}
        setOpen={handleOpenEdit}
        data={selectedRow}
        handleChange={handleEditData}
        dataPhongBan={dataPhongBan}
        dataChucVu={dataChucVu}
        handleEdit={handleEdit}
      />
      <StaffDetail
        selectedRow={selectedRow}
        open={openDetail}
        setOpen={handleOpenDetail}
      />
      <StaffDelete
        open={openDelete}
        setOpen={handleOpenDelete}
        handleDelete={handleDelete}
      />
    </Grid>
  );
};

export default Users;
