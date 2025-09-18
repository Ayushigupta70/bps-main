import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { industryData } from "../../data/industryData";

function Industry() {
 

  return (
    <Box
      sx={{
        backgroundColor: "#F2F2F2",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 3,
        px: { xs: 2, sm: 4, md: 10, lg: 15 },
      }}
    >
      
        {/* Section Title */}
        <Typography
          sx={{ color: "#002E5B", fontSize: "40px", mb: 3 }}
          variant="h5"
        >
          Industries
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {industryData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {/* Industry Box */}
              <Box
                sx={{
                  p: 2,
                  textAlign: "justify",
                  
                 
                }}
                
              >
            
                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description (Visible only when clicked) */}
                
                  <Typography
                    sx={{
                      fontSize: "14px",
                      mt: 1,
                    }}
                  >
                    {item.cod}
                  </Typography>
        
              </Box>
            </Grid>
          ))}
        </Grid>
      
    </Box>
  );
}

export default Industry;
