import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, Grid, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton,
  Typography, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { Close, LocalPhone, Email, Home, LocationOn, PinDrop } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { createStation, fetchStations } from '../../../../features/stations/stationSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Alert } from '@mui/material';

const StationForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { states, cities } = useSelector((state) => state.location);
  const [serverError, setServerError] = useState('');


  const validationSchema = Yup.object().shape({
    stationName: Yup.string().required('Station name is required'),
    contact: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required(),
    emailId: Yup.string().email('Invalid email').required(),
    address: Yup.string().required(),
    street: Yup.string(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    gst: Yup.string().required(),
    pincode: Yup.string().matches(/^\d{6}$/, 'Must be 6 digits').required(),
  });

  const formik = useFormik({
    initialValues: {
      stationName: '',
      contact: '',
      emailId: '',
      address: '',
      street: '',
      state: '',
      city: '',
      pincode: '',
      gst: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setServerError('');
      try {
        await dispatch(createStation(values)).unwrap();
        await dispatch(fetchStations());
        formik.resetForm();
        onClose();
      } catch (errMessage) {
        setServerError(errMessage);
        console.error("Error creating station:", errMessage);
      }
    }
  });

  useEffect(() => {
    dispatch(fetchStates());
  }, []);
  useEffect(() => {
    if (formik.values.state) {
      dispatch(fetchCities(formik.values.state));
    } else {
      dispatch(clearCities());
    }
  }, [formik.values.state, dispatch]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Add New Station</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Station Name" name="stationName"
                value={formik.values.stationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stationName && Boolean(formik.errors.stationName)}
                helperText={formik.touched.stationName && formik.errors.stationName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                fullWidth label="Contact" name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="Email" name="emailId" type="email"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                helperText={formik.touched.emailId && formik.errors.emailId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="Address" name="address" multiline rows={2}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl
                fullWidth
                error={formik.touched.state && Boolean(formik.errors.state)}
                sx={{ minWidth: 300 }} // Increase this value as needed
              >
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  id="state"
                  name="state"
                  label="State"
                  labelId="state-label"
                  value={formik.values.state}
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    formik.setFieldValue('state', selectedState);
                    formik.setFieldValue('city', '');
                    dispatch(fetchCities(selectedState));
                  }}
                  onBlur={formik.handleBlur}
                >
                  {Array.isArray(states) &&
                    states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <Typography variant="caption" color="error">
                    {formik.errors.state}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl
                fullWidth
                error={formik.touched.city && Boolean(formik.errors.city)}
                sx={{ minWidth: 300 }}
              >
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  id="city"
                  name="city"
                  label="City"
                  labelId="city-label"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.state}
                >
                  {Array.isArray(states) &&
                    cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
                {formik.touched.city && formik.errors.city && (
                  <Typography variant="caption" color="error">
                    {formik.errors.city}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="PIN Code" name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="GST Number" name="gst"
                value={formik.values.gst}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gst && Boolean(formik.errors.gst)}
                helperText={formik.touched.gst && formik.errors.gst}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Save Station
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationForm;