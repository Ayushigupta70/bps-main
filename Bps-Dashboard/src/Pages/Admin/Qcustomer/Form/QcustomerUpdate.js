import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Grid, TextField, Button, Divider, Avatar, Card, CardContent, MenuItem
} from '@mui/material';
import { Person, Home, InsertDriveFile, Save, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { viewCustomerById, updateCustomer } from '../../../../features/qcustomers/qcustomerSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // You may need to use Axios or Fetch to handle the file upload
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
const EditableTextField = ({ label, name, value, onChange }) => (
    <Grid item xs={12} sm={6} md={4}>
        <TextField
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            InputLabelProps={{ style: { fontWeight: 600 } }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    '&:hover fieldset': { borderColor: '#1976d2' },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                    },
                },
                mb: 2
            }}
        />
    </Grid>
);

const SectionHeader = ({ icon, title }) => (
    <Box sx={{ bgcolor: 'primary.light', px: 2, py: 1, borderRadius: 1, display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>{title}</Typography>
    </Box>
);

const QcustomerUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { customerId } = useParams();
    const { form: customerData, loading } = useSelector(state => state.customers);
    const { states, cities } = useSelector((state) => state.location);
    const [form, setForm] = useState({
        firstName: '', middleName: '', lastName: '',
        contactNumber: '', email: '',
        address: '', state: '', city: '', district: '', pincode: '',
        idProof: '', idPhoto: '', customerPhoto: '', stateCode: ''
    });

    useEffect(() => {
        dispatch(viewCustomerById(customerId));
    }, [dispatch, customerId]);

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

    useEffect(() => {
        if (customerData) {
            setForm({
                firstName: customerData.firstName || '',
                middleName: customerData.middleName || '',
                lastName: customerData.lastName || '',
                contactNumber: customerData.contactNumber || '',
                email: customerData.email || '',
                address: customerData.address || '',
                state: customerData.state || '',
                city: customerData.city || '',
                district: customerData.district || '',
                pincode: customerData.pincode || '',
                idProof: customerData.idProof || '',
                idPhoto: customerData.idPhoto || '',
                customerPhoto: customerData.customerPhoto || '',
                stateCode: customerData.stateCode || ''
            });
        }
    }, [customerData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create temporary preview
        const previewUrl = URL.createObjectURL(file);
        setForm(prev => ({
            ...prev,
            [fieldName === 'idProofPhoto' ? 'idPhoto' : 'customerPhoto']: previewUrl
        }));

        const formData = new FormData();
        formData.append(fieldName, file);

        try {
            const response = await axios.put(
                `https://api.bharatparcel.org/api/v2/customers/update/${customerId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Get the updated image path from response
            const updatedImagePath = response.data.message[fieldName];
            const fullImageUrl = `https://api.bharatparcel.org/${updatedImagePath.replace(/\\/g, '/').replace(/^\/+/g, '')}?ts=${Date.now()}`;

            // Update state with the new image URL
            setForm(prev => ({
                ...prev,
                [fieldName === 'idProofPhoto' ? 'idPhoto' : 'customerPhoto']: fullImageUrl
            }));

            // Refresh customer data
            dispatch(viewCustomerById(customerId));
        } catch (error) {
            console.error('Upload failed:', error);
            // Revert to previous image
            setForm(prev => ({
                ...prev,
                [fieldName === 'idProofPhoto' ? 'idPhoto' : 'customerPhoto']:
                    customerData[fieldName === 'idProofPhoto' ? 'idPhoto' : 'customerPhoto']
            }));
        } finally {
            e.target.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append all fields to formData
        Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== undefined) {
                // Handle field name mapping for backend
                const backendFieldName = key === 'email' ? 'emailId' : key;
                formData.append(backendFieldName, form[key]);
            }
        });

        dispatch(updateCustomer({ customerId, data: formData }))
            .unwrap()
            .then(() => {
                alert('Customer updated successfully!');
                navigate('/qcustomer');
            })
            .catch(err => alert(`Error: ${err}`));
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" fontWeight={600}>
                        Update Customer
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
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                </Box>

                <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <CardContent>
                        <SectionHeader icon={<Person />} title="Personal Information" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <EditableTextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} />
                            <EditableTextField name="middleName" label="Middle Name" value={form.middleName} onChange={handleChange} />
                            <EditableTextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} />
                            <EditableTextField name="contactNumber" label="Contact Number" value={form.contactNumber} onChange={handleChange} />
                            <EditableTextField name="email" label="Email" value={form.email} onChange={handleChange} />
                        </Grid>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <CardContent>
                        <SectionHeader icon={<Home />} title="Address Information" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <EditableTextField name="address" label="Address" value={form.address} onChange={handleChange} />
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
                            <EditableTextField name="district" label="District" value={form.district} onChange={handleChange} />
                            <EditableTextField name="pincode" label="Pincode" value={form.pincode} onChange={handleChange} />
                            <EditableTextField name="stateCode" label="State Code" value={form.stateCode} onChange={handleChange} />
                        </Grid>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <CardContent>
                        <SectionHeader icon={<InsertDriveFile />} title="Documents" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <EditableTextField name="idProof" label="ID Proof" value={form.idProof} onChange={handleChange} />
                            <Grid container spacing={2}>

                                {/* ID Photo Upload */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                                    <Avatar
                                        src={`${form.idPhoto}?ts=${Date.now()}`}
                                        variant="rounded"
                                        sx={{ width: 100, height: 100, mt: 1 }}
                                        onError={(e) => {
                                            e.target.src = '/placeholder.png';
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 1 }}
                                        onClick={() => document.getElementById('idProofFileInput').click()}
                                    >
                                        {form.idPhoto ? 'Change Photo' : 'Upload Photo'}
                                    </Button>
                                    <input
                                        id="idProofFileInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageChange(e, 'idProofPhoto')}
                                    />
                                    {form.idPhoto && (
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            Current: {form.idPhoto.split('/').pop()}
                                        </Typography>
                                    )}
                                </Grid>

                                {/* Customer Photo Upload */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body2" fontWeight={600}>Customer Photo</Typography>
                                    <Avatar
                                        src={form.customerPhoto || '/placeholder.png'}
                                        variant="rounded"
                                        sx={{ width: 100, height: 100, mt: 1 }}
                                        onError={(e) => {
                                            e.target.src = '/placeholder.png';
                                            console.error('Failed to load customer photo:', form.customerPhoto);
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 1 }}
                                        onClick={() => document.getElementById('customerPhotoFileInput').click()}
                                    >
                                        {form.customerPhoto ? 'Change Photo' : 'Upload Photo'}
                                    </Button>
                                    <input
                                        id="customerPhotoFileInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageChange(e, 'customerProfilePhoto')}
                                    />
                                    {form.customerPhoto && (
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            Current: {form.customerPhoto.split('/').pop()}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default QcustomerUpdate;
