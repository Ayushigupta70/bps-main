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
  Checkbox,
} from "@mui/material";
import {
  CancelScheduleSend as CancelScheduleSendIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Book as BookOnlineIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingRequest,
  fetchActiveBooking,
  fetchCancelledBooking, deleteBooking, sendWhatsAppMsg, sendBookingEmail, revenueList, viewBookingById, clearViewedBooking
} from "../../../features/quotation/quotationSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import QSlipModal from "../../../Components/QSlipModal";
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
  { id: "bookingId", label: "Order By", sortable: true },
  { id: "quotationDate", label: "Date", sortable: true },
  { id: "senderName", label: "Name", sortable: true },
  { id: "pickupCity", label: "Pick Up", sortable: false },
  { id: "receiverName", label: "Name", sortable: false },
  { id: "dropCity", label: "Drop", sortable: false },
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

const QuotationCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cardColor = "#0155a5";
  const cardLightColor = "#e6f0fa";
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState("request");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("senderName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState("request");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { list: bookingList = [], revenueList: revenueData = [], requestCount, activeDeliveriesCount, cancelledDeliveriesCount, totalRevenue } =
    useSelector((state) => state.quotations);

  const booking = useSelector((state) => state.quotations.viewedBooking);
  useEffect(() => {
    dispatch(fetchBookingRequest());
    dispatch(fetchCancelledBooking());
    dispatch(fetchActiveBooking());
    dispatch(revenueList());
  }, [dispatch])
  useEffect(() => {
    switch (selectedList) {
      case "request":
        dispatch(fetchBookingRequest());
        break;
      case "active":
        dispatch(fetchActiveBooking());
        break;
      case "cancelled":
        dispatch(fetchCancelledBooking());
        break;
      case "revenue":
        dispatch(revenueList());
        break;
      default:
        break;
    }
  }, [selectedList, dispatch]);

  const handleAdd = () => {
    navigate("/quotationform");
  };
  const isRevenueCardActive = activeCard === "revenue";
  const displayHeadCells = isRevenueCardActive ? revenueHeadCells : headCells;
  const handleCardClick = (type, route, cardId) => {
    setActiveCard(cardId);
    setSelectedList(type);
    setActiveCard(type);
    if (route) navigate(route);
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

  const handleSend = (bookingId) => {
    dispatch(sendWhatsAppMsg(bookingId))
    dispatch(sendBookingEmail(bookingId))
    setOpenSnackbar(true);
  }
  const handleSlipClick = (bookingId) => {
    dispatch(viewBookingById(bookingId))
      .unwrap()
      .then(() => {
        setLocalModalOpen(true);
      })
      .catch((error) => {
        console.error("Error loading booking:", error);
      });
  };

  const handleCloseSlip = () => {
    setLocalModalOpen(false);
    dispatch(clearViewedBooking());
  };
  const dataSource = selectedList === "revenue" ? revenueData : bookingList;

  const filteredRows = Array.isArray(dataSource)
    ? dataSource.filter((row) => {
      return (
        row?.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.bookingId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    : [];


  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  const cardData = [
    {
      id: "request",
      title: "Booking",
      value: requestCount,
      subtitle: "Requests",
      duration: "0% (30 Days)",
      icon: <BookOnlineIcon fontSize="large" />,
      type: "request",
    },
    {
      id: "active",
      title: "Active ",
      value: activeDeliveriesCount,
      subtitle: "Deliveries",
      duration: "100% (30 Days)",
      icon: <LocalShippingIcon fontSize="large" />,
      type: "active",
    },
    {
      id: "cancelled",
      title: "Total Cancelled",
      value: cancelledDeliveriesCount,
      duration: "0% (30 Days)",
      icon: <CancelScheduleSendIcon fontSize="large" />,
      type: "cancelled"
    },
    {
      id: "revenue",
      value: totalRevenue,
      subtitle: "Total Revenue",
      duration: "100% (30 Days)",
      type: "revenue",
      icon: <AccountBalanceWalletIcon fontSize="large" />,
    },
  ];


  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this Quotation?")) {
      dispatch(deleteBooking(bookingId));
      dispatch(fetchBookingRequest());
    }
  };

  const handleView = (bookingId) => navigate(`/viewquotation/${bookingId}`);
  const handleUpdate = (bookingId) => navigate(`/updatequotation/${bookingId}`);

  const handleActiveChange = (bookingId, isActive) => {
    console.log("Booking", bookingId, "active:", isActive);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Manage Quotation
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ textTransform: "none", fontWeight: 500 }}>
          Add Quotation
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}>
        {cardData.map((card) => (
          <Grid item key={card.id} sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}>
            <Card
              onClick={() => handleCardClick(card.type, card.route, card.id)}
              sx={{
                flex: 1,
                cursor: "pointer",
                border: activeCard === card.id ? `2px solid ${cardColor}` : "2px solid transparent",
                backgroundColor: activeCard === card.id ? cardLightColor : "background.paper",
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
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  className="icon-container"
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor: activeCard === card.id ? cardColor : cardLightColor,
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
                  <Typography variant="h5" fontWeight="bold" color={activeCard === card.id ? "primary" : "text.primary"}>
                    {card.value}
                  </Typography>
                  <Typography variant="subtitle1" color={activeCard === card.id ? "primary" : "text.primary"}>
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
                      sx={{ fontWeight: "bold", color: "#fff" }}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{ color: "#fff", "&.Mui-active": { color: "#fff" } }}
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
              {Array.isArray(dataSource) && stableSort(dataSource, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row._id || index} hover>
                    {isRevenueCardActive ? (
                      <>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.bookingId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.pickup}</TableCell>
                        <TableCell>{row.drop}</TableCell>
                        <TableCell>{row.revenue ?? "-"}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleView(row['Booking ID'])}
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
                              onChange={(e) => handleActiveChange(row.bookingId, e.target.checked)}
                              color="primary"
                            />
                          </TableCell>
                        )}
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.orderBy}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.Date}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.Name}</TableCell>
                        <TableCell>{row.pickup}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row["Name (Drop)"]}</TableCell>
                        <TableCell>{row.drop}</TableCell>
                        <TableCell>{row.Contact}</TableCell>


                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton size="small" color="primary" onClick={() => handleView(row['Booking ID'])} title="View">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={() => handleUpdate(row['Booking ID'])}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              title="CancelScheduleSend"
                            >
                              <CancelScheduleSendIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => {
                              handleDelete(row['Booking ID']);
                            }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="primary">
                              <SendIcon fontSize="small" onClick={() => { handleSend(row['Booking ID']) }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => handleSlipClick(row['Booking ID'])}
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
                  <TableCell colSpan={9} />
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
        <QSlipModal
          open={localModalOpen}
          handleClose={handleCloseSlip}
          bookingData={booking}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
            Share link sent via WhatsApp and Email!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default QuotationCard;