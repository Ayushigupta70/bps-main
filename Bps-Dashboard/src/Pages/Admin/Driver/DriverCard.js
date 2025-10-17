import React, { useState, useEffect } from 'react';
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
    ListItemText,
    MenuItem,
    ListItemIcon,
    Menu,
    Alert,
    CircularProgress,
    Chip
} from '@mui/material';
import {
    People as PeopleIcon,
    AddModerator as AddModeratorIcon,
    Block as BlockIcon,
    AdminPanelSettings as AdminPanelSettingsIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchtotalCount,
    fetchavailableCount,
    fetchblacklistedCount,
    fetchdeactivatedCount,
    fetchtotalList,
    fetchavailableList,
    fetchblacklistedList,
    fetchdeactivatedList,
    deleteDriver,
    updateStatus
} from '../../../features/Driver/driverSlice';
import Swal from 'sweetalert2';

// Sorting utilities
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
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
    { id: 'sno', label: 'S.No', sortable: false },
    { id: 'driverId', label: 'Driver ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'contactNumber', label: 'Contact', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'action', label: 'Action', sortable: false },
];

// Utility function to remove duplicates by driverId
const removeDuplicates = (drivers) => {
    if (!drivers || !Array.isArray(drivers)) return [];

    const seen = new Set();
    return drivers.filter(driver => {
        if (!driver || !driver.driverId) return false;
        if (seen.has(driver.driverId)) {
            return false;
        }
        seen.add(driver.driverId);
        return true;
    });
};

// Utility function to validate driver data
const isValidDriver = (driver) => {
    return driver &&
        driver.driverId &&
        typeof driver.driverId === 'string' &&
        driver.driverId.trim() !== '';
};

const DriverCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        list: driverList = [],
        totalCount = 0,
        availableCount = 0,
        blacklistedCount = 0,
        deactivatedCount = 0,
        loading = false,
        error = null
    } = useSelector(state => state.drivers);

    // State management
    const [activeCard, setActiveCard] = useState(2); // Default to Total Drivers
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedList, setSelectedList] = useState('total');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);

    // Separate local lists for each type with duplicate removal
    const [localLists, setLocalLists] = useState({
        total: [],
        available: [],
        blacklisted: [],
        deactivated: []
    });

    // Colors
    const cardColor = '#0155a5';
    const cardLightColor = '#e6f0fa';

    // SweetAlert configurations
    const showSuccess = (msg) =>
        Swal.fire({
            icon: 'success',
            title: '🎉 Success!',
            text: msg,
            background: 'linear-gradient(135deg, #e0ffe0, #f0fff0)',
            color: '#222',
            showConfirmButton: false,
            timer: 2000,
            width: 400,
        });

    const showError = (msg) =>
        Swal.fire({
            icon: 'error',
            title: '⚠️ Error!',
            text: msg,
            background: 'linear-gradient(135deg, #ffe6e6, #fff0f0)',
            confirmButtonColor: '#d33',
            width: 400,
        });

    const showInfo = (msg) =>
        Swal.fire({
            icon: 'info',
            title: 'ℹ️ Info',
            text: msg,
            background: 'linear-gradient(135deg, #e0f7fa, #e1f5fe)',
            confirmButtonColor: '#0288d1',
            width: 400,
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
            cancelButtonText: 'Cancel',
            width: 450,
        });
        return result.isConfirmed;
    };

    // Process and clean driver list
    const processDriverList = (drivers) => {
        if (!drivers || !Array.isArray(drivers)) return [];

        // Filter out invalid drivers and remove duplicates
        const validDrivers = drivers.filter(isValidDriver);
        const uniqueDrivers = removeDuplicates(validDrivers);

        // Log if duplicates were found (for debugging)
        if (validDrivers.length !== uniqueDrivers.length) {
            console.warn(`Removed ${validDrivers.length - uniqueDrivers.length} duplicate drivers`);
        }

        return uniqueDrivers;
    };

    // Initial data loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchtotalCount()),
                    dispatch(fetchavailableCount()),
                    dispatch(fetchblacklistedCount()),
                    dispatch(fetchdeactivatedCount()),
                    dispatch(fetchtotalList())
                ]);
            } catch (error) {
                console.error('Error loading initial data:', error);
                showError('Failed to load initial data');
            }
        };
        loadInitialData();
    }, [dispatch]);

    // Update local lists when Redux state changes - with duplicate removal
    useEffect(() => {
        if (driverList && driverList.length > 0) {
            const processedList = processDriverList(driverList);
            setLocalLists(prev => ({
                ...prev,
                [selectedList]: processedList
            }));
        } else {
            // Clear the list if no data
            setLocalLists(prev => ({
                ...prev,
                [selectedList]: []
            }));
        }
    }, [driverList, selectedList]);

    // Load specific list when selection changes
    useEffect(() => {
        const loadSelectedList = async () => {
            try {
                // Clear current display while loading
                setLocalLists(prev => ({
                    ...prev,
                    [selectedList]: []
                }));

                switch (selectedList) {
                    case 'total':
                        await dispatch(fetchtotalList());
                        break;
                    case 'available':
                        await dispatch(fetchavailableList());
                        break;
                    case 'blacklisted':
                        await dispatch(fetchblacklistedList());
                        break;
                    case 'deactivated':
                        await dispatch(fetchdeactivatedList());
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error loading list:', error);
                showError(`Failed to load ${selectedList} drivers`);
            }
        };

        loadSelectedList();
    }, [selectedList, dispatch]);

    // Refresh all counts
    const refreshAllCounts = async () => {
        try {
            await Promise.all([
                dispatch(fetchtotalCount()),
                dispatch(fetchavailableCount()),
                dispatch(fetchblacklistedCount()),
                dispatch(fetchdeactivatedCount())
            ]);
        } catch (error) {
            console.error('Error refreshing counts:', error);
        }
    };

    // Refresh current list
    const refreshCurrentList = async () => {
        try {
            switch (selectedList) {
                case 'total':
                    await dispatch(fetchtotalList());
                    break;
                case 'available':
                    await dispatch(fetchavailableList());
                    break;
                case 'blacklisted':
                    await dispatch(fetchblacklistedList());
                    break;
                case 'deactivated':
                    await dispatch(fetchdeactivatedList());
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error refreshing current list:', error);
        }
    };

    // Card data with real counts
    const cardData = [
        {
            id: 1,
            type: 'available',
            title: 'Available Drivers',
            value: availableCount,
            subtitle: 'Active drivers',
            duration: 'Last 30 days',
            icon: <PeopleIcon fontSize="large" />,
            color: '#4caf50'
        },
        {
            id: 2,
            type: 'total',
            title: 'Total Drivers',
            value: totalCount,
            subtitle: 'All drivers',
            duration: 'Last 30 days',
            icon: <AddModeratorIcon fontSize="large" />,
            color: '#2196f3'
        },
        {
            id: 3,
            type: 'blacklisted',
            title: 'Blacklisted',
            value: blacklistedCount,
            subtitle: 'Blacklisted drivers',
            duration: 'Last 30 days',
            icon: <BlockIcon fontSize="large" />,
            color: '#f44336'
        },
        {
            id: 4,
            type: 'deactivated',
            title: 'Deactivated',
            value: deactivatedCount,
            subtitle: 'Deactivated drivers',
            duration: 'Last 30 days',
            icon: <AdminPanelSettingsIcon fontSize="large" />,
            color: '#ff9800'
        },
    ];

    // Event handlers
    const handleAdd = () => navigate('/driverform');

    const handleCardClick = (type, id) => {
        setSelectedList(type);
        setActiveCard(id);
        setPage(0); // Reset to first page when changing lists
        setSearchTerm(''); // Reset search when changing lists
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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

    const handleMenuOpen = (event, driver) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedDriver(driver);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedDriver(null);
    };

    const handleView = (driverId) => navigate(`/viewdriver/${driverId}`);
    const handleEdit = (driverId) => navigate(`/editdriver/${driverId}`);

    const handleDelete = async (driverId) => {
        const confirmed = await showConfirm(
            'Delete Driver',
            'Are you sure you want to delete this driver? This action cannot be undone.'
        );

        if (confirmed) {
            try {
                const result = await dispatch(deleteDriver(driverId));
                if (result.meta.requestStatus === 'fulfilled') {
                    showSuccess('Driver deleted successfully!');
                    await refreshAllCounts();
                    await refreshCurrentList();
                } else {
                    showError('Failed to delete driver. Please try again.');
                }
            } catch (error) {
                showError('Error deleting driver. Please try again.');
            }
        }
    };

    const handleStatusChange = async (statusLabel) => {
        if (!selectedDriver) {
            showError('No driver selected');
            return;
        }

        // Check if trying to set the same status
        const currentStatus = selectedDriver.status;
        const statusMap = {
            'Active': 'available',
            'Inactive': 'deactive',
            'Blacklisted': 'blacklist'
        };

        const newStatus = statusMap[statusLabel];

        if (currentStatus === newStatus) {
            showInfo(`Driver is already ${statusLabel.toLowerCase()}`);
            handleMenuClose();
            return;
        }

        const confirmed = await showConfirm(
            'Change Status',
            `Are you sure you want to change driver status to ${statusLabel}?`
        );

        if (!confirmed) {
            handleMenuClose();
            return;
        }

        setStatusLoading(true);
        try {
            const result = await dispatch(updateStatus({
                driverId: selectedDriver.driverId,
                status: newStatus
            }));

            if (result.meta.requestStatus === 'fulfilled') {
                showSuccess(`Driver status changed to ${statusLabel} successfully!`);

                // Update local state immediately for better UX
                setLocalLists(prev => {
                    const updatedLists = { ...prev };
                    // Remove driver from current list if status doesn't match
                    if (selectedList !== 'total' && selectedList !== newStatus) {
                        updatedLists[selectedList] = updatedLists[selectedList].filter(
                            driver => driver.driverId !== selectedDriver.driverId
                        );
                    }
                    return updatedLists;
                });

                // Refresh all counts
                await refreshAllCounts();

                // Refresh current list if driver should still be in it
                if (selectedList === 'total' || selectedList === newStatus) {
                    await refreshCurrentList();
                }

            } else {
                showError('Failed to update status. Please try again.');
            }
        } catch (error) {
            console.error('Status update error:', error);
            showError('Error updating driver status. Please try again.');
        } finally {
            setStatusLoading(false);
            handleMenuClose();
        }
    };

    // Get current list based on selection
    const getCurrentList = () => {
        return localLists[selectedList] || [];
    };

    // Filter and sort current list
    const currentList = getCurrentList();
    const filteredRows = Array.isArray(currentList) ? currentList.filter((row) => {
        const searchLower = searchTerm.toLowerCase();
        const name = row.name || `${row.firstName || ''} ${row.lastName || ''}`.trim();

        return (
            (row.driverId && row.driverId.toLowerCase().includes(searchLower)) ||
            (name && name.toLowerCase().includes(searchLower)) ||
            (row.contactNumber && row.contactNumber.includes(searchTerm))
        );
    }) : [];

    const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

    // Get status color and variant
    const getStatusProps = (status) => {
        switch (status) {
            case 'available':
                return { color: 'success', label: 'Active' };
            case 'deactive':
                return { color: 'warning', label: 'Inactive' };
            case 'blacklist':
                return { color: 'error', label: 'Blacklisted' };
            default:
                return { color: 'default', label: status };
        }
    };

    // Check if menu item should be disabled based on current list and driver status
    const isStatusDisabled = (statusLabel) => {
        if (!selectedDriver) return false;

        const statusMap = {
            'Active': 'available',
            'Inactive': 'deactive',
            'Blacklisted': 'blacklist'
        };

        const newStatus = statusMap[statusLabel];
        const currentStatus = selectedDriver.status;

        // Disable if it's the current status
        if (currentStatus === newStatus) return true;

        // Disable specific status changes based on current list
        switch (selectedList) {
            case 'available':
                // In available list, only allow deactivate and blacklist (disable activate)
                return statusLabel === 'Active';
            case 'deactivated':
                // In deactivated list, only allow activate and blacklist (disable inactive)
                return statusLabel === 'Inactive';
            case 'blacklisted':
                // In blacklisted list, only allow activate and deactivate (disable blacklist)
                return statusLabel === 'Blacklisted';
            default:
                return false;
        }
    };

    // Get available status options based on current list
    const getAvailableStatusOptions = () => {
        if (!selectedDriver) return ['Active', 'Inactive', 'Blacklisted'];

        switch (selectedList) {
            case 'available':
                return ['Inactive', 'Blacklisted']; // Only show deactivate and blacklist options
            case 'deactivated':
                return ['Active', 'Blacklisted']; // Only show activate and blacklist options
            case 'blacklisted':
                return ['Active', 'Inactive']; // Only show activate and deactivate options
            default:
                return ['Active', 'Inactive', 'Blacklisted'];
        }
    };

    // Show empty state message
    const getEmptyStateMessage = () => {
        if (loading) return "Loading...";
        if (searchTerm && filteredRows.length === 0) return "No drivers match your search";

        switch (selectedList) {
            case 'available':
                return "No available drivers found";
            case 'blacklisted':
                return "No blacklisted drivers found";
            case 'deactivated':
                return "No deactivated drivers found";
            case 'total':
                return "No drivers found";
            default:
                return "No drivers found";
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Driver Management
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    startIcon={<AddModeratorIcon />}
                    sx={{ borderRadius: 2 }}
                >
                    Add Driver
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
                                cursor: 'pointer',
                                border: activeCard === card.id ? `3px solid ${card.color}` : '2px solid transparent',
                                backgroundColor: activeCard === card.id ? cardLightColor : 'background.paper',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 6,
                                },
                                height: '190px',
                                width: "220px",
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '50%',
                                            backgroundColor: activeCard === card.id ? card.color : `${card.color}20`,
                                            color: activeCard === card.id ? '#fff' : card.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {card.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h3" fontWeight="bold" color="text.primary">
                                            {card.value || 0}
                                        </Typography>
                                        <Typography variant="h6" color="text.primary" gutterBottom>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {selectedList === 'available' && 'Available Drivers'}
                        {selectedList === 'total' && 'All Drivers'}
                        {selectedList === 'blacklisted' && 'Blacklisted Drivers'}
                        {selectedList === 'deactivated' && 'Deactivated Drivers'}
                        {` (${currentList.length})`}
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by ID, name, or contact..."
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ width: 320 }}
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead sx={{ backgroundColor: 'primary.main' }}>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell key={headCell.id} sx={{ color: 'white', fontWeight: 'bold' }}>
                                            {headCell.sortable ? (
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : 'asc'}
                                                    onClick={() => handleRequestSort(headCell.id)}
                                                    sx={{ color: 'white !important' }}
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
                                    const name = row.name || `${row.firstName || ''} ${row.lastName || ''}`.trim();

                                    return (
                                        <TableRow key={`${row.driverId}-${index}`} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {row.driverId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{row.contactNumber}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={statusProps.label}
                                                    color={statusProps.color}
                                                    size="small"
                                                    variant="filled"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={() => handleView(row.driverId)}
                                                        title="View"
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleEdit(row.driverId)}
                                                        title="Edit"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDelete(row.driverId)}
                                                        title="Delete"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="default"
                                                        onClick={(e) => handleMenuOpen(e, row)}
                                                        title="Change Status"
                                                        disabled={statusLoading}
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
                                                {getEmptyStateMessage()}
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2, minWidth: 180 }
                }}
            >
                {getAvailableStatusOptions().map((statusOption) => (
                    <MenuItem
                        key={statusOption}
                        onClick={() => handleStatusChange(statusOption)}
                        disabled={isStatusDisabled(statusOption) || statusLoading}
                    >
                        <ListItemIcon>
                            {statusOption === 'Active' && <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />}
                            {statusOption === 'Inactive' && <CancelIcon sx={{ color: 'orange' }} fontSize="small" />}
                            {statusOption === 'Blacklisted' && <BlockIcon sx={{ color: 'red' }} fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText primary={statusOption} />
                        {selectedDriver?.status ===
                            (statusOption === 'Active' ? 'available' :
                                statusOption === 'Inactive' ? 'deactive' : 'blacklist') &&
                            <Chip label="Current" size="small" color="primary" sx={{ ml: 1 }} />
                        }
                    </MenuItem>
                ))}
            </Menu>

            {/* Status Loading Overlay */}
            {statusLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <Card sx={{ p: 4, textAlign: 'center' }}>
                        <CircularProgress size={40} sx={{ mb: 2 }} />
                        <Typography variant="h6">Updating Status...</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please wait while we update the driver status
                        </Typography>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default DriverCard;