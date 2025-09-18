import React, { useRef } from 'react';
import {
  Modal, Box, Typography, Divider, Button, Paper, Grid, Table, TableHead,
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
const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

const QSlipModal = ({ open, handleClose, bookingData }) => {
  const printRef = useRef();

  if (!bookingData) return null;

  const addresses = [
    {
      city: "H.O. DELHI",
      address: "332, Kucha Ghasi Ram, Chandni Chowk, Fatehpuri, Delhi -110006",
      phone: "011-23955385, 23830010"
    },
    {
      city: "MUMBAI",
      address: "1, Malharrao Wadi, Gr. Fir. R. No. 4, D.A Lane Kalabadevi Rd. Mumbai-400002",
      phone: "022-22422812, 22411975"
    },
    {
      city: "JAIPUR",
      address: "House No. 875, Pink House, Ganga Mata Ki Gali, Gopal Ji Ka Rasta, Jaipur",
      phone: "9672101700"
    },
    {
      city: "KOLKATA",
      address: "33, Shiv Thakur Lane, Gr. Fir., Behind Hari Ram Goenka Street, Kolkata",
      phone: "033-46041345"
    }
  ];

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    printWindow.document.write('<html><head><title>Print Slip</title>');
    printWindow.document.write(
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />'
    );
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Roboto, sans-serif; margin: 0; padding: 16px; -webkit-print-color-adjust: exact; }
      .MuiGrid-container { display: flex !important; flex-wrap: wrap !important; margin: 0 -8px !important; }
      .MuiGrid-item { box-sizing: border-box !important; padding: 0 8px !important; flex: 0 0 50% !important; max-width: 50% !important; }
      table { width: 100%; border-collapse: collapse; page-break-inside: avoid; }
      th, td { border: 1px solid #bbb; padding: 4px 8px; text-align: center; }
      th { background-color: #f5f5f5; -webkit-print-color-adjust: exact; }
      tr { page-break-inside: avoid; }
      .MuiBox-root { text-align: center !important; }
      @media print { body { zoom: 90%; } }
    `);
    printWindow.document.write('</style></head><body>');
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
        <Box ref={printRef} id="print-section">
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #ccc' }}>
            {/* Header */}
            <Box textAlign="center" mb={2}>
              <Typography variant="h5" fontWeight="bold" color="black">
                BHARAT PARCEL SERVICES PVT. LTD.
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                SUBJECT TO DELHI JURISDICTION
              </Typography>
            </Box>

            {/* Station Addresses */}
            <Grid container spacing={2} mb={2}>
              {addresses.map((item, idx) => (
                <Grid size={{ xs: 12, md: 6 }} key={idx}>
                  <Paper sx={{ p: 1.5, border: "1px dashed #aaa", bgcolor: "#fafafa" }}>
                    <Typography variant="subtitle2" fontWeight="bold">{item.city}</Typography>
                    <Typography variant="body2">{item.address}</Typography>
                    <Typography variant="body2">📞 {item.phone}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Sender & Receiver */}
            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                  <Typography variant="subtitle2" fontWeight="bold">Sender</Typography>
                  <Typography variant="body2">{bookingData?.fromCustomerName}</Typography>
                  <Typography variant="body2">{bookingData?.fromAddress}</Typography>
                  <Typography variant="body2">{bookingData?.fromCity}, {bookingData?.fromState} - {bookingData?.fromPincode}</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                  <Typography variant="subtitle2" fontWeight="bold">Receiver</Typography>
                  <Typography variant="body2">{bookingData?.toCustomerName}</Typography>
                  <Typography variant="body2">{bookingData?.toAddress}</Typography>
                  <Typography variant="body2">{bookingData?.toCity}, {bookingData?.toState} - {bookingData?.toPincode}</Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Booking Details */}
            <Grid container spacing={1} mb={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="body2"><strong>Booking ID:</strong> {bookingData?.bookingId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2"><strong>Booking Date:</strong> {formatDate(bookingData?.quotationDate)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2"><strong>Delivery Date:</strong> {formatDate(bookingData?.proposedDeliveryDate)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2"><strong>From Station:</strong> {bookingData?.startStation?.stationName}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2"><strong>To Station:</strong> {bookingData?.endStation}</Typography>
              </Grid>
            </Grid>

            {/* Product Details Table */}
            <Table size="small" sx={{ mb: 2, border: '1px solid #bbb' }}>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  {['No.', 'Name', 'Qty', 'Weight (Kgs)', 'Price'].map((head, idx) => (
                    <TableCell key={idx} align="center" sx={{ border: '1px solid #bbb', fontWeight: 'bold' }}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingData.productDetails.map((item, idx) => (
                  <TableRow key={item._id} sx={{ bgcolor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">{item.weight}</TableCell>
                    <TableCell align="center">{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold', border: '1px solid #bbb' }}>TOTAL</TableCell>
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
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#145ca4' },
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

export default QSlipModal;
