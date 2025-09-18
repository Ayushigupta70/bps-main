import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Readyto = () => {
  return (
    <Box
      sx={{
        py: 4,
        bgcolor: "#1976D2",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Ready to Optimize Your Logistics?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#FFC107",
            color: "black",
            "&:hover": { bgcolor: "#FFB300" },
            px: 4,
            py: 1.5,
          }}
        >
          Request a Quote
        </Button>
      </Container>
    </Box>
  );
};

export default Readyto;
