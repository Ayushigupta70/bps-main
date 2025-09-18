import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Air from "../../assets/image1/icon-img.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightIcon from "@mui/icons-material/Flight";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const features = [
  { icon: <LocationOnIcon />, label: "Global Locations" },
  { icon: <FlightIcon />, label: "Transnational Cargos" },
  { icon: <TrackChangesIcon />, label: "Computerized Tracking" },
  { icon: <LocalShippingIcon />, label: "Safety of Delivery" },
];

const Global = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100Wh",
        height: { xs: 400, md: 450 },
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Air})`,
        backgroundSize: "cover",
        backgroundPositionY: "Top center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      
        color: "white",
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                {React.cloneElement(feature.icon, {
                  sx: { fontSize: 40, mb: 1 },
                })}
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", md: "1.1rem" }, letterSpacing: 1, mt: 1 }}
                >
                  {feature.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Global;