import { Alert, Box, Grid, Snackbar, Tab } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ProductReceiptSearching from "./components/ProductReceiptSearching";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProductReceiptList from "./components/ProductReceiptList";
import {
  deleteProductReceipt,
  getProductReceipt,
  updateProductReceiptTinhTrang,
} from "../../../api/admin/ProductReceiptAPI";
import dayjs from "dayjs";
import { getProduct } from "../../../api/admin/ProductAPI";
import { getAllCustomer } from "../../../api/admin/CustomerAPI";
import CustomerDetail from "../Customer/components/CustomerDetail";
import ProductReceiptDetail from "./components/ProductReceiptDetail";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ProductReceiptDelete from "./components/ProductReceiptDelete";
import ProductReceiptInsert from "./components/ProductReceiptInsert";
import Address from "./components/Address";
import {
  getProvince,
  layDiaChiByIdNguoiDung,
  layHuyenByProvinceId,
  layXaByDistrictId,
  themDiaChi,
} from "../../../api/DiaChiAPI";
import {
  layDanhSachChiTietDVTheoId,
  layKieuDVByIdDV,
  taoPhieuDichVu,
} from "../../../api/GiupViecAPI";
import moment from "moment";
import { getProfile } from "../../../api/admin/AuthAPI";
import ProductReceiptDetailData from "./components/ProductReceiptDetailData";
import { getDataByIdPhieuDichVu } from "../../../api/admin/ProductReceiptWorkDayAPI";
import { getStaffIsNotAddChiTietNgayLam } from "../../../api/admin/StaffAPI";
import {
  deleteProductReceiptStaff,
  getProductReceiptStaff,
  getProductReceiptStaffByIDChiTietNgayLam,
  insertProductReceiptStaff,
} from "../../../api/admin/ProductReceiptStaff";
import ProductReceiptConfim from "./components/ProductReceiptConfim";

const ProductManager = ({ setPageName, setBreadCrumb }) => {
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

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const setPageNameCallback = useCallback(
    () => setPageName("Quản lý phiếu dịch vụ"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Phiếu dịch vụ"]),
    [setBreadCrumb]
  );
  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);

  // --------- Start Product Receipt -------- //

  const [productReceiptData, setProductReceiptData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [searchData, setSearchData] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    idPhieuDichVu: "",
    TinhTrang: "",
    TinhTrangThanhToan: "",
    idDichVu: "",
  });
  const [oldSearching, setOldSearching] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    idPhieuDichVu: "",
    TinhTrang: "",
    TinhTrangThanhToan: "",
    idDichVu: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataDichVu, setDataDichVu] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openCustomerDetail, setOpenCustomerDetail] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [insertData, setInsertData] = useState({
    Tongtien: 0,
    idDichVu: "",
    idChiTietDichVu: "",
    NgayBatDau: null,
    GioBatDau: null,
    SoBuoi: 1,
    SoGio: 1,
    SoNguoiDuocChamSoc: null,
    idKhachHang: null,
    GhiChu: "",
    idDiaChi: null,
    idNhanVienQuanLyDichVu: "",
    idKieuDichVu: "",
  });
  const [addressData, setAddressData] = useState({
    province_id: null,
    district_id: null,
    Phuong: null,
    Duong: "",
    idNguoiDung: "",
  });
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [dataChiTietDichVu, setDataChiTietDichVu] = useState([]);
  const [dataDiaChi, setDataDiaChi] = useState([]);
  const [dataKieuDichVu, setDataKieuDichVu] = useState([]);
  const [isFirstTabDisabled, setIsFirstTabDisabled] = useState(false);
  const [dataWorkDay, setDataWorkDay] = useState([]);
  const [selectedWorkDayItem, setSelectedWorkDayItem] = useState({});
  const [data_StaffWorking, setData_StaffWorking] = useState([]);
  const [selectedStaffItem, setSelectedStaffItem] = useState({});
  const [data_Staff, setData_Staff] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleOpenCustomerDetail = () => {
    setOpenCustomerDetail((prev) => !prev);
  };

  const handleOpenEdit = (isFirstTabOpen, item) => {
    setIsFirstTabDisabled(isFirstTabOpen);
    if (isFirstTabOpen) {
      setCurrentTab("1");
      loadProductReceiptDataWorkDay(item?.idPhieuDichVu);
    } else {
      setCurrentTab("0");
    }
  };

  const handleOpenDetail = () => {
    setOpenDetail((prev) => !prev);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm((prev) => !prev);
  };

  const handleOpenDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  const handleOpenInsert = () => {
    setOpenInsert((prev) => !prev);
    setInsertData({
      ...insertData,
      Tongtien: 0,
      idDichVu: "",
      idChiTietDichVu: "",
      NgayBatDau: null,
      GioBatDau: null,
      SoBuoi: 1,
      SoGio: 1,
      SoNguoiDuocChamSoc: null,
      idKhachHang: null,
      GhiChu: "",
      idDiaChi: null,
    });
  };

  const handleOpenAddress = () => {
    if (insertData?.idKhachHang === null || insertData?.idKhachHang === "") {
      setMsg("Vui lòng chọn khách hàng cần thêm địa chỉ!");
      setStatus(201);
      handleCloseAlert();
      return;
    }
    setAddressData({ ...addressData, idKhachHang: insertData?.idKhachHang });
    setOpenAddress((prev) => !prev);
  };

  const handleDeleteStaffWork = (item) => {
    deleteProductReceiptStaff(item?.idChiTietNhanVienLamDichVu)
      .then((response) => {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) {
          loadProductReceiptStaffWorkDay();
          loadStaffIsNotAddChiTietNgayLam(
            selectedWorkDayItem?.idChiTietNgayLam
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsert = () => {
    taoPhieuDichVu(insertData)
      .then((response) => {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenInsert();
        if (response?.message?.status === 200) {
          if (page === 0) loadProductReceiptData();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsertAddress = () => {
    themDiaChi(addressData)
      .then((response) => {
        setMsg(response?.message?.data?.message);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) {
          loadAddressByCustomer(insertData?.idNguoiDung);
          handleOpenAddress();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsertData = (event, propertyName) => {
    if (propertyName === "NgayBatDau")
      setInsertData({
        ...insertData,
        [propertyName]: event,
      });
    else if (propertyName === "GioBatDau")
      setInsertData({
        ...insertData,
        [propertyName]: dayjs(event).format("HH:mm:ss"),
      });
    else if (
      propertyName === "idDichVu" ||
      propertyName === "idChiTietDichVu" ||
      propertyName === "idDiaChi" ||
      propertyName === "idKieuDichVu"
    )
      setInsertData({ ...insertData, [propertyName]: event.target.value });
    else if (propertyName === "GioiTinh")
      setInsertData({
        ...insertData,
        [propertyName]: event.target.checked ? "Nam" : "Nữ",
      });
    else if (propertyName === "idKhachHang") {
      setInsertData({
        ...insertData,
        [propertyName]: event?.idKhachHang,
        idNguoiDung: event?.idNguoiDung,
      });
      setAddressData({ ...addressData, idNguoiDung: event?.idNguoiDung });
    } else setInsertData({ ...insertData, [propertyName]: event.target.value });
  };

  const handleChange_Staff = (event, propertyName) => {
    if (propertyName === "idNhanVien") {
      setSelectedWorkDayItem({
        ...selectedWorkDayItem,
        [propertyName]: event?.idNhanVien,
      });
    }
  };

  const handleTinhTrangLabel = (idTinhTrang) => {
    if (idTinhTrang === 1) {
      return "Đang duyệt";
    } else if (idTinhTrang === 2) {
      return "Đã duyệt";
    } else if (idTinhTrang === 3) {
      return "Đã hủy phiếu dịch vụ";
    }
  };

  const handleTinhTrangThanhToanLabel = (idTinhTrangThanhToan) => {
    if (idTinhTrangThanhToan === 1) {
      return "Chưa thanh toán";
    } else if (idTinhTrangThanhToan === 2) {
      return "Đã thanh toán";
    } else if (idTinhTrangThanhToan === 3) {
      return "Đã hoàn tiền";
    }
  };

  const handleChange = (event, propertyName) => {
    if (propertyName === "startDate" || propertyName === "endDate")
      setSearchData({ ...searchData, [propertyName]: event });
    else if (
      propertyName === "idTinhTrang" ||
      propertyName === "idTinhTrangThanhToan" ||
      propertyName === "idDichVu"
    )
      setSearchData({ ...searchData, [propertyName]: event.target.value });
    else setSearchData({ ...searchData, [propertyName]: event.target.value });
  };

  const handleAddressChange = (event, propertyName) => {
    if (
      propertyName === "province_id" ||
      propertyName === "district_id" ||
      propertyName === "Phuong"
    )
      setAddressData({ ...addressData, [propertyName]: event.target.value });
    else setAddressData({ ...addressData, [propertyName]: event.target.value });
  };

  const handleSearching = () => {
    setOldSearching(searchData);
  };

  const handleSearching_Staff = () => {
    insertProductReceiptStaff(selectedWorkDayItem)
      .then((response) => {
        setMsg(response?.message?.data?.message[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
        setSelectedWorkDayItem({
          ...selectedWorkDayItem,
          idNhanVien: null,
        });
        loadStaffIsNotAddChiTietNgayLam(selectedWorkDayItem?.idChiTietNgayLam);
      })
      .catch((error) => {
        console.log(error);
      });
    loadProductReceiptStaffWorkDay();
  };

  const loadProductReceiptData = () => {
    getProductReceipt(oldSearching, page * rowsPerPage, rowsPerPage)
      .then((response) => {
        setProductReceiptData(
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

  const handleUpdateTinhTrang = (item, TinhTrang) => {
    if (item?.TinhTrang === TinhTrang && TinhTrang === 2) {
      setMsg("Phiếu dịch vụ này đã được duyệt");
      setStatus(422);
      handleCloseAlert();
      handleOpenConfirm();
      return;
    }
    updateProductReceiptTinhTrang(item?.idPhieuDichVu, TinhTrang)
      .then((response) => {
        setMsg(response?.message?.data?.message[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
        handleOpenConfirm();
        if (response?.message?.status === 200) {
          if (page === 0) loadProductReceiptData();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    deleteProductReceipt(selectedRow?.idPhieuDichVu)
      .then((response) => {
        setMsg(response?.message?.data?.message[0]);
        setStatus(response?.message?.status);
        handleCloseAlert();
        if (response?.message?.status === 200) handleOpenDelete();
        if (response?.message?.status === 200) {
          if (page === 0) loadProductReceiptData();
          else setPage(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductData = () => {
    getProduct()
      .then((response) => {
        setDataDichVu(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductDetailData = (id) => {
    layDanhSachChiTietDVTheoId(id)
      .then((response) => {
        setDataChiTietDichVu(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductTypeData = (id) => {
    layKieuDVByIdDV(id)
      .then((response) => {
        setDataKieuDichVu(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCustomerData = () => {
    getAllCustomer()
      .then((response) => {
        setDataKhachHang(response?.message?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadAddressByCustomer = (id) => {
    layDiaChiByIdNguoiDung(id)
      .then((response) => {
        console.log(response);
        setDataDiaChi(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProvinceData = () => {
    getProvince()
      .then((response) => {
        setDataProvince(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadDistrictDataByProvinceData = (id) => {
    layHuyenByProvinceId(id)
      .then((response) => {
        setDataDistrict(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadWardDataByDistrictData = (id) => {
    layXaByDistrictId(id)
      .then((response) => {
        setDataWard(
          response?.message?.status === 200 ? response?.message?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentLoginUser = () => {
    getProfile()
      .then((response) => {
        setInsertData({
          ...insertData,
          idNhanVienQuanLyDichVu: response?.message?.data?.staff?.idNhanVien,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductReceiptDataWorkDay = (idPhieuDichVu) => {
    getDataByIdPhieuDichVu(idPhieuDichVu)
      .then((response) => {
        setDataWorkDay(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadStaffIsNotAddChiTietNgayLam = (idChiTietNgayLam) => {
    getStaffIsNotAddChiTietNgayLam(idChiTietNgayLam)
      .then((response) => {
        setData_StaffWorking(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductReceiptStaffWorkDay = () => {
    getProductReceiptStaffByIDChiTietNgayLam(
      selectedWorkDayItem?.idChiTietNgayLam
    )
      .then((response) => {
        setData_Staff(
          response?.message?.status === 200 ? response?.message?.data?.data : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isFirstLoad) return;
    loadProductReceiptData();
  }, [page]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadProductReceiptData();
  }, [rowsPerPage, oldSearching]);

  useEffect(() => {
    if (isFirstLoad) return;
    setAddressData((prev) => ({
      ...prev,
      district_id: "",
      ward_id: "",
    }));
    loadDistrictDataByProvinceData(addressData?.province_id);
  }, [addressData?.province_id]);

  useEffect(() => {
    if (isFirstLoad) return;
    setAddressData((prev) => ({
      ...prev,
      ward_id: "",
    }));
    loadWardDataByDistrictData(addressData?.district_id);
  }, [addressData?.district_id]);

  useEffect(() => {
    loadProductDetailData(insertData?.idDichVu);
    loadProductTypeData(insertData?.idDichVu);
    setInsertData({
      ...insertData,
      idChiTietDichVu: "",
      idKieuDichVu: "",
      SoBuoi: 1,
      SoGio: 1,
      SoNguoiDuocChamSoc: 1,
    });
  }, [insertData?.idDichVu]);

  useEffect(() => {
    if (isFirstLoad) return;
    if (dataChiTietDichVu.length <= 0) return;
    const tinhTongTien = () => {
      if (insertData?.idDichVu === 1 || insertData?.idDichVu === 2) {
        const selectedService = dataChiTietDichVu.find(
          (item) => item.idChiTietDichVu === insertData?.idChiTietDichVu
        );
        if (selectedService) {
          const total =
            selectedService.GiaTien * insertData?.SoBuoi * insertData?.SoGio;
          setInsertData({ ...insertData, Tongtien: total });
        } else {
          setInsertData({ ...insertData, Tongtien: 0 });
        }
      } else if (insertData?.idDichVu === 3 || insertData?.idDichVu === 4) {
        const selectedService = dataChiTietDichVu.find(
          (item) => item.idChiTietDichVu === insertData?.idChiTietDichVu
        );
        if (selectedService) {
          let total =
            selectedService.GiaTien * insertData?.SoBuoi * insertData?.SoGio;
          if (insertData?.SoNguoiDuocChamSoc >= 2) {
            total += 0.3 * total * (insertData?.SoNguoiDuocChamSoc - 1);
          }
          setInsertData({ ...insertData, Tongtien: total });
        } else {
          setInsertData({ ...insertData, Tongtien: 0 });
        }
      } else if (insertData?.idDichVu === 5 || insertData?.idDichVu === 6) {
        const selectedService = dataChiTietDichVu.find(
          (item) => item.idChiTietDichVu === insertData?.idChiTietDichVu
        );
        if (selectedService) {
          let total = selectedService.GiaTien;
          if (insertData?.NgayBatDau) {
            const ngay = new Date(insertData?.NgayBatDau).getDay(); // 0 là chủ nhật, 6 là thứ bảy
            if (ngay === 0 || ngay === 6) {
              total *= 1.2; // Tăng 20%
            }
          }
          setInsertData({ ...insertData, Tongtien: total });
        } else {
          setInsertData({ ...insertData, Tongtien: 0 });
        }
      }
    };
    tinhTongTien();
  }, [
    insertData?.NgayBatDau,
    insertData?.SoBuoi,
    insertData?.SoGio,
    insertData?.idChiTietDichVu,
    insertData?.SoNguoiDuocChamSoc,
    insertData?.idKieuDichVu,
  ]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadAddressByCustomer(insertData?.idNguoiDung);
  }, [insertData?.idNguoiDung]);

  useEffect(() => {
    if (isFirstLoad) return;
    if (dataKieuDichVu.length <= 0) return;
    if (insertData?.idDichVu !== 2) return;
    const selectedOption = dataKieuDichVu.find(
      (item) => item.idKieuDichVu === insertData?.idKieuDichVu
    );
    const selectedKey = selectedOption?.tenKieuDichVu;
    const gioPattern = /(\d+)\sgiờ/;
    const ketQua = selectedKey.match(gioPattern);
    if (ketQua && ketQua.length > 1) {
      const soGio = parseInt(ketQua[1]);
      setInsertData({ ...insertData, SoGio: soGio });
    }
  }, [insertData?.idKieuDichVu]);

  useEffect(() => {
    if (isFirstLoad) return;
    loadProductReceiptStaffWorkDay();
    loadStaffIsNotAddChiTietNgayLam(selectedWorkDayItem?.idChiTietNgayLam);
  }, [selectedWorkDayItem?.idChiTietNgayLam]);

  useEffect(() => {
    loadProductData();
    loadProductReceiptData();
    setIsFirstLoad(false);
    loadCustomerData();
    loadProvinceData();
    getCurrentLoginUser();
    loadStaffIsNotAddChiTietNgayLam();
  }, []);

  // --------- End Product Receipt -------- //

  // --------- Start Tab -------- //

  const [currentTab, setCurrentTab] = useState("0");
  const handleChangeTab = (dispatch, newValue) => {
    setCurrentTab(newValue);
  };

  // --------- End Tab -------- //

  return (
    <Grid container>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab
                label="Phiếu dịch vụ"
                value="0"
                disabled={isFirstTabDisabled}
              />
              <Tab
                label="Chi tiết phiếu dịch vụ"
                value="1"
                disabled={!isFirstTabDisabled}
              />
            </TabList>
          </Box>
          <TabPanel value="0">
            <ProductReceiptSearching
              searchData={searchData}
              handleChange={handleChange}
              dataDichVu={dataDichVu}
              handleSearching={handleSearching}
            />
            <ProductReceiptList
              data={productReceiptData}
              page={page}
              setPage={handleChangePage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={handleChangeRowsPerPage}
              handleTinhTrangLabel={handleTinhTrangLabel}
              handleTinhTrangThanhToanLabel={handleTinhTrangThanhToanLabel}
              totalElements={totalElements}
              setSelectedRow={setSelectedRow}
              setOpenCustomerDetail={handleOpenCustomerDetail}
              setOpenDetail={handleOpenDetail}
              setOpenDelete={handleOpenDelete}
              setOpenInsert={handleOpenInsert}
              setOpenEdit={handleOpenEdit}
              setOpenConfirm={handleOpenConfirm}
            />
          </TabPanel>
          <TabPanel value="1">
            <ProductReceiptDetailData
              data_WorkDay={dataWorkDay}
              selectedWorkDayItem={selectedWorkDayItem}
              setSelectedWorkDayItem={setSelectedWorkDayItem}
              dataNhanVien={data_StaffWorking}
              handleChange={handleChange_Staff}
              handleSearching={handleSearching_Staff}
              selectedStaffItem={selectedStaffItem}
              setSelectedStaffItem={setSelectedStaffItem}
              data_Staff={data_Staff}
              handleDeleteStaffWork={handleDeleteStaffWork}
              handleReturn={handleOpenEdit}
            />
          </TabPanel>
        </TabContext>
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
      <CustomerDetail
        selectedRow={selectedRow}
        open={openCustomerDetail}
        setOpen={handleOpenCustomerDetail}
      />
      <ProductReceiptDetail
        selectedRow={selectedRow}
        open={openDetail}
        setOpen={handleOpenDetail}
        handleTinhTrangLabel={handleTinhTrangLabel}
        handleTinhTrangThanhToanLabel={handleTinhTrangThanhToanLabel}
      />
      <ProductReceiptDelete
        open={openDelete}
        setOpen={handleOpenDelete}
        handleDelete={handleDelete}
      />
      <ProductReceiptInsert
        open={openInsert}
        setOpen={handleOpenInsert}
        data={insertData}
        handleChange={handleInsertData}
        handleInsert={handleInsert}
        dataKhachHang={dataKhachHang}
        setOpenAddress={handleOpenAddress}
        dataDichVu={dataDichVu}
        dataChiTietDichVu={dataChiTietDichVu}
        dataDiaChi={dataDiaChi}
        dataKieuDichVu={dataKieuDichVu}
      />
      <Address
        open={openAddress}
        setOpen={handleOpenAddress}
        data={addressData}
        handleInsert={handleInsertAddress}
        handleChange={handleAddressChange}
        dataProvince={dataProvince}
        dataDistrict={dataDistrict}
        dataWard={dataWard}
      />
      <ProductReceiptConfim
        selectedRow={selectedRow}
        open={openConfirm}
        setOpen={handleOpenConfirm}
        handleUpdateTinhTrang={handleUpdateTinhTrang}
      />
    </Grid>
  );
};

export default ProductManager;
