import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import {
  CancelScheduleSend as CancelScheduleSendIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Book as BookOnlineIcon,
  LocalShipping as LocalShippingIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from 'react-redux';
import {
  bookingRequestCount,
  activeBookingCount,
  cancelledBookingCount,
  fetchBookingsByType,
  cancelBooking,
  deleteBooking,
  revenueList,
  sendWhatsAppMsg,
  sendEmail,
  viewBookingById,
  clearViewedBooking
} from '../../../features/booking/bookingSlice'
import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SlipModal from "../../../Components/SlipModal";
import { finalizeDelivery } from '../../../features/delivery/deliverySlice';
import Swal from 'sweetalert2';

// Sorting utilities
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (!array || !Array.isArray(array)) return [];
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const headCells = [
  { id: "active", label: "Active Delivery", sortable: false },
  { id: "sno", label: "S.No", sortable: false },
  { id: "orderby", label: "Order By", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "namep", label: "Sender Name", sortable: true },
  { id: "pickup", label: "Pick Up", sortable: false },
  { id: "named", label: "Receiver Name", sortable: false },
  { id: "drop", label: "Drop", sortable: false },
  { id: "contact", label: "Contact", sortable: false },
  { id: "action", label: "Action", sortable: false },
];

const revenueHeadCells = [
  { id: "sno", label: "S.No", sortable: false },
  { id: "bookingId", label: "Booking ID", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "pickup", label: "Pick Up", sortable: false },
  { id: "drop", label: "Drop", sortable: false },
  { id: "revenue", label: "Revenue (in Rupees)", sortable: false },
  { id: "action", label: "Action", sortable: false },
];

// SweetAlert configurations
const showSuccess = (msg) =>
  Swal.fire({
    icon: 'success',
    title: '🎉 Success!',
    text: msg,
    background: 'linear-gradient(135deg, #e0ffe0, #f0fff0)',
    color: '#222',
    showConfirmButton: false,
    timer: 2000,
    width: 400,
  });

const showError = (msg) =>
  Swal.fire({
    icon: 'error',
    title: '⚠️ Error!',
    text: msg,
    background: 'linear-gradient(135deg, #ffe6e6, #fff0f0)',
    confirmButtonColor: '#d33',
    width: 400,
  });

const showConfirm = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    width: 450,
  });
  return result.isConfirmed;
};

const BookingCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cardColor = "#0155a5";
  const cardLightColor = "#e6f0fa";
  const [activeCard, setActiveCard] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState("request");
  const [bookings, setBookings] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const dispatch = useDispatch();
  const {
    list: bookingList,
    revenueList: revenueData = [],
    requestCount,
    activeDeliveriesCount,
    cancelledDeliveriesCount,
    totalRevenue,
    loading,
    error,
    message
  } = useSelector(state => state.bookings);

  const openSlip = useSelector((state) => state.bookings.viewedBooking !== null);
  const booking = useSelector((state) => state.bookings.viewedBooking);

  useEffect(() => {
    if (bookingList && Array.isArray(bookingList)) {
      setBookings(bookingList);
    }
  }, [bookingList]);

  useEffect(() => {
    dispatch(fetchBookingsByType('request'));
    dispatch(bookingRequestCount());
    dispatch(activeBookingCount());
    dispatch(cancelledBookingCount());
    dispatch(revenueList());
  }, [dispatch]);

  useEffect(() => {
    switch (selectedList) {
      case "request":
        dispatch(fetchBookingsByType('request'));
        break;
      case "active":
        dispatch(fetchBookingsByType('active'));
        break;
      case "cancelled":
        dispatch(fetchBookingsByType('cancelled'));
        break;
      case "revenue":
        dispatch(revenueList());
        break;
      default:
        break;
    }
  }, [selectedList, dispatch]);

  // Show messages from Redux state
  useEffect(() => {
    if (message) {
      showSuccess(message);
    }
    if (error) {
      showError(error);
    }
  }, [message, error]);

  const handleAdd = () => {
    navigate("/booking/new");
  };

  const isRevenueCardActive = activeCard === 4;

  const displayHeadCells = isRevenueCardActive ? revenueHeadCells : headCells;

  const handleCardClick = (type, cardId) => {
    setActiveCard(cardId);
    setSelectedList(type);
    if (type === 'revenue') {
      dispatch(revenueList());
    } else {
      dispatch(fetchBookingsByType(type));
    }
  };

  const handleShare = async (bookingId) => {
    try {
      await Promise.all([
        dispatch(sendWhatsAppMsg(bookingId)),
        dispatch(sendEmail(bookingId))
      ]);
      showSuccess('Booking details shared successfully!');
    } catch (error) {
      showError('Failed to share booking details');
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleView = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  const handleEdit = (bookingId) => {
    navigate(`/editbooking/${bookingId}`);
  };

  const handleDeleteClick = (bookingId) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const handleCancel = async (bookingId) => {
    const confirmed = await showConfirm(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?'
    );

    if (confirmed) {
      try {
        await dispatch(cancelBooking(bookingId)).unwrap();
        showSuccess('Booking cancelled successfully!');
        // Refresh the current list
        dispatch(fetchBookingsByType(selectedList));
      } catch (error) {
        showError('Failed to cancel booking');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteBooking(bookingToDelete)).unwrap();
      showSuccess('Booking moved to recycle bin successfully!');
      // Refresh the current list
      dispatch(fetchBookingsByType(selectedList));
    } catch (error) {
      showError('Failed to delete booking');
    } finally {
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const handleSlipClick = (bookingId) => {
    dispatch(viewBookingById(bookingId));
  };

  const handleCloseSlip = () => {
    dispatch(clearViewedBooking());
  };

  const handleActiveChange = async (orderId, isActive) => {
    if (isActive) {
      const confirmed = await showConfirm(
        'Finalize Delivery',
        'Are you sure you want to finalize this delivery? This action cannot be undone.'
      );

      if (confirmed) {
        try {
          await dispatch(finalizeDelivery(orderId)).unwrap();
          showSuccess('Delivery finalized successfully!');
          dispatch(fetchBookingsByType('active'));
        } catch (error) {
          showError(`Failed to finalize delivery: ${error}`);
        }
      }
    } else {
      showError("You cannot unfinalize a delivery once completed.");
    }
  };

  const filteredRows = (
    isRevenueCardActive
      ? (Array.isArray(revenueData)
        ? revenueData.filter(row =>
          (row.bookingId && row.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.pickup && row.pickup.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.drop && row.drop.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.revenue && row.revenue.toString().includes(searchTerm))
        )
        : [])
      : (Array.isArray(bookingList)
        ? bookingList.filter(row =>
          (row.orderby && row.orderby.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.namep && row.namep.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.named && row.named.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.pickup && row.pickup.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.drop && row.drop.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.contact && row.contact.includes(searchTerm))
        )
        : [])
  );

  const cardData = [
    {
      id: 1,
      title: "Booking",
      value: requestCount,
      subtitle: "Requests",
      duration: "Last 30 Days",
      type: "request",
      icon: <BookOnlineIcon fontSize="large" />,
    },
    {
      id: 2,
      title: "Active ",
      value: activeDeliveriesCount,
      subtitle: "Deliveries",
      duration: "Last 30 Days",
      type: "active",
      icon: <LocalShippingIcon fontSize="large" />,
    },
    {
      id: 3,
      title: "Total Cancelled",
      value: cancelledDeliveriesCount,
      duration: "Last 30 Days",
      type: "cancelled",
      icon: <CancelScheduleSendIcon fontSize="large" />,
    },
    {
      id: 4,
      value: totalRevenue,
      subtitle: "Total Revenue",
      duration: "Last 30 Days",
      title: "Revenue",
      icon: <AccountBalanceWalletIcon fontSize="large" />,
      type: "revenue"
    },
  ];

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Manage Booking
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Add Booking
        </Button>
      </Box>

      {/* Dashboard Cards */}
      <Grid
        container
        spacing={2}
        sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}
      >
        {cardData.map((card) => (
          <Grid
            item
            key={card.id}
            sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}
          >
            <Card
              onClick={() => handleCardClick(card.type, card.id)}
              sx={{
                flex: 1,
                cursor: "pointer",
                border:
                  activeCard === card.id
                    ? `2px solid ${cardColor}`
                    : "2px solid transparent",
                backgroundColor:
                  activeCard === card.id ? cardLightColor : "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                  backgroundColor: cardLightColor,
                  "& .icon-container": {
                    backgroundColor: cardColor,
                    color: "#fff",
                  },
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box
                  className="icon-container"
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor:
                      activeCard === card.id ? cardColor : cardLightColor,
                    color: activeCard === card.id ? "#fff" : cardColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  {React.cloneElement(card.icon, { color: "inherit" })}
                </Box>
                <Stack spacing={0.5}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={activeCard === card.id ? "primary" : "text.primary"}
                  >
                    {card.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={activeCard === card.id ? "primary" : "text.primary"}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {card.duration}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Admin Table */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1565c0" }}>
              <TableRow>
                {displayHeadCells.filter((headCell) => {
                  if (headCell.id === "active" && selectedList !== "active") return false;
                  return true;
                })
                  .map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sx={{ fontWeight: "bold", color: "white", whiteSpace: 'nowrap' }}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{ color: "white !important" }}
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
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.bookingId || row._id} hover>
                    {isRevenueCardActive ? (
                      <>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.bookingId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.pickup}</TableCell>
                        <TableCell>{row.drop}</TableCell>
                        <TableCell>{row.revenue}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleView(row.bookingId)}
                              title="View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        {selectedList === "active" && (
                          <TableCell>
                            <Checkbox
                              checked={row.isActive || false}
                              disabled={row.isFinalized}
                              onChange={(e) => handleActiveChange(row.orderId, e.target.checked)}
                              color="primary"
                            />
                          </TableCell>
                        )}
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.orderBy}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.fromName}</TableCell>
                        <TableCell>{row.pickup}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.toName}</TableCell>
                        <TableCell>{row.drop}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleView(row.bookingId)}
                              title="View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(row.bookingId)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="warning"
                              onClick={() => handleCancel(row.bookingId)}
                              title="Cancel"
                            >
                              <CancelScheduleSendIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(row.bookingId)}
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="success"
                              title="Share"
                              onClick={() => handleShare(row.bookingId)}
                            >
                              <SendIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => handleSlipClick(row.bookingId)}
                              title="Slip"
                            >
                              <ReceiptIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={displayHeadCells.length} />
                </TableRow>
              )}
              {filteredRows.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={displayHeadCells.length} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No bookings found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* Slip Modal */}
      <SlipModal
        open={openSlip}
        handleClose={handleCloseSlip}
        bookingData={booking}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to move this booking to recycle bin?
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            (This is a soft delete and can be restored later)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Move to Recycle Bin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingCard;