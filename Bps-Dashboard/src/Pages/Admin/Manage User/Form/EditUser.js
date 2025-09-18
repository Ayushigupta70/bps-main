import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    TextField, Button, Box, Typography, Grid,
    Paper, Card, CardContent, Divider, Avatar, MenuItem
} from '@mui/material';
import { InsertDriveFile, Save, ArrowBack } from '@mui/icons-material';
import { updateUser, viewUserById } from '../../../../features/user/userSlice';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AUTH_API, FILES_BASE_URL } from "../../../../utils/api";

const EditUser = () => {
    const navigate = useNavigate();
    const { adminId } = useParams();
    const dispatch = useDispatch();

    const { form: userData, loading } = useSelector(state => state.users);
    const { states, cities } = useSelector((state) => state.location);
    const [form, setForm] = useState({
        firstName: '', middleName: '', lastName: '',
        contactNumber: '', emailId: '',
        address: '', state: '', startStation: '', city: '', distinct: '', pincode: '',
        idProof: '', idPhoto: '', adminPhoto: ''
    });

    useEffect(() => {
        dispatch(viewUserById(adminId));
    }, [dispatch, adminId]);


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
        if (userData) {
            setForm({
                firstName: userData.firstName || '',
                middleName: userData.middleName || '',
                lastName: userData.lastName || '',
                contactNumber: userData.contactNumber || '',
                emailId: userData.emailId || '',
                address: userData.address || '',
                state: userData.state || '',
                city: userData.city || '',
                distinct: userData.distinct || '',
                pincode: userData.pincode || '',
                idProof: userData.idProof || '',
                idPhoto: userData.idPhoto || '',
                adminPhoto: userData.adminPhoto || ''

            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setForm(prev => ({
            ...prev,
            [fieldName === 'idProofPhoto' ? 'idPhoto' : 'adminPhoto']: previewUrl
        }));

        const formData = new FormData();
        formData.append(fieldName, file);

        try {
            const response = await axios.put(
                `${AUTH_API}/admin/user/${adminId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const updatedImagePath = response.data.message[fieldName];
            const fullImageUrl = `${FILES_BASE_URL}/${updatedImagePath.replace(/\\/g, '/').replace(/^\/+/, '')}?ts=${Date.now()}`;

            setForm(prev => ({
                ...prev,
                [fieldName === 'idProofPhoto' ? 'idPhoto' : 'adminPhoto']: fullImageUrl
            }));

            dispatch(viewUserById(adminId));
        } catch (error) {
            console.error('Upload failed:', error);
            setForm(prev => ({
                ...prev,
                [fieldName === 'idProofPhoto' ? 'idPhoto' : 'adminPhoto']:
                    userData[fieldName === 'idProofPhoto' ? 'idPhoto' : 'adminPhoto']
            }));
        } finally {
            e.target.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== undefined) {
                const backendFieldName = key === 'email' ? 'emailId' : key;
                formData.append(backendFieldName, form[key]);
            }
        });

        dispatch(updateUser({ adminId, data: formData }))
            .unwrap()
            .then(() => {
                alert('Admin updated successfully!');
                navigate('/users');
            })
            .catch(err => alert(`Error: ${err}`));
    };

    if (!userData) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Admin Details - {adminId}
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

                <Grid container spacing={3}>
                    {/* Personal Info */}
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                    Personal Information
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Contact" name="contactNumber" value={form.contactNumber} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Email" name="emailId" value={form.emailId} onChange={handleChange} fullWidth />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Address Info */}
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                    Address Information
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth />
                                    </Grid>
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="District" name="distinct" value={form.distinct} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} fullWidth />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Document Info */}
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                    Document Verification
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="ID Proof" name="idProof" value={form.idProof} onChange={handleChange} fullWidth />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    <InsertDriveFile sx={{ mr: 1 }} /> Documents
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    {/* ID Photo Upload */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                                        <Avatar src={form.idPhoto} variant="rounded" sx={{ width: 100, height: 100, mt: 1 }} />
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
                                    </Grid>

                                    {/* Admin Photo Upload */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" fontWeight={600}>Admin Photo</Typography>
                                        <Avatar src={form.adminPhoto || '/placeholder.png'}
                                            variant="rounded"
                                            sx={{ width: 100, height: 100, mt: 1 }}
                                            onError={(e) => {
                                                e.target.src = '/placeholder.png';
                                                console.error('Failed to load admin photo:', form.adminPhoto);
                                            }}
                                        />
                                        <Button
                                            variant="outlined"
                                            sx={{ mt: 1 }}
                                            onClick={() => document.getElementById('adminPhotoFileInput').click()}
                                        >
                                            {form.adminPhoto ? 'Change Photo' : 'Upload Photo'}
                                        </Button>
                                        <input
                                            id="adminPhotoFileInput"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleImageChange(e, 'adminProfilePhoto')}
                                        />
                                        {form.adminPhoto && (
                                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                                Current: {form.adminPhoto.split('/').pop()}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default EditUser;