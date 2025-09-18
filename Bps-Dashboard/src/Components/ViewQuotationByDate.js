import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    Paper, Container, CircularProgress, Grid, TextField, MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStations } from '../features/stations/stationSlice';
import { API_BASE_URL } from "../utils/api";

const ViewQuotationBtDate = () => {
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
                const res = await axios.post(
                    `${API_BASE_URL}/quotation/booking-summary-date`,
                    { fromDate, toDate },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
                );

                console.log("API Response:", res.data);

                setBookings(res.data.bookings || []);

                // 👇 custom summary bana rahe hain
                const bookingsData = res.data.bookings || [];
                const summaryData = {
                    totalBookings: res.data.total || 0,
                    totalPaid: bookingsData.reduce((acc, b) => acc + (b.amount || 0), 0),
                    totalToPay: bookingsData.reduce((acc, b) => acc + ((b.grandTotal || 0) - (b.amount || 0)), 0),
                    grandTotal: bookingsData.reduce((acc, b) => acc + (b.grandTotal || 0), 0),
                    paymentBreakdown: {
                        fullyPaid: bookingsData.filter(b => b.amount >= b.grandTotal).length,
                        partiallyPaid: bookingsData.filter(b => b.amount > 0 && b.amount < b.grandTotal).length,
                        unpaid: bookingsData.filter(b => !b.amount || b.amount === 0).length
                    }
                };

                setSummary(summaryData);

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
                        {/* 📌 Booking Table */}
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
                                        <TableCell sx={{ color: '#fff' }}>Amount</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Grand Total</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking, index) => {
                                        const product = booking.productDetails?.[0] || {};
                                        return (
                                            <TableRow key={booking._id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{booking.bookingId}</TableCell>
                                                <TableCell>{booking.fromCustomerName}</TableCell>
                                                <TableCell>{booking.toCustomerName}</TableCell>
                                                <TableCell>{booking.fromCity}</TableCell>
                                                <TableCell>{booking.toCity}</TableCell>
                                                <TableCell>{product.weight}</TableCell>
                                                <TableCell>{booking.amount}</TableCell>
                                                <TableCell>{booking.grandTotal}</TableCell>
                                                <TableCell>{booking.isDelivered ? "Delivered" : "Pending"}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>

                        {/* 📌 Summary Section */}
                        {summary && (
                            <Box mt={5}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Quotation Summary
                                </Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Total Quotation</TableCell>
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
                                            <TableCell>{summary.paymentBreakdown.fullyPaid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Partially Paid Bookings</TableCell>
                                            <TableCell>{summary.paymentBreakdown.partiallyPaid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Unpaid Bookings</TableCell>
                                            <TableCell>{summary.paymentBreakdown.unpaid}</TableCell>
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

export default ViewQuotationBtDate;
