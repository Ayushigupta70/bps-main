import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import img1 from "../../assets/images/consulting/img1.jpg";
import img2 from "../../assets/images/consulting/img2.jpg";
import img3 from "../../assets/images/consulting/img3.jpg";
// Data array for images and titles
const consultingData = [
  {
    img: img1,
    title: "Business Strategy",
    cod: "We are a full-service business development group. We build strategies and systems.",
  },
  {
    img: img2,
    title: "Financial Consulting",
    cod: "We provide expert financial advice to help your business grow sustainably.",
  },
  {
    img: img3,
    title: "Marketing Solutions",
    cod: "We create innovative marketing solutions to increase brand visibility and sales.",
  },
];

function Consulting() {
  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 5,
        px: { xs: 2, sm: 4, md: 10, lg: 15 },
      }}
    >
     
        <Grid
          container
          spacing={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Image Cards */}
          {consultingData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 0,
                  position: "relative",
                  overflow: "hidden",
                  
                  
                }}
              >
                {/* Image Container */}
                <Box sx={{ position: "relative", height: 250 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "20%",
                      backgroundColor: "rgba(95, 95, 246, 0.87)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: "white",
                      padding: 1,
                      transition: "height 0.3s ease-in-out",
                      "&:hover": {
                        height: "100%",
                      },
                    }}
                    className="overlay"
                  >
                    
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 2,
                      }}
                      className="title"
                    >
                      {item.title}
                    </Typography>
                
                    <Box
                      sx={{
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        position: "absolute",
                        width: "80%",
                        textAlign: "center",
                        zIndex: 1,
                        bottom: "20%",
                        ".overlay:hover &": {
                          opacity: 1, 
                        },
                      }}
                      className="description"
                    >
                      <Typography variant="body2">{item.cod}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      
    </Box>
  );
}

export default Consulting;
