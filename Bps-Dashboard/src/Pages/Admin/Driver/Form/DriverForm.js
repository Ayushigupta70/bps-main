import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Card,
    CardContent,
    Divider,
    FormHelperText
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { addDriver } from '../../../../features/Driver/driverSlice'
import { useNavigate } from 'react-router-dom';

const DriverForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { states, cities } = useSelector((state) => state.location);
    // Validation Schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        contactNumber: Yup.string()
            .required('Contact Number is required')
            .matches(/^[0-9]{10}$/, 'Contact Number must be 10 digits'),
        emailId: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        address: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        district: Yup.string().required('District is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
        idProof: Yup.string().required('ID Proof is required'),
        idProofPhoto: Yup.mixed().required('ID Photo is required'),
        dlNumber: Yup.string().required('DL Number is required'),
        driverProfilePhoto: Yup.mixed().required('Customer Photo is required')
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            contactNumber: '',
            emailId: '',
            password: '',
            address: '',
            state: '',
            city: '',
            district: '',
            pincode: '',
            idProof: '',
            idProofPhoto: null,
            dlNumber: '',
            driverProfilePhoto: null
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(addDriver(values)).unwrap();
                formik.resetForm();
                navigate('/driver')
            }
            catch (error) {
                console.log("Error while adding driver", error);
            }
        }
    });
    useEffect(() => {
        dispatch(fetchStates());
    }, [])

    useEffect(() => {
        if (formik.values.state) {
            dispatch(fetchCities(formik.values.state));
        }
        else {
            dispatch(clearCities());
        }
    }, [formik.values.state, dispatch])

    const handleFileChange = (field, file) => {
        formik.setFieldValue(field, file);
        formik.setFieldTouched(field, true, false);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    Driver Registration
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Personal Information Section */}
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                        Personal Information
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="First Name *"
                                                variant="outlined"
                                                name="firstName"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Middle Name"
                                                variant="outlined"
                                                name="middleName"
                                                value={formik.values.middleName}
                                                onChange={formik.handleChange}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Last Name *"
                                                variant="outlined"
                                                name="lastName"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Contact Number *"
                                                variant="outlined"
                                                name="contactNumber"
                                                value={formik.values.contactNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                                size="small"
                                                type="tel"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email ID *"
                                                type="email"
                                                variant="outlined"
                                                name="emailId"
                                                value={formik.values.emailId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                                                helperText={formik.touched.emailId && formik.errors.emailId}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Password *"
                                                type="password"
                                                variant="outlined"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Address Section */}
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                        Address Information
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Address / Street *"
                                                variant="outlined"
                                                name="address"
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                helperText={formik.touched.address && formik.errors.address}
                                                size="small"
                                                multiline
                                                rows={2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                error={formik.touched.state && Boolean(formik.errors.state)}
                                                sx={{ minWidth: 300 }}
                                            >
                                                <InputLabel>State *</InputLabel>
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
                                                    label="State *"
                                                >
                                                    {Array.isArray(states) && states.map((state) => (
                                                        <MenuItem key={state} value={state}>{state}</MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.state && formik.errors.state && (
                                                    <FormHelperText>{formik.errors.state}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                error={formik.touched.city && Boolean(formik.errors.city)}
                                                sx={{ minWidth: 300 }}
                                            >
                                                <InputLabel>City *</InputLabel>
                                                <Select
                                                    name="city"
                                                    value={formik.values.city}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    label="City *"
                                                >
                                                    {Array.isArray(states) && cities.map((city) => (
                                                        <MenuItem key={city} value={city}>{city}</MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.city && formik.errors.city && (
                                                    <FormHelperText>{formik.errors.city}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                fullWidth
                                                label="District *"
                                                variant="outlined"
                                                name="district"
                                                value={formik.values.district}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.district && Boolean(formik.errors.district)}
                                                helperText={formik.touched.district && formik.errors.district}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Pincode *"
                                                variant="outlined"
                                                name="pincode"
                                                value={formik.values.pincode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                                helperText={formik.touched.pincode && formik.errors.pincode}
                                                size="small"
                                                type="number"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Document Section */}
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                        Document Verification
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                fullWidth
                                                label="DL Number *"
                                                variant="outlined"
                                                name="dlNumber"
                                                value={formik.values.dlNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.dlNumber && Boolean(formik.errors.dlNumber)}
                                                helperText={formik.touched.dlNumber && formik.errors.dlNumber}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                fullWidth
                                                label="ID Proof *"
                                                variant="outlined"
                                                name="idProof"
                                                value={formik.values.idProof}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.idProof && Boolean(formik.errors.idProof)}
                                                helperText={formik.touched.idProof && formik.errors.idProof}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                component="label"
                                                startIcon={<CloudUpload />}
                                                size="small"
                                                sx={{ height: '40px' }}
                                                color={formik.touched.idProofPhoto && formik.errors.idProofPhoto ? 'error' : 'primary'}
                                            >
                                                Upload ID Photo *
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('idProofPhoto', e.target.files[0])}
                                                />
                                            </Button>
                                            {formik.values.idProofPhoto && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {formik.values.idProofPhoto.name}
                                                </Typography>
                                            )}
                                            {formik.touched.idProofPhoto && formik.errors.idProofPhoto && (
                                                <FormHelperText error>{formik.errors.idProofPhoto}</FormHelperText>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                component="label"
                                                startIcon={<CloudUpload />}
                                                size="small"
                                                sx={{ height: '40px' }}
                                                color={formik.touched.driverProfilePhoto && formik.errors.driverProfilePhoto ? 'error' : 'primary'}
                                            >
                                                Upload Driver Photo *
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('driverProfilePhoto', e.target.files[0])}
                                                />
                                            </Button>
                                            {formik.values.driverProfilePhoto && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {formik.values.driverProfilePhoto.name}
                                                </Typography>
                                            )}
                                            {formik.touched.driverProfilePhoto && formik.errors.driverProfilePhoto && (
                                                <FormHelperText error>{formik.errors.driverProfilePhoto}</FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ px: 6, py: 1.5, fontSize: '1rem' }}
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                Submit Registration
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default DriverForm;