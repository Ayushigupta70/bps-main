import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function Advisory() {
  return (
    <Box sx={{ backgroundColor: "white", py: 5, mx: 2 }}> {/* Added margin on left & right */}
      <Grid
        
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} md={8}> {/* Adjust width for better readability */}
          {/* Title */}
          <Typography variant="h5" fontWeight="bold">
            Advisory Services Based On Proven Expertise
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              lineHeight: 1.5,
              textAlign: "center",
              mx: { xs: 2, sm: 6, md: 13 }, // Responsive margins
            }}
          >
            Spirale HR Solutions Pvt. Ltd. is an executive search firm that
            specializes in partnering with engineering and technology
            companies to build world-class management teams. We provide expert
            advice based on years of sector specialism to help transform
            companies. We partner with our customers to create executive
            search processes that help them identify, qualify, and attract the
            best talent from across India. As an active part of the technology
            community, we believe in building long-term relationships with
            both companies and candidates, based on trust and transparency.
            Spirale HR Solutions Pvt. Ltd. stands out as an executive search
            firm where customers receive hands-on, practical advice from
            search professionals with deep experience in the technology
            sector. We work with engineering, software technology, and more
            across India.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Advisory;
