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
    const [localDriverList, setLocalDriverList] = useState([]);

    // Colors
    const cardColor = '#0155a5';
    const cardLightColor = '#e6f0fa';

    // Initialize local state with driverList
    useEffect(() => {
        if (driverList && driverList.length > 0) {
            setLocalDriverList(driverList);
        }
    }, [driverList]);

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
                    dispatch(fetchtotalCount()),
                    dispatch(fetchavailableCount()),
                    dispatch(fetchblacklistedCount()),
                    dispatch(fetchdeactivatedCount()),
                    dispatch(fetchtotalList())
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
            }
        };
        loadSelectedList();
    }, [selectedList, dispatch]);

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
                    // Refresh all counts
                    await Promise.all([
                        dispatch(fetchtotalCount()),
                        dispatch(fetchavailableCount()),
                        dispatch(fetchblacklistedCount()),
                        dispatch(fetchdeactivatedCount())
                    ]);
                    // Refresh current list
                    switch (selectedList) {
                        case 'total':
                            dispatch(fetchtotalList());
                            break;
                        case 'available':
                            dispatch(fetchavailableList());
                            break;
                        case 'blacklisted':
                            dispatch(fetchblacklistedList());
                            break;
                        case 'deactivated':
                            dispatch(fetchdeactivatedList());
                            break;
                        default:
                            break;
                    }
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

        const statusMap = {
            'Active': 'available',
            'Inactive': 'deactive',
            'Blacklisted': 'blacklist'
        };

        const newStatus = statusMap[statusLabel];
        const confirmed = await showConfirm(
            'Change Status',
            `Are you sure you want to change driver status to ${statusLabel}?`
        );

        if (confirmed) {
            try {
                const result = await dispatch(updateStatus({
                    driverId: selectedDriver.driverId,
                    status: newStatus
                }));

                if (result.meta.requestStatus === 'fulfilled') {
                    showSuccess(`Driver status changed to ${statusLabel} successfully!`);

                    // Update local state immediately for better UX
                    const updatedList = localDriverList.map(driver =>
                        driver.driverId === selectedDriver.driverId
                            ? { ...driver, status: newStatus }
                            : driver
                    );
                    setLocalDriverList(updatedList);

                    // Refresh all counts
                    await Promise.all([
                        dispatch(fetchtotalCount()),
                        dispatch(fetchavailableCount()),
                        dispatch(fetchblacklistedCount()),
                        dispatch(fetchdeactivatedCount())
                    ]);

                    // If the driver's new status doesn't match current filter, refresh the list
                    if (selectedList !== newStatus && selectedList !== 'total') {
                        switch (selectedList) {
                            case 'available':
                                dispatch(fetchavailableList());
                                break;
                            case 'blacklisted':
                                dispatch(fetchblacklistedList());
                                break;
                            case 'deactivated':
                                dispatch(fetchdeactivatedList());
                                break;
                            default:
                                break;
                        }
                    }

                } else {
                    showError('Failed to update status. Please try again.');
                }
            } catch (error) {
                showError('Error updating driver status. Please try again.');
            } finally {
                handleMenuClose();
            }
        }
    };

    // Filter and sort data - use localDriverList instead of driverList for immediate updates
    const filteredRows = Array.isArray(localDriverList) ? localDriverList.filter((row) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (row.driverId && row.driverId.toLowerCase().includes(searchLower)) ||
            (row.name && row.name.toLowerCase().includes(searchLower)) ||
            (row.firstName && `${row.firstName} ${row.lastName || ''}`.toLowerCase().includes(searchLower)) ||
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
                                height: '100%'
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
                                    return (
                                        <TableRow key={row.driverId || index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {row.driverId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {row.name || `${row.firstName || ''} ${row.lastName || ''}`.trim()}
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
                                                No drivers found
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
                <MenuItem onClick={() => handleStatusChange('Active')}>
                    <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Active" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('Inactive')}>
                    <ListItemIcon>
                        <CancelIcon sx={{ color: 'orange' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Inactive" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('Blacklisted')}>
                    <ListItemIcon>
                        <BlockIcon sx={{ color: 'red' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Blacklisted" />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default DriverCard;