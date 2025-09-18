import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    Divider,
    Button,
    TextField,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Cashbook = () => {
    const [todayBookings, setTodayBookings] = useState({ count: 0, total: 0 });
    const [notes, setNotes] = useState("");
    const [remaining, setRemaining] = useState(null);
    const [savedEntries, setSavedEntries] = useState([]);

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const storedDate = localStorage.getItem("cashbook_date");
        const storedEntries = localStorage.getItem("cashbook_entries");
        const storedRemaining = localStorage.getItem("cashbook_remaining");
        const storedBookings = localStorage.getItem("cashbook_bookings");

        if (storedDate === today) {
            if (storedEntries) setSavedEntries(JSON.parse(storedEntries));
            if (storedRemaining) setRemaining(JSON.parse(storedRemaining));
            if (storedBookings) setTodayBookings(JSON.parse(storedBookings));
        } else {
            localStorage.setItem("cashbook_date", today);
        }
    }, []);

    useEffect(() => {
        const today = new Date().toLocaleDateString();

        // Only save if there is something to save
        if (savedEntries.length > 0 || remaining !== null) {
            localStorage.setItem("cashbook_date", today);
            localStorage.setItem("cashbook_entries", JSON.stringify(savedEntries));
            localStorage.setItem("cashbook_remaining", JSON.stringify(remaining));
            localStorage.setItem("cashbook_bookings", JSON.stringify(todayBookings));
        }
    }, [savedEntries, remaining, todayBookings]);

    useEffect(() => {
        // Simulate API data for today
        if (!todayBookings.total) {
            setTodayBookings({ count: 8, total: 32500 });
        }
    }, []);



    const handleSave = () => {
        const noteText = notes.trim();
        const matchedNumber = noteText.match(/\d+/g); // extract all numbers
        const totalExpense = matchedNumber
            ? matchedNumber.reduce((sum, num) => sum + parseFloat(num), 0)
            : 0;

        // If no remaining yet, start from total bookings
        const startingBalance = remaining !== null ? remaining : todayBookings.total;
        const newBalance = startingBalance - totalExpense;

        setRemaining(newBalance);

        const newEntry = {
            remaining: newBalance,
            notes: noteText || "—",
        };

        setSavedEntries((prev) => [...prev, newEntry]);
        setNotes("");
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
        if (!confirmDelete) return;

        const updatedEntries = savedEntries.filter((_, i) => i !== index);
        setSavedEntries(updatedEntries);

        // Update remaining based on the last entry after deletion
        if (updatedEntries.length > 0) {
            setRemaining(updatedEntries[updatedEntries.length - 1].remaining);
        } else {
            setRemaining(todayBookings.total); // Reset to original bookings if no entries left
        }
    };


    const handleEdit = (index) => {
        const entry = savedEntries[index];
        setNotes(entry.notes); // Load notes into textarea for editing

        // If editing the last entry, set remaining back to what it was before this entry
        if (index > 0) {
            setRemaining(savedEntries[index - 1].remaining);
        } else {
            setRemaining(todayBookings.total);
        }

        // Remove the entry so it can be replaced after saving
        const updatedEntries = savedEntries.filter((_, i) => i !== index);
        setSavedEntries(updatedEntries);
    };



    return (
        <Box p={3} sx={{ bgcolor: "#eef2f6", minHeight: "100vh" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📒 Daily Cashbook
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Track today’s bookings, expenses & net balance
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            boxShadow: 4,
                            background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                            color: "#fff",
                            transition: "0.3s",
                            "&:hover": { transform: "scale(1.02)" },
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.2)",
                                        p: 2,
                                        borderRadius: "50%",
                                    }}
                                >
                                    <MonetizationOnIcon fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h6">Today's Bookings</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        {todayBookings.count} bookings
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        ₹ {todayBookings.total.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            boxShadow: 4,
                            background: "linear-gradient(135deg, #66bb6a, #2e7d32)",
                            color: "#fff",
                            transition: "0.3s",
                            "&:hover": { transform: "scale(1.02)" },
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.2)",
                                        p: 2,
                                        borderRadius: "50%",
                                    }}
                                >
                                    <AccountBalanceWalletIcon fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h6">Remaining Balance</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        After expenses
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        ₹ {remaining !== null
                                            ? remaining.toLocaleString()
                                            : "0.00"}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    📝 Notes for Today
                </Typography>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Write details about today's bookings or expenses..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 3,
                        boxShadow: 2,
                        "& textarea": { fontSize: "16px" },
                    }}
                />
            </Box>

            <Stack direction="row" spacing={2} mt={3}>
                <Button
                    variant="contained"
                    startIcon={<EventNoteIcon />}
                    onClick={handleSave}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        background: "linear-gradient(135deg, #ff9800, #f57c00)",
                        color: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                            background: "linear-gradient(135deg, #f57c00, #ef6c00)",
                        },
                    }}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        fontWeight: "bold",
                    }}
                >
                    Export as PDF
                </Button>
            </Stack>

            {savedEntries.length > 0 && (
                <Box mt={5}>
                    <Typography variant="h6" gutterBottom>
                        📋 Saved Entries for Today
                    </Typography>
                    <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f5f5f5" }}>
                                    <th style={styles.th}>#</th>
                                    <th style={styles.th}>Remaining</th>
                                    <th style={styles.th}>Notes</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedEntries.map((entry, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                                        }}
                                    >
                                        <td style={styles.td}>{index + 1}</td>
                                        <td style={styles.td}>
                                            ₹ {entry.remaining.toLocaleString()}
                                        </td>
                                        <td style={styles.td}>{entry.notes}</td>
                                        <td style={{ ...styles.td, display: "flex", gap: "8px" }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </Box>
            )}

        </Box>
    );
};

const styles = {
    th: {
        padding: "12px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        fontWeight: "bold",
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #ddd",
        fontSize: "15px",
    },
};

export default Cashbook;
