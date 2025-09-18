import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, TextField, Paper, Button, MenuItem,
    Table, TableHead, TableRow, TableCell, TableBody, Divider
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from 'react-redux';
import { caReport } from "../../../features/booking/bookingSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fetchStations } from '../../../features/stations/stationSlice'
const BookingReport = () => {
    const [fromDate, setFromDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const dispatch = useDispatch();
    const { list5 } = useSelector((state) => state.bookings);
    const summary = list5?.summary || [];
    const { list: stations } = useSelector((state) => state.stations);
    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);
    const handleSubmit = async () => {
        if (!fromDate || !endDate) {
            alert("Please select both dates");
            return;
        }

        try {
            await dispatch(caReport({
                pickup: fromCity,
                drop: toCity,
                fromDate: fromDate.toISOString().split("T")[0],
                toDate: endDate.toISOString().split("T")[0]
            })).unwrap();
        } catch (err) {
            console.error("Error fetching CA Report:", err);
        }
    };

    const handleDownload = () => {
        if (!Array.isArray(list5?.summary) || list5.summary.length === 0) {
            alert("No data to download");
            return;
        }

        const { summary, totals, filters } = list5;
        const doc = new jsPDF("p", "mm", "a4");

        // ===== HEADER DESIGN =====
        doc.setFont("helvetica", "bold").setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text("Bharat Parcel Services Pvt. Ltd.", 105, 15, { align: "center" });

        doc.setFontSize(9).setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        doc.text("332, Kucha Ghasi Ram, Chandni Chowk, Fatehpuri, Delhi - 110006", 105, 20, { align: "center" });
        doc.text("CIN: U64120DL2011PTC213237", 105, 25, { align: "center" });

        // Blue underline separator
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(0.6);
        doc.line(15, 28, 195, 28);

        // Report title
        doc.setFontSize(13).setFont("helvetica", "bold").setTextColor(0, 0, 0);
        doc.text("Voucher Register", 105, 35, { align: "center" });

        // Date range
        doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(100);
        doc.text(`${filters.fromDate || ""} to ${filters.toDate || ""}`, 105, 40, { align: "center" });

        // ===== TABLE =====
        const tableHead = [
            [
                "Particulars",
                "GSTIN/UIN",
                "Voucher Count",
                "Taxable Value",
                "IGST Amt",
                "CGST Amt",
                "SGST Amt",
                "Cess Amt",
                "Total Tax Amt",
                "Invoice Amt"
            ]
        ];

        const tableBody = summary.map((item, idx) => [
            item.senderNames?.[0] || "",
            item.senderGst || "",
            item.voucherCount || 0,
            item.taxableValue?.toLocaleString() || "0",
            item.integratedTax?.toLocaleString() || "0",
            item.centralTax?.toLocaleString() || "0",
            item.stateTax?.toLocaleString() || "0",
            item.cessAmount?.toLocaleString() || "0",
            ((item.integratedTax || 0) + (item.centralTax || 0) + (item.stateTax || 0) + (item.cessAmount || 0)).toLocaleString(),
            item.invoiceAmount?.toLocaleString() || "0"
        ]);

        // GRAND TOTAL ROW
        tableBody.push([
            { content: "Grand Total", colSpan: 2, styles: { halign: "center", fontStyle: "bold", fillColor: [230, 230, 250] } },
            totals.voucherCount || 0,
            (totals.taxableValue || 0).toLocaleString(),
            (totals.integratedTax || 0).toLocaleString(),
            (totals.centralTax || 0).toLocaleString(),
            (totals.stateTax || 0).toLocaleString(),
            (totals.cessAmount || 0).toLocaleString(),
            ((totals.integratedTax || 0) + (totals.centralTax || 0) + (totals.stateTax || 0) + (totals.cessAmount || 0)).toLocaleString(),
            (totals.invoiceAmount || 0).toLocaleString()
        ]);

        autoTable(doc, {
            startY: 45,
            head: tableHead,
            body: tableBody,
            styles: { fontSize: 8, cellPadding: 3, halign: "right", lineWidth: 0.1, lineColor: [200, 200, 200] },
            headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: "bold", halign: "center" },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { halign: "left", cellWidth: 40 },
                1: { cellWidth: 25 },
                2: { cellWidth: 18, halign: "center" }
            }
        });

        // ===== FOOTER =====
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8).setTextColor(150);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 290);
            doc.text(`Page ${i} of ${pageCount}`, 195, 290, { align: "right" });
        }

        doc.save(`voucher_register_${filters.fromDate || ""}_to_${filters.toDate || ""}.pdf`);
    };

    return (
        <Box p={3} bgcolor="#f9fafe" minHeight="100vh">
            <Grid container alignItems={'center'}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary" mb={4} display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon fontSize="large" />
                        Booking Report
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={handleDownload}
                    >
                        Download PDF
                    </Button>
                </Grid>
            </Grid>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4, mt: 2 }}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            label="From City"
                            fullWidth
                            value={fromCity}
                            onChange={(e) => setFromCity(e.target.value)}
                        >
                            {stations.map((station) => (
                                <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                                    {station.stationName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            label="To City"
                            fullWidth
                            value={toCity}
                            onChange={(e) => setToCity(e.target.value)}
                        >
                            {stations.map((station) => (
                                <MenuItem key={station.stationId || station.sNo} value={station.stationName}>
                                    {station.stationName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                format="dd/MM/yyyy"
                                onChange={setFromDate}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                format="dd/MM/yyyy"
                                onChange={setEndDate}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Summary Table */}
            {summary && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Booking Summary
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell>CustomerName</TableCell>
                                <TableCell>Sender Gst</TableCell>
                                <TableCell>StartStation</TableCell>
                                <TableCell>EndStation</TableCell>
                                <TableCell>VoucherCount</TableCell>
                                <TableCell>TaxableValue</TableCell>
                                <TableCell>CentralTax</TableCell>
                                <TableCell>StateTax</TableCell>
                                <TableCell>IntegratedTax</TableCell>
                                <TableCell>InvoiceAmount</TableCell>
                                <TableCell>CessAmount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {summary.map((row, idx) => (
                                <TableRow key={idx}>

                                    <TableCell>{row.customerNames?.join(', ')}</TableCell>
                                    <TableCell>{row.senderGst}</TableCell>
                                    <TableCell>{row.startStation}</TableCell>
                                    <TableCell>{row.endStation}</TableCell>
                                    <TableCell>{row.voucherCount}</TableCell>
                                    <TableCell>{row.taxableValue}</TableCell>
                                    <TableCell>{row.centralTax}</TableCell>
                                    <TableCell>{row.stateTax}</TableCell>
                                    <TableCell>{row.integratedTax}</TableCell>
                                    <TableCell>{row.invoiceAmount}</TableCell>
                                    <TableCell>{row.cessAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Paper>
            )}
        </Box>
    );
};

export default BookingReport;