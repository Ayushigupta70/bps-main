import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableHead,
    TableRow, TableCell, TableBody, TextField, Button, Dialog,
    DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingCustomers, receiveCustomerPayment } from '../../../features/booking/bookingSlice';

const PanddingList = () => {
    const dispatch = useDispatch();

    const { customers, loading, error } = useSelector(
        (state) => state.bookings
    );

    useEffect(() => {
        dispatch(fetchPendingCustomers());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');

    // Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');

    const filteredCustomers = customers.filter((cust) =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.contact.toString().includes(searchTerm)
    );

    const handleOpenDialog = (customer) => {
        setSelectedCustomer(customer);
        setPaymentAmount('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCustomer(null);
    };

    const handleAddPayment = () => {
        if (!paymentAmount || Number(paymentAmount) <= 0) {
            alert("Enter a valid amount");
            return;
        }

        dispatch(receiveCustomerPayment({
            customerId: selectedCustomer.customerId,
            amount: Number(paymentAmount)
        }))
        .unwrap()
        .then(() => {
            handleCloseDialog();
            dispatch(fetchPendingCustomers()); // Refresh table after payment
        });
    };

    return (
        <Box p={3}>
            <Box mb={2}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: 500 }}
                />
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.NO</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Total Bookings</TableCell>
                            <TableCell>Unpaid Bookings</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Pending</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((cust, index) => (
                                <TableRow key={cust.customerId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{cust.name}</TableCell>
                                    <TableCell>{cust.email}</TableCell>
                                    <TableCell>{cust.contact}</TableCell>
                                    <TableCell>{cust.totalBookings}</TableCell>
                                    <TableCell>{cust.unpaidBookings}</TableCell>
                                    <TableCell>₹{cust.totalAmount}</TableCell>
                                    <TableCell>₹{cust.totalPaid}</TableCell>
                                    <TableCell>₹{cust.pendingAmount}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleOpenDialog(cust)}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} align="center">
                                    No matching customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>

            {/* Add Payment Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Payment</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" mb={1}>
                        Customer: {selectedCustomer?.name}
                    </Typography>
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddPayment} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PanddingList;