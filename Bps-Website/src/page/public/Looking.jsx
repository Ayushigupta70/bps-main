import { Box, Button, Grid, Typography, Container } from "@mui/material";
import React from "react";

function Looking() {
  return (
    <Box sx={{ backgroundColor: "yellow", py: 2 }}>
      
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            
          }}
        >
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Looking for a first-class career consultant?
              </Typography>
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Button sx={{backgroundColor:"#002e5b",borderRadius:"0"}} variant="contained" >
              Get a quote
            </Button>
          </Grid>
        </Grid>
      
    </Box>
  );
}

export default Looking;
