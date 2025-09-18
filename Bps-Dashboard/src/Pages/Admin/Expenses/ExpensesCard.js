import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    AdsClick,
    Search
} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
    addExpenses,
    getAllExpenses,
    viewedExpenseById,
    clearViewedExpenses,
    updateByInvoiceNo
} from '../../../features/expense/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useParams } from 'react-router-dom';
import { FILES_BASE_URL } from "../../../utils/api";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const ExpensesCard = () => {
    const { invoiceNo } = useParams();
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [viewEditOpen, setViewEditOpen] = useState(false);
    const [searchExpense, setSearchExpense] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { list: expenses, form: expenseForm } = useSelector((state) => state.expenses);

    useEffect(() => {
        dispatch(getAllExpenses());
    }, [dispatch]);

    useEffect(() => {
        if (invoiceNo) {
            dispatch(viewedExpenseById(invoiceNo));
        }
        return () => {
            dispatch(clearViewedExpenses());
        };
    }, [invoiceNo, dispatch]);

    const filteredExpenses = expenses.filter(exp => {
        if (!exp || !exp.name) return false;
        return exp.name.toLowerCase().includes(searchExpense.toLowerCase());
    });

    const formik = useFormik({
        initialValues: {
            date: dayjs(),
            invoiceNo: '',
            title: '',
            details: '',
            amount: '',
            taxAmount: '',
            totalAmount: '',
            document: null,
        },
        validationSchema: Yup.object({
            date: Yup.date().required('Date is required'),
            invoiceNo: Yup.string().required('Invoice No is required'),
            title: Yup.string().required('Title is required'),
            details: Yup.string().required('Details are required'),
            amount: Yup.number().typeError('Must be a number').required('Amount is required'),
            taxAmount: Yup.number().typeError('Must be a number').required('Tax Amount is required'),
            totalAmount: Yup.number().typeError('Must be a number').required('Total Amount is required'),
            document: Yup.mixed().required('PDF file is required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(addExpenses(values)).unwrap();
                setOpen(false);
                formik.resetForm();
                dispatch(getAllExpenses()); // Refresh the list
            }
            catch (error) {
                console.log("Error while adding Expenses", error);
            }
        },
    });

    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: expenseForm?.date ? dayjs(expenseForm.date) : dayjs(),
            invoiceNo: expenseForm?.invoiceNo || '',
            title: expenseForm?.title || '',
            details: expenseForm?.details || '',
            amount: expenseForm?.amount || '',
            taxAmount: expenseForm?.taxAmount || '',
            totalAmount: expenseForm?.totalAmount || '',
            document: expenseForm?.document || null,
        },
        validationSchema: Yup.object({
            date: Yup.date().required('Date is required'),
            invoiceNo: Yup.string().required('Invoice No is required'),
            title: Yup.string().required('Title is required'),
            details: Yup.string().required('Details are required'),
            amount: Yup.number().typeError('Must be a number').required('Amount is required'),
            taxAmount: Yup.number().typeError('Must be a number').required('Tax Amount is required'),
            totalAmount: Yup.number().typeError('Must be a number').required('Total Amount is required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                for (const key in values) {
                    if (values[key] !== null && values[key] !== undefined) {
                        if (key === 'date') {
                            formData.append(key, values[key].format('YYYY-MM-DD'));
                        } else {
                            formData.append(key, values[key]);
                        }
                    }
                }

                await dispatch(updateByInvoiceNo({
                    invoiceNo: selectedExpense,
                    data: formData
                })).unwrap();
                setViewEditOpen(false);
                dispatch(getAllExpenses()); // Refresh the list
            } catch (error) {
                console.log("Error while updating expense", error);
            }
        },
    });

    const formatDate = (date) => {
        if (!date) return '';
        if (typeof date === 'string') return date.slice(0, 10);
        if (date instanceof Date) return date.toISOString().slice(0, 10);
        return '';
    };

    const handleViewClick = (invoiceNo) => {
        dispatch(viewedExpenseById(invoiceNo));
        setSelectedExpense(invoiceNo);
        setModalMode('view');
        setViewEditOpen(true);
    };

    const handleEditClick = (invoiceNo) => {
        dispatch(viewedExpenseById(invoiceNo));
        setSelectedExpense(invoiceNo);
        setModalMode('edit');
        setViewEditOpen(true);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ m: 2 }}>
                    Manage Expenses
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AdsClick />}
                    onClick={() => setOpen(true)}
                    sx={{
                        textTransform: 'none',
                        padding: '6px 20px',
                        backgroundColor: '#0155a5',
                        '&:hover': { backgroundColor: '#013f71' },
                    }}
                >
                    <Typography variant="h6" sx={{ color: 'white' }}>Add</Typography>
                </Button>
            </Box>

            <Card sx={{ m: 2, boxShadow: 3, p: 2, backgroundColor: '#0155a5', color: '#ffffff' }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="h6" fontWeight="600">{expenses.length}</Typography>
                            <Typography variant="body2" sx={{ color: '#ffffffa0' }}>Total Expenses</Typography>
                            <Typography variant="h6">(30 days)</Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchExpense}
                    onChange={(e) => setSearchExpense(e.target.value)}
                    sx={{
                        width: '300px',
                        '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff', borderRadius: '20px' },
                        '& .MuiInputLabel-root': { color: '#0155a5' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0155a5' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#013f71' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search sx={{ color: '#0155a5', cursor: 'pointer' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper} sx={{ margin: '0 auto', mt: 2, maxWidth: '97%' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#0155a5' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>S. No</TableCell>
                            <TableCell sx={{ color: 'white' }}>Invoice No</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Taxable Amount</TableCell>
                            <TableCell sx={{ color: 'white' }}>Total Receiving</TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExpenses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No expenses found</TableCell>
                            </TableRow>
                        ) : (
                            filteredExpenses.map((expense, index) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{expense.invoiceNo}</TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>₹{expense.taxableAmount}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size='small'
                                            color='primary'
                                            title='Invoice'
                                            onClick={() => {
                                                const fixedPath = expense.receiving.replace(/\\/g, '/');
                                                const fileUrl = `${FILES_BASE_URL}/${fixedPath}`;
                                                window.open(fileUrl, '_blank');
                                            }}
                                        >
                                            <Inventory2Icon fontSize='small' />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                title="View"
                                                onClick={() => handleViewClick(expense.invoiceNo)}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                color="primary"
                                                title="Edit"
                                                onClick={() => handleEditClick(expense.invoiceNo)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Add Expense */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>Add Expense</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={formik.values.date}
                                    format='DD/MM/YYYY'
                                    onChange={(value) => formik.setFieldValue('date', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={formik.touched.date && Boolean(formik.errors.date)}
                                            helperText={formik.touched.date && formik.errors.date}
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Invoice No"
                                name="invoiceNo"
                                fullWidth
                                value={formik.values.invoiceNo}
                                onChange={formik.handleChange}
                                error={formik.touched.invoiceNo && Boolean(formik.errors.invoiceNo)}
                                helperText={formik.touched.invoiceNo && formik.errors.invoiceNo}
                            />

                            <TextField
                                label="Title"
                                name="title"
                                fullWidth
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />

                            <TextField
                                label="Details"
                                name="details"
                                fullWidth
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                error={formik.touched.details && Boolean(formik.errors.details)}
                                helperText={formik.touched.details && formik.errors.details}
                            />

                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                fullWidth
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
                            />

                            <TextField
                                label="Tax Amount"
                                name="taxAmount"
                                type="number"
                                fullWidth
                                value={formik.values.taxAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.taxAmount && Boolean(formik.errors.taxAmount)}
                                helperText={formik.touched.taxAmount && formik.errors.taxAmount}
                            />

                            <TextField
                                label="Total Amount"
                                name="totalAmount"
                                type="number"
                                fullWidth
                                value={formik.values.totalAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
                                helperText={formik.touched.totalAmount && formik.errors.totalAmount}
                            />

                            <Button variant="outlined" component="label">
                                Upload Invoice (PDF)
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={(e) =>
                                        formik.setFieldValue('document', e.currentTarget.files[0])
                                    }
                                />
                            </Button>
                            {formik.errors.document && (
                                <Typography variant="body2" color="error">
                                    {formik.errors.document}
                                </Typography>
                            )}

                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>

            {/* Modal for View/Edit Expense */}
            <Modal open={viewEditOpen} onClose={() => setViewEditOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>
                        {modalMode === 'view' ? 'View Expense' : 'Edit Expense'}
                    </Typography>
                    <form onSubmit={editFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={editFormik.values.date}
                                    onChange={(value) => editFormik.setFieldValue('date', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={editFormik.touched.date && Boolean(editFormik.errors.date)}
                                            helperText={editFormik.touched.date && editFormik.errors.date}
                                            InputProps={{ readOnly: modalMode === 'view' }}
                                        />
                                    )}
                                    disabled={modalMode === 'view'}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Invoice No"
                                name="invoiceNo"
                                value={editFormik.values.invoiceNo}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.invoiceNo && Boolean(editFormik.errors.invoiceNo)}
                                helperText={editFormik.touched.invoiceNo && editFormik.errors.invoiceNo}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            <TextField
                                label="Title"
                                name="title"
                                value={editFormik.values.title}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.title && Boolean(editFormik.errors.title)}
                                helperText={editFormik.touched.title && editFormik.errors.title}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            <TextField
                                label="Details"
                                name="details"
                                value={editFormik.values.details}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.details && Boolean(editFormik.errors.details)}
                                helperText={editFormik.touched.details && editFormik.errors.details}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={editFormik.values.amount}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.amount && Boolean(editFormik.errors.amount)}
                                helperText={editFormik.touched.amount && editFormik.errors.amount}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            <TextField
                                label="Tax Amount"
                                name="taxAmount"
                                type="number"
                                value={editFormik.values.taxAmount}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.taxAmount && Boolean(editFormik.errors.taxAmount)}
                                helperText={editFormik.touched.taxAmount && editFormik.errors.taxAmount}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            <TextField
                                label="Total Amount"
                                name="totalAmount"
                                type="number"
                                value={editFormik.values.totalAmount}
                                onChange={editFormik.handleChange}
                                fullWidth
                                error={editFormik.touched.totalAmount && Boolean(editFormik.errors.totalAmount)}
                                helperText={editFormik.touched.totalAmount && editFormik.errors.totalAmount}
                                InputProps={{ readOnly: modalMode === 'view' }}
                            />

                            {modalMode === 'edit' && (
                                <>
                                    <Button variant="outlined" component="label">
                                        Update Invoice (PDF)
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            hidden
                                            onChange={(e) =>
                                                editFormik.setFieldValue('document', e.currentTarget.files[0])
                                            }
                                        />
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary">
                                        Update
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ExpensesCard;