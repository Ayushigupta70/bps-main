import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper } from "@mui/material";

function DriverCalendar() {
  return (
    <Paper sx={{ p: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar views={["day"]} disablePast sx={{ width: "100%" }} />
      </LocalizationProvider>
    </Paper>
  );
}
