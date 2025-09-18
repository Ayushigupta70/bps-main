import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputAdornment,
    IconButton,
    Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    createContact,
    getAllContact,
    updateContact,
    deleteContact,
    selectContactList
} from '../../../features/contact/contactSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactCard = () => {
    const dispatch = useDispatch();

    // Form state for add/edit/view
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        address: '',
    });

    // Local contacts state from Redux store
    const contacts = useSelector(selectContactList);

    const [searchTerm, setSearchTerm] = useState('');
    const [editIndex, setEditIndex] = useState(null); // index in the contacts array for editing
    const [page, setPage] = useState(1);
    const [isViewMode, setIsViewMode] = useState(false);
    const rowsPerPage = 5;

    // Load contacts on mount
    useEffect(() => {
        dispatch(getAllContact());
    }, [dispatch]);

    // Handle input changes in form
    const handleChange = (e) => {
        if (!isViewMode) {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    // Add or update contact handler
    const handleAddOrUpdateContact = async () => {
        if (editIndex !== null) {
            // Update contact
            const contactToUpdate = contacts[editIndex];
            const updatedData = { ...contactToUpdate, ...formData };
            await dispatch(updateContact(updatedData));
        } else {
            // Create contact
            await dispatch(createContact(formData));
            dispatch(getAllContact());
        }
        // Reset form and state
        setFormData({ name: '', contactNumber: '', email: '', address: '' });
        setEditIndex(null);
        setIsViewMode(false);
        setPage(1); // reset page to 1 after update/add
    };

    // Delete contact by index
    const handleDelete = async (index) => {
        const contactToDelete = contacts[index];
        if (
            window.confirm(`Are you sure you want to delete contact: ${contactToDelete.name}?`)
        ) {
            await dispatch(deleteContact(contactToDelete.contactNumber));
            // If we were editing or viewing this contact, reset form
            if (editIndex === index || isViewMode) {
                setFormData({ name: '', contactNumber: '', email: '', address: '' });
                setEditIndex(null);
                setIsViewMode(false);
            }
        }
    };

    // Edit contact by index
    const handleEdit = (index) => {
        setFormData(contacts[index]);
        setEditIndex(index);
        setIsViewMode(false);
    };

    // View contact (read-only)
    const handleView = (contact) => {
        setFormData(contact);
        setIsViewMode(true);
        setEditIndex(null);
    };

    // Cancel add/edit/view
    const handleCancel = () => {
        setFormData({ name: '', contactNumber: '', email: '', address: '' });
        setEditIndex(null);
        setIsViewMode(false);
    };

    // Filter and paginate contacts
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const count = Math.ceil(filteredContacts.length / rowsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box p={3}>
            <Typography variant="h6" mb={2}>
                Contact List
            </Typography>

            {/* Contact form */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        disabled={isViewMode}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        disabled={isViewMode}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        disabled={isViewMode}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        disabled={isViewMode}
                    />
                </Grid>
            </Grid>

            {/* Buttons and search */}
            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleAddOrUpdateContact}
                        sx={{ backgroundColor: '#004C99', mr: 2 }}
                        disabled={isViewMode || !formData.name || !formData.contactNumber}
                    >
                        {editIndex !== null ? 'Update Contact' : '+ Contact'}
                    </Button>

                    {(isViewMode || editIndex !== null) && (
                        <Button variant="outlined" onClick={handleCancel} color="error">
                            Cancel
                        </Button>
                    )}
                </Box>

                <TextField
                    size="small"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {/* Contact table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#004C99' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff' }}>S.No.</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Number</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Address</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedContacts.length > 0 ? (
                            paginatedContacts.map((contact, index) => (
                                <TableRow key={contact._id || index}>
                                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.contactNumber}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.address}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleView(contact)} color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleEdit((page - 1) * rowsPerPage + index)}
                                            color="warning"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete((page - 1) * rowsPerPage + index)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                    <BrokenImageIcon fontSize="large" color="disabled" />
                                    <Typography variant="body1" color="textSecondary">
                                        Data Not Found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            {filteredContacts.length > 0 && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handlePageChange}
                        shape="rounded"
                        size="small"
                    />
                </Box>
            )}
        </Box>
    );
};

export default ContactCard;