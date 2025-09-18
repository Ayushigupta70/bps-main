import React, { useState } from 'react';
import {
    Box, TextField, Button, MenuItem, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Grid,
    Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { previewInvoices, generateInvoices } from '../../../features/customerLedger/customerLedgerSlice';

const LedgerCard = () => {
    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState('');
    const [orderType, setOrderType] = useState('');
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [comment, setComment] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const { preview: rows } = useSelector((state) => state.ledger)
    const totalAmount = rows.reduce((sum, row) => sum + (row.amount || 0), 0);
    const totalRemaining = rows.reduce((sum, row) => sum + (row.remainingAmount || 0), 0);
    const orderOptions = [
        { value: 'Booking', label: 'Booking Order' },
        { value: 'Quotation', label: 'Quotation Order' },
    ];

    const handleSubmit = (bookingIds) => {
        dispatch(generateInvoices({ bookingIds }));
        window.location.reload();
    };


    return (
        <Box p={4} component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
                Ledger Card
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Order Type"
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        {orderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={6} sm={2}>
                    <DatePicker
                        label="From Date"
                        value={fromDate}
                        format='DD/MM/YYYY'
                        onChange={(newValue) => setFromDate(newValue)}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <DatePicker
                        label="To Date"
                        value={toDate}
                        format='DD/MM/YYYY'
                        onChange={(newValue) => setToDate(newValue)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => {
                        dispatch(previewInvoices({
                            name: customerName,
                            orderType,
                            fromDate: fromDate.format('YYYY-MM-DD'),
                            endDate: toDate.format('YYYY-MM-DD'),
                        }))
                    }}>
                        Get Invoice
                    </Button>
                </Grid>
            </Grid>

            <Box mt={4}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1565c0" }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        sx={{ color: "white" }}
                                        checked={selectedRows.length === rows.length && rows.length > 0}
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(rows.map(row => row.bookingId));

                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Booking ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Pickup</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Drop</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={row.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRows.includes(row.bookingId)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setSelectedRows((prev) =>
                                                    isChecked
                                                        ? [...prev, row.bookingId]
                                                        : prev.filter((id) => id !== row.bookingId)
                                                );
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.bookingId}</TableCell>
                                    <TableCell>{row.pickupLocation}</TableCell>
                                    <TableCell>{row.dropLocation?.stationName || row.dropLocation}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" size="small">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Total Amount:</strong> ₹{totalAmount.toLocaleString()}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Remaining Amount:</strong> ₹{totalRemaining.toLocaleString()}
                    </Typography>
                </Grid>
            </Grid>

            <Box mt={2}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Additional Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Box>

            <Box mt={2}>
                <Button variant="contained" color="success" onClick={() => handleSubmit(selectedRows)}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default LedgerCard;