import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import {
    Box, Button, Grid, MenuItem, TextField, Typography,
    FormControl, InputLabel, Select, FormHelperText,
    IconButton, InputAdornment, Snackbar, Alert
} from "@mui/material";

import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { createUsers } from '../../../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { fetchStations } from '../../../../features/stations/stationSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Required"),
    startStation: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    emailId: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    contactNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    distinct: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    idProof: Yup.string().required("Required"),
    idProofPhoto: Yup.mixed().required("Required"),
    adminProfilePhoto: Yup.mixed().required("Required"),
});

// Helper function to decode HTML entities
const decodeHTMLEntities = (text) => {
    if (typeof text !== 'string') return text;

    const entities = {
        '&#39;': "'",
        '&quot;': '"',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&nbsp;': ' ',
    };

    return text.replace(/&#?[a-z0-9]+;/g, (match) => {
        return entities[match] || match;
    });
};

const UserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { states, cities } = useSelector((state) => state.location);
    const { list: stations } = useSelector((state) => state.stations);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            startStation: "",
            role: "",
            emailId: "",
            password: "",
            contactNumber: "",
            address: "",
            distinct: "",
            state: "",
            city: "",
            pincode: "",
            idProof: "",
            idProofPhoto: null,
            adminProfilePhoto: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(createUsers(values)).unwrap();
                formik.resetForm();
                setSnackbar({
                    open: true,
                    message: "User registered successfully",
                    severity: "success"
                });
                setTimeout(() => {
                    navigate('/users');
                }, 1500);
            } catch (error) {
                console.log("Full error:", error);

                // Handle the new consistent error structure
                if (error?.errors) {
                    Object.keys(error.errors).forEach((field) => {
                        formik.setFieldError(field, error.errors[field]);
                    });
                }

                // Decode HTML entities in the error message
                const decodedMessage = decodeHTMLEntities(error?.message) || "Registration failed";

                setSnackbar({
                    open: true,
                    message: decodedMessage,
                    severity: "error"
                });
            }
        },
    });

    useEffect(() => {
        dispatch(fetchStates());
        dispatch(fetchStations());
    }, [dispatch]);

    useEffect(() => {
        if (formik.values.state) {
            dispatch(fetchCities(formik.values.state));
        } else {
            dispatch(clearCities());
        }
    }, [formik.values.state, dispatch]);

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>
                Add New Admin / Supervisor
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>

                    {/* Name Fields */}
                    {["firstName", "middleName", "lastName"].map((field) => (
                        <Grid item size={{ xs: 12, md: 4 }} key={field}>
                            <TextField
                                fullWidth
                                label={field.replace(/([A-Z])/g, " $1")}
                                name={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field] && Boolean(formik.errors[field])}
                                helperText={formik.touched[field] && formik.errors[field]}
                            />
                        </Grid>
                    ))}

                    {/* Station & Role */}
                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            select
                            fullWidth
                            label="Select Station"
                            name="startStation"
                            value={formik.values.startStation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startStation && Boolean(formik.errors.startStation)}
                            helperText={formik.touched.startStation && formik.errors.startStation}
                        >
                            {stations.map((station) => (
                                <MenuItem key={station.stationId} value={station.stationName}>
                                    {station.stationName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Role"
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="supervisor">Supervisor</MenuItem>
                            </Select>
                            <FormHelperText>{formik.touched.role && formik.errors.role}</FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* Email & Password */}
                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="emailId"
                            value={formik.values.emailId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                            helperText={formik.touched.emailId && formik.errors.emailId}
                        />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    {/* Contact */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contactNumber"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Address</Typography>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>

                    {/* Location Fields */}
                    <Grid item size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
                            <InputLabel>State</InputLabel>
                            <Select
                                name="state"
                                value={formik.values.state}
                                onChange={(e) => {
                                    const selectedState = e.target.value;
                                    formik.setFieldValue('state', selectedState);
                                    formik.setFieldValue('city', '');
                                    dispatch(fetchCities(selectedState));
                                }}
                                onBlur={formik.handleBlur}
                                label="State"
                            >
                                {states.map((state) => (
                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.state && formik.errors.state}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth error={formik.touched.city && Boolean(formik.errors.city)}>
                            <InputLabel>City</InputLabel>
                            <Select
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="City"
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.city && formik.errors.city}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="District"
                            name="distinct"
                            value={formik.values.distinct}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.distinct && Boolean(formik.errors.distinct)}
                            helperText={formik.touched.distinct && formik.errors.distinct}
                        />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            type="number"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>

                    {/* Documents */}
                    <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Documents</Typography>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="ID Proof No."
                            name="idProof"
                            value={formik.values.idProof}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.idProof && Boolean(formik.errors.idProof)}
                            helperText={formik.touched.idProof && formik.errors.idProof}
                        />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 3 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            color={formik.errors.idProofPhoto ? "error" : "primary"}
                        >
                            Upload ID Proof
                            <input
                                type="file"
                                hidden
                                onChange={(e) => formik.setFieldValue("idProofPhoto", e.currentTarget.files[0])}
                                onBlur={formik.handleBlur}
                            />
                        </Button>
                        {formik.touched.idProofPhoto && formik.errors.idProofPhoto && (
                            <FormHelperText error>{formik.errors.idProofPhoto}</FormHelperText>
                        )}
                    </Grid>

                    <Grid item size={{ xs: 12, md: 3 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            color={formik.errors.adminProfilePhoto ? "error" : "primary"}
                        >
                            Upload Admin Photo
                            <input
                                type="file"
                                hidden
                                onChange={(e) => formik.setFieldValue("adminProfilePhoto", e.currentTarget.files[0])}
                                onBlur={formik.handleBlur}
                            />
                        </Button>
                        {formik.touched.adminProfilePhoto && formik.errors.adminProfilePhoto && (
                            <FormHelperText error>{formik.errors.adminProfilePhoto}</FormHelperText>
                        )}
                    </Grid>

                    {/* Submit */}
                    <Grid item size={{ xs: 12 }} display="flex" justifyContent="center" sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Improved Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserForm;