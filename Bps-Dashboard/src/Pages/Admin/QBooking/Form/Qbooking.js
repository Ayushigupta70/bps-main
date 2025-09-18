import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  const {incomingList, loading, error} = useSelector(
    (state)=> state.bookings
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    const fromDate = startDate.toISOString().split("T")[0];
    const toDate = startDate.toISOString().split("T")[0];
    dispatch(fetchIncomingQuotations({fromDate, toDate}));
  };
  
  
  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Booking Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Start Date: ${startDate ? startDate.toLocaleDateString() : "-"}`,
      20,
      40
    );
    doc.text(
      `End Date: ${endDate ? endDate.toLocaleDateString() : "-"}`,
      20,
      50
    );

    let y = 70;
    incomingList.forEach((row, index) => {
      doc.text(
        `${index + 1}. ${row.sender} -> ${row.receiver} (${row.drop})`,
        20,
        y
      );
      y += 10;
    });

    doc.save("report.pdf");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: "95%", mx: "auto", mt: 4 }}>
      {/* Filters */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              format="dd/MM/yyyy"
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              format="dd/MM/yyyy"
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
          disabled={incomingList.length === 0}
        >
          Download PDF
        </Button>
      </Box>
      {incomingList.length > 0 && (
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
            {incomingList.map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.orderBy}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.sender}</TableCell>
                <TableCell>{row.pickup}</TableCell>
                <TableCell>{row.receiver}</TableCell>
                <TableCell>{row.drop}</TableCell>
                <TableCell>{row.contact}</TableCell>
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
    </Paper>
  );
};

export default QBookingForm;