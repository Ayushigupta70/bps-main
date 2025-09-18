import React from 'react';
import {
  Stack,
  Box,
  Grid,
  Card,
  Typography,
  Chip,
  useTheme,
  Divider,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { BarChart as BarIcon, Assessment, Timeline } from '@mui/icons-material';

const lineData = [
  { name: 'Sun', value: 12 },
  { name: 'Mon', value: 19 },
  { name: 'Tue', value: 15 },
  { name: 'Wed', value: 28 },
  { name: 'Thu', value: 18 },
  { name: 'Fri', value: 24 },
  { name: 'Sat', value: 16 },
];

const barData = [
  { name: 'Jan', value: 35 },
  { name: 'Feb', value: 48 },
  { name: 'Mar', value: 52 },
  { name: 'Apr', value: 29 },
  { name: 'May', value: 41 },
  { name: 'Jun', value: 56 },
];

const pieData = [
  { name: 'Completed', value: 75, increase: 5 },
  { name: 'Pending', value: 15, increase: -2 },
  { name: 'Cancelled', value: 10, increase: 1 },
];

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

const Graph = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h5" fontWeight={700} mb={4}>
        📊 Dashboard Analytics
      </Typography>

      <Grid container rowSpacing={10} columnSpacing={3}>
        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              boxShadow: 6,
              background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <BarIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Quotation & Booking Overview
              </Typography>
            </Stack>

            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Bookings</Typography>
                <Typography variant="h6" fontWeight={700} color="primary.dark">156</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Cancelled</Typography>
                <Typography variant="h6" fontWeight={700} color="error.main">24</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Revenue</Typography>
                <Typography variant="h6" fontWeight={700} color="success.dark">$12,456</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={theme.palette.primary.light} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              boxShadow: 6,
              background: 'linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Assessment color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Order Status
              </Typography>
            </Stack>

            <Box height={220}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box mt={2}>
              {pieData.map((entry, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      width={12}
                      height={12}
                      bgcolor={COLORS[index]}
                      borderRadius="50%"
                    />
                    <Typography variant="body2">{entry.name}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" fontWeight={600}>
                      {entry.value}%
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={entry.increase >= 0 ? 'success.main' : 'error.main'}
                    >
                      {entry.increase >= 0 ? `+${entry.increase}%` : `${entry.increase}%`}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: 6,
              background: 'linear-gradient(to top right, #e0eafc, #cfdef3)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Timeline color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Weekly Orders
                </Typography>
              </Stack>
              <Chip
                label="This Week"
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 2, fontWeight: 500 }}
              />
            </Box>

            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    dot={{ r: 3 }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={theme.palette.primary.light} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Graph;
