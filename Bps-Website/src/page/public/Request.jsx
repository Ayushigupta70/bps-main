import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function Request() {
  return (
    <Box
      sx={{
        backgroundColor: "#222222",
        width: "100wv",
        minHeight: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4, md: 10, lg: 15 },
        
      }}
    >
      
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Text Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                padding: { xs: 2, md: 3 },
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                maxWidth: "350px",
                margin: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  whiteSpace: "nowrap", // Prevents text from wrapping to the next line
                }}
              >
                Request a Call Back
              </Typography>

              <Typography sx={{ textAlign: "justify" }} variant="body2">
                Would you like to speak to one of our financial advisers over
                the phone? Just submit your details and we’ll be in touch
                shortly. You can also email us if you would prefer.
              </Typography>
            </Box>
          </Grid>

          {/* Form Fields in One Row */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2} alignItems="center">
              {/* First Row - Business Planning & First Name */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: "white", mb: 2 }}>
                  I would like to discuss:
                </Typography>
                <TextField
                  sx={{ backgroundColor: "#fff" }}
                  label="Business Planning"
                  name="business_planning"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ backgroundColor: "#fff", mt: 4 }}
                  label="First Name"
                  name="first_name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Second Row - Phone Number & Submit Button */}
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ backgroundColor: "#fff" }}
                  label="Phone Number"
                  name="phone"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  
            
                }}
              >
            
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: "56px", width: "50%" }} // Adjust height & width
                  >
                    Submit
                  </Button>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      
    </Box>
  );
}

export default Request;
