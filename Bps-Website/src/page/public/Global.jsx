import { Box, Container, Grid, Typography } from "@mui/material";
import bg from "../../assets/images/global/img1.jpg";
import React from "react";

function Global() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        height: { xs: "auto", md: "30vh" }, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 3,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            {/* Title */}
            <Typography sx={{ color: "white" }} variant="h5" fontWeight="bold">
              We Are a Global Leader in Recruiting & Staffing
            </Typography>

            {/* Description */}
            <Typography sx={{ color: "white", mt: 2, lineHeight: 1.6 }}>
              We believe in people and their amazing potential.
            </Typography>

            <Typography sx={{ color: "white", mt: 0, lineHeight: 1.6 }}>
              Whether you're looking for a job, seeking hires, or thinking about
              working with us, you've come to the right place.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Global;
