import React, { useState } from "react";
import {
    Typography,
    Button,
    Paper,
    CircularProgress,
    Stack,
    Grid
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomerSearch from "../../../Components/CustomerSearch";

const TrackerCard = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleGenerateInvoice = async () => {
        if (!selectedCustomer || !fromDate || !toDate) {
            setErrorMsg("Please fill in all fields");
            return;
        }
        setErrorMsg("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/v2/bookings/invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   customerName: selectedCustomer.name, // ✅ safer than just name
                    fromDate: fromDate.toISOString().split("T")[0],
                    toDate: toDate.toISOString().split("T")[0],
                }),
            });

            if (response.ok && response.headers.get("content-type").includes("pdf")) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${selectedCustomer.name}_Invoice.pdf`; // ✅ use selectedCustomer
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                const data = await response.json();
                setErrorMsg(data.message || "Failed to generate invoice");
            }
        } catch (error) {
            setErrorMsg(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                maxWidth: 500,
                mx: "auto",
                mt: 6,
                borderRadius: 4,
                background: "linear-gradient(145deg, #f9f9f9, #e6e9f0)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
        >
            {/* Header */}
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    textAlign: "center",
                    color: "#333",
                    mb: 3,
                }}
            >
                📄 Generate Customer Invoice
            </Typography>

            {/* Form */}
            <Grid container spacing={2}>
                <Grid size ={{xs:12}}>
                <CustomerSearch onCustomerSelect={setSelectedCustomer} 
                    slotProps={{
                            textField: { fullWidth: true, variant: "outlined", size:"medium" },
                        }}
                />
                </Grid>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid size ={{xs:6}}>
                    <DatePicker
                        label="From Date"
                        value={fromDate}
                        format="dd/MM/yyyy"
                        onChange={setFromDate}
                        slotProps={{
                            textField: { fullWidth: true, variant: "outlined" },
                        }}
                    />
                    </Grid>
                    <Grid size ={{xs:6}} >
                    <DatePicker
                        label="To Date"
                        value={toDate}
                        format="dd/MM/yyyy"
                        onChange={setToDate}
                        slotProps={{
                            textField: { fullWidth: true, variant: "outlined" },
                        }}
                    />
                    </Grid>
                </LocalizationProvider>

                {errorMsg && (
                    <Typography color="error" variant="body2">
                        {errorMsg}
                    </Typography>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleGenerateInvoice}
                    disabled={loading}
                    sx={{
                        background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderRadius: 3,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                        ":hover": {
                            background: "linear-gradient(90deg, #3b8ef3, #00d4ff)",
                        },
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Invoice"}
                </Button>
            </Grid>
        </Paper>
    );
};

export default TrackerCard;
