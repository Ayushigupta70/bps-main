import React, { useEffect } from 'react';
import {
    Typography,
    Paper,
    Grid,
    Card,
    Box,
    Avatar,
    useTheme,
    TableCell,
    TableRow,
    Table,
    ListItem,
    ListItemText,
    TableHead,
    LinearProgress,
    TableBody,
    List,
} from '@mui/material';
import Graph from './Graph';

// Icons
import { ReactComponent as CustomIcon } from '../../../src/assets/station/mng1.svg';
import { ReactComponent as WrongIcon } from '../../../src/assets/station/wrong.svg';
import { ReactComponent as ActiveIcon } from '../../../src/assets/station/active.svg';
import { ReactComponent as RsIcon } from '../../../src/assets/station/rs.svg';
import { ReactComponent as CustomerIcon } from '../../../src/assets/station/driver.svg';
import { ReactComponent as TruckIcon } from '../../../src/assets/truck.svg';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    bookingRequestCount,
    activeBookingCount,
    cancelledBookingCount,
    revenueList,
} from '../../features/booking/bookingSlice';
import { getAvailableVehiclesCount } from '../../features/vehicle/vehicleSlice';
import { fetchavailableCount } from '../../features/Driver/driverSlice';
import { fetchActiveCustomerCount } from '../../features/customers/customerSlice';

const cardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 3,
    height: '100%',
    borderRadius: 4,
    background: 'linear-gradient(145deg, #f4f6f8, #ffffff)',
    boxShadow: 6,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 10,
    },
};


const Dashboard = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const {
        requestCount,
        activeDeliveriesCount,
        cancelledDeliveriesCount,
        totalRevenue,
    } = useSelector(state => state.bookings);

    const { availablecount } = useSelector(state => state.vehicles);
    const { availableCount } = useSelector(state => state.drivers);
    const { activeCount } = useSelector(state => state.customers);

    useEffect(() => {
        dispatch(bookingRequestCount());
        dispatch(activeBookingCount());
        dispatch(cancelledBookingCount());
        dispatch(revenueList());
        dispatch(getAvailableVehiclesCount());
        dispatch(fetchActiveCustomerCount());
        dispatch(fetchavailableCount());
    }, [dispatch]);

    const summaryData = [
        {
            title: 'Booking Requests',
            value: requestCount,
            icon: <CustomIcon style={{ width: 36, height: 36 }} />,
        },
        {
            title: 'Active Deliveries',
            value: activeDeliveriesCount,
            icon: <ActiveIcon style={{ width: 36, height: 36 }} />,
        },
        {
            title: 'Total Cancelled',
            value: cancelledDeliveriesCount,
            icon: <WrongIcon style={{ width: 36, height: 36 }} />,
        },
        {
            title: 'Total Revenue',
            value: `₹ ${totalRevenue?.toLocaleString() || 0}`,
            icon: <RsIcon style={{ width: 36, height: 36 }} />,
        },
        {
            title: 'Customers',
            value: activeCount,
            icon: <CustomerIcon style={{ width: 64, height: 64 }} />,
        },
        {
            title: 'Vehicles Available',
            value: availablecount,
            icon: <TruckIcon style={{ width: 64, height: 64 }} />,
        },
        {
            title: 'Drivers Available',
            value: availableCount,
            icon: <CustomerIcon style={{ width: 64, height: 64 }} />,
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" fontWeight="bold" mb={4}>
                Dashboard Overview
            </Typography>

            {/* First Row - 4 Summary Cards */}
            <Grid container rowSpacing={10} columnSpacing={3} sx={{ mb: 10 }}>
                {summaryData.slice(0, 4).map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card sx={cardStyles}>
                            <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                                {item.icon}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {item.title}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {item.value}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            {/* Second Row - 3 Larger Cards */}
            <Grid container rowSpacing={10} columnSpacing={3} sx={{ mb: 10 }}>
                {summaryData.slice(4).map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card sx={cardStyles}>
                            <Avatar sx={{ bgcolor: 'secondary.light', width: 80, height: 80 }}>
                                {item.icon}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {item.title}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {item.value}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle2">📦 Shipments Today</Typography>
                        <Typography variant="h5" fontWeight="bold">142</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle2">🚚 In Transit</Typography>
                        <Typography variant="h5" fontWeight="bold" color="warning.main">38</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle2">💰 Revenue This Month</Typography>
                        <Typography variant="h5" fontWeight="bold" color="success.main">₹1.2 Lakh</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle2">🧾 New Quotations</Typography>
                        <Typography variant="h5" fontWeight="bold">26</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">📊 Delivery Status</Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography>On-Time: 82%</Typography>
                    <LinearProgress variant="determinate" value={82} color="success" />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography>Delayed: 12%</Typography>
                    <LinearProgress variant="determinate" value={12} color="warning" />
                </Box>
            </Card>

            <Card sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">📅 Today’s Schedule</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Delhi to Mumbai - 9:00 AM" secondary="Dispatched" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Jaipur to Patna - 11:30 AM" secondary="Pending Pickup" />
                    </ListItem>
                </List>
            </Card>

            <Card sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">📍 Top Routes</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Route</TableCell>
                            <TableCell align="right">Shipments</TableCell>
                            <TableCell align="right">Success %</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Delhi → Mumbai</TableCell>
                            <TableCell align="right">120</TableCell>
                            <TableCell align="right">96%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Chennai → Kolkata</TableCell>
                            <TableCell align="right">95</TableCell>
                            <TableCell align="right">93%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card> */}


            {/* Graph Section */}
            <Paper elevation={3} sx={{ p: { xs: 0, md: 4 }, borderRadius: 4 }}>
                <Typography variant="h6" mb={2} >
                    Performance Overview
                </Typography>
                <Graph />
            </Paper>
        </Box>
    );
};

export default Dashboard;
