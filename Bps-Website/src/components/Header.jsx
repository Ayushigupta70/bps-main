import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <a href="https://dtlogistics.wpengine.com/">
            <img
              src="https://dtlogistics.wpenginepowered.com/wp-content/themes/logistics/images/logo.png"
              alt="Logistics"
              style={{ height: 50 }}
            />
          </a>
        </Box>

        {/* Contact Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">
            Want a transport? <br /> Call us now
          </Typography>
          <Typography variant="h6">(01) 114 336 321</Typography>
        </Box>

        {/* Navigation Menu Button (For Mobile) */}
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
