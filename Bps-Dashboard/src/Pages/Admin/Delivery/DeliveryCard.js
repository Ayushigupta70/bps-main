import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchBookingsByType } from '../../../features/booking/bookingSlice';
import { fetchBookingRequest as fetchQuotationRequest } from '../../../features/quotation/quotationSlice';
import { fetchavailableList } from '../../../features/Driver/driverSlice';
import { getAvailableVehiclesList } from '../../../features/vehicle/vehicleSlice';
import { assignDeliveries, finalDeliveryList, finalDeliveryWhatsApp, finalDeliveryMail } from '../../../features/delivery/deliverySlice';
import SendIcon from '@mui/icons-material/Send';

const DeliveryCard = () => {
    const dispatch = useDispatch();
    const { requestCount: bookingRequestCountValue, list: bookingList, loading: bookingLoading } = useSelector((state) => state.bookings);
    const { requestCount: quotationRequestCountValue, list: quotationList, loading: quotationLoading } = useSelector((state) => state.quotations);
    const { list: driverList = [] } = useSelector((state) => state.drivers);
    const { list: vehicleList = [] } = useSelector((state) => state.vehicles);
    const { list: finalList } = useSelector((state) => state.deliveries);

    const [selectedCard, setSelectedCard] = useState('booking');
    const [selectedItems, setSelectedItems] = useState({ booking: [], quotation: [], final: [] });

    const [driver, setDriver] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [device, setDevice] = useState('');

    useEffect(() => {
        dispatch(fetchBookingsByType('request'));
        dispatch(fetchQuotationRequest());
        dispatch(getAvailableVehiclesList());
        dispatch(fetchavailableList());

        dispatch(finalDeliveryList());
    }, [dispatch]);

    const handleCardClick = (type) => {
        setSelectedCard(type);
    };
    const handleSend = (orderId) => {
        dispatch(finalDeliveryWhatsApp(orderId));
        dispatch(finalDeliveryMail(orderId));
    }
    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => {
            const current = prev[selectedCard] || [];
            const isSelected = current.includes(id);
            return {
                ...prev,
                [selectedCard]: isSelected
                    ? current.filter((item) => item !== id)
                    : [...current, id]
            };
        });
    };

    const handleAssign = () => {
        const selectedVehicle = vehicleList.find((v) => v.vehicleId === vehicle);
        const payload = {
            bookingIds: selectedCard === 'booking' ? selectedItems.booking : [],
            quotationIds: selectedCard === 'quotation' ? selectedItems.quotation : [],
            driverName: driver,
            vehicleModel: selectedVehicle?.vehicleModel || '',
            device: device
        };

        dispatch(assignDeliveries(payload)).then((res) => {
            if (res.type.includes('fulfilled')) {
                setSelectedItems({ booking: [], quotation: [], final: [] });
                setDriver('');
                setVehicle('');
                setDevice('');
                dispatch(fetchBookingsByType('request'));
                dispatch(fetchQuotationRequest());
            }
        });
    };

    const cards = [
        {
            key: 'booking',
            count: bookingRequestCountValue ?? bookingList?.length ?? 0,
            subtitle: 'Booking Delivery',
            stat: '20% (30 days)'
        },
        {
            key: 'quotation',
            count: quotationRequestCountValue ?? quotationList?.length ?? 0,
            subtitle: 'Quotations Delivery',
            stat: 'NaN% (30 days)'
        },
        {
            key: 'final',
            count: finalList?.length ?? 0,
            subtitle: 'Final Delivery',
            stat: 'NaN% (30 days)'
        }
    ];

    const currentList = selectedCard === 'quotation' ? quotationList : selectedCard === 'final' ? finalList : bookingList;
    const currentLoading = selectedCard === 'quotation' ? quotationLoading : selectedCard === 'final' ? false : bookingLoading;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom color="primary">
                Manage Delivery
            </Typography>

            {/* Cards Section */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {cards.map((card) => (
                    <Card
                        key={card.key}
                        onClick={() => handleCardClick(card.key)}
                        sx={{
                            width: '100%',
                            maxWidth: 260,
                            borderRadius: 3,
                            boxShadow: 4,
                            cursor: 'pointer',
                            background: selectedCard === card.key
                                ? 'linear-gradient(135deg, #90caf9, #64b5f6)'
                                : 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.03)' }
                        }}
                    >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="textPrimary">Delivery</Typography>
                                <LocalShippingIcon color="primary" />
                            </Box>
                            <Typography variant="h3" fontWeight={700} mt={2} color="primary.dark">
                                {card.count}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">{card.subtitle}</Typography>
                            <Typography variant="caption" color="textSecondary">{card.stat}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Filters */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingY: 4,
                paddingX: 1,
                mt: 2,
                gap: 3,
            }}>
                <FormControl size="small" sx={{ minWidth: 220, backgroundColor: 'white', boxShadow: 1, borderRadius: 2 }}>
                    <InputLabel>Driver</InputLabel>
                    <Select value={driver} onChange={(e) => setDriver(e.target.value)} label="Driver">
                        <MenuItem value="">None</MenuItem>
                        {driverList.map((d) => (
                            <MenuItem key={d._id} value={d.name || d.driverName}>{d.name || d.driverName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 220, backgroundColor: 'white', boxShadow: 1, borderRadius: 2 }}>
                    <InputLabel>Vehicle</InputLabel>
                    <Select value={vehicle} onChange={(e) => setVehicle(e.target.value)} label="Vehicle">
                        <MenuItem value="">None</MenuItem>
                        {vehicleList.map((v) => (
                            <MenuItem key={v.vehicleId} value={v.vehicleId}>{v.vehicleModel}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 220, backgroundColor: 'white', boxShadow: 1, borderRadius: 2 }}>
                    <InputLabel>Device</InputLabel>
                    <Select value={device} onChange={(e) => setDevice(e.target.value)} label="Device">
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Device 1">Device 1</MenuItem>
                        <MenuItem value="Device 2">Device 2</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ height: 40, paddingX: 4, borderRadius: 2 }}
                        onClick={handleAssign}
                        disabled={!driver || !vehicle || selectedItems[selectedCard].length === 0}
                    >
                        Assign
                    </Button>
                </Box>
            </Box>

            {/* Table Header */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: selectedCard === 'final'
                        ? '60px 160px 160px 160px 1fr 1fr 1fr'
                        : '60px 160px 1fr 1fr 1fr 1fr',
                    backgroundColor: '#1976d2',
                    padding: 2,
                    borderRadius: 2,
                    color: 'white',
                    fontWeight: 600,
                    mt: 2,
                    gap: 1,
                }}
            >
                {selectedCard !== 'final' && (
                    <Typography variant="body2" fontWeight={600}>Select</Typography>
                )}
                <Typography variant="body2" fontWeight={600}>S. No</Typography>
                <Typography variant="body2" fontWeight={600}>Order ID</Typography>
                {selectedCard === 'final' ? (
                    <>
                        <Typography variant="body2" fontWeight={600}>Driver</Typography>
                        <Typography variant="body2" fontWeight={600}>Vehicle</Typography>
                    </>
                ) : (
                    <Typography variant="body2" fontWeight={600}>Name</Typography>
                )}
                <Typography variant="body2" fontWeight={600}>Start Station</Typography>
                <Typography variant="body2" fontWeight={600}>Destination Station</Typography>
                {selectedCard === 'final' && (
                    <Typography variant="body2" fontWeight={600} textAlign={'center'}>Action</Typography>
                )}
            </Box>

            {currentLoading ? (
                <Typography sx={{ mt: 2 }}>Loading...</Typography>
            ) : currentList?.length > 0 ? (
                currentList.map((item, idx) => {
                    const uniqueId = item._id || item.bookingId || item['Booking ID'] || `index-${idx}`;
                    return (
                        <Box
                            key={uniqueId}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: selectedCard === 'final'
                                    ? '60px 160px 160px 160px 1fr 1fr 1fr'
                                    : '60px 160px 1fr 1fr 1fr 1fr',
                                padding: 2,
                                borderBottom: '1px solid #e0e0e0',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            {selectedCard !== 'final' && (
                                <input
                                    type="checkbox"
                                    checked={selectedItems[selectedCard]?.includes(uniqueId)}
                                    onChange={() => handleCheckboxChange(uniqueId)}
                                    disabled={selectedCard === 'delivery'}
                                />
                            )}

                            <Typography>{idx + 1}</Typography>
                            <Typography>{item.orderId || item.bookingId || item['Booking ID']}</Typography>
                            {selectedCard === 'final' ? (
                                <>
                                    <Typography>{item.driverName || 'N/A'}</Typography>
                                    <Typography>{item.vehicle.vehicleModel || 'N/A'}</Typography>
                                </>
                            ) : (
                                <Typography>{item.fromName || item.Name}</Typography>
                            )}
                            <Typography>{item.pickup || item['Pick up']}</Typography>
                            <Typography>{item.drop || item.Drop}</Typography>
                            {selectedCard === 'final' && (
                                <IconButton>
                                    <SendIcon color='primary' onClick={() => handleSend(item.orderId)} />
                                </IconButton>
                            )}
                        </Box>
                    );
                })
            ) : (
                <Typography sx={{ mt: 2 }}>
                    {selectedCard === 'final' ? 'No final deliveries found.' : 'No bookings found.'}
                </Typography>
            )}

        </Box>
    );
};

export default DeliveryCard;