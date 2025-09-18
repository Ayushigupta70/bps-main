import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "./TopBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/employer", label: "Order" },
  { to: "/login", label: "Login" },
];

const PublicAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolling(currentScroll > 1);
      setShowHeader(true);
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1200,
          background: "linear-gradient(90deg, #007BFF 0%, #0056b3 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TopBar scrolling={scrolling} />
        <Box>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: {
                xs: "40px",
                sm: "45px",
                md: "50px",
              },
              py: 0.5,
              px: { xs: 1, sm: 2, md: 3 },
              backgroundColor: "transparent",
              boxShadow: showHeader
                ? "0 2px 6px rgba(34, 95, 208, 0.15)"
                : "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {/* Logo when scrolling */}
            {scrolling && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease-in-out",
                  opacity: showHeader ? 1 : 0,
                  height: showHeader ? "auto" : 0,
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: isSmallScreen ? "1.6rem" : "1.8rem",
                    color: "#fff",
                    fontWeight: "bold",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                  }}
                >
                  B&nbsp;P&nbsp;S
                </Typography>
              </Box>
            )}

            {/* Desktop Nav Links */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to;

                  return (
                    <Typography
                      key={index}
                      onClick={() => {
                        navigate(link.to);
                        window.scrollTo(0, 0);
                      }}
                      sx={{
                        cursor: "pointer",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: isActive ? "#FFD700" : "white",
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          width: isActive ? "100%" : "0%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: isActive ? "#FFD700" : "transparent",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover:after": {
                          width: "100%",
                          backgroundColor: "#FFA500",
                        },
                        "&:hover": {
                          color: "#FFA500",
                        },
                      }}
                    >
                      {link.label}
                    </Typography>
                  );
                })}
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: "white" }}
              >
                <MenuIcon fontSize="medium" />
              </IconButton>
            )}
          </Toolbar>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {/* BPS Header in Drawer */}
        <Box sx={{ backgroundColor: "blue", padding: 2, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            B&nbsp;P&nbsp;S
          </Typography>
        </Box>
        <Divider />

        <List sx={{ width: 250 }}>
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.to;

            return (
              <ListItem
                key={index}
                onClick={() => {
                  navigate(link.to);
                  window.scrollTo(0, 0);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText>
                  <Typography
                    sx={{
                      color: isActive ? "#FFD700" : "#000",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#FFA500",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default PublicAppBar;
