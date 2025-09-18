import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, FieldArray } from "formik";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { viewBookingById, updateBookingById } from "../../../../features/booking/bookingSlice";
import { fetchStations } from '../../../../features/stations/stationSlice'
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
const toPay = ['pay', 'paid', 'none'];

const initialValues = {
  startStation: "",
  endStation: "",
  bookingDate: null,
  deliveryDate: null,
  customerSearch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  mobile: "",
  email: "",
  senderName: "",
  senderLocality: "",
  fromCity: "",
  senderGgt: "",
  fromState: "",
  senderPincode: "",
  receiverName: "",
  receiverLocality: "",
  receiverGgt: "",
  toState: "",
  toCity: "",
  toPincode: "",
  items: [
    {
      receiptNo: "",
      refNo: "",
      insurance: "",
      vppAmount: "",
      toPayPaid: "",
      weight: "",
      amount: "",
    },
  ],
  addComment: "",
  freight: "",
  ins_vpp: "",
  billTotal: "",
  cgst: "",
  sgst: "",
  igst: "",
  grandTotal: "",
};
const totalFields = [
  { name: "freight", label: "FREIGHT", readOnly: false },
  { name: "ins_vpp", label: "INS/VPP", readOnly: false },
  { name: "billTotal", label: "Bill Total", readOnly: true },
  { name: "cgst", label: "CGST%", readOnly: false },
  { name: "sgst", label: "SGST%", readOnly: false },
  { name: "igst", label: "IGST%", readOnly: false },
  { name: "grandTotal", label: "Grand Total", readOnly: true },
];
const calculateTotals = (values) => {
  const items = values.items || [];
  const billTotal = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const freight = Number(values.freight || 0);
  const ins_vpp = Number(values.ins_vpp || 0);
  const cgst = Number(values.cgst || 0);
  const sgst = Number(values.sgst || 0);
  const igst = Number(values.igst || 0);

  const grandTotal = billTotal + freight + ins_vpp + cgst + sgst + igst;

  return {
    billTotal: billTotal.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
    computedTotalRevenue: grandTotal.toFixed(2)
  };
};
const validationSchema = Yup.object().shape({
  startStation: Yup.string().required("Start Station is required"),
  endStation: Yup.string().required("End Station is required"),
  bookingDate: Yup.date().nullable().required("Booking Date is required"),
  deliveryDate: Yup.date().nullable().required("Delivery Date is required"),
  customerSearch: Yup.string(),
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  senderName: Yup.string().required("Sender Name is required"),
  senderLocality: Yup.string().required("Sender Locality is required"),
  fromCity: Yup.string().required("From City is required"),
  senderGgt: Yup.string().required("Sender GGT is required"),
  fromState: Yup.string().required("From State is required"),
  senderPincode: Yup.string()
    .matches(/^\d{6}$/, "Sender Pincode must be 6 digits")
    .required("Sender Pincode is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  receiverLocality: Yup.string().required("Receiver Locality is required"),
  receiverGgt: Yup.string().required("Receiver GGT is required"),
  toState: Yup.string().required("To State is required"),
  toCity: Yup.string().required("To City is required"),
  toPincode: Yup.string()
    .matches(/^\d{6}$/, "Receiver Pincode must be 6 digits")
    .required("Receiver Pincode is required"),
  items: Yup.array().of(
    Yup.object().shape({
      receiptNo: Yup.string().required("Receipt No is required"),
      refNo: Yup.string().required("Reference No is required"),
      insurance: Yup.number()
        .typeError("Insurance must be a number")
        .min(0, "Cannot be negative"),
      vppAmount: Yup.number()
        .typeError("VPP Amount must be a number")
        .min(0, "Cannot be negative"),

      weight: Yup.number()
        .typeError("Weight must be a number")
        .min(0, "Cannot be negative"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .min(0, "Cannot be negative"),
    })
  ),
  addComment: Yup.string(),
  freight: Yup.number()
    .typeError("Freight must be a number")
    .min(0, "Cannot be negative"),
  ins_vpp: Yup.number()
    .typeError("Insurance/VPP must be a number")
    .min(0, "Cannot be negative"),
  billTotal: Yup.number()
    .typeError("Bill Total must be a number")
    .min(0, "Cannot be negative"),
  cgst: Yup.number()
    .typeError("CGST must be a number")
    .min(0, "Cannot be negative"),
  sgst: Yup.number()
    .typeError("SGST must be a number")
    .min(0, "Cannot be negative"),
  igst: Yup.number()
    .typeError("IGST must be a number")
    .min(0, "Cannot be negative"),
  grandTotal: Yup.number()
    .typeError("Grand Total must be a number")
    .min(0, "Cannot be negative"),
});

const EditBooking = () => {
  const [senderCities, setSenderCities] = React.useState([]);
  const [receiverCities, setReceiverCities] = React.useState([]);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: stations } = useSelector((state) => state.stations);
  const { loading, error, viewedBooking } = useSelector(state => state.bookings);
  const { states, cities } = useSelector((state) => state.location);
  useEffect(() => {
    dispatch(fetchStations());
    dispatch(fetchStates());
  }, [dispatch])
  useEffect(() => {
    if (bookingId) {
      dispatch(viewBookingById(bookingId));
    }
  }, [bookingId, dispatch]);

  useEffect(() => {

  }, [viewedBooking]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={{
          ...initialValues,
          ...viewedBooking,
          bookingDate: viewedBooking?.bookingDate ? new Date(viewedBooking.bookingDate) : new Date(),
          deliveryDate: viewedBooking?.deliveryDate ? new Date(viewedBooking.deliveryDate) : new Date(),
          startStation: viewedBooking?.startStation?.stationName || "",
          endStation: viewedBooking?.endStation?.stationName || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateBookingById({ bookingId, data: values }))
            .unwrap()
            .then(() => {
              alert("Booking updated successfully!");
              navigate("/booking");
            })
            .catch((error) => {
              console.error("Failed to update", error);
            });
        }}

        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <EffectSyncCities values={values} dispatch={dispatch} setSenderCities={setSenderCities}
              setReceiverCities={setReceiverCities} />
            <EffectSyncTotals values={values} setFieldValue={setFieldValue} />
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
                    name="startStation"
                    value={values.startStation}
                    onChange={handleChange}
                  >
                    {stations.map((station) => (
                      <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                        {station.stationName}
                      </MenuItem>
                    ))}

                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Destination Station"
                    name="endStation"
                    value={values.endStation}
                    onChange={handleChange}
                  >
                    {stations.map((station) => (
                      <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                        {station.stationName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Booking Date"
                    value={values.bookingDate}
                    onChange={(val) => setFieldValue("bookingDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="bookingDate" />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Proposed Delivery Date"
                    value={values.deliveryDate}
                    onChange={(val) => setFieldValue("deliveryDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="deliveryDate" />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 9 }}>
                  <Typography fontWeight="bold">
                    Customer Name/Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search for customer"
                    name="customerSearch"
                    value={values.customerSearch}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 3 }}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={values.middleName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">From (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="senderName"
                    value={values.senderName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="senderGgt"
                    value={values.senderGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="senderLocality"
                    value={values.senderLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="State"
                    name="fromState"
                    value={values.fromState}
                    onChange={handleChange}
                  >
                    {states.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="City"
                    name="fromCity"
                    value={values.fromCity}
                    onChange={handleChange}
                  >
                    {senderCities.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="senderPincode"
                    value={values.senderPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">To (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="receiverName"
                    value={values.receiverName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="receiverGgt"
                    value={values.receiverGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="receiverLocality"
                    value={values.receiverLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="State"
                    name="toState"
                    value={values.toState}
                    onChange={handleChange}
                  >
                    {states.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="City"
                    name="toCity"
                    value={values.toCity}
                    onChange={handleChange}
                  >
                    {receiverCities.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="toPincode"
                    value={values.toPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((item, index) => (
                        <Grid
                          container
                          spacing={2}
                          key={index}
                          alignItems="center"
                          sx={{ mb: 2 }}
                        >
                          <Grid size={{ xs: 0.5 }}>
                            <Typography>{index + 1}.</Typography>
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Receipt No"
                              name={`items[${index}].receiptNo`}
                              value={item.receiptNo}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Ref No"
                              name={`items[${index}].refNo`}
                              value={item.refNo}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Insurance"
                              name={`items[${index}].insurance`}
                              value={item.insurance}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="VPP Amount"
                              name={`items[${index}].vppAmount`}
                              value={item.vppAmount}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Weight"
                              name={`items[${index}].weight`}
                              value={item.weight}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.4 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Amount"
                              name={`items[${index}].amount`}
                              value={item.amount}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1.5 }}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="To Pay/Paid"
                              name={`items[${index}].toPay`}
                              value={item.toPay}
                              onChange={handleChange}
                            >
                              {toPay.map((p) => (
                                <MenuItem key={p} value={p}>
                                  {p}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid size={{ xs: 3, sm: 3, md: 1 }}>
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="outlined"
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid size={{ xs: 12 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            push({
                              receiptNo: "",
                              refNo: "",
                              insurance: "",
                              vppAmount: "",
                              toPay: "",
                              weight: "",
                              amount: "",
                            })
                          }
                        >
                          + Add Item
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                <Grid size={{ xs: 12, md: 9 }}>
                  <TextField
                    name="addComment"
                    label="Additional Comments"
                    multiline
                    minRows={10}
                    fullWidth
                    value={values.addComment}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Grid container spacing={2}>
                    {totalFields.map(({ name, label, readOnly }) => (
                      <Grid item xs={6} key={name}>
                        <TextField
                          name={name}
                          label={label}
                          value={values[name]}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          InputProps={{
                            readOnly: readOnly,
                            ...(label.includes("%") && {
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }),
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Update Booking
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};
const EffectSyncCities = ({ values, dispatch, setSenderCities, setReceiverCities }) => {
  useEffect(() => {
    if (values.fromState) {
      dispatch(fetchCities(values.fromState))
        .unwrap()
        .then((res) => setSenderCities(res))
        .catch(console.error);
    } else {
      setSenderCities([]);
    }
  }, [values.fromState, dispatch]);

  useEffect(() => {
    if (values.toState) {
      dispatch(fetchCities(values.toState))
        .unwrap()
        .then((res) => setReceiverCities(res))
        .catch(console.error);
    } else {
      setReceiverCities([]);
    }
  }, [values.toState, dispatch]);

  return null;
};
const EffectSyncTotals = ({ values, setFieldValue }) => {
  useEffect(() => {
    const totals = calculateTotals(values);
    setFieldValue("billTotal", totals.billTotal);
    setFieldValue("grandTotal", totals.grandTotal);
    // Optional:
    // setFieldValue("computedTotalRevenue", totals.computedTotalRevenue);
  }, [
    values.items,
    values.freight,
    values.ins_vpp,
    values.cgst,
    values.sgst,
    values.igst,
    setFieldValue
  ]);

  return null;
};
export default EditBooking;