import React, { useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Grid,
    Typography,
    Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../../features/stations/stationSlice";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required("From Date is required"),
    toDate: Yup.date()
        .required("To Date is required")
        .min(Yup.ref("fromDate"), "To Date cannot be before From Date"),
    startStation: Yup.string().required("Start Station is required"),
});

const LedgerHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list: stations } = useSelector((state) => state.stations);

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    return (
        <Box sx={{ p: 3 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 3,
                    }}
                >
                    <FilterAltIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1565c0" }}>
                        Ledger Filters
                    </Typography>
                </Box>

                {/* ✅ Formik Form */}
                <Formik
                    initialValues={{ fromDate: "", toDate: "", startStation: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        navigate("/ladgerinvoice", { state: values });
                    }}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <Grid container spacing={3}>
                                {/* From Date */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="From Date"
                                        name="fromDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.fromDate}
                                        onChange={handleChange}
                                        error={touched.fromDate && Boolean(errors.fromDate)}
                                        helperText={touched.fromDate && errors.fromDate}
                                    />
                                </Grid>

                                {/* To Date */}
                                <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="To Date"
                                        name="toDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.toDate}
                                        onChange={handleChange}
                                        error={touched.toDate && Boolean(errors.toDate)}
                                        helperText={touched.toDate && errors.toDate}
                                    />
                                </Grid>

                                {/* Start Station */}
                                <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Start Station"
                                        name="startStation"
                                        value={values.startStation}
                                        onChange={handleChange}
                                        error={touched.startStation && Boolean(errors.startStation)}
                                        helperText={touched.startStation && errors.startStation}
                                    >
                                        {stations.map((station) => (
                                            <MenuItem
                                                key={station.stationId || station.sNo}
                                                value={station.stationName}
                                            >
                                                {station.stationName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Apply Button */}
                                <Grid size={{ xs: 12, sm: 5, md: 4 }} display="flex" alignItems="stretch">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            flex: 1,
                                            fontWeight: 600,
                                            textTransform: "none",
                                            borderRadius: 2,
                                            boxShadow: 3,
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default LedgerHistory;
