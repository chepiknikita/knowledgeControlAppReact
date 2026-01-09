import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

export default function TheHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const guestSettings = [
    {
      name: "Войти",
      path: "/login",
      onClick: handleCloseUserMenu,
    },
    {
      name: "Зарегистрироваться",
      path: "/signup",
      onClick: handleCloseUserMenu,
    },
  ];

  const userSettings = [
    {
      name: "Личный кабинет",
      path: "/personal-profile",
      onClick: handleCloseUserMenu,
    },
    {
      name: "Выйти",
      path: "#",
      onClick: handleLogout,
    },
  ];

  const questPages = [
    {
      name: "Главная",
      path: "/",
    },
  ];
  const userPages = [
    {
      name: "Главная",
      path: "/",
    },
    {
      name: "Конструктор",
      path: "/constructor",
    },
  ];

  const settings = isAuthenticated ? userSettings : guestSettings;
  const pages = isAuthenticated ? userPages : questPages;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Do you know?">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DYK
            </Typography>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path}>{page.name}</NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DYK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} className="navLink">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                    fontSize: 16,
                  }}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Меню">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user-avatart" src={undefined} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (setting.path === "#") {
                      return (
                        <MenuItem key={setting.name} onClick={setting.onClick}>
                          <Typography
                            sx={{ textAlign: "center", fontSize: "14px" }}
                          >
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      );
                    }

                    return (
                      <NavLink
                        key={setting.name}
                        to={setting.path}
                        className="navLink"
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography
                            sx={{ textAlign: "center", fontSize: "14px" }}
                          >
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      </NavLink>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={NavLink}
                  to="/login"
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Войти
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Регистрация
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
