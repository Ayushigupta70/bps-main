import { Paper, Typography, TextField, Button, Box } from '@mui/material';

function TrackingCard() {
  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>Track Shipment</Typography>
      <Box display="flex" gap={2}>
        <TextField 
          fullWidth
          label="Tracking Number"
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary">
          Track
        </Button>
      </Box>
    </Paper>
  );
}