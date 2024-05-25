import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import StaffSearching from "./components/StaffSearching";
import StaffList from "./components/StaffList";

const Users = ({ setPageName, setBreadCrumb }) => {
  // eslint-disable-next-line
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsCount, setRowsCount] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [oldSearching, setOldSearching] = useState("");
  const setPageNameCallback = useCallback(
    () => setPageName("Quản lý nhân viên"),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb(["Nhân viên"]),
    [setBreadCrumb]
  );

  const handleChange = (event) => {
    setSearchData(event.target.data);
  };
  
  const handleSearching = () => {};
  
  const handleDownload = () => {};

  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);
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
          setPage={setPage}
          rowsCount={rowsCount}
          setRowsCount={setRowsCount}
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
