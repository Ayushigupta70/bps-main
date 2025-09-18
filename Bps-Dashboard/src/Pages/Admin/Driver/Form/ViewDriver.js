import React ,{useEffect}from 'react';
import {
    Box,
    Paper,
    Grid,
    Typography,
    Card,
    CardContent,
    Divider,
    TextField,
    Button
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { viewDriverById,clearViewedDriver } from '../../../../features/Driver/driverSlice' 
const ViewDriver = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const {driverId} = useParams();
    const dispatch = useDispatch();
    const driver = useSelector((state) => state.drivers.form);;
    const loading = useSelector((state) => state.drivers.loading);
    useEffect(() => {
        if (driverId) {
            dispatch(viewDriverById(driverId));
        }
    
        return () => {
            dispatch(clearViewedDriver());
        };
    }, [driverId, dispatch]);
    
    if (!driver) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    Driver data not found. Please go back and try again.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }
    
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Driver Details - {driver.driverId}
                    </Typography>
                    <Button variant="contained" onClick={() => navigate(-1)}>
                        Back
                    </Button>
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
                                        <TextField
                                            label="First Name"
                                            value={driver.firstName || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Last Name"
                                            value={driver.lastName || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Contact"
                                            value={driver.contactNumber || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            value={driver.emailId || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
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
                                        <TextField
                                            label="Address"
                                            value={driver.address || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="State"
                                            value={driver.state || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="City"
                                            value={driver.city || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="District"
                                            value={driver.district || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Pincode"
                                            value={driver.pincode || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
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
                                        <TextField
                                            label="DL Number"
                                            value={driver.dlNumber || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="ID Proof"
                                            value={driver.idProof || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>ID Photo:</strong></Typography>
                                        <img
                                            src={driver.idPhoto}
                                            alt="ID Proof"
                                            width={150}
                                            style={{ borderRadius: 8, marginTop: 8 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>Driver Photo:</strong></Typography>
                                        <img
                                            src={driver.driverPhoto}
                                            alt="Driver"
                                            width={150}
                                            style={{ borderRadius: 8, marginTop: 8 }}
                                        />
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

export default ViewDriver;