import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UsersSearching from "./components/Searching";

const Users = ({ setPageName, setBreadCrumb }) => {
  // eslint-disable-next-line
  const [searchData, setSearchData] = useState({});
  useEffect(() => {
    setPageName("Quản lý nhân viên");
    setBreadCrumb(["Nhân viên"]);
  }, []);
  return (
    <Grid container>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        <UsersSearching searchData={searchData} />
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
      <Grid item xs={11.6} sm={11.6} xl={11.6}>
        {/* Hiển thị bảng ở đây */}
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
    </Grid>
  );
};

export default Users;
