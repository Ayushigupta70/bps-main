import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import { viewBookingById, clearViewedBooking } from "../features/booking/bookingSlice";

const InvoicePDF = forwardRef(({ invoice, bookingId, onShare }, ref) => {
  const dispatch = useDispatch()
  const booking = useSelector((state) => state.bookings.viewedBooking)

  useEffect(() => {
    if (bookingId) {
      console.log("Fetching booking:", bookingId);
      dispatch(viewBookingById(bookingId));
    }
    return () => {
      dispatch(clearViewedBooking());
    }
  }, [bookingId])
  if (!booking) return <Typography>Loading Invoice...</Typography>;

  const handlePrint = () => {
    if (ref && ref.current) {
      const content = ref.current.innerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
        <style>
  @media print {
    @page {
      size: A4;
      margin: 10mm;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #000;
      -webkit-print-color-adjust: exact;
    }

    * {
      box-sizing: border-box;
      page-break-inside: avoid !important;
    }

    #root {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .print-section {
      margin-bottom: 12px;
    }

    .flex-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    .col-50 {
      width: 49%;
    }

    .amount-box {
      width: 300px;
      margin-left: auto;
      padding: 10px;
    }

    .amount-box .line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .divider {
      border-top: 1px solid #999;
      margin: 12px 0;
    }

    .center {
      text-align: center;
    }

    button {
      display: none !important;
    }
  }
</style>
        </head>
        <body>
          <div id="root">
            ${content}
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };


  return (
    <Paper
      ref={ref}
      elevation={4}
      sx={{
        p: 4,
        width: '800px',
        mx: 'auto',
        bgcolor: '#fdfdfd',
        borderRadius: 3,
        fontFamily: 'Arial, sans-serif',
      }}
    >

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={onShare} disableRipple>
          Share
        </Button>
        <Typography variant="h5" fontWeight={700} sx={{ textAlign: 'center', flexGrow: 1 }}>
          Bharat Parcel Service
        </Typography>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
          Print
        </Button>
      </Stack>

      <Divider sx={{ mb: 5 }} />

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 6 }}>
          <Typography><strong>Receipt No:</strong> {invoice.invoiceId}</Typography>
        </Grid>
        <Grid size={{ xs: 6 }} textAlign="right">
          <Typography><strong>Date:</strong> {invoice.date}</Typography>
        </Grid>
      </Grid>


      <Box
        className="flex-row"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box className="col-50" sx={{ width: { xs: '100%', sm: '48%' } }}>
          <Typography variant="subtitle1" fontWeight="bold">From:</Typography>
          <Typography>Bharat Parcel Service</Typography>
          <Typography>GST Number : {booking.startStation.gst}</Typography>
          <Typography>Business Address:{booking.startStation.address}</Typography>
          <Typography>City, Country - 00000</Typography>
          <Typography><strong>Phone:</strong> 📞 {booking.startStation.contact}</Typography>
        </Box>

        <Box className="col-50" sx={{ width: { xs: '100%', sm: '48%' } }}>
          <Typography variant="subtitle1" fontWeight="bold">To:</Typography>
          <Typography>{invoice.name}</Typography>
          <Typography>GST Number : {booking.senderGgt}</Typography>
          <Typography>{booking?.toCity}, {booking?.toState} - {booking?.toPincode}</Typography>
          <Typography>City, Country - 00000</Typography>
          <Typography><strong>Phone:</strong> 📞{booking.mobile}</Typography>
        </Box>
      </Box>

      {/* Item Summary */}
      <Box mb={3}>
        <Divider sx={{ mb: 5 }} />

        <Box
          className="flex-row"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {booking && (
            [
              {
                label: 'No. of Items',
                value: booking.items.length,
              },
              {
                label: 'Insurance',
                value: `₹ ${booking.items.reduce((sum, item) => sum + (item.insurance || 0), 0)}`,
              },
              {
                label: 'VPP Amount',
                value: `₹ ${booking.items.reduce((sum, item) => sum + (item.vppAmount || 0), 0)}`,
              },
              {
                label: 'To Pay/Paid',
                value: booking.items.every(item => item.toPay === 'paid') ? 'Paid' : 'To Pay',
              },
              {
                label: 'Total Weight',
                value: `${booking.items.reduce((sum, item) => sum + (item.weight || 0), 0)} kg`,
              },
            ].map((item, index) => (
              <Box key={index} className="col-20" sx={{ width: { xs: '100%', sm: '15%' } }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  {item.label}
                </Typography>
                <Typography>{item.value}</Typography>
              </Box>
            ))
          )}

        </Box>

        <Box
          my={4}
          sx={{
            width: '300px',
            ml: 'auto',
            p: 2,
          }}
        >
          {[
            { label: 'sTax', value: 0 },
            { label: 'Total', value: 0 },
            { label: 'Paid Amount', value: 100 },
            { label: 'Remaining Amount', value: 0 },
          ].map((item, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {item.label}
              </Typography>
              <Typography variant="subtitle1">{item.value}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      <Box textAlign="center">
        <Typography variant="body1">Thank you for your business!</Typography>
        <Typography variant="body2" mt={1}>
          Bank: ABCD BANK &nbsp;|&nbsp; A/C: 1234567890 &nbsp;|&nbsp; IFSC: ABCD0123456
        </Typography>
      </Box>
    </Paper >
  );
});

export default InvoicePDF;