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
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { fetchStations } from '../../../../features/stations/stationSlice'
import { createBooking } from '../../../../features/booking/bookingSlice';
import { useNavigate } from "react-router-dom";
import CustomerSearch from "../../../../Components/CustomerSearch";
import { ArrowBack } from '@mui/icons-material';
import CheckCircle from '@mui/icons-material/CheckCircle';

const toPay = ['toPay', 'paid', 'none'];

const generateUniqueId = (prefix, existingSet, setFunction) => {
  let newId;
  do {
    newId = prefix + Math.random().toString(36).substr(2, 6).toUpperCase();
  } while (existingSet.has(newId));

  const updatedSet = new Set(existingSet);
  updatedSet.add(newId);
  setFunction(updatedSet);

  return newId;
};

// Dummy setters for initial render
const dummySet = new Set();
const dummySetter = () => { };

const generateInitialValues = () => {
  const receiptNo = generateUniqueId("RCPT-", dummySet, dummySetter);
  const refNo = generateUniqueId("REF-", dummySet, dummySetter);

  return {
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
        receiptNo: receiptNo,
        refNo: refNo,
        insurance: "",
        vppAmount: "",
        toPay: "",
        // toPayPaid: "",
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
};
const totalFields = [
  { name: "freight", label: "FREIGHT", readOnly: false },
  { name: "ins_vpp", label: "INS/VPP", readOnly: false },
  { name: "billTotal", label: "Bill Total", readOnly: true },
  { name: "cgst", label: "CGST%", readOnly: false },
  { name: "sgst", label: "SGST%", readOnly: false },
  { name: "igst", label: "IGST%", readOnly: false },
  { name: "grandTotal", label: "Grand Total", readOnly: true },
  { name: "roundOff", label: "Round Off", readOnly: true },
];
const calculateTotals = (values) => {
  const items = values.items || [];

  const itemTotal = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const freight = Number(values.freight || 0);
  const ins_vpp = Number(values.ins_vpp || 0);

  const billTotal = itemTotal + freight + ins_vpp;

  const cgst = (Number(values.cgst || 0) / 100) * billTotal;
  const sgst = (Number(values.sgst || 0) / 100) * billTotal;
  const igst = (Number(values.igst || 0) / 100) * billTotal;

  let grandTotal = billTotal + cgst + sgst + igst;

  // --- Round Off Calculation ---
  const roundedGrandTotal = Math.round(grandTotal); // round to nearest whole number
  const roundOff = (roundedGrandTotal - grandTotal).toFixed(2);

  grandTotal = roundedGrandTotal; // update grand total to rounded value

  return {
    billTotal: billTotal.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
    computedTotalRevenue: grandTotal.toFixed(2),
    cgst: cgst.toFixed(2),
    sgst: sgst.toFixed(2),
    igst: igst.toFixed(2),
    roundOff
  };
};



const BookingForm = () => {
  const [senderCities, setSenderCities] = React.useState([]);
  const [receiverCities, setReceiverCities] = React.useState([]);
  const [generatedReceiptNos, setGeneratedReceiptNos] = React.useState(new Set());
  const [generatedRefNos, setGeneratedRefNos] = React.useState(new Set());



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
        initialValues={generateInitialValues()}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            setSubmitting(true);
            await dispatch(createBooking(values)).unwrap();
            resetForm();
            navigate('/booking')
          } catch (error) {
            console.log("Error while adding booking", error);
          } finally {
            setSubmitting(false);
          }
        }
        }
      >
        {({ values, handleChange, setFieldValue, isSubmitting }) => (
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
            {/* ... all your form fields go here ... */}
            <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                      label="Booking Date"
                      value={values.bookingDate}
                      onChange={(val) => setFieldValue("bookingDate", val)}
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} name="bookingDate" />
                      )}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          name: "bookingDate",
                          error: false,
                          InputProps: {
                            sx: { width: 495 },
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                      label="Proposed Delivery Date"
                      value={values.deliveryDate}
                      onChange={(val) => setFieldValue("deliveryDate", val)}
                      minDate={values.bookingDate || new Date()}
                      format="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} name="deliveryDate" />
                      )}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          name: "deliveryDate",
                          error: false,
                          InputProps: {
                            sx: { width: 495 },
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
                  <CustomerSearch
                    type="sender"
                    onCustomerSelect={(customer) => {
                      if (customer) {
                        setFieldValue("senderName", customer.name || "");
                        setFieldValue("senderGgt", customer.gstNumber || "");
                        setFieldValue("senderLocality", customer.address || "");
                        setFieldValue("fromState", customer.state || "");
                        setFieldValue("fromCity", customer.city || "");
                        setFieldValue("senderPincode", customer.pincode || "");
                        setFieldValue("contactNumber", customer.contactNumber?.toString() || "");
                        setFieldValue("email", customer.emailId || "");
                      } else {
                        setFieldValue("senderName", "");
                        setFieldValue("senderGgt", "");
                        setFieldValue("senderLocality", "");
                        setFieldValue("fromState", "");
                        setFieldValue("fromCity", "");
                        setFieldValue("senderPincode", "");
                        setFieldValue("contactNumber", "");
                        setFieldValue("email", "");
                      }
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    name="senderName"
                    value={values.senderName || ""}
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Contact Number"
                    name="contactNumber"
                    value={values.contactNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
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
                  <CustomerSearch
                    type="receiver"
                    onCustomerSelect={(customer) => {
                      if (customer) {
                        setFieldValue("receiverName", customer.name || "");
                        setFieldValue("receiverGgt", customer.gstNumber || "");
                        setFieldValue("receiverLocality", customer.address || "");
                        setFieldValue("toState", customer.state || "");
                        setFieldValue("toCity", customer.city || "");
                        setFieldValue("toPincode", customer.pincode || "");
                        setFieldValue("receiverContact", customer.contactNumber?.toString() || "");
                        setFieldValue("receiverEmail", customer.emailId || "");
                      } else {
                        setFieldValue("receiverName", "");
                        setFieldValue("receiverGgt", "");
                        setFieldValue("receiverLocality", "");
                        setFieldValue("toState", "");
                        setFieldValue("toCity", "");
                        setFieldValue("toPincode", "");
                        setFieldValue("receiverContact", "");
                        setFieldValue("receiverEmail", "");
                      }
                    }}
                  />
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Contact Number"
                    name="receiverContact"
                    value={values.receiverContact || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    name="receiverEmail"
                    value={values.receiverEmail || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((_, index) => (
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
                          {[
                            "receiptNo",
                            "refNo",
                            "insurance",
                            "vppAmount",
                            "weight",
                            "amount",
                          ].map((field) => (
                            <Grid size={{ xs: 6, sm: 3, md: 1.5 }} key={field}>
                              <Field
                                as={TextField}
                                fullWidth
                                size="small"
                                label={field.replace(/([A-Z])/g, " $1")}
                                name={`items[${index}].${field}`}
                              />
                            </Grid>
                          ))}
                          <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="Payment"
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
                          <Grid size={{ xs: 6, sm: 3, md: 1 }}>
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="outlined"
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                          <Grid size={{ xs: 6, sm: 3, md: 3 }} textAlign={{ xs: 'left', sm: 'left' }}>
                            <Button
                              variant="outlined"
                              disableElevation
                              sx={{
                                backgroundColor: '#f0f4ff',
                                color: '#333',
                                px: 2.5,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 500,
                                textTransform: 'none',
                                boxShadow: 'none',
                                borderColor: '#bcd0f7',
                                '&:hover': {
                                  backgroundColor: '#dbe8ff',
                                  borderColor: '#90b4f0',
                                },
                              }}
                            >
                              Total Parcels: <strong style={{ marginLeft: 4 }}>{values.items.length}</strong>
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
                              receiptNo: generateUniqueId("RCPT-", generatedReceiptNos, setGeneratedReceiptNos),
                              refNo: generateUniqueId("REF-", generatedRefNos, setGeneratedRefNos),
                              insurance: "",
                              vppAmount: "",
                              toPayPaid: "",
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

                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                    name="addComment"
                    label="Additional addComment"
                    multiline
                    minRows={10}
                    fullWidth
                    value={values.addComment}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={2}>
                    {totalFields.map(({ name, label, readOnly }) => (
                      <Grid size={{ sm: 6 }} key={name}>
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
    setFieldValue("roundOff", totals.roundOff);
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