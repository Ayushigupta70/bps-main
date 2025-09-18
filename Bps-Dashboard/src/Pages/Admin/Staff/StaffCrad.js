import React, { useState } from 'react';
import {
    Box, Grid, Card, CardContent, Typography, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TableSortLabel, TablePagination, TextField, InputAdornment,
    useTheme, Button, ListItemText, MenuItem, ListItemIcon, Menu
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
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";

const StaffCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const cardColor = '#0155a5';
    const cardLightColor = '#e6f0fa';

    // Dummy card data
    const cardData = [
        { id: 1, type: 'active', title: 'Active Staff', value: 12, subtitle: 'Currently working', duration: 'Last 30 days', icon: <PeopleIcon fontSize="large" /> },
        { id: 2, type: 'total', title: 'Total Staff', value: 25, subtitle: 'All registered staff', duration: 'Last 30 days', icon: <AddModeratorIcon fontSize="large" /> },
        { id: 3, type: 'blacklisted', title: 'Blacklisted', value: 3, subtitle: 'Removed from system', duration: 'Last 30 days', icon: <BlockIcon fontSize="large" /> },
        { id: 4, type: 'inactive', title: 'Inactive', value: 5, subtitle: 'Not currently working', duration: 'Last 30 days', icon: <AdminPanelSettingsIcon fontSize="large" /> },
    ];

    // Dummy table data
    const staffRows = [
        { staffId: 'ST001', name: 'John Doe', contactNumber: '9876543210' },
        { staffId: 'ST002', name: 'Jane Smith', contactNumber: '8765432109' },
        { staffId: 'ST003', name: 'Alex Brown', contactNumber: '7654321098' },
        { staffId: 'ST004', name: 'Sara Wilson', contactNumber: '6543210987' },
        { staffId: 'ST005', name: 'Michael Clark', contactNumber: '5432109876' },
    ];

    const headCells = [
        { id: 'sno', label: 'S.No', sortable: false },
        { id: 'staffId', label: 'Staff ID', sortable: true },
        { id: 'name', label: 'Name', sortable: true },
        { id: 'contactNumber', label: 'Contact', sortable: true },
        { id: 'action', label: 'Action', sortable: false },
    ];

    const handleMenuOpen = (e) => {
        setMenuAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleStaffClick = () => {
        navigate("/staffform");
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Manage Staff</Typography>
                <Button variant="contained" onClick={handleStaffClick}>Add</Button>
            </Box>

            {/* Cards */}
            <Grid container spacing={2} sx={{ flexWrap: 'nowrap', overflowX: 'auto', mb: 4 }}>
                {cardData.map((card) => (
                    <Grid item key={card.id} sx={{ minWidth: 220, flex: 1, display: 'flex', borderRadius: 2 }}>
                        <Card
                            onClick={() => setActiveCard(card.id)}
                            sx={{
                                flex: 1,
                                cursor: 'pointer',
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
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    className="icon-container"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: activeCard === card.id ? cardColor : cardLightColor,
                                        color: activeCard === card.id ? '#fff' : cardColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
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

            {/* Search */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id} sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row.staffId} hover>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{row.staffId}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.contactNumber}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton size="small" color="primary">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="info">
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={handleMenuOpen}>
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={staffRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                />
            </TableContainer>

            {/* Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem>
                    <ListItemIcon><CheckCircleIcon sx={{ color: 'green' }} fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Active" />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon><CancelIcon sx={{ color: 'orange' }} fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Inactive" />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon><BlockIcon sx={{ color: 'red' }} fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Blacklisted" />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default StaffCard;
