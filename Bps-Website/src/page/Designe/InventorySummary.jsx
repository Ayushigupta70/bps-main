import { Card, CardContent, Typography, Grid } from '@mui/material';

function InventorySummary() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Inventory Summary</Typography>
        <Grid container spacing={3}>
          {['Total Items', 'In Stock', 'Low Stock', 'Out of Stock'].map((item) => (
            <Grid item xs={6} key={item}>
              <Typography variant="body2">{item}</Typography>
              <Typography variant="h4">1,234</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}