import React from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Box,
  Container,
} from "@mui/material";
import imageSrc from "../../assets/images/carrer/img1.jpg";

function Career() {
  return (
    <>
      <Grid
        container
        spacing={5}
        mt={{ xs: 12, md: 5 }}
        sx={{ padding: { xs: 2, md: 10 },
        px: { xs: 2, sm: 4, md: 10, lg: 15 } }}
        
      >
        {/* Breadcrumbs Section */}
        <Grid item xs={12}>
          <Breadcrumbs sx={{ color: "#777777" }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="#777777">Career</Typography>
          </Breadcrumbs>
        </Grid>

        {/* Career Heading */}
        <Grid item xs={12}>
          <Typography variant="h3" fontWeight="bold">
            Career
          </Typography>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={4}>
          <img
            src={imageSrc}
            alt="Career"
            style={{ width: "100%", borderRadius: "0px" }}
          />
        </Grid>

        {/* Text and Button Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Benefits and rewards
          </Typography>
          <Typography variant="body1" paragraph>
            The Spirale HR Solutions Pvt. Ltd. came up with combined
            cutting-edge technology with real-world practicality. Everyone knew
            that the systems had to be updated, the real challenge was updating
            them without disrupting the whole organization in a negative way.
            The solution was to introduce proper workload management done
            through computers while providing mobile platforms to the
            stakeholders.
          </Typography>
          <Typography variant="body1" paragraph>
            This allowed the workers to be involved in the job instead of
            feeling like they had been made redundant by technology.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#002b5b", color: "white", mt: 2 }}
          >
            Apply now &gt;
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          height: { xs: "auto", md: "75px" }, // Auto height for smaller screens
          bgcolor: "#FFC107",
          display: "flex",
          alignItems: "center",
          paddingY: { xs: 2, md: 0 }, // Add padding for smaller screens
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack items on small screens
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" }, // Center text for small screens
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "16px", sm: "20px", md: "24px" } }} // Responsive font size
          >
            Looking for a First-Class Career Consultant?
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              fontWeight: "bold",
              bgcolor: "#002e5b",
              borderRadius: "0px",
              marginTop: { xs: 2, sm: 0 }, // Add margin on small screens
              "&:hover": {
                color: "#002e5b",
                bgcolor: "#FFC107",
                border: "2px solid white",
              },
            }}
          >
            Get a Quote
          </Button>
        </Container>
        {/* <DeliveryStepper/> */}
      </Box>
    </>
  );
}

export default Career;
