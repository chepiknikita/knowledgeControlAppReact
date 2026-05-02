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
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import "./Header.css";
import urlService from "../../api/serverUrl/urlService";
import { useAuth } from "../../features/auth/context/AuthContext";

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

  const logoGradient = {
    background: "linear-gradient(135deg, #7C3AED 0%, #E11D48 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <AppBar position="sticky" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 60 } }}>
          {/* Desktop logo */}
          <Tooltip title="Do you know?">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                fontSize: "1.15rem",
                textDecoration: "none",
                ...logoGradient,
              }}
            >
              DYK
            </Typography>
          </Tooltip>

          {/* Mobile hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#6D28D9" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: "12px",
                    border: "1px solid #E4E4E7",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    minWidth: 160,
                    mt: 1,
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={{ textDecoration: "none", color: "#18181B", width: "100%" }}
                  >
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
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
              fontWeight: 800,
              letterSpacing: ".3rem",
              textDecoration: "none",
              ...logoGradient,
            }}
          >
            DYK
          </Typography>

          {/* Desktop nav links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} className="navLink">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1,
                    color: "#71717A",
                    display: "block",
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    px: 1.5,
                    borderRadius: "10px",
                    "&:hover": {
                      color: "#6D28D9",
                      backgroundColor: "#EDE9FE",
                    },
                  }}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* Right side: avatar or login button */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Меню">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0.5,
                      border: "2px solid #E4E4E7",
                      borderRadius: "50%",
                      transition: "border-color 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        borderColor: "#7C3AED",
                        boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.12)",
                      },
                    }}
                  >
                    <Avatar
                      alt="user-avatar"
                      src={urlService.getImageUrl(user?.avatar ?? "")}
                      sx={{ width: 34, height: 34 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "48px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: "12px",
                        border: "1px solid #E4E4E7",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                        minWidth: 180,
                        overflow: "hidden",
                      },
                    },
                  }}
                >
                  {user?.login && (
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="caption" sx={{ color: "#71717A", display: "block" }}>
                        Аккаунт
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#18181B" }}>
                        {user.login}
                      </Typography>
                    </Box>
                  )}
                  {user?.login && <Divider sx={{ borderColor: "#F4F4F5" }} />}
                  {settings.map((setting) => {
                    if (setting.path === "#") {
                      return (
                        <MenuItem
                          key={setting.name}
                          onClick={setting.onClick}
                          sx={{
                            fontSize: "14px",
                            color: "#DC2626",
                            fontWeight: 500,
                            "&:hover": { backgroundColor: "#FEF2F2" },
                          }}
                        >
                          {setting.name}
                        </MenuItem>
                      );
                    }

                    return (
                      <NavLink
                        key={setting.name}
                        to={setting.path}
                        className="navLink"
                      >
                        <MenuItem
                          onClick={handleCloseUserMenu}
                          sx={{
                            fontSize: "14px",
                            color: "#18181B",
                            fontWeight: 500,
                            "&:hover": { backgroundColor: "#EDE9FE", color: "#6D28D9" },
                          }}
                        >
                          {setting.name}
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
                  variant="contained"
                  color="primary"
                  sx={{ px: 2.5, py: 0.75, fontSize: 14 }}
                >
                  Войти
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
