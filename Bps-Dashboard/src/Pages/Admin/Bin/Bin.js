import React, { useEffect, useState, useMemo } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress,
    Stack,
    TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreIcon from "@mui/icons-material/Restore";
import { useDispatch, useSelector } from "react-redux";
import { listDeletedBookings, restoreBooking } from "../../../features/booking/bookingSlice";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Bin = () => {
    const dispatch = useDispatch();

    const { deletedBookings, loading, error } = useSelector(
        (state) => state.bookings
    );

    const [sortConfig, setSortConfig] = useState({ key: "bookingDate", direction: "asc" });

    // Search states
    const [senderSearch, setSenderSearch] = useState("");
    const [receiverSearch, setReceiverSearch] = useState("");
    const [dateSearch, setDateSearch] = useState("");

    useEffect(() => {
        dispatch(listDeletedBookings());
    }, [dispatch]);

    const sortedItems = useMemo(() => {
        if (!deletedBookings) return [];

        // Filtering
        let filtered = [...deletedBookings].filter((item) => {
            const senderMatch = item.senderName?.toLowerCase().includes(senderSearch.toLowerCase());
            const receiverMatch = item.receiverName?.toLowerCase().includes(receiverSearch.toLowerCase());
            const dateMatch = dateSearch
                ? new Date(item.bookingDate).toLocaleDateString("en-GB").includes(dateSearch)
                : true;
            return senderMatch && receiverMatch && dateMatch;
        });

        // Sorting
        return filtered.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (!aValue || !bValue) return 0;

            if (sortConfig.key.toLowerCase().includes("date")) {
                return sortConfig.direction === "asc"
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }
            return sortConfig.direction === "asc"
                ? aValue.toString().localeCompare(bValue.toString())
                : bValue.toString().localeCompare(aValue.toString());
        });
    }, [deletedBookings, sortConfig, senderSearch, receiverSearch, dateSearch]);

    const handleRestore = (id) => {
        const confirmRestore = window.confirm("Are you sure you want to restore this booking?");
        if (confirmRestore) {
            dispatch(restoreBooking(id));
            alert(`Booking with ID ${id} has been restored!`);
        }
    };

    return (
        <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: "linear-gradient(135deg, #fff, #fef5f5)" }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <DeleteOutlineIcon sx={{ fontSize: 55, color: "#e63946", mr: 2 }} />
                    <Typography variant="h4" fontWeight="bold" color="error.dark">
                        Recycle Bin
                    </Typography>
                </Box>

                {/* Search Fields */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                    <TextField
                        label="Search Sender"
                        variant="outlined"
                        size="small"
                        value={senderSearch}
                        onChange={(e) => setSenderSearch(e.target.value)}
                    />
                    <TextField
                        label="Search Receiver"
                        variant="outlined"
                        size="small"
                        value={receiverSearch}
                        onChange={(e) => setReceiverSearch(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Search Booking Date"
                            value={dateSearch ? new Date(dateSearch) : null}
                            onChange={(newValue) => {
                                if (newValue) {
                                    // Format date as DD/MM/YYYY
                                    const day = String(newValue.getDate()).padStart(2, '0');
                                    const month = String(newValue.getMonth() + 1).padStart(2, '0');
                                    const year = newValue.getFullYear();
                                    setDateSearch(`${day}/${month}/${year}`);
                                } else {
                                    setDateSearch('');
                                }
                            }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                    </LocalizationProvider>
                </Stack>

                {/* Loader */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error */}
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* Table */}
                {!loading && (
                    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Sender Name</TableCell>
                                    <TableCell>Receiver Name</TableCell>
                                    <TableCell>Pick Up</TableCell>
                                    <TableCell>Drop</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Booking Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedItems.length ? (
                                    sortedItems.map((item, index) => (
                                        <TableRow key={item._id || index} sx={{ "&:hover": { backgroundColor: "#fff5f5" } }}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.senderName}</TableCell>
                                            <TableCell>{item.receiverName}</TableCell>
                                            <TableCell>{item.startStation}</TableCell>
                                            <TableCell>{item.endStation}</TableCell>
                                            <TableCell>{item.mobile}</TableCell>
                                            <TableCell>
                                                {item.bookingDate
                                                    ? new Date(item.bookingDate).toLocaleDateString("en-GB")
                                                    : "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction={'row'}>
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => handleRestore(item.bookingId)}
                                                        title="Restore"
                                                    >
                                                        <RestoreIcon />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                                            <DeleteOutlineIcon sx={{ fontSize: 60, color: "#ccc" }} />
                                            <Typography variant="h6" color="textSecondary" mt={2}>
                                                No deleted items found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default Bin;