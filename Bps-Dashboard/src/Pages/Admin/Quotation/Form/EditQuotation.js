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
    CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewBookingById, updateBookingById } from "../../../../features/quotation/quotationSlice";
import { ArrowBack } from '@mui/icons-material';

const initialValues = {
    firstName: "",
    lastName: "",
    startStationName: "",
    endStation: "",
    locality: "",
    quotationDate: new Date(),
    proposedDeliveryDate: new Date(),
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
    sTax: "",
    additionalCmt: "",
    productDetails: [{
        name: "",
        quantity: "",
        price: "",
        weight: "",
        toPayPaid: "None",
    }],
    addComment: "",
    ins_vpp: "",
    billTotal: "",
    grandTotal: "",
};

const EditQuotationForm = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, viewedBooking } = useSelector(state => state.quotations);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        if (bookingId) {
            dispatch(viewBookingById(bookingId));
        }
    }, [bookingId, dispatch]);

    useEffect(() => {
        console.log("Viewed Booking Data:", viewedBooking);
    }, [viewedBooking]);

    useEffect(() => {
        if (error) {
            setSnackbar({
                open: true,
                message: error,
                severity: "error",
            });
        }
    }, [error]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (!viewedBooking && bookingId) {
        return <CircularProgress />;
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
                initialValues={{
                    ...initialValues,
                    ...viewedBooking,
                    quotationDate: viewedBooking?.quotationDate ? new Date(viewedBooking.quotationDate) : new Date(),
                    proposedDeliveryDate: viewedBooking?.proposedDeliveryDate ? new Date(viewedBooking.proposedDeliveryDate) : new Date(),
                }}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateBookingById({ bookingId, data: values }))
                        .unwrap()
                        .then(() => {
                            setSnackbar({
                                open: true,
                                message: "Quotation updated successfully!",
                                severity: "success",
                            });
                            setTimeout(() => {
                                navigate("/quotation");
                            }, 1000);
                        })
                        .catch((err) => {
                            setSnackbar({
                                open: true,
                                message: err || "Failed to update quotation",
                                severity: "error",
                            });
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ values, handleChange, setFieldValue, isSubmitting }) => {
                    const handleUpdate = (index) => {
                        const item = values.productDetails[index];

                        if (!item.quantity || !item.weight || !item.price) {
                            setSnackbar({
                                open: true,
                                message: "Please fill all required fields for this item",
                                severity: "error",
                            });
                            return;
                        }

                        console.log("Updating item:", item);
                        setSnackbar({
                            open: true,
                            message: `Item ${index + 1} updated successfully!`,
                            severity: "success",
                        });
                    };

                    return (
                        <Form>
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
                                            fullWidth
                                            label="Start Station"
                                            name="startStationName"
                                            value={values.startStationName}
                                            onChange={handleChange}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Destination Station"
                                            name="endStation"
                                            value={values.endStation}
                                            onChange={handleChange}
                                        >
                                        </TextField>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DatePicker
                                                label="Quotation Date"
                                                value={values.quotationDate}
                                                onChange={(val) => setFieldValue("quotationDate", val)}
                                                renderInput={(params) => (
                                                    <TextField fullWidth {...params} name="quotationDate" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }} >
                                            <DatePicker
                                                label="Proposed Delivery Date"
                                                value={values.proposedDeliveryDate}
                                                onChange={(val) => setFieldValue("proposedDeliveryDate", val)}
                                                minDate={values.quotationDate || new Date()}
                                                renderInput={(params) => (
                                                    <TextField
                                                        fullWidth
                                                        {...params}
                                                        name="proposedDeliveryDate"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 9 }}>
                                        <Typography fontWeight="bold">
                                            Customer Name/Number
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Search for customer"
                                            name="fromCustomerName"
                                            value={values.fromCustomerName}
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

                                    {["firstName", "lastName"].map((name) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={name}>
                                            <TextField
                                                fullWidth
                                                label={name === "firstName" ? "First Name" : "Last Name"}
                                                name={name}
                                                value={values[name]}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    ))}

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Contact Number"
                                            name="mobile"
                                            value={values.mobile || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            value={values.email || ""}
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
                                            fullWidth
                                            label="State"
                                            name="fromState"
                                            value={values.fromState}
                                            onChange={handleChange}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            name="fromCity"
                                            value={values.fromCity}
                                            onChange={handleChange}
                                        >
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

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">To (Address)</Typography>
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
                                            fullWidth
                                            label="State"
                                            name="toState"
                                            value={values.toState}
                                            onChange={handleChange}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            name="toCity"
                                            value={values.toCity}
                                            onChange={handleChange}
                                        >
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

                                    <FieldArray name="productDetails">
                                        {({ push, remove }) => (
                                            <>
                                                {values.productDetails.map((item, index) => (
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
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Name"
                                                                name={`productDetails[${index}].name`}
                                                                value={item.name}
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Quantity"
                                                                name={`productDetails[${index}].quantity`}
                                                                value={item.quantity}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Price"
                                                                name={`productDetails[${index}].price`}
                                                                value={item.price}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Weight (kg)"
                                                                name={`productDetails[${index}].weight`}
                                                                value={item.weight}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 1.5 }}>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                size="small"
                                                                label="To Pay/Paid"
                                                                name={`productDetails[${index}].toPayPaid`}
                                                                value={item.toPayPaid}
                                                                onChange={handleChange}
                                                            >
                                                            </TextField>
                                                        </Grid>
                                                        <Grid size={{ xs: 3, sm: 1.5, md: 1 }}>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => handleUpdate(index)}
                                                                variant="contained"
                                                                fullWidth
                                                                size="small"
                                                            >
                                                                Update
                                                            </Button>
                                                        </Grid>
                                                        <Grid size={{ xs: 3, sm: 1.5, md: 1 }}>
                                                            <Button
                                                                color="error"
                                                                onClick={() => remove(index)}
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
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
                                                        startIcon={<AddIcon />}
                                                        onClick={() =>
                                                            push({
                                                                name: "",
                                                                quantity: "",
                                                                price: "",
                                                                weight: "",
                                                                toPayPaid: "None",
                                                            })
                                                        }
                                                    >
                                                        Add Item
                                                    </Button>
                                                </Grid>
                                            </>
                                        )}
                                    </FieldArray>

                                    <Grid size={{ xs: 12, md: 9 }}>
                                        <TextField
                                            name="additionalCmt"
                                            label="Additional Comments"
                                            multiline
                                            minRows={3}
                                            fullWidth
                                            value={values.additionalCmt}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Grid container spacing={2}>
                                            {[
                                                ["sTax", "sTax"],
                                                ["grandTotal", "Grand Total"],
                                            ].map(([name, label]) => (
                                                <Grid size={{ xs: 6 }} key={name}>
                                                    <TextField
                                                        name={name}
                                                        label={label}
                                                        value={values[name]}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            startAdornment: name !== "grandTotal" ? (
                                                                <InputAdornment position="start">₹</InputAdornment>
                                                            ) : null,
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
                                            sx={{ mt: 2 }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <CircularProgress size={24} /> : "Update Quotation"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Snackbar
                                open={snackbar.open}
                                autoHideDuration={4000}
                                onClose={handleCloseSnackbar}
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
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

export default EditQuotationForm;