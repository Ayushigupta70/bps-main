import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearViewedBooking, viewBookingById } from '../../../../features/booking/bookingSlice';
import { ArrowBack } from '@mui/icons-material';


const ViewBooking = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings.viewedBooking)

  useEffect(() => {
    if (bookingId) {
      dispatch(viewBookingById(bookingId));
    }
    return () => {
      dispatch(clearViewedBooking());
    }
  }, [bookingId])

  if (!booking || Object.keys(booking).length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading Booking details...</Typography>
      </Box>
    );
  }
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mr: 2 }}
      >
        Back
      </Button>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Start Station"
              value={booking.startStation.stationName}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.startStation.stationName}>
                {booking.startStation.stationName}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Destination Station"
              value={booking.endStation.stationName}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.endStation.stationName}>
                {booking.endStation.stationName}
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Booking Date"
              value={booking.bookingDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Proposed Delivery Date"
              value={booking.deliveryDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>



          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="First Name"
              value={booking.firstName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Middle Name"
              value={booking.middleName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Last Name"
              value={booking.lastName}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Contact Number"
              value={booking.mobile}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={booking.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">From (Address)</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Name"
              value={booking.senderName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="GST Number"
              value={booking.senderGgt}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Locality / Street"
              value={booking.senderLocality}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="State"
              value={booking.fromState}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.fromState}>
                {booking.fromState}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="City"
              value={booking.fromCity}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.fromCity}>
                {booking.fromCity}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Pin Code"
              value={booking.senderPincode}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">To (Address)</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Name"
              value={booking.receiverName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="GST Number"
              value={booking.receiverGgt}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Locality / Street"
              value={booking.receiverLocality}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="State"
              value={booking.toState}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.toState}>
                {booking.toState}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="City"
              value={booking.toCity}
              InputProps={{ readOnly: true }}
            >
              <MenuItem value={booking.toCity}>
                {booking.toCity}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Pin Code"
              value={booking.toPincode}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Product Details</Typography>
          </Grid>
          {booking.items.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
              <Grid size={{ xs: 0.5 }}>
                <Typography>{index + 1}.</Typography>
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Receipt No"
                  value={item.receiptNo}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Ref No"
                  value={item.refNo}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Insurance"
                  value={item.insurance}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="VPP Amount"
                  value={item.vppAmount}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Weight"
                  value={item.weight}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Amount"
                  value={item.amount}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 1.5 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="To Pay/Paid"
                  value={item.toPay}
                  InputProps={{ readOnly: true }}
                >
                  <MenuItem value={item.toPay}>{item.toPay}</MenuItem>
                </TextField>
              </Grid>

            </Grid>
          ))}



          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              label="Additional Comments"
              multiline
              minRows={10}
              fullWidth
              value={booking.addComment}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="FREIGHT"
                  value={booking.freight}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="INS/VPP"
                  value={booking.ins_vpp}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Bill Total"
                  value={booking.billTotal}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="CGST%"
                  value={booking.cgst}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="SGST%"
                  value={booking.sgst}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="IGST%"
                  value={booking.igst}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Grand Total"
                  value={booking.grandTotal}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Box>
    </>
  );
};

export default ViewBooking;