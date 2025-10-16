import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TablePagination,
  Button,
  TableSortLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Block as BlockIcon,
  PeopleAlt as PeopleAltIcon,
  PersonOff as PersonOffIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateStatus,
  activeList,
  activeSupervisorCount,
  deactivatedCount,
  blacklistedCount,
  adminCount,
  deactivatedList,
  blacklistedList,
  adminList,
} from "../../../features/user/userSlice";

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
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const headCells = [
  { id: "sno", label: "S.No", sortable: false },
  { id: "adminId", label: "Admin ID", sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "contact", label: "Contact", sortable: true },
  { id: "action", label: "Action", sortable: false },
];

export default function SupervisorList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    list: userList = [],
    blackCount,
    deactivatedcount,
    admincount,
    activeCounts,
  } = useSelector((state) => state.users);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selectedList, setSelectedList] = useState("active");

  const open = Boolean(anchorEl);

  // 🔄 Fetch dashboard + supervisors data
  const refreshAllData = async () => {
    setLoading(true);
    await Promise.all([
      dispatch(activeList()),
      dispatch(activeSupervisorCount()),
      dispatch(deactivatedCount()),
      dispatch(blacklistedCount()),
      dispatch(adminCount()),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refreshAllData();
  }, [dispatch]);

  // Load specific list based on selection
  useEffect(() => {
    switch (selectedList) {
      case "active":
        dispatch(activeList());
        break;
      case "deactivated":
        dispatch(deactivatedList());
        break;
      case "blacklisted":
        dispatch(blacklistedList());
        break;
      case "admin":
        dispatch(adminList());
        break;
      default:
        break;
    }
  }, [selectedList, dispatch]);

  // 🌟 SweetAlert utility functions
  const showSuccess = (msg) =>
    Swal.fire({
      icon: "success",
      title: "🎉 Success!",
      text: msg,
      background: "linear-gradient(135deg, #e0ffe0, #f0fff0)",
      color: "#222",
      showConfirmButton: false,
      timer: 1600,
      width: 400,
    });

  const showError = (msg) =>
    Swal.fire({
      icon: "error",
      title: "⚠️ Oops!",
      text: msg,
      background: "linear-gradient(135deg, #ffe6e6, #fff0f0)",
      confirmButtonColor: "#d33",
      width: 400,
    });

  const showConfirm = async (msg) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: msg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    });
    return result.isConfirmed;
  };

  // Navigation handlers
  const handleAdd = () => navigate("/userform");
  const handleEdit = (adminId) => navigate(`/edituser/${adminId}`);
  const handleView = (adminId) => navigate(`/viewuser/${adminId}`);

  // Card click handler
  const handleCardClick = (type) => {
    setSelectedList(type);
  };

  // Sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // ⚙️ Menu control
  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // 🗑️ Delete Supervisor
  const handleDelete = async (adminId) => {
    const confirmed = await showConfirm("This Supervisor will be permanently deleted!");
    if (!confirmed) return;

    try {
      const res = await dispatch(deleteUser(adminId));
      if (res.meta.requestStatus === "fulfilled") {
        showSuccess("Supervisor deleted successfully!");
        refreshAllData();
      } else showError("Failed to delete. Please try again.");
    } catch {
      showError("Error deleting supervisor.");
    } finally {
      handleMenuClose();
    }
  };

  // 🔄 Status Change
  const handleStatusChange = async (adminId, action) => {
    const actionMap = {
      available: "activate",
      deactivated: "deactivate",
      blacklisted: "blacklist"
    };

    const actionText = actionMap[action] || action;
    const confirmed = await showConfirm(`Do you want to ${actionText} this Supervisor?`);
    if (!confirmed) return;

    try {
      const res = await dispatch(updateStatus({ adminId, action }));
      if (res.meta.requestStatus === "fulfilled") {
        showSuccess(`Supervisor ${actionText} successfully!`);
        refreshAllData();
      } else showError("Status update failed. Try again.");
    } catch {
      showError("Error updating status.");
    } finally {
      handleMenuClose();
    }
  };

  // 🔍 Filter Supervisors
  const filteredUsers = userList.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.adminId?.toLowerCase().includes(search.toLowerCase()) ||
      user.contact?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔢 Pagination
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cardData = [
    {
      id: 1,
      title: "Supervisors",
      type: 'active',
      value: activeCounts,
      subtitle: "Active supervisors",
      duration: "Last 30 days",
      icon: <PeopleAltIcon fontSize="large" />,
      bgColor: "#e0f7fa"
    },
    {
      id: 2,
      title: "Inactive",
      type: 'deactivated',
      value: deactivatedcount,
      subtitle: "Deactivated supervisors",
      duration: "Last 30 days",
      icon: <PersonOffIcon fontSize="large" />,
      bgColor: "#fff3e0"
    },
    {
      id: 3,
      title: "Blacklisted",
      type: 'blacklisted',
      value: blackCount,
      subtitle: "Blacklisted supervisors",
      duration: "Last 30 days",
      icon: <BlockIcon fontSize="large" />,
      bgColor: "#ffebee"
    },
    {
      id: 4,
      title: "Admins",
      type: 'admin',
      value: admincount,
      subtitle: "System administrators",
      duration: "Last 30 days",
      icon: <AdminPanelSettingsIcon fontSize="large" />,
      bgColor: "#ede7f6"
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Add Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Admin Management
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Admin
        </Button>
      </Box>

      {/* 📊 Dashboard Count Cards */}
      <Grid container spacing={2} mb={3}>
        {cardData.map((card) => (
          <Grid size={{ sx: 12, sm: 6, md: 3 }} key={card.id}>
            <Card
              sx={{
                background: card.bgColor,
                boxShadow: 3,
                cursor: "pointer",
                border: selectedList === card.type ? `3px solid #1565c0` : "none",
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                }
              }}
              onClick={() => handleCardClick(card.type)}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor: selectedList === card.type ? "#1565c0" : "rgba(255,255,255,0.7)",
                    color: selectedList === card.type ? 'white' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {card.value || 0}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.disabled">
                  {card.duration}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔍 Search Box */}
      <Card sx={{ p: 2, mb: 3 }}>
        <TextField
          placeholder="Search by name, ID or contact"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* 🧾 Table */}
      {loading ? (
        <Typography align="center" mt={3}>
          Loading Supervisors...
        </Typography>
      ) : (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: "#1565c0" }}>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} sx={{ fontWeight: 'bold', color: 'white' }}>
                        {headCell.sortable ? (
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => handleRequestSort(headCell.id)}
                            sx={{ color: 'white', '&.Mui-active': { color: 'white' } }}
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
                  {stableSort(filteredUsers, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow key={user.adminId} hover>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{user.adminId}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.contact}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleView(user.adminId)}
                              title="View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(user.adminId)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(user.adminId)}
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, user)}
                              title="More Actions"
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardContent>
        </Card>
      )}

      {/* ⚙️ Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ elevation: 3, sx: { borderRadius: 2, minWidth: 180, mt: 1 } }}
      >
        <MenuItem onClick={() => handleStatusChange(selectedUser?.adminId, 'available')}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Active" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedUser?.adminId, 'deactivated')}>
          <ListItemIcon>
            <CancelIcon sx={{ color: 'orange' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inactive" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedUser?.adminId, 'blacklisted')}>
          <ListItemIcon>
            <BlockIcon sx={{ color: 'red' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Blacklisted" />
        </MenuItem>
      </Menu>
    </Box>
  );
}