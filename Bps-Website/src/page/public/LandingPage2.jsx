import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import warehouseImg from "../../assets/image1/warehouse.png";
import truckImg from "../../assets/image1/truck2.jpg";
import portImg from "../../assets/image1/port.jpg";
import WelcomeSection from "../home/WelcomeSection";

const sections = [
  {
    image: warehouseImg,
    heading: "Deliver the Goods on Time",
    subtext: "Over 100+ acres of interior warehouse space.",
    gradient: "linear-gradient(45deg, #1E3A8A, #3B82F6)",
  },
  {
    image: truckImg,
    heading: "Helping Companies",
    subtext: "Efficient & safe transportation solutions.",
    gradient: "linear-gradient(45deg, #991B1B, #EF4444)",
  },
  {
    image: portImg,
    heading: "Handling Fragile Goods",
    subtext: "State-of-the-art infrastructure & equipment.",
    gradient: "linear-gradient(45deg, #166534, #22C55E)",
  },
];

function LandingPage2() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "white",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          backgroundImage: `url(${warehouseImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "4rem" },
              textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
            }}
          >
            Logistics Excellence
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              mt: 2,
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            Delivering reliable solutions for all your transportation needs
          </Typography>
          {/* <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              bgcolor: "#3B82F6",
              "&:hover": { bgcolor: "#2563EB" },
              px: 4,
              py: 1.5,
            }}
          >
            Get Started
          </Button> */}
        </Container>
      </Box>


      
      <WelcomeSection />
      {/* Features Section */}
      <Container  sx={{ backgroundColor: "white", py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center">
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  position: "relative",
                  height: "400px",
                  borderRadius: 3,
                  backgroundColor: "white",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    
                  },
                }}
              >
                <Box
                  component="img"
                  src={section.image}
                  alt={section.heading}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(80%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: section.gradient,
                    opacity: 0.7,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    p: 3,
                    color: "white",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                    }}
                  >
                    {section.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.1rem" } }}
                  >
                    {section.subtext}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(45deg, #1E3A8A, #3B82F6)",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Ready to Streamline Your Logistics?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#1E3A8A",
              "&:hover": { bgcolor: "#E5E7EB" },
              px: 4,
              py: 1.5,
            }}
          >
            Contact Us Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage2;
