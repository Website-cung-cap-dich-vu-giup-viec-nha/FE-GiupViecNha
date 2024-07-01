import { Box, Grid, Tab } from "@mui/material";
import ThongKeGioView from "../ThongKeGioView";
import ThongKeView from "../ThongKeView";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useCallback, useEffect, useState } from "react";

const ThongKe = ({ setPageName, setBreadCrumb }) => {
  const setPageNameCallback = useCallback(() => setPageName(""), [setPageName]);
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb([]),
    [setBreadCrumb]
  );
  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);
  const [currentTab, setCurrentTab] = useState("0");
  const handleChangeTab = (dispatch, newValue) => {
    setCurrentTab(newValue);
  };
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
                label="Thống kê dịch vụ"
                value="0"
              />
              <Tab
                label="Thống kê nhân viên"
                value="1"
              />
            </TabList>
          </Box>
          <TabPanel value="0">
            <ThongKeView />
          </TabPanel>
          <TabPanel value="1">
            <ThongKeGioView />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item xs={0.2} sm={0.2} xl={0.2}>
        {" "}
      </Grid>
    </Grid>
  );
};

export default ThongKe;
