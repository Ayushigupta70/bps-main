import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    Avatar,
    Stack,
    Card,
    CardContent,
    Button,
    TextField
} from '@mui/material';
import { Person, Home, InsertDriveFile, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { viewCustomerById, clearViewedCustomer } from '../../../../features/qcustomers/qcustomerSlice';

const StyledTextField = ({ label, value }) => (
    <Grid item xs={12} sm={6} md={4}>
        <TextField
            label={label}
            value={value || '-'}
            fullWidth
            variant="outlined"
            InputProps={{
                readOnly: true,
                style: {
                    borderRadius: 12,
                    backgroundColor: '#fff',
                }
            }}
            InputLabelProps={{
                style: {
                    fontWeight: 600
                }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
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

const QcustomerView = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useSelector((state) => state.customers.form);
    const loading = useSelector((state) => state.customers.loading);

    useEffect(() => {
        if (customerId) {
            dispatch(viewCustomerById(customerId));
            console.log("data", viewCustomerById)
        }
        return () => {
            dispatch(clearViewedCustomer());
        };
    }, [customerId, dispatch]);

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" fontWeight={600}>
                        Customer Details
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Box>

                {loading ? (
                    <Typography align="center">Loading...</Typography>
                ) : (
                    <>
                        {/* Personal Info */}
                        <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                            <CardContent sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
                                <SectionHeader icon={<Person />} title="Personal Information" />
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <StyledTextField label="First Name" value={form?.firstName} />
                                    <StyledTextField label="Middle Name" value={form?.middleName} />
                                    <StyledTextField label="Last Name" value={form?.lastName} />
                                    <StyledTextField label="Contact Number" value={form?.contactNumber} />
                                    <StyledTextField label="Email" value={form?.email} />
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Address Info */}
                        <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                            <CardContent sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
                                <SectionHeader icon={<Home />} title="Address Information" />
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <StyledTextField label="Address" value={form?.address} />
                                    <StyledTextField label="State" value={form?.state} />
                                    <StyledTextField label="City" value={form?.city} />
                                    <StyledTextField label="District" value={form?.district} />
                                    <StyledTextField label="Pincode" value={form?.pincode} />
                                    <StyledTextField label="State Code" value={form?.stateCode} />
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Documents */}
                        <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                            <CardContent sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
                                <SectionHeader icon={<InsertDriveFile />} title="Documents" />
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <StyledTextField label="ID Proof Type" value={form?.idProof} />
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                                        <Avatar
                                            src={`${form.idPhoto}?ts=${Date.now()}`}
                                            variant="rounded"
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mt: 1,
                                                border: '2px solid #1976d2',
                                                boxShadow: 3
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body2" fontWeight={600}>Customer Photo</Typography>
                                        <Avatar
                                            src={`${form.customerPhoto}?ts=${Date.now()}`}
                                            variant="rounded"
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mt: 1,
                                                border: '2px solid #1976d2',
                                                boxShadow: 3
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default QcustomerView;
