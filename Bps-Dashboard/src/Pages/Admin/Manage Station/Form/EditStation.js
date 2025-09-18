import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    Button,
    TextField,
    Card,
    CardContent,
    MenuItem
} from '@mui/material';
import { Home, Business, Save, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateStationById, getStationById } from '../../../../features/stations/stationSlice';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';

const EditableTextField = ({ label, value, onChange, name }) => (
    <Grid item xs={12} sm={6} md={4}>
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { fontWeight: 600 } }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    '&:hover fieldset': {
                        borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                    }
                },
                mb: 2
            }}
        />
    </Grid>
);

const SectionHeader = ({ icon, title }) => (
    <Box sx={{
        bgcolor: 'primary.light',
        px: 2,
        py: 1,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        mb: 2
    }}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>{title}</Typography>
    </Box>
);

const EditStation = () => {
    const navigate = useNavigate();
    const { stationId } = useParams();
    const dispatch = useDispatch();
    const { states, cities } = useSelector((state) => state.location);
    const viewedStation = useSelector(state => state.stations.viewedStation);

    const [form, setForm] = useState({
        stationName: '',
        contact: '',
        emailId: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        gst: '',
    });

    // Fetch states on mount
    useEffect(() => {
        dispatch(fetchStates());
    }, [dispatch]);

    // Fetch cities when state changes
    useEffect(() => {
        if (form.state) {
            dispatch(fetchCities(form.state));
        } else {
            dispatch(clearCities());
        }
    }, [form.state, dispatch]);

    // Fetch station details
    useEffect(() => {
        dispatch(getStationById(stationId));
    }, [stationId, dispatch]);

    // Set form values when station data is loaded
    useEffect(() => {
        if (viewedStation) {
            setForm({
                stationName: viewedStation.stationName || '',
                contact: viewedStation.contact || '',
                emailId: viewedStation.emailId || '',
                address: viewedStation.address || '',
                state: viewedStation.state || '',
                city: viewedStation.city || '',
                pincode: viewedStation.pincode || '',
                gst: viewedStation.gst || '',
            });
        }
    }, [viewedStation]);

    if (!viewedStation) {
        return <Typography variant='h4'>Loading...</Typography>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        dispatch(updateStationById({ stationId, data: form }))
            .unwrap()
            .then(() => {
                navigate('/station');
            })
            .catch((error) => {
                console.error('Update failed:', error);
                alert(error.message || 'Update failed');
            });
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" fontWeight={600}>
                        Edit Station
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate(-1)}
                            sx={{ mr: 2 }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>

                <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <CardContent sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
                        <SectionHeader icon={<Business />} title="Edit Station Information" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <EditableTextField label="Station Name" name="stationName" value={form.stationName} onChange={handleChange} />
                            <EditableTextField label="Contact" name="contact" value={form.contact} onChange={handleChange} />
                            <EditableTextField label="Email ID" name="emailId" value={form.emailId} onChange={handleChange} />
                            <EditableTextField label="Address" name="address" value={form.address} onChange={handleChange} />

                            {/* State Dropdown */}
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    select
                                    label="State"
                                    name="state"
                                    value={form.state}
                                    onChange={(e) => {
                                        const selectedState = e.target.value;
                                        setForm(prev => ({
                                            ...prev,
                                            state: selectedState,
                                            city: '',
                                        }));
                                        dispatch(fetchCities(selectedState));
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontWeight: 600 } }}
                                    sx={{
                                        minWidth: 250,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#fff',
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                                            }
                                        },
                                        mb: 2
                                    }}
                                >
                                    {Array.isArray(states) && states.map((state) => (
                                        <MenuItem key={state} value={state}>
                                            {state}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* City Dropdown */}
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    select
                                    label="City"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontWeight: 600 } }}
                                    sx={{
                                        minWidth: 250,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#fff',
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                                            }
                                        },
                                        mb: 2
                                    }}
                                >
                                    {Array.isArray(cities) && cities.map((city) => (
                                        <MenuItem key={city} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <EditableTextField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
                            <EditableTextField label="GST Number" name="gst" value={form.gst} onChange={handleChange} />
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default EditStation;