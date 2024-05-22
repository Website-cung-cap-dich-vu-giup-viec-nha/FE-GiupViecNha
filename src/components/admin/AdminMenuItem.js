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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UserIcon from "@mui/icons-material/Person";
import { styled, useTheme } from "@mui/material/styles";
import logo from "../../assets/Logo.png";
import { Link, Outlet } from "react-router-dom";

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
              alt="Sawaco Logo"
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
      <Main open={open} sx={{ marginLeft: "0px !important" }}>
        <Outlet />
      </Main>
    </Box>
  );
}

export default AdminMenuItem;
