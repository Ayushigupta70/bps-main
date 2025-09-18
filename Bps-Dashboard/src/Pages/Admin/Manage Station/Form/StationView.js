import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    Button,
    TextField,
    Card,
    CardContent
} from '@mui/material';
import { Home, Business, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getStationById, clearViewedStation } from "../../../../features/stations/stationSlice"
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

const StationView = () => {
    const navigate = useNavigate();
    const { stationId } = useParams();
    const dispatch = useDispatch();
    const station = useSelector((state) => state.stations.viewedStation);

    useEffect(() => {
        if (stationId) {
            dispatch(getStationById(stationId));
        }
        return () => {
            dispatch(clearViewedStation());
        }
    }, [stationId, dispatch]);
    if (!station) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading station details...</Typography>
            </Box>
        );
    }

    console.log("details", station);
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" fontWeight={600}>
                        Station Details
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Box>

                <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <CardContent sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
                        <SectionHeader icon={<Business />} title="Station Information" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <StyledTextField label="Station Name" value={station.stationName} />
                            <StyledTextField label="Contact" value={station.contact} />
                            <StyledTextField label="Email ID" value={station.emailId} />
                            <StyledTextField label="Address" value={station.address} />

                            <StyledTextField label="State" value={station.state} />
                            <StyledTextField label="City" value={station.city} />
                            <StyledTextField label="Pincode" value={station.pincode} />
                            <StyledTextField label="GST Number" value={station.gst} />
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default StationView;