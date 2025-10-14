import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import jsPDF from "jspdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomingQuotations } from "../../../../features/quotation/quotationSlice";

const QBookingForm = () => {
  const dispatch = useDispatch();

  // ✅ Use the correct store key
  const { quotationsList, loading, error } = useSelector(
    (state) => state.quotations
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Search handler
  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    const fromDate = startDate.toISOString().split("T")[0];
    const toDate = endDate.toISOString().split("T")[0];
    dispatch(fetchIncomingQuotations({ fromDate, toDate }));
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    if (!quotationsList?.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Quotation Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Start Date: ${startDate ? startDate.toLocaleDateString() : "-"}`, 20, 40);
    doc.text(`End Date: ${endDate ? endDate.toLocaleDateString() : "-"}`, 20, 50);

    let y = 70;
    quotationsList.forEach((row, index) => {
      doc.text(
        `${index + 1}. ${row.senderName} -> ${row.receiverName} (${row.drop})`,
        20,
        y
      );
      y += 10;
    });

    doc.save("quotation_report.pdf");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: "95%", mx: "auto", mt: 4 }}>
      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <Button variant="outlined" onClick={handleSearch}>
              Search
            </Button>
          </Stack>
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleDownloadPDF}
          disabled={!quotationsList?.length}
        >
          Download PDF
        </Button>
      </Box>

      {/* Loading/Error */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Table */}
      {quotationsList?.length > 0 && (
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S.No</TableCell>
              <TableCell sx={{ color: "white" }}>Order By</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Sender Name</TableCell>
              <TableCell sx={{ color: "white" }}>Pick Up</TableCell>
              <TableCell sx={{ color: "white" }}>Receiver Name</TableCell>
              <TableCell sx={{ color: "white" }}>Drop</TableCell>
              <TableCell sx={{ color: "white" }}>Contact</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotationsList.map((row, index) => (
              <TableRow key={row.id || index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.orderBy}</TableCell>
                <TableCell>{row.quotationDate}</TableCell>
                <TableCell>{row.fromCustomerName}</TableCell>
                <TableCell>{row.fromCity}</TableCell>
                <TableCell>{row.toCustomerName}</TableCell>
                <TableCell>{row.toCity}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <SendIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <ReceiptIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* No data message */}
      {quotationsList?.length === 0 && !loading && (
        <Typography mt={2}>No quotations found for selected dates.</Typography>
      )}
    </Paper>
  );
};

export default QBookingForm;
