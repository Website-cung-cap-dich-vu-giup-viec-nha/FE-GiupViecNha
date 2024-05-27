import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import StaffSearching from "./components/StaffSearching";
import StaffList from "./components/StaffList";
import { getStaff } from "../../../api/admin/StaffAPI";
import * as XLSX from "xlsx";

const Users = ({ setPageName, setBreadCrumb }) => {
  // eslint-disable-next-line
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [oldSearching, setOldSearching] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const setPageNameCallback = useCallback(
    () => setPageName("Quản lý nhân viên"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Nhân viên"]),
    [setBreadCrumb]
  );

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
    setIsFirstLoad(false);
    loadStaffTable();
  }, []);

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
    }
  }, [downloadData]);
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
          oldSearching={oldSearching}
        />
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
    </Grid>
  );
};

export default Users;
