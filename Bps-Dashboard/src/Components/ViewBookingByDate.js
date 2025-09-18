import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    Paper, Container, CircularProgress,
    Grid,
    TextField,
    MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStations } from '../features/stations/stationSlice'
import { BOOKINGS_API } from "../utils/api";

const ViewBookingByDate = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const dispatch = useDispatch();
    const { fromDate, toDate } = useParams();
    const [bookings, setBookings] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const { list: stations } = useSelector((state) => state.stations);

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.post(`${BOOKINGS_API}/booking-summary`, {
                    fromDate,
                    toDate
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setBookings(res.data.bookings || []);
                setSummary(res.data.summary || null);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [fromDate, toDate]);

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        select
                        label="From City"
                        fullWidth
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                    >
                        {stations.map((station) => (
                            <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                                {station.stationName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        select
                        label="To City"
                        fullWidth
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                    >
                        {stations.map((station) => (
                            <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                                {station.stationName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Paper elevation={4} sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Bookings from: {fromDate} to {toDate}
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : bookings.length === 0 ? (
                    <Typography>No bookings found.</Typography>
                ) : (
                    <>
                        <Box mt={3} sx={{ overflowX: 'auto' }}>
                            <Table>
                                <TableHead sx={{ bgcolor: '#1976d2' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: '#fff' }}>S.No</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Booking ID</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Sender</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Receiver</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>From City</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>To City</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Weight</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>VPP</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Insurance</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Charge</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>To Pay</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Paid</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking, index) => {
                                        const item = booking.items[0] || {};
                                        return (
                                            <TableRow key={booking._id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{booking.bookingId}</TableCell>
                                                <TableCell>{booking.senderName}</TableCell>
                                                <TableCell>{booking.receiverName}</TableCell>
                                                <TableCell>{booking.fromCity}</TableCell>
                                                <TableCell>{booking.toCity}</TableCell>
                                                <TableCell>{item.weight}</TableCell>
                                                <TableCell>{item.vppAmount}</TableCell>
                                                <TableCell>{item.insurance}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{booking.toPay}</TableCell>
                                                <TableCell>{booking.paid}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>

                        {/* Summary Section */}
                        {summary && (
                            <Box mt={5}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Booking Summary
                                </Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Total Bookings</TableCell>
                                            <TableCell>{summary.totalBookings}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total Paid</TableCell>
                                            <TableCell>{summary.totalPaid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total To Pay</TableCell>
                                            <TableCell>{summary.totalToPay}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Grand Total</TableCell>
                                            <TableCell>{summary.grandTotal}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Fully Paid Bookings</TableCell>
                                            <TableCell>{summary.paymentBreakdown?.fullyPaid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Partially Paid Bookings</TableCell>
                                            <TableCell>{summary.paymentBreakdown?.partiallyPaid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Unpaid Bookings</TableCell>
                                            <TableCell>{summary.paymentBreakdown?.unpaid}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ViewBookingByDate;
