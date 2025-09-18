import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, InputAdornment, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

const CustomerCard = ({ onSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { list: customerList, activeCount, blacklistCount } = useSelector(state => state.customers);

  const isLoading = useSelector(state => state.customers.loading);

  useEffect(() => {
    dispatch(fetchActiveCustomer());
    dispatch(fetchActiveCustomerCount());
    dispatch(fetchBlackListedCustomerCount());
  }, [dispatch]);

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
    navigate(`/customerupdate/${customerId}`)
  }

  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer ?")) {
      dispatch(deleteCustomer(customerId));
      window.location.reload();
    }
  }

  const handleFetchActive = () => dispatch(fetchActiveCustomer());
  const handleFetchBlacklisted = () => dispatch(fetchBlackListedCustomer());

  const filteredCustomers = Array.isArray(customerList)
    ? customerList.filter((row) =>
      row?.name?.toLowerCase()?.includes(searchTerm) ||
      row?.customerId?.toLowerCase()?.includes(searchTerm)
    )
    : [];


  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredCustomers.length);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) {
      onSelect(option);
    }
  };

  const handleStatusActivate = (customerId) => {
    dispatch(updateStatusActivate(customerId));
    dispatch(fetchActiveCustomer());
  }
  const handleStatusBacklist = (customerId) => {
    dispatch(updateStatusBacklist(customerId));
    dispatch(fetchActiveCustomer());
  }
  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>Manage Customers</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            padding: '6px 20px',
            backgroundColor: '#0155a5',
            '&:hover': { backgroundColor: '#013f71' },
          }}
        >
          Add Customer
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, maxWidth: 800, mx: 'auto', mb: 4 }}>
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }} onClick={handleFetchActive}>
          <CardContent>
            <Typography variant="h4" color="success.main" fontWeight={600}>
              {activeCount}
            </Typography>
            <Typography variant="subtitle1" fontWeight={500}>Active Customers</Typography>
            <Typography variant="body2" color="text.secondary">(30 days)</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }} onClick={handleFetchBlacklisted}>
          <CardContent>
            <Typography variant="h4" color="error.main" fontWeight={600}>
              {blacklistCount}
            </Typography>
            <Typography variant="subtitle1" fontWeight={500}>Blacklisted Customers</Typography>
            <Typography variant="body2" color="text.secondary">(30 days)</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>Customer List</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
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
                      <IconButton size="small" color="primary" onClick={() => handleView(row.customerId)} title="View">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary" title="Edit" onClick={() => handleEdit(row.customerId)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        title="Delete"
                        onClick={() => handleDelete(row.customerId)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>

                      <IconButton size="small" title="More options" onClick={handleClick}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose()}
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
                          }
                        }}
                      >
                        <MenuItem onClick={() => handleStatusActivate(row.customerId)}>
                          <ListItemIcon>
                            <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Active" />
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusBacklist(row.customerId)}>
                          <ListItemIcon>
                            <BlockIcon sx={{ color: 'red' }} fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Blacklisted" />
                        </MenuItem>
                      </Menu>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
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
    </Box>
  );
};

export default CustomerCard;