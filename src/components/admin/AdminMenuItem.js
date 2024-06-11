import React, { useEffect, useState } from "react";
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
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UserIcon from "@mui/icons-material/Person";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { styled, useTheme } from "@mui/material/styles";
import logo from "../../assets/Logo.png";
import { Link, useNavigate, Outlet } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Cookies from "js-cookie";
import { getProfile, logout } from "../../api/admin/AuthAPI";
import { config } from "../../config";

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

const AdminMenuItem = ({ pageName, breadCrumb }) => {
  const menuItems = [
    {
      to: "/admin/users",
      icon: UserIcon,
      text: "Quản lý nhân viên",
    },
    {
      to: "/admin/productmanager",
      icon: ReceiptIcon,
      text: "Quản lý phiếu dịch vụ",
    },
    {
      to: "/admin/calendar",
      icon: ReceiptIcon,
      text: "Lịch làm việc",
    },
  ];
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        Cookies.remove("token");
        navigate("/dangnhap");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfile()
      .then((response) => {
        setUserProfile(response.message.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <Link to="/admin">
                <img
                  src={logo}
                  alt="BTaskee Logo"
                  style={{ width: "150px", height: "auto" }}
                />
              </Link>
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
              : `calc(100% - ${theme.spacing(7)} - 2px)`, // Đảm bảo rằng AppBar không bị che bởi Drawer
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
                {pageName.length > 0 ? pageName : ""}
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
                  {breadCrumb.length > 0 ? "Trang chủ" : ""}
                </Box>
                {Array.isArray(breadCrumb) &&
                  breadCrumb.map((item, index) => (
                    <Box style={{ color: "#979797" }} key={index}>
                      &nbsp;/&nbsp;{item}
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end", // Căn văn bản về phía bên phải
                  marginRight: "8px",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#979797" }}
                  align="right"
                >
                  {userProfile &&
                  userProfile.position &&
                  userProfile.position.tenChucVu &&
                  userProfile.position.tenChucVu.length > 0
                    ? userProfile.position.tenChucVu
                    : ""}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#333333" }}
                  align="right"
                >
                  {userProfile &&
                  userProfile.user &&
                  userProfile.user.name &&
                  userProfile.user.name.length > 0
                    ? userProfile.user.name
                    : ""}
                </Typography>
              </Box>
              <Avatar
                alt={userProfile && userProfile.user && userProfile.user.name}
                src={
                  userProfile &&
                  userProfile.user &&
                  `${config.apiBaseUrl}/${userProfile.user.Anh}`
                }
                sx={{ width: 40, height: 40 }}
              />
              <IconButton size="small" onClick={handleClick}>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/hoso" onClick={handleClose}>
                  Thông tin nhân viên
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Box>
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
};

export default AdminMenuItem;
