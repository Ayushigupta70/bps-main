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
    Menu
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
import { fetchtotalCount, fetchavailableCount, fetchblacklistedCount, fetchdeactivatedCount, fetchtotalList, fetchavailableList, fetchblacklistedList, fetchdeactivatedList, deleteDriver, updateStatus } from '../../../features/Driver/driverSlice'
const cardData = [
    { id: 1, title: 'Available Driver', value: '0', subtitle: 'Active supervisors', duration: 'Last 30 days', icon: <PeopleIcon fontSize="large" /> },
    { id: 2, title: 'Total Driver', value: '0', subtitle: 'Deactivated supervisors', duration: 'Last 30 days', icon: <AddModeratorIcon fontSize="large" /> },
    { id: 3, title: 'Blacklisted', value: '0', subtitle: 'Blacklisted supervisors', duration: 'Last 30 days', icon: <BlockIcon fontSize="large" /> },
    { id: 4, title: 'Deactive', value: '0', subtitle: 'System administrators', duration: 'Last 30 days', icon: <AdminPanelSettingsIcon fontSize="large" /> },
];



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
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
}

const headCells = [
    { id: 'sno', label: 'S.No', sortable: false },
    { id: 'driverid', label: 'Driver ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'contact', label: 'Contact', sortable: true },
    { id: 'action', label: 'Action', sortable: false },
];

const DriverCard = () => {
    const theme = useTheme();
    const cardColor = '#0155a5';
    const cardLightColor = '#e6f0fa';
    const [activeCard, setActiveCard] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedList, setSelectedList] = useState('total');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuDriverId, setMenuDriverId] = useState(null);


    const [driverRows, setDriverRows] = useState([]);

    const dispatch = useDispatch();
    const { list: driverList, totalCount, availableCount, blacklistedCount, deactivatedCount } = useSelector(state => state.drivers);
    useEffect(() => {
        if (driverList) {
            setDriverRows(driverList);
        }
    }, [driverList]);
    useEffect((() => {
        dispatch(fetchtotalCount());
        dispatch(fetchavailableCount());
        dispatch(fetchblacklistedCount());
        dispatch(fetchdeactivatedCount());
        dispatch(fetchtotalList());

    }), [dispatch])
    const handleMenuOpen = (e, driverId) => {
        setMenuAnchorEl(e.currentTarget);
        setMenuDriverId(driverId);
    };


    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setMenuDriverId(null);
    };

    const handleStatusChange = (statusLabel) => {
        const statusMap = {
            Active: "available",
            Inactive: "deactive",
            Blacklisted: "blacklist"
        };
        const status = statusMap[statusLabel];
        if (menuDriverId) {
            dispatch(updateStatus({ driverId: menuDriverId, status }));
            window.location.reload();
        }
        handleMenuClose();
    };


    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/driverform');
    };


    useEffect(() => {
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
    }, [selectedList, dispatch]); // re-run when selectedList changes

    const handleCardClick = (type) => {
        setSelectedList(type); // triggers useEffect to auto-fetch
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
    const handleView = (driverId) => navigate(`/viewdriver/${driverId}`);
    const filteredRows = driverRows.filter((row) =>
        (row.driverid && row.driverid.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (`${row.firstName} ${row.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.contact && row.contact.includes(searchTerm))
    );



    const handleDelete = (driverId) => {
        if (window.confirm("Are you sure you want to delete this Driver ?")) {
            console.log("Deleting ID:", driverId);
            dispatch(deleteDriver(driverId));
        }
    }
    const handleEdit = (driverId) => {
        navigate(`/editdriver/${driverId}`)
    }

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);
    const cardData = [
        { id: 1, type: 'available', title: 'Available Driver', value: availableCount, subtitle: 'Active supervisors', duration: 'Last 30 days', icon: <PeopleIcon fontSize="large" /> },
        { id: 2, type: 'total', title: 'Total Driver', value: totalCount, subtitle: 'Deactivated supervisors', duration: 'Last 30 days', icon: <AddModeratorIcon fontSize="large" /> },
        { id: 3, type: 'blacklisted', title: 'Blacklisted', value: blacklistedCount, subtitle: 'Blacklisted supervisors', duration: 'Last 30 days', icon: <BlockIcon fontSize="large" /> },
        { id: 4, type: 'deactivated', title: 'Deactive', value: deactivatedCount, subtitle: 'System administrators', duration: 'Last 30 days', icon: <AdminPanelSettingsIcon fontSize="large" /> },
    ];

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Manage Driver</Typography>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
            </Box>

            <Grid container spacing={2} sx={{ flexWrap: 'nowrap', overflowX: 'auto', mb: 4 }}>
                {cardData.map((card) => (
                    <Grid item key={card.id} sx={{ minWidth: 220, flex: 1, display: 'flex', borderRadius: 2 }}>
                        <Card onClick={() => handleCardClick(card.type)} sx={{
                            flex: 1, cursor: 'pointer',
                            border: activeCard === card.id ? `2px solid ${cardColor}` : '2px solid transparent',
                            backgroundColor: activeCard === card.id ? cardLightColor : 'background.paper',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[6],
                                backgroundColor: cardLightColor,
                                '& .icon-container': {
                                    backgroundColor: cardColor,
                                    color: '#fff'
                                }
                            }
                        }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box className="icon-container" sx={{
                                    p: 1.5, borderRadius: '50%',
                                    backgroundColor: activeCard === card.id ? cardColor : cardLightColor,
                                    color: activeCard === card.id ? '#fff' : cardColor,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0, transition: 'all 0.3s ease'
                                }}>
                                    {React.cloneElement(card.icon, { color: 'inherit' })}
                                </Box>
                                <Stack spacing={0.5}>
                                    <Typography variant="h5" fontWeight="bold" color={activeCard === card.id ? 'primary' : 'text.primary'}>
                                        {card.value}
                                    </Typography>
                                    <Typography variant="subtitle1" color={activeCard === card.id ? 'primary' : 'text.primary'}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">{card.subtitle}</Typography>
                                    <Typography variant="caption" color="text.disabled">{card.duration}</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#1565c0' }}>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell key={headCell.id} sx={{ fontWeight: 'bold' }} sortDirection={orderBy === headCell.id ? order : false}>
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id)}
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
                            {stableSort(filteredRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{row.driverId}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.contactNumber}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton size="small" color="primary" onClick={() => handleEdit(row.driverId)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="info" onClick={() => handleView(row.driverId)}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleDelete(row.driverId)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="default" onClick={(e) => handleMenuOpen(e, row.driverId)}>
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>

                                                <Menu
                                                    anchorEl={menuAnchorEl}
                                                    open={Boolean(menuAnchorEl)}
                                                    onClose={handleMenuClose}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                    PaperProps={{
                                                        elevation: 3,
                                                        sx: {
                                                            borderRadius: 2,
                                                            minWidth: 180,
                                                            mt: 1,
                                                        },
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5} />
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
            </Box>
        </Box>
    );
};

export default DriverCard;