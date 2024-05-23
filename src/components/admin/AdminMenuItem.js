import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CssBaseline,
  ListItemIcon,
  GlobalStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UserIcon from "@mui/icons-material/Person";
import { styled, useTheme } from "@mui/material/styles";
import logo from "../../assets/Logo.png";
import { Link, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

// const ItemShow = ({ text, icon }) => (
//   <ListItem button>
//     <ListItemIcon>{icon}</ListItemIcon>
//     <ListItemText primary={text} />
//   </ListItem>
// );

function AdminMenuItem() {
  const menuItems = [
    {
      to: "/admin/users",
      icon: UserIcon,
      text: "Quản lý nhân viên",
    },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline background={"#FF8227"} />
        <GlobalStyles />
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              overflowX: "hidden",
              background: "#35363a",
              color: "white",
            },
          }}
        >
          <DrawerHeader>
            {open && (
              <img
                src={logo}
                alt="BTaskee Logo"
                style={{ width: "150px", height: "auto" }}
              />
            )}
            <IconButton
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{ color: "orange" }}
            >
              {theme.direction === "ltr" ? (
                open ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )
              ) : open ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {menuItems &&
              menuItems.map((item, index) => (
                <ListItem button component={Link} to={item.to} key={index}>
                  <ListItemIcon>
                    <item.icon style={{ color: "white" }} />{" "}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>
        </Drawer>

        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["transform", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            background: "white !important",
            width: open
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${theme.spacing(7)} + 1px)`, // Đảm bảo rằng AppBar không bị che bởi Drawer
            transform: open
              ? `translateX(${!open ? -drawerWidth : 0}px)`
              : `translateX(${
                  !open ? -`calc(${theme.spacing(7)} + 1px)` : 0
                }px)`,
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{ fontWeight: "700", color: "#0072B8", fontSize: "24px" }}
              >
                {/* Kích hoạt xác thực 2 bước{" "} */}
                Quản lý nhân viên
              </Box>
              <Box
                sx={{
                  fontWeight: "400",
                  fontSize: "13px",
                  display: "flex",
                  // justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box style={{ color: "#979797" }}>
                  {/* {childPage.length > 0 ? "Trang chủ" : ""} */}
                  Trang chủ
                </Box>
                {/* <Box>Kích hoạt xác thực 2 bước</Box> */}
                {/* {Array.isArray(childPage) &&
                  childPage.map((item, index) => (
                    <Box key={index}>&nbsp;/&nbsp;{item}</Box>
                  ))} */}
                &nbsp;
                {/* {childPage.length > 0 ? (
                  <img
                    src={imgVector}
                    style={{ cursor: "pointer" }}
                    onClick={backButton}
                  ></img>
                ) : (
                  ""
                )} */}
              </Box>
            </Box>
            <Typography variant="h6" noWrap>
              Persistent Drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Main
          open={open}
          sx={{
            marginLeft: "0px !important",
            marginTop: `64px`, // Khoảng cách giữa AppBar và Main
          }}
        >
          <Outlet />
        </Main>
      </Box>
    </>
  );
}

export default AdminMenuItem;
