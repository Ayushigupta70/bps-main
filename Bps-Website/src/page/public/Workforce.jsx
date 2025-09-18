import bf from "../../assets/images/workforce/img1.jpg";
import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

function Workforce() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bf})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "50%",
        // minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 }, // Adds padding for better spacing
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* First Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: { xs: 2, md: 3 },

                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                maxWidth: "400px",
                margin: "auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "yellow", fontWeight: "bold" }}
              >
                Workforce Solutions
              </Typography>
              <Typography>
                SHSPL flexible partnership models allow us to be responsive to
                your unique needs.
              </Typography>
              <Button variant="contained" color="primary">
                See More
              </Button>
            </Box>
          </Grid>

          {/* Second Section (Optional) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: { xs: 2, md: 3 },

                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                maxWidth: "400px",
                margin: "auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "yellow", fontWeight: "bold" }}
              >
                Working with SHSPL
              </Typography>
              <Typography>
                Interested in career opportunities with SHSPL? Hear how it works
                and what you can expect.
              </Typography>
                          <Button sx={{color:"#002E5B"} } variant="contained">
                Begin here
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Workforce;
