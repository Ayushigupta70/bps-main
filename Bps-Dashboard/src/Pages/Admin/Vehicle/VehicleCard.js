import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel,
    TablePagination,
    TextField,
    InputAdornment,
    useTheme,
    Button,
    MenuItem,
    ListItemIcon,
    Menu,
    ListItemText,
    Alert,
    CircularProgress,
    Chip
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAvailableVehiclesCount,
    getDeactivatedVehiclesCount,
    getBlacklistedVehiclesCount,
    getTotalVehiclesCount,
    getTotalVehiclesList,
    getBlacklistedVehiclesList,
    getAvailableVehiclesList,
    getDeactivatedVehicles,
    deleteVehicle,
    updateStatus
} from '../../../features/vehicle/vehicleSlice';
import Swal from 'sweetalert2';

// Sorting utilities
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    if (!array) return [];
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
}

const headCells = [
    { id: "sno", label: "S.No", sortable: false },
    { id: "vehicleId", label: "Vehicle ID", sortable: true },
    { id: "currentLocation", label: "Location", sortable: true },
    { id: "ownedBy", label: "Owner Name", sortable: true },
    { id: "vehicleModel", label: "Vehicle Model", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "action", label: "Action", sortable: false },
];

const VehicleCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        list: vehicleList = [],
        availablecount = 0,
        deactiveCount = 0,
        blacklistedCount = 0,
        totalCount = 0,
        loading = false,
        error = null
    } = useSelector(state => state.vehicles);

    // State management
    const [activeCard, setActiveCard] = useState(1);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("vehicleModel");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedList, setSelectedList] = useState('available');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [localVehicleList, setLocalVehicleList] = useState([]);
    const [actionLoading, setActionLoading] = useState(false);

    // Colors
    const cardColor = "#0155a5";
    const cardLightColor = "#e6f0fa";

    // Debug: Log the raw vehicle data to understand the structure
    useEffect(() => {
        console.log('Raw vehicleList from Redux:', vehicleList);
        if (vehicleList && vehicleList.length > 0) {
            // Check what fields actually exist in the data
            const sampleVehicle = vehicleList[0];
            console.log('Sample vehicle fields:', Object.keys(sampleVehicle));
            console.log('Sample vehicle data:', sampleVehicle);

            // Process vehicles to ensure consistent status field
            const processedVehicles = vehicleList.map(vehicle => {
                // Check for different possible status field names
                let status = vehicle.status ||
                    vehicle.vehicleStatus ||
                    vehicle.currentStatus ||
                    'available'; // Default fallback

                // Normalize status values
                if (status === 'active' || status === 'Active') status = 'available';
                if (status === 'inactive' || status === 'Inactive') status = 'deactivated';
                if (status === 'blacklist' || status === 'Blacklist') status = 'blacklisted';

                return {
                    ...vehicle,
                    status: status,
                    // Ensure other fields have proper fallbacks
                    vehicleId: vehicle.vehicleId || vehicle.id || 'N/A',
                    currentLocation: vehicle.currentLocation || vehicle.location || 'N/A',
                    ownedBy: vehicle.ownedBy || vehicle.ownerName || 'N/A',
                    vehicleModel: vehicle.vehicleModel || vehicle.model || 'N/A'
                };
            });

            console.log('Processed vehicles:', processedVehicles);
            setLocalVehicleList(processedVehicles);
        }
    }, [vehicleList]);

    // SweetAlert configurations
    const showSuccess = (msg) =>
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: msg,
            timer: 2000,
            showConfirmButton: false
        });

    const showError = (msg) =>
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msg,
            confirmButtonColor: '#d33'
        });

    const showConfirm = async (title, text) => {
        const result = await Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'Cancel'
        });
        return result.isConfirmed;
    };

    // Initial data loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([
                    dispatch(getAvailableVehiclesCount()),
                    dispatch(getBlacklistedVehiclesCount()),
                    dispatch(getDeactivatedVehiclesCount()),
                    dispatch(getTotalVehiclesCount()),
                    dispatch(getAvailableVehiclesList())
                ]);
            } catch (error) {
                console.error('Error loading initial data:', error);
            }
        };
        loadInitialData();
    }, [dispatch]);

    // Load specific list when selection changes
    useEffect(() => {
        const loadSelectedList = async () => {
            try {
                console.log('Loading selected list:', selectedList);
                switch (selectedList) {
                    case 'total':
                        await dispatch(getTotalVehiclesList());
                        break;
                    case 'available':
                        await dispatch(getAvailableVehiclesList());
                        break;
                    case 'blacklisted':
                        await dispatch(getBlacklistedVehiclesList());
                        break;
                    case 'deactivated':
                        await dispatch(getDeactivatedVehicles());
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error loading vehicle list:', error);
            }
        };
        loadSelectedList();
    }, [selectedList, dispatch]);

    // Card data with real counts
    const cardData = [
        {
            id: 1,
            title: "Available Vehicles",
            type: "available",
            value: availablecount,
            subtitle: "Active vehicles",
            duration: "Last 30 days",
            icon: <LocalShippingIcon fontSize="large" />,
            color: "#4caf50"
        },
        {
            id: 2,
            title: "Total Vehicles",
            type: "total",
            value: totalCount,
            subtitle: "All vehicles",
            duration: "Last 30 days",
            icon: <LocalShippingIcon fontSize="large" />,
            color: "#2196f3"
        },
        {
            id: 3,
            title: "Deactivated Vehicles",
            type: "deactivated",
            value: deactiveCount,
            subtitle: "Deactivated vehicles",
            duration: "Last 30 days",
            icon: <LocalShippingIcon fontSize="large" />,
            color: "#ff9800"
        },
        {
            id: 4,
            title: "Blacklisted Vehicles",
            type: "blacklisted",
            value: blacklistedCount,
            subtitle: "Blacklisted vehicles",
            duration: "Last 30 days",
            icon: <LocalShippingIcon fontSize="large" />,
            color: "#f44336"
        },
    ];

    // Event handlers
    const handleAdd = () => navigate("/vehicleform");

    const handleCardClick = (type, id) => {
        console.log('Card clicked:', type, id);
        setSelectedList(type);
        setActiveCard(id);
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleMenuOpen = (event, vehicle) => {
        console.log('Menu opened for vehicle:', vehicle);
        setMenuAnchorEl(event.currentTarget);
        setSelectedVehicle(vehicle);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedVehicle(null);
    };

    const handleView = (vehicleId) => navigate(`/vehicleview/${vehicleId}`);
    const handleEdit = (vehicleId) => navigate(`/editvehicle/${vehicleId}`);

    const handleDelete = async (vehicleId) => {
        const confirmed = await showConfirm(
            'Delete Vehicle',
            'Are you sure you want to delete this vehicle? This action cannot be undone.'
        );

        if (confirmed) {
            setActionLoading(true);
            try {
                const result = await dispatch(deleteVehicle(vehicleId));
                console.log('Delete result:', result);
                if (result.meta.requestStatus === 'fulfilled') {
                    showSuccess('Vehicle deleted successfully!');
                    // Refresh all counts and current list
                    await refreshAllData();
                } else {
                    showError('Failed to delete vehicle. Please try again.');
                }
            } catch (error) {
                console.error('Delete error:', error);
                showError('Error deleting vehicle. Please try again.');
            } finally {
                setActionLoading(false);
            }
        }
    };

    // Refresh all data function
    const refreshAllData = async () => {
        try {
            await Promise.all([
                dispatch(getTotalVehiclesCount()),
                dispatch(getAvailableVehiclesCount()),
                dispatch(getBlacklistedVehiclesCount()),
                dispatch(getDeactivatedVehiclesCount())
            ]);

            // Refresh current list
            switch (selectedList) {
                case 'total':
                    await dispatch(getTotalVehiclesList());
                    break;
                case 'available':
                    await dispatch(getAvailableVehiclesList());
                    break;
                case 'blacklisted':
                    await dispatch(getBlacklistedVehiclesList());
                    break;
                case 'deactivated':
                    await dispatch(getDeactivatedVehicles());
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };

    const handleStatusChange = async (newStatus) => {
        if (!selectedVehicle) {
            showError('No vehicle selected');
            return;
        }

        console.log('Changing status for vehicle:', selectedVehicle.vehicleId, 'to:', newStatus);

        const statusTextMap = {
            'available': 'Active',
            'deactivated': 'Inactive',
            'blacklisted': 'Blacklisted'
        };

        const statusText = statusTextMap[newStatus] || newStatus;
        const confirmed = await showConfirm(
            'Change Status',
            `Are you sure you want to change vehicle status to ${statusText}?`
        );

        if (confirmed) {
            setActionLoading(true);
            try {
                const result = await dispatch(updateStatus({
                    vehicleId: selectedVehicle.vehicleId,
                    action: newStatus
                }));

                console.log('Status change result:', result);

                if (result.meta.requestStatus === 'fulfilled') {
                    showSuccess(`Vehicle status changed to ${statusText} successfully!`);

                    // Update local state immediately with the new status
                    const updatedList = localVehicleList.map(vehicle =>
                        vehicle.vehicleId === selectedVehicle.vehicleId
                            ? { ...vehicle, status: newStatus }
                            : vehicle
                    );
                    setLocalVehicleList(updatedList);

                    // Refresh all data to get updated counts
                    await refreshAllData();

                    // If the current view doesn't match the new status, switch to appropriate view
                    if (selectedList !== newStatus && selectedList !== 'total') {
                        setSelectedList(newStatus);
                        setActiveCard(
                            newStatus === 'available' ? 1 :
                                newStatus === 'deactivated' ? 3 :
                                    newStatus === 'blacklisted' ? 4 : 2
                        );
                    }

                } else {
                    showError('Failed to update status. Please try again.');
                }
            } catch (error) {
                console.error('Status change error:', error);
                showError('Error updating vehicle status. Please try again.');
            } finally {
                setActionLoading(false);
                handleMenuClose();
            }
        }
    };

    // Filter vehicles based on selected list AND status
    const getFilteredRowsByStatus = () => {
        if (!Array.isArray(localVehicleList)) return [];

        console.log('All vehicles with status:', localVehicleList.map(v => ({
            id: v.vehicleId,
            status: v.status,
            location: v.currentLocation,
            owner: v.ownedBy,
            model: v.vehicleModel
        })));

        let statusFiltered = localVehicleList;

        // First filter by status based on selected list
        switch (selectedList) {
            case 'available':
                statusFiltered = localVehicleList.filter(vehicle => vehicle.status === 'available');
                break;
            case 'deactivated':
                statusFiltered = localVehicleList.filter(vehicle => vehicle.status === 'deactivated');
                break;
            case 'blacklisted':
                statusFiltered = localVehicleList.filter(vehicle => vehicle.status === 'blacklisted');
                break;
            case 'total':
                // Show all vehicles for total
                statusFiltered = localVehicleList;
                break;
            default:
                break;
        }

        console.log(`After ${selectedList} filter:`, statusFiltered.map(v => v.vehicleId));

        // Then apply search filter
        const searchFiltered = statusFiltered.filter((row) => {
            if (!searchTerm) return true;

            const searchLower = searchTerm.toLowerCase();
            return (
                (row.vehicleModel && row.vehicleModel.toLowerCase().includes(searchLower)) ||
                (row.ownedBy && row.ownedBy.toLowerCase().includes(searchLower)) ||
                (row.currentLocation && row.currentLocation.toLowerCase().includes(searchLower)) ||
                (row.vehicleId && row.vehicleId.toLowerCase().includes(searchLower)) ||
                (row.location && row.location.toLowerCase().includes(searchLower))
            );
        });

        console.log('After search filter:', searchFiltered.map(v => v.vehicleId));
        return searchFiltered;
    };

    const filteredRows = getFilteredRowsByStatus();
    const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

    // Get status color and variant
    const getStatusProps = (status) => {
        switch (status) {
            case 'available':
                return { color: 'success', label: 'Active' };
            case 'deactivated':
                return { color: 'warning', label: 'Inactive' };
            case 'blacklisted':
                return { color: 'error', label: 'Blacklisted' };
            default:
                return { color: 'default', label: status || 'Unknown' };
        }
    };

    // Get current status distribution for debugging
    const getStatusDistribution = () => {
        const distribution = {
            available: 0,
            deactivated: 0,
            blacklisted: 0,
            unknown: 0
        };

        localVehicleList.forEach(vehicle => {
            if (vehicle.status === 'available') distribution.available++;
            else if (vehicle.status === 'deactivated') distribution.deactivated++;
            else if (vehicle.status === 'blacklisted') distribution.blacklisted++;
            else distribution.unknown++;
        });

        return distribution;
    };

    const statusDistribution = getStatusDistribution();

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Vehicle Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    disabled={actionLoading}
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                    {actionLoading ? <CircularProgress size={24} /> : 'Add Vehicle'}
                </Button>
            </Box>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cardData.map((card) => (
                    <Grid item xs={12} sm={6} md={3} key={card.id}>
                        <Card
                            onClick={() => handleCardClick(card.type, card.id)}
                            sx={{
                                cursor: "pointer",
                                border: activeCard === card.id ? `3px solid ${card.color}` : '2px solid transparent',
                                backgroundColor: activeCard === card.id ? cardLightColor : "background.paper",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: 6,
                                },
                                height: '220px',
                                width: "230px"
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: "50%",
                                            backgroundColor: activeCard === card.id ? card.color : `${card.color}20`,
                                            color: activeCard === card.id ? "#fff" : card.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {card.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h3" fontWeight="bold">
                                            {card.value || 0}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.subtitle}
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            {card.duration}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Search and Table Section */}
            <Card sx={{ p: 3 }}>
                {/* Search Bar */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {selectedList === 'available' && 'Available Vehicles'}
                            {selectedList === 'total' && 'All Vehicles'}
                            {selectedList === 'blacklisted' && 'Blacklisted Vehicles'}
                            {selectedList === 'deactivated' && 'Deactivated Vehicles'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ({filteredRows.length} vehicles found)
                        </Typography>
                    </Box>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by model, owner, location, or ID..."
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ width: 350 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Table */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "primary.main" }}>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            sx={{ color: "white", fontWeight: "bold" }}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            {headCell.sortable ? (
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : "asc"}
                                                    onClick={() => handleRequestSort(headCell.id)}
                                                    sx={{ color: "white !important" }}
                                                >
                                                    {headCell.label}
                                                </TableSortLabel>
                                            ) : (
                                                headCell.label
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row, index) => {
                                    const statusProps = getStatusProps(row.status);
                                    return (
                                        <TableRow key={`${row.vehicleId}-${index}`} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {row.vehicleId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{row.currentLocation || 'N/A'}</TableCell>
                                            <TableCell>{row.ownedBy || 'N/A'}</TableCell>
                                            <TableCell>{row.vehicleModel || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={statusProps.label}
                                                    color={statusProps.color}
                                                    size="small"
                                                    variant="filled"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1, flexWrap: "nowrap" }}>
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={() => handleView(row.vehicleId)}
                                                        title="View"
                                                        disabled={actionLoading}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleEdit(row.vehicleId)}
                                                        title="Edit"
                                                        disabled={actionLoading}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDelete(row.vehicleId)}
                                                        title="Delete"
                                                        disabled={actionLoading}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="default"
                                                        onClick={(e) => handleMenuOpen(e, row)}
                                                        title="Change Status"
                                                        disabled={actionLoading}
                                                    >
                                                        <MoreVertIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={headCells.length} />
                                    </TableRow>
                                )}
                                {filteredRows.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={headCells.length} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No vehicles found in this category
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                Current status filter: <strong>{selectedList}</strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                )}
            </Card>

            {/* Status Change Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2, minWidth: 180 }
                }}
            >
                <MenuItem
                    onClick={() => handleStatusChange('available')}
                    disabled={actionLoading || selectedVehicle?.status === 'available'}
                >
                    <ListItemIcon>
                        {actionLoading ? <CircularProgress size={20} /> : <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary="Active" />
                    {selectedVehicle?.status === 'available' && <Typography variant="caption">Current</Typography>}
                </MenuItem>
                <MenuItem
                    onClick={() => handleStatusChange('deactivated')}
                    disabled={actionLoading || selectedVehicle?.status === 'deactivated'}
                >
                    <ListItemIcon>
                        {actionLoading ? <CircularProgress size={20} /> : <CancelIcon sx={{ color: 'orange' }} fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary="Inactive" />
                    {selectedVehicle?.status === 'deactivated' && <Typography variant="caption">Current</Typography>}
                </MenuItem>
                <MenuItem
                    onClick={() => handleStatusChange('blacklisted')}
                    disabled={actionLoading || selectedVehicle?.status === 'blacklisted'}
                >
                    <ListItemIcon>
                        {actionLoading ? <CircularProgress size={20} /> : <BlockIcon sx={{ color: 'red' }} fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary="Blacklisted" />
                    {selectedVehicle?.status === 'blacklisted' && <Typography variant="caption">Current</Typography>}
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default VehicleCard;