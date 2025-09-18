import React, { useRef } from 'react';
import {
    Modal, Box, Typography, Divider, Button, Grid, Paper, Table, TableHead,
    TableBody, TableRow, TableCell
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '90vh',
    bgcolor: '#fff',
    boxShadow: 10,
    p: 3,
    borderRadius: 2,
    overflowY: 'auto',
    fontFamily: "'Roboto', sans-serif",
};

const formatCurrency = (amount) => `₹${Number(amount || 0).toFixed(2)}`;
const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

const SlipModal = ({ open, handleClose, bookingData }) => {
    const printRef = useRef(); // Reference for printing

    if (!bookingData) return null;

    const addresses = [
        { city: "H.O. DELHI", address: "332, Kucha Ghasi Ram, Chandni Chowk, Fatehpuri, Delhi -110006", phone: "011-23955385, 23830010" },
        { city: "MUMBAI", address: "1, Malharrao Wadi, Gr. Fir. R. No. 4, D.A Lane Kalabadevi Rd. Mumbai-400002", phone: "022-22422812, 22411975" },
        { city: "JAIPUR", address: "House No. 875, Pink House, Ganga Mata Ki Gali, Gopal Ji Ka Rasta, Jaipur", phone: "9672101700" },
        { city: "KOLKATA", address: "33, Shiv Thakur Lane, Gr. Fir., Behind Hari Ram Goenka Street, Kolkata-700007", phone: "033-46041345" }
    ];

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=1000,height=800');
        printWindow.document.write('<html><head><title>Print Slip</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />');
        printWindow.document.write('<style>');
        printWindow.document.write(`
        body { font-family: Roboto, sans-serif; margin: 0; padding: 16px; -webkit-print-color-adjust: exact; }

        /* Force Grid container and items to print as flex */
        .MuiGrid-container {
            display: flex !important;
            flex-wrap: wrap !important;
            margin: 0 -8px !important;
        }
        .MuiGrid-size {
            box-sizing: border-box !important;
            padding: 0 8px !important;
            flex: 0 0 50% !important; /* make md=6 => 50% width */
            max-width: 50% !important;
        }

        /* Table formatting */
        table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: avoid;
        }
        th, td {
            border: 1px solid #bbb;
            padding: 4px 8px;
            text-align: center;
        }
        th {
            background-color: #f5f5f5;
            -webkit-print-color-adjust: exact;
        }
        tr {
            page-break-inside: avoid;
        }

        /* Header & footer centered */
        .MuiBox-root {
            text-align: center !important;
        }

        @media print {
            body { zoom: 90%; }
        }
    `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                {/* Modal content */}
                <Box ref={printRef} id="print-section">
                    <Paper elevation={0} sx={{ p: 2, border: "1px solid #ccc" }}>
                        {/* Header */}
                        <Box textAlign="center" mb={2}>
                            <Typography variant="h5" fontWeight="bold" color="black">BHARAT PARCEL SERVICES PVT. LTD.</Typography>
                            <Typography variant="caption" display="block" color="text.secondary">SUBJECT TO DELHI JURISDICTION</Typography>
                            <Typography variant="body2" fontWeight="bold" mt={1}>
                                GSTIN: 07AAECB6506F1ZY | PAN: AAECB6506F
                            </Typography>
                        </Box>

                        {/* Station Addresses */}
                        <Grid container spacing={2} mb={2}>
                            {addresses.map((item, idx) => (
                                <Grid size={{ xs: 12, md: 6 }} key={idx}> {/* KEEP AS-IS */}
                                    <Paper sx={{ p: 1.2, border: "1px dashed #aaa", bgcolor: "#fafafa" }}>
                                        <Typography variant="subtitle2" fontWeight="bold">{item.city}</Typography>
                                        <Typography variant="body2">{item.address}</Typography>
                                        <Typography variant="body2">📞 {item.phone}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 1 }} />

                        {/* Sender & Receiver */}
                        <Grid container spacing={2} mb={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                                    <Typography variant="subtitle2" fontWeight="bold">Sender</Typography>
                                    <Typography variant="body2">{bookingData?.senderName || bookingData?.firstName}</Typography>
                                    <Typography variant="body2">GSTIN: {bookingData?.senderGgt || 'N/A'}</Typography>
                                    <Typography variant="body2">{bookingData?.fromCity}, {bookingData?.fromState} - {bookingData?.senderPincode}</Typography>
                                </Paper>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                                    <Typography variant="subtitle2" fontWeight="bold">Receiver</Typography>
                                    <Typography variant="body2">{bookingData?.receiverName}</Typography>
                                    <Typography variant="body2">GSTIN: {bookingData?.receiverGgt || 'N/A'}</Typography>
                                    <Typography variant="body2">{bookingData?.toCity}, {bookingData?.toState} - {bookingData?.toPincode}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Booking Details */}
                        <Grid container spacing={1} mb={2}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography variant="body2"><strong>Booking ID:</strong> {bookingData?.bookingId}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>Receipt No:</strong> {bookingData?.items?.[0]?.receiptNo}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>Ref No:</strong> {bookingData?.items?.[0]?.refNo}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>Booking Date:</strong> {formatDate(bookingData?.bookingDate)}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>Delivery Date:</strong> {formatDate(bookingData?.deliveryDate)}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>From Station:</strong> {bookingData?.startStation?.stationName}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="body2"><strong>To Station:</strong> {bookingData?.endStation?.stationName}</Typography>
                            </Grid>
                        </Grid>

                        {/* Items Table */}
                        <Table size="small" sx={{ mb: 2, border: '1px solid #bbb' }}>
                            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                                <TableRow>
                                    {["No.", "Insurance", "VPP Amount", "To Pay/Paid", "Weight (Kgs)", "Amount"].map((head, idx) => (
                                        <TableCell key={idx} align="center" sx={{ border: '1px solid #bbb', fontWeight: 'bold' }}>{head}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookingData.items.map((item, idx) => (
                                    <TableRow key={item._id} sx={{ bgcolor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                                        <TableCell align="center">{idx + 1}</TableCell>
                                        <TableCell align="center">{formatCurrency(item.insurance)}</TableCell>
                                        <TableCell align="center">{formatCurrency(item.vppAmount)}</TableCell>
                                        <TableCell align="center">{item.toPay || "To Pay"}</TableCell>
                                        <TableCell align="center">{item.weight}</TableCell>
                                        <TableCell align="center">{formatCurrency(item.amount)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold', border: '1px solid #bbb' }}>TOTAL</TableCell>
                                    <TableCell sx={{ border: '1px solid #bbb', fontWeight: 'bold' }}>{formatCurrency(bookingData?.grandTotal)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Footer */}
                        <Box textAlign="center" mt={2}>
                            <Typography variant="caption" display="block">Record For One Month Only.</Typography>
                            <Typography variant="caption" display="block" mt={1}>Sign. __________________</Typography>
                        </Box>
                    </Paper>
                </Box>

                {/* Print Button */}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        startIcon={<ReceiptIcon />}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            textTransform: 'none',
                            bgcolor: "#1976d2",
                            "&:hover": { bgcolor: "#145ca4" }
                        }}
                        onClick={handlePrint}
                    >
                        Print Slip
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SlipModal;
