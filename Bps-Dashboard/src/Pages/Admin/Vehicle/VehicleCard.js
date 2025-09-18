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
import { useDispatch, useSelector } from 'react-redux';
import {
    getAvailableVehiclesCount, getDeactivatedVehiclesCount, getBlacklistedVehiclesCount, getTotalVehiclesCount,
    getTotalVehiclesList, getBlacklistedVehiclesList, getAvailableVehiclesList, getDeactivatedVehicles, deleteVehicle
    , updateStatus
} from '../../../features/vehicle/vehicleSlice';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
}

const headCells = [
    { id: "sno", label: "S.No", sortable: false },
    { id: "vehicleid", label: "Vehicle ID", sortable: true },
    { id: "location", label: "Location", sortable: true },
    { id: "ownername", label: "Owner Name", sortable: true },
    { id: "vehiclemodel", label: "Vehicle Model", sortable: false },
    { id: "action", label: "Action", sortable: false },
];

const VehicleCard = ({ onSelect }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const cardColor = "#0155a5";
    const cardLightColor = "#e6f0fa";
    const [activeCard, setActiveCard] = useState(null);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [vehicleRows, setVehicleRows] = useState([])
    const [selectedList, setSelectedList] = useState('available');

    const dispatch = useDispatch();
    const { list: vehicleList, availablecount,
        deactiveCount,
        blacklistedCount,
        totalCount } = useSelector(state => state.vehicles);
    useEffect(() => {
        if (vehicleList) {
            setVehicleRows(vehicleList);
        }
    }, [vehicleList]);
    useEffect(() => {
        dispatch(getAvailableVehiclesCount());
        dispatch(getBlacklistedVehiclesCount());
        dispatch(getDeactivatedVehiclesCount());
        dispatch(getTotalVehiclesCount());
        // dispatch(getAvailableVehiclesList());
    }, [dispatch])
    const handleAdd = () => {
        navigate("/vehicleform");
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

    const handleEdit = (vehicleId) => {
        navigate(`/editvehicle/${vehicleId}`)
    }
    useEffect(() => {
        switch (selectedList) {
            case 'total':
                dispatch(getTotalVehiclesList());
                break;
            case 'available':
                dispatch(getAvailableVehiclesList());
                break;
            case 'blacklisted':
                dispatch(getBlacklistedVehiclesList());
                break;
            case 'deactivated':
                dispatch(getDeactivatedVehicles());
                break;
            default:
                break;
        }
    }, [selectedList, dispatch]); // re-run when selectedList changes

    const handleCardClick = (type) => {
        setSelectedList(type); // triggers useEffect to auto-fetch
    };
    const handleStatusChange = (vehicleId, action) => {
        dispatch(updateStatus({ vehicleId, action }));
        window.location.reload();
    };
    const cardData = [
        {
            id: 1,
            title: "Available Vehicle",
            type: "available",
            value: availablecount,
            icon: <LocalShippingIcon fontSize="large" />,
        },
        {
            id: 2,
            title: "Total Vehicle ",
            type: "total",
            value: totalCount,
            duration: "NaN% (30 Days)",
            icon: <LocalShippingIcon fontSize="large" />,
        },
        {
            id: 3,
            title: "Deactivated Vehicle",
            type: "deactivated",
            value: deactiveCount,
            duration: "(30 Days)",
            icon: <LocalShippingIcon fontSize="large" />,
        },
        {
            id: 4,
            title: "Blacklisted Vehicle",
            type: "blacklisted",
            value: blacklistedCount,
            duration: "(30 Days)",
            icon: <LocalShippingIcon fontSize="large" />,
        },
    ];
    const filteredRows = vehicleRows.filter(
        (row) =>
            row.vehicleModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.ownedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.currentLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleView = (vehicleId) => {
        navigate(`/vehicleview/${vehicleId}`);
    }
    const handleDelete = (vehicleId) => {
        if (window.confirm("Are you sure you want to delete this Vehicle ?")) {

            dispatch(deleteVehicle(vehicleId));
        }
    }

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        if (option) {
            onSelect(option);
        }
    };


    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Manage Vehicle
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{ textTransform: "none", fontWeight: 500 }}
                >
                    Add Vehicle
                </Button>
            </Box>

            {/* Dashboard Cards */}
            <Grid
                container
                spacing={2}
                sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}
            >
                {cardData.map((card) => (
                    <Grid
                        item
                        key={card.id}
                        sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}
                    >
                        <Card
                            onClick={() => handleCardClick(card.type)}
                            sx={{
                                flex: 1,
                                cursor: "pointer",
                                border:
                                    activeCard === card.id
                                        ? `2px solid ${cardColor}`
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCard === card.id ? cardLightColor : "background.paper",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: theme.shadows[6],
                                    backgroundColor: cardLightColor,
                                    "& .icon-container": {
                                        backgroundColor: cardColor,
                                        color: "#fff",
                                    },
                                },
                            }}
                        >
                            <CardContent
                                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                            >
                                <Box
                                    className="icon-container"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "50%",
                                        backgroundColor:
                                            activeCard === card.id ? cardColor : cardLightColor,
                                        color: activeCard === card.id ? "#fff" : cardColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {React.cloneElement(card.icon, { color: "inherit" })}
                                </Box>
                                <Stack spacing={0.5}>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color={activeCard === card.id ? "primary" : "text.primary"}
                                    >
                                        {card.value}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color={activeCard === card.id ? "primary" : "text.primary"}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.subtitle}
                                    </Typography>
                                    <Typography variant="caption" color="text.disabled">
                                        {card.duration}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Admin Table */}
            <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
                        <TableHead sx={{ backgroundColor: "#1565c0" }}>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sx={{ fontWeight: "bold" }}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : "asc"}
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
                                        <TableCell>{row.vehicleId}</TableCell>
                                        <TableCell>{row.location}</TableCell>
                                        <TableCell>{row.ownedBy}</TableCell>
                                        <TableCell>{row.vehicleModel}</TableCell>
                                        <TableCell>
                                            <Box>
                                                <IconButton size="small" color="primary" onClick={() => handleEdit(row.vehicleId)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="info" onClick={() => handleView(row.vehicleId)}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleDelete(row.vehicleId)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" title="More options" onClick={handleClick}>
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={() => handleClose()}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            borderRadius: 10,
                                                            minWidth: 160,
                                                            padding: '4px 0',
                                                        }
                                                    }}
                                                >
                                                    <MenuItem onClick={() => handleStatusChange(row.vehicleId, 'available')}>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Active" />
                                                    </MenuItem>
                                                    <MenuItem onClick={() => handleStatusChange(row.vehicleId, 'deactivated')}>
                                                        <ListItemIcon>
                                                            <CancelIcon sx={{ color: 'orange' }} fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Inactive" />
                                                    </MenuItem>
                                                    <MenuItem onClick={() => handleStatusChange(row.vehicleId, 'blacklisted')}>
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

export default VehicleCard;