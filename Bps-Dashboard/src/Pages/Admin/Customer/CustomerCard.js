import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, InputAdornment, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchActiveCustomer, deleteCustomer, fetchBlackListedCustomer, fetchActiveCustomerCount, fetchBlackListedCustomerCount, updateStatusActivate, updateStatusBacklist } from '../../../features/customers/customerSlice';

const customerHeadCells = [
  { id: 'index', label: 'S. No', sortable: false },
  { id: 'customerId', label: 'Customer ID', sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'contact', label: 'Contact', sortable: false },
  { id: 'actions', label: 'Actions', sortable: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilized.map(el => el[0]);
}

// 🌟 SweetAlert utility functions
const showSuccess = (msg) =>
  Swal.fire({
    icon: 'success',
    title: '🎉 Success!',
    text: msg,
    background: 'linear-gradient(135deg, #e0ffe0, #f0fff0)',
    color: '#222',
    showConfirmButton: false,
    timer: 1600,
    width: 400,
  });

const showError = (msg) =>
  Swal.fire({
    icon: 'error',
    title: '⚠️ Oops!',
    text: msg,
    background: 'linear-gradient(135deg, #ffe6e6, #fff0f0)',
    confirmButtonColor: '#d33',
    width: 400,
  });

const showConfirm = async (msg) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, confirm it!',
    cancelButtonText: 'Cancel',
    width: 450,
  });
  return result.isConfirmed;
};

const CustomerCard = ({ onSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedList, setSelectedList] = useState('active');
  const [loading, setLoading] = useState(false);

  const { list: customerList, activeCount, blacklistCount } = useSelector(state => state.customers);
  const isLoading = useSelector(state => state.customers.loading);

  // Load initial data
  useEffect(() => {
    refreshAllData();
  }, [dispatch]);

  const refreshAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        dispatch(fetchActiveCustomer()), // Load active customers by default
        dispatch(fetchActiveCustomerCount()),
        dispatch(fetchBlackListedCustomerCount())
      ]);
    } catch (error) {
      showError('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdd = () => navigate('/customerform');
  const handleView = (customerId) => navigate(`/customerview/${customerId}`);
  const handleEdit = (customerId) => {
    navigate(`/customerupdate/${customerId}`);
  };

  const handleDelete = async (customerId) => {
    const confirmed = await showConfirm('This customer will be permanently deleted!');
    if (!confirmed) return;

    try {
      const res = await dispatch(deleteCustomer(customerId));
      if (res.meta.requestStatus === 'fulfilled') {
        showSuccess('Customer deleted successfully!');
        refreshAllData();
      } else {
        showError('Failed to delete customer. Please try again.');
      }
    } catch (error) {
      showError('Error deleting customer.');
    }
  };

  const handleCardClick = async (type) => {
    setSelectedList(type);
    setLoading(true);
    try {
      if (type === 'active') {
        await dispatch(fetchActiveCustomer());
      } else if (type === 'blacklisted') {
        await dispatch(fetchBlackListedCustomer());
      }
      // Reset to first page when switching lists
      setPage(0);
    } catch (error) {
      showError(`Failed to load ${type} customers`);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleStatusActivate = async (customerId) => {
    const confirmed = await showConfirm('Do you want to activate this customer?');
    if (!confirmed) return;

    try {
      const res = await dispatch(updateStatusActivate(customerId));
      if (res.meta.requestStatus === 'fulfilled') {
        showSuccess('Customer activated successfully!');
        // Refresh both counts and current list
        await Promise.all([
          dispatch(fetchActiveCustomerCount()),
          dispatch(fetchBlackListedCustomerCount())
        ]);
        // Refresh the current list view
        if (selectedList === 'active') {
          await dispatch(fetchActiveCustomer());
        } else {
          await dispatch(fetchBlackListedCustomer());
        }
      } else {
        showError('Failed to activate customer. Please try again.');
      }
    } catch (error) {
      showError('Error activating customer.');
    } finally {
      handleMenuClose();
    }
  };

  const handleStatusBacklist = async (customerId) => {
    const confirmed = await showConfirm('Do you want to blacklist this customer?');
    if (!confirmed) return;

    try {
      const res = await dispatch(updateStatusBacklist(customerId));
      if (res.meta.requestStatus === 'fulfilled') {
        showSuccess('Customer blacklisted successfully!');
        // Refresh both counts and current list
        await Promise.all([
          dispatch(fetchActiveCustomerCount()),
          dispatch(fetchBlackListedCustomerCount())
        ]);
        // Refresh the current list view
        if (selectedList === 'active') {
          await dispatch(fetchActiveCustomer());
        } else {
          await dispatch(fetchBlackListedCustomer());
        }
      } else {
        showError('Failed to blacklist customer. Please try again.');
      }
    } catch (error) {
      showError('Error blacklisting customer.');
    } finally {
      handleMenuClose();
    }
  };

  const filteredCustomers = Array.isArray(customerList)
    ? customerList.filter((row) =>
      row?.name?.toLowerCase()?.includes(searchTerm) ||
      row?.customerId?.toLowerCase()?.includes(searchTerm)
    )
    : [];

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredCustomers.length);

  const cardData = [
    {
      id: 1,
      title: 'Active Customers',
      type: 'active',
      value: activeCount || 0,
      subtitle: 'Active customers',
      duration: 'Last 30 days',
      icon: <PeopleAltIcon fontSize="large" />,
      bgColor: '#e0f7fa'
    },
    {
      id: 2,
      title: 'Blacklisted',
      type: 'blacklisted',
      value: blacklistCount || 0,
      subtitle: 'Blacklisted customers',
      duration: 'Last 30 days',
      icon: <PersonOffIcon fontSize="large" />,
      bgColor: '#ffebee'
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Manage Customers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            padding: '8px 24px',
            backgroundColor: '#0155a5',
            '&:hover': { backgroundColor: '#013f71' },
            borderRadius: 2,
          }}
        >
          Add Customer
        </Button>
      </Box>

      {/* 📊 Dashboard Count Cards */}
      <Grid container spacing={2} mb={3}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={6} key={card.id}>
            <Card
              sx={{
                background: card.bgColor,
                boxShadow: 3,
                cursor: 'pointer',
                border: selectedList === card.type ? '3px solid #1565c0' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
                height: '140px',
              }}
              onClick={() => handleCardClick(card.type)}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: '50%',
                    backgroundColor: selectedList === card.type ? '#1565c0' : 'rgba(255,255,255,0.7)',
                    color: selectedList === card.type ? 'white' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {card.value}
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                  {card.duration}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔍 Search Box */}
      <Card sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name or customer ID..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 320 }}
        />
      </Card>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {selectedList === 'active' ? 'Active Customers' : 'Blacklisted Customers'} List
      </Typography>

      {loading ? (
        <Typography align="center" mt={3}>
          Loading customers...
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1565c0' }}>
              <TableRow>
                {customerHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: 'bold', color: '#fff' }}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => handleRequestSort(headCell.id)}
                        sx={{ color: '#fff', '&.Mui-active': { color: '#fff' } }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredCustomers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row._id || index} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.customerId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.contactNumber}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleView(row.customerId)}
                          title="View"
                          sx={{
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          title="Edit"
                          onClick={() => handleEdit(row.customerId)}
                          sx={{
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          title="Delete"
                          onClick={() => handleDelete(row.customerId)}
                          sx={{
                            '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.04)' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          title="More options"
                          onClick={(e) => handleMenuClick(e, row)}
                          sx={{
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
              {filteredCustomers.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No customers found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* ⚙️ Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            borderRadius: 10,
            minWidth: 160,
            padding: '4px 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <MenuItem onClick={() => handleStatusActivate(selectedCustomer?.customerId)}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Activate" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusBacklist(selectedCustomer?.customerId)}>
          <ListItemIcon>
            <BlockIcon sx={{ color: 'red' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Blacklist" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerCard;