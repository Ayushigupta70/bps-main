// src/components/ContentSection.js
import React from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';

const ContentSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ color: '#003087', mb: 3 }}>
            About DT Logistics
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            DT Logistics is a premier logistics provider dedicated to delivering efficient 
            and reliable transportation solutions. With years of experience in the industry, 
            we pride ourselves on our commitment to customer satisfaction and operational excellence.
          </Typography>
          
          <Box sx={{ backgroundColor: '#f5f5f5', p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#003087', mb: 2 }}>
              Our Mission
            </Typography>
            <Typography variant="body1">
              To provide innovative logistics solutions that exceed our customers' expectations 
              while maintaining the highest standards of safety and reliability.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ color: '#003087', mb: 2 }}>
            Our Values
          </Typography>
          <Typography variant="body1">
            - Integrity: We operate with honesty and transparency<br />
            - Excellence: We strive for perfection in every delivery<br />
            - Innovation: We embrace new technologies and methods<br />
            - Teamwork: We succeed through collaboration
          </Typography>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#003087', p: 3, color: '#fff', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Quick Facts
            </Typography>
            <Typography variant="body2">
              - Founded: 1995<br />
              - Headquarters: USA<br />
              - Employees: 500+<br />
              - Vehicles: 200+<br />
              - Annual Deliveries: 1M+
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentSection;