import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Block } from "@mui/icons-material";

function TopBar({ scrolling }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (scrolling) return null; // Hide on scroll

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        transition: "all 0.1s ease-in-out",
        boxShadow: "none",
        minHeight: "36px",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 1,
            sm: 2,
            md: 6,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 0.5,
            minHeight: "36px",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h1"
            sx={{
              fontSize: isMobile ? "1.4rem" : "1.6rem",
              color: "blue",
              fontWeight: 700,
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            BPS
          </Typography>

          {/* Phone Info */}
          {/* <Box sx={{ display: {md:"Block",xs:"flex" }, alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "blue", p: 0.5 }}>
              <LocalPhoneIcon fontSize="small" />
            </IconButton>
            <Box sx={{ lineHeight: 1 , display: {md:"block" },}}>
              <Typography
                variant="caption"
                sx={{ color: "black", fontWeight: 600, fontSize: "0.7rem" }}
              >
                CALL US NOW
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "blue", fontWeight: 700, fontSize: "0.75rem" }}
              >
                +91-6386963004
              </Typography>
            </Box> */}

          {/* Phone Info */}
          <Box
            sx={{
              display: { md: "flex",xs: "flex",  },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton sx={{ color: "blue", p: 0.5 }}>
              <LocalPhoneIcon fontSize="small" />
            </IconButton>

            <Box
              sx={{ lineHeight: 1, display: "flex", flexDirection: {sx:"row", md:"column"} }}
            >
              <Typography
                variant="caption"
                sx={{ display:{xs:"none" ,  md: "block" }, color: "black", fontWeight: 600, fontSize: "0.7rem" }}
              >
                CALL US NOW
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "blue", fontWeight: 700, fontSize: "0.75rem" }}
              >
                +91-6386963004
              </Typography>
            </Box>
          </Box>

          {/* </Box> */}
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default TopBar;
