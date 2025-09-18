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
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { createBooking } from "../../../../features/quotation/quotationSlice";
import { fetchStations } from '../../../../features/stations/stationSlice'
import { useNavigate } from "react-router-dom";
import CheckCircle from '@mui/icons-material/CheckCircle';
import QcustomerSearch from "../../../../Components/QcustomerSearch";

const toPay = ['pay', 'paid', 'none'];

const initialValues = {
  customerSearch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  startStationName: null,
  endStation: null,
  locality: "",
  quotationDate: "",
  proposedDeliveryDate: "",
  fromCustomerName: "",
  fromAddress: "",
  fromState: "",
  fromCity: "",
  fromPincode: "",
  toCustomerName: "",
  toAddress: "",
  toState: "",
  toCity: "",
  toPincode: "",
  amount: "",
  sgst: "",
  additionalCmt: "",
  productDetails: [
    {
      name: "",
      quantity: "",
      weight: "",
      price: "",
      topay: "none",
    },
  ],

  addComment: "",


  billTotal: "",

  stax: "",

  grandTotal: "",
  roundOff: "",
  finalTotal: "",
};

const QuotationForm = () => {
  const [senderCities, setSenderCities] = React.useState([]);
  const [receiverCities, setReceiverCities] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { states, cities } = useSelector((state) => state.location);
  const { list: stations } = useSelector((state) => state.stations);
  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchStations());
  }, [dispatch]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            setSubmitting(true);
            await dispatch(createBooking(values)).unwrap();
            resetForm();
            navigate('/quotation')
          } catch (error) {
            console.log("Error while adding booking", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, isSubmitting }) => {
          const handleUpdate = (index) => {
            const item = values.productDetails[index];

            if (!item.No.OfParcel || !item.weightKgs || !item.amount) {
              setSnackbar({
                open: true,
                message: "Please fill all required fields for this item",
                severity: "error",
              });
              return;
            }
            setSnackbar({
              open: true,
              message: `Item ${index + 1} updated successfully!`,
              severity: "success",
            });
          };

          return (
            <Form>
              <EffectSyncCities values={values} dispatch={dispatch} setSenderCities={setSenderCities}
                setReceiverCities={setReceiverCities} />
              <EffectSyncTotal values={values} setFieldValue={setFieldValue} />
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Edit Customer Quotation
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Start Station"
                      name="startStationName"
                      value={values.startStationName}
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

                  <Grid container columnSpacing={2} rowSpacing={2}>
                    <Grid xs={12} sm={6}>
                      <DatePicker
                        label="Booking Date"
                        value={values.quotationDate}
                        onChange={(val) => setFieldValue("quotationDate", val)}
                        minDate={new Date()}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            name: "quotationDate",
                            error: false,
                            InputProps: {
                              sx: { width: 490 }, // Increase height here
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <DatePicker
                        label="Proposed Delivery Date"
                        value={values.proposedDeliveryDate}
                        onChange={(val) => setFieldValue("proposedDeliveryDate", val)}
                        minDate={values.quotationDate || new Date()}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            name: "proposedDeliveryDate",
                            error: false,
                            InputProps: {
                              sx: { width: 490 },
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">From (Address)</Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <QcustomerSearch
                      onCustomerSelect={(customer) => {
                        console.log("Quotation customer data", customer);
                        if (customer) {
                          setFieldValue("fromCustomerName", customer.name || "");
                          setFieldValue("fromAddress", customer.address || "");
                          setFieldValue("fromState", customer.state || "");
                          setFieldValue("fromCity", customer.city || "");
                          setFieldValue("fromPincode", customer.pincode || "");
                          setFieldValue("contactNumber", customer.contactNumber?.toString() || "");
                          setFieldValue("email", customer.emailId || "");
                        } else {
                          setFieldValue("fromCustomerName", "");
                          setFieldValue("fromAddress", "");
                          setFieldValue("fromState", "");
                          setFieldValue("fromCity", "");
                          setFieldValue("fromPincode", "");
                          setFieldValue("contactNumber", "");
                          setFieldValue("email", "");
                        }
                      }}
                    />
                  </Grid>


                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="fromCustomerName"
                      value={values.fromCustomerName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Locality / Street"
                      name="fromAddress"
                      value={values.fromAddress}
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
                      name="fromPincode"
                      value={values.fromPincode}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contactNumber"
                      value={values.contactNumber}
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
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">To (Address)</Typography>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <QcustomerSearch
                      type="receiver"
                      onCustomerSelect={(customer) => {
                        console.log("Selected To Customer:", customer);
                        if (customer) {
                          setFieldValue("toCustomerName", customer.name || "");
                          setFieldValue("toAddress", customer.address || "");
                          setFieldValue("toState", customer.state || "");
                          setFieldValue("toCity", customer.city || "");
                          setFieldValue("toPincode", customer.pincode || "");
                          setFieldValue("toContactNumber", customer.contactNumber?.toString() || "");
                          setFieldValue("toEmail", customer.emailId || "");
                        } else {
                          setFieldValue("toCustomerName", "");
                          setFieldValue("toAddress", "");
                          setFieldValue("toState", "");
                          setFieldValue("toCity", "");
                          setFieldValue("toPincode", "");
                          setFieldValue("toContactNumber", "");
                          setFieldValue("toEmail", "");
                        }
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="toCustomerName"
                      value={values.toCustomerName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Locality / Street"
                      name="toAddress"
                      value={values.toAddress}
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Contact Number"
                      name="toContactNumber"
                      value={values.toContactNumber || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email"
                      name="toEmail"
                      value={values.toEmail || ""}
                      onChange={handleChange}
                    />
                  </Grid>


                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Product Details</Typography>
                  </Grid>

                  <FieldArray name="productDetails">
                    {({ push, remove, form }) => (
                      <>
                        {form.values.productDetails.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Field
                              name={`productDetails[${index}].name`}
                              as={TextField}
                              label="Product Name"
                              fullWidth
                            />
                            <Field
                              name={`productDetails[${index}].quantity`}
                              as={TextField}
                              label="Quantity"
                              type="number"
                              fullWidth
                            />
                            <Field
                              name={`productDetails[${index}].weight`}
                              as={TextField}
                              label="Weight (kg)"
                              type="number"
                              fullWidth
                            />
                            <Field
                              name={`productDetails[${index}].price`}
                              as={TextField}
                              label="Price"
                              type="number"
                              fullWidth
                            />
                            <Field
                              name={`productDetails[${index}].topay`}
                              as={TextField}
                              select
                              label="Topay / Paid"
                              fullWidth
                            >
                              <MenuItem value="paid">Paid</MenuItem>
                              <MenuItem value="toPay">To Pay</MenuItem>
                              <MenuItem value="none">None</MenuItem>
                            </Field>
                            <IconButton onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                            <Button
                              type="button"
                              onClick={() =>
                                push({
                                  name: "",
                                  quantity: "",
                                  weight: "",
                                  price: "",
                                  topay: "none",
                                })
                              }
                              startIcon={<AddIcon />}
                            >
                              Add
                            </Button>
                          </Box>
                        ))}
                      </>
                    )}
                  </FieldArray>



                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                      name="comments"
                      label="Additional Comments"
                      multiline
                      minRows={10}
                      fullWidth
                      value={values.comments}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        name="amount"
                        label="Amount"
                        value={values.amount}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        name="grandTotal"
                        label="Grand Total"
                        value={values.grandTotal}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        name="roundOff"
                        label="Round Off"
                        value={values.roundOff}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                      <TextField
                        name="finalTotal"
                        label="Final Total"
                        value={values.finalTotal}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={3}>
                      <TextField
                        name="sTax"
                        label="Tax %"
                        value={values.sTax}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setFieldValue("sTax", isNaN(value) ? 0 : value);
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{
                        height: 50,
                        position: 'relative',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                        '&.Mui-disabled': {
                          backgroundColor: 'primary.main',
                          opacity: 0.9,
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          {[0, 1, 2].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'common.white',
                                animation: 'pulse 1.4s infinite ease-in-out',
                                animationDelay: `${i * 0.16}s`,
                                '@keyframes pulse': {
                                  '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                                }
                              }}
                            />
                          ))}
                          <Typography
                            component="span"
                            sx={{
                              ml: 1.5,
                              color: 'common.white',
                              opacity: 0.9
                            }}
                          >
                            Processing...
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircle sx={{ mr: 1, fontSize: '1.2rem' }} />
                          Submit Booking
                        </Box>
                      )}
                    </Button>

                  </Grid>
                </Grid>
              </Box>

              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={snackbar.severity}
                  sx={{ width: "100%" }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Form>
          );
        }}
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
const EffectSyncTotal = ({ values, setFieldValue }) => {
  useEffect(() => {
    // Calculate total amount from product details
    const totalAmount = values.productDetails.reduce((sum, item) => {
      return sum + (parseFloat(item.price) || 0);
    }, 0);

    // Calculate tax amount (assuming sTax is percentage)
    const taxPercentage = parseFloat(values.sTax) || 0;
    const taxAmount = totalAmount * (taxPercentage / 100);

    // Calculate grand total before rounding
    const grandTotal = totalAmount + taxAmount;

    // Calculate rounded total and round-off
    const roundedTotal = Math.round(grandTotal);
    const roundOff = (roundedTotal - grandTotal).toFixed(2);

    // Update form values
    setFieldValue("amount", totalAmount.toFixed(2));
    setFieldValue("grandTotal", grandTotal.toFixed(2));
    setFieldValue("roundOff", roundOff);
    setFieldValue("finalTotal", roundedTotal.toFixed(2));
  }, [values.productDetails, values.sTax, setFieldValue]);
};

export default QuotationForm;