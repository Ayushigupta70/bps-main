import React, { useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../features/Location/locationSlice';
import { fetchStations } from '../../features/stations/stationSlice'
import { createBooking } from '../../features/booking/bookingSlice';
import { useNavigate } from "react-router-dom";

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
      toPay: "",
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

const BookingForm = () => {
  const [senderCities, setSenderCities] = React.useState([]);
  const [receiverCities, setReceiverCities] = React.useState([]);

  const dispatch = useDispatch();
  const { states, cities } = useSelector((state) => state.location);
  const { list: stations } = useSelector((state) => state.stations);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchStations());
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          try {
            await dispatch(createBooking(values)).unwrap();
            formikHelpers.resetForm();
            navigate('/employer')
          } catch (error) {
            console.log("Error while adding booking", error);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <EffectSyncCities
              values={values}
              dispatch={dispatch}
              setSenderCities={setSenderCities}
              setReceiverCities={setReceiverCities}
            />
            <EffectSyncTotals values={values} setFieldValue={setFieldValue} />

            <Box sx={{ mt: 6, p: 3, maxWidth: 1200, mx: "auto" }}>
              <Grid container spacing={2}>
                {/* Station Selection */}
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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

                {/* Date Pickers */}
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Booking Date"
                    value={values.bookingDate}
                    onChange={(val) => setFieldValue("bookingDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="bookingDate" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Proposed Delivery Date"
                    value={values.deliveryDate}
                    onChange={(val) => setFieldValue("deliveryDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="deliveryDate" />
                    )}
                  />
                </Grid>

                {/* Customer Search */}
                <Grid item xs={12} sm={9}>
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
                <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>

                {/* Customer Details */}
                {["firstName", "middleName", "lastName"].map((name) => (
                  <Grid item xs={12} sm={4} key={name}>
                    <TextField
                      fullWidth
                      label={name.replace(/([A-Z])/g, " $1").trim()}
                      name={name}
                      value={values[name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>

                {/* Sender Address */}
                <Grid item xs={12}>
                  <Typography variant="h6">From (Address)</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="senderName"
                    value={values.senderName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="senderGgt"
                    value={values.senderGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="senderLocality"
                    value={values.senderLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="senderPincode"
                    value={values.senderPincode}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Receiver Address */}
                <Grid item xs={12}>
                  <Typography variant="h6">To (Address)</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="receiverName"
                    value={values.receiverName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="receiverGgt"
                    value={values.receiverGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="receiverLocality"
                    value={values.receiverLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="toPincode"
                    value={values.toPincode}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((_, index) => (
                        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                          <Grid item xs={1}>
                            <Typography>{index + 1}.</Typography>
                          </Grid>
                          {[
                            "receiptNo",
                            "refNo",
                            "insurance",
                            "vppAmount",
                            "weight",
                            "amount",
                          ].map((field) => (
                            <Grid item xs={6} sm={3} md={2} key={field}>
                              <Field
                                as={TextField}
                                fullWidth
                                size="small"
                                label={field.replace(/([A-Z])/g, " $1").trim()}
                                name={`items[${index}].${field}`}
                              />
                            </Grid>
                          ))}
                          <Grid item xs={6} sm={3} md={2}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="To Pay/Paid"
                              name={`items[${index}].toPay`}
                              value={values.items[index].toPay}
                              onChange={handleChange}
                            >
                              {toPay.map((p) => (
                                <MenuItem key={p} value={p}>
                                  {p}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={6} sm={3} md={1}>
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

                      <Grid item xs={12}>
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

                {/* Comments and Totals */}
                <Grid item xs={12} md={9}>
                  <TextField
                    name="addComment"
                    label="Additional Comment"
                    multiline
                    minRows={4}
                    fullWidth
                    value={values.addComment}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Grid container spacing={2}>
                    {totalFields.map(({ name, label, readOnly }) => (
                      <Grid item xs={12} key={name}>
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

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Submit All
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
  }, [values.fromState, dispatch, setSenderCities]);

  useEffect(() => {
    if (values.toState) {
      dispatch(fetchCities(values.toState))
        .unwrap()
        .then((res) => setReceiverCities(res))
        .catch(console.error);
    } else {
      setReceiverCities([]);
    }
  }, [values.toState, dispatch, setReceiverCities]);

  return null;
};

const EffectSyncTotals = ({ values, setFieldValue }) => {
  useEffect(() => {
    const totals = calculateTotals(values);
    setFieldValue("billTotal", totals.billTotal);
    setFieldValue("grandTotal", totals.grandTotal);
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

export default BookingForm;