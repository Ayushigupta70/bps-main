import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveCustomer } from '../features/qcustomers/qcustomerSlice';

const QcustomerSearch = ({ onCustomerSelect }) => {
    const dispatch = useDispatch();
    const { list: customerList } = useSelector((state) => state.customers);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        dispatch(fetchActiveCustomer());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            QcustomerSearch: '',
        },
        validationSchema: Yup.object({
            QcustomerSearch: Yup.string().required('Required'),
        }),
        onSubmit: () => { },
    });

    const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;

    // 🔍 Live filter logic
    const handleInputChange = (e) => {
        handleChange(e);
        const search = e.target.value.trim().toLowerCase().replace(/\s+/g, ' ');
        if (search.length === 0) {
            setFilteredCustomers([]);
            setNotFound(false);
            return;
        }

        const matches = customerList.filter((customer) => {
            const contact = customer.contactNumber?.toString().toLowerCase();
            const email = customer.emailId?.toLowerCase();
            const name = customer.name?.toLowerCase().replace(/\s+/g, ' ');
            return (
                contact.includes(search) ||
                email.includes(search) ||
                name.includes(search)
            );
        });

        if (matches.length > 0) {
            setFilteredCustomers(matches);
            setNotFound(false);
        } else {
            setFilteredCustomers([]);
            setNotFound(true);
        }
    };

    const handleSelectCustomer = (customer) => {
        setFieldValue('QcustomerSearch', customer.name);
        setFilteredCustomers([]);
        setNotFound(false);
        if (onCustomerSelect) onCustomerSelect(customer);
    };

    return (
        <Box position="relative">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Search Customer (by Name / Contact / Email)"
                        name="QcustomerSearch"
                        value={values.QcustomerSearch}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        error={touched.QcustomerSearch && Boolean(errors.QcustomerSearch)}
                        helperText={
                            (touched.QcustomerSearch && errors.QcustomerSearch) ||
                            (notFound && 'Customer not found')
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* 🔽 Match Suggestions */}
                    {filteredCustomers.length > 0 && (
                        <Paper
                            elevation={3}
                            style={{
                                position: 'absolute',
                                zIndex: 10,
                                width: '100%',
                                maxHeight: 200,
                                overflowY: 'auto',
                                marginTop: 4,
                            }}
                        >
                            <List dense>
                                {filteredCustomers.map((customer) => (
                                    <ListItem
                                        button
                                        key={customer.customerId}
                                        onClick={() => handleSelectCustomer(customer)}
                                    >
                                        <ListItemText
                                            primary={customer.name}
                                            secondary={`${customer.contactNumber} | ${customer.emailId}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default QcustomerSearch;
