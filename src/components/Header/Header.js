import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../Firebase/firebase";
import HeaderOption from "./HeaderOption";
import Stack from "@mui/material/Stack";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ForumIcon from "@mui/icons-material/Forum";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "15%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "1112px",
    },
  },
}));

export default function Header({
  chatOpen,
  setChatOpen,
  notificationsOpen,
  setNotificationsOpen,
  leftMenuOpen,
  setLeftMenuOpen,
  messages,
}) {
  const dispatch = useDispatch();
  const [badgeCountMessages, setBadgeCountMessages] = useState(0);
  const [badgeCountNotifications, setBadgeCountNotifications] = useState(0);

  useEffect(() => {
    setBadgeCountNotifications(1);
  }, []);

  useEffect(() => {
    setBadgeCountMessages(messages.length);
  }, [messages]);

  const handleChatOpen = () => {
    setChatOpen(!chatOpen);
    setBadgeCountMessages(0);
  };

  const handleNotificationsOpen = () => {
    setNotificationsOpen(!notificationsOpen);
    setBadgeCountNotifications(0);
  };

  const handleLeftMenuOpen = () => {
    setLeftMenuOpen(!leftMenuOpen);
  };

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} to={"/homepage"} component={NavLink}>
        Profile
      </MenuItem>
      <MenuItem onClick={logoutOfApp}>LOG OUT</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleChatOpen}>
        <IconButton size="large"
                    aria-label="show 4 new mails"
                    color="inherit"

        >
          <Badge badgeContent={badgeCountMessages} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "cadetblue" }}>
        <Toolbar>
          <IconButton
            onClick={handleLeftMenuOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Stack spacing={1} direction="row">
              <IconButton
                className="item"
                to={"/homepage"}
                component={NavLink}
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                className="item"
                to={"/messages"}
                component={NavLink}
                color="inherit"
              >
                <ForumIcon />
              </IconButton>
              <IconButton
                className="item"
                variant="contained"
                to={"/feed"}
                component={NavLink}
                color="inherit"
              >
                <DynamicFeedIcon />
              </IconButton>
            </Stack>
            <IconButton
              onClick={handleChatOpen}
              size="large"
              aria-label="show 1 new mails"
              color="inherit"
            >
              <Badge badgeContent={badgeCountMessages} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleNotificationsOpen}
              size="large"
              aria-label="show 1 new notifications"
              color="inherit"
            >
              <Badge badgeContent={badgeCountNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <HeaderOption avatar={true} onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </HeaderOption>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
