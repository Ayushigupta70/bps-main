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
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  People as PeopleIcon,
  PersonOff as PersonOffIcon,
  Block as BlockIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { blacklistedCount, blacklistedList, deactivatedCount, deactivatedList, adminCount, adminList, activeSupervisorCount, activeList, updateStatus, deleteUser }
  from '../../../features/user/userSlice';





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

const UserCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cardColor = "#0155a5";
  const cardLightColor = "#e6f0fa";

  const [activeCard, setActiveCard] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedList, setSelectedList] = useState('active');
  const [searchTerm, setSearchTerm] = useState("");
  const [userRows, setUserRows] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const dispatch = useDispatch();
  const { list: userList,
    blackCount,
    deactivatedcount,
    admincount,
    activeCounts
  } = useSelector(state => state.users);
  useEffect(() => {


    if (userList) {
      setUserRows(userList);
    }

  }, [userList])
  useEffect(() => {
    dispatch(blacklistedCount());
    dispatch(deactivatedCount());
    dispatch(adminCount());
    dispatch(activeSupervisorCount());
    dispatch(activeList());
  }, [dispatch]);
  useEffect(() => {
    switch (selectedList) {

      case 'available':
        dispatch(activeList());
        break;
      case 'blacklisted':

        dispatch(blacklistedList());
        break;
      case 'deactivated':
        dispatch(deactivatedList());
        break;
      case 'admin':
        dispatch(adminList());
        break;
      default:
        break;
    }
  }, [selectedList, dispatch]);
  const handleAdd = () => navigate("/userform");
  const handleCardClick = (type) => {
    console.log("Card clicked:", type);
    setSelectedList(type); // triggers useEffect to auto-fetch
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };
  const handleSearch = (e) => { setSearchTerm(e.target.value); setPage(0); };
  const handleDelete = (adminId) => {
    if (window.confirm("Are you sure you want to delete this Supervisor ?")) {
      dispatch(deleteUser(adminId));
    }
  }
  const handleMenuOpen = (e, id) => { setMenuAnchorEl(e.currentTarget); setMenuRowId(id); };
  const handleMenuClose = () => { setMenuAnchorEl(null); setMenuRowId(null); };

  const handleEdit = (adminId) => {
    navigate(`/edituser/${adminId}`)
  }
  const handleView = (adminId) => {
    navigate(`/viewuser/${adminId}`)
  }
  const handleStatusChange = (adminId, action) => {
    dispatch(updateStatus({ adminId, action }));
    window.location.reload();
  };
  const filteredRows = userList.filter(
    row =>
      (row.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.contact || '').includes(searchTerm)
  );

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  const cardData = [
    { id: 1, title: "Supervisors", type: 'available', value: activeCounts, subtitle: "Active supervisors", duration: "Last 30 days", icon: <PeopleIcon fontSize="large" /> },
    { id: 2, title: "Inactive", type: 'deactivated', value: deactivatedcount, subtitle: "Deactivated supervisors", duration: "Last 30 days", icon: <PersonOffIcon fontSize="large" /> },
    { id: 3, title: "Blacklisted", type: 'blacklisted', value: blackCount, subtitle: "Blacklisted supervisors", duration: "Last 30 days", icon: <BlockIcon fontSize="large" /> },
    { id: 4, title: "Admins", type: 'admin', value: admincount, subtitle: "System administrators", duration: "Last 30 days", icon: <AdminPanelSettingsIcon fontSize="large" /> },
  ];


  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Admin Management</Typography>
        <Button variant="contained" onClick={handleAdd}>Add Admin</Button>
      </Box>

      <Grid container spacing={2} sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}>
        {cardData.map(card => (
          <Grid item key={card.id} sx={{ minWidth: 220, flex: 1 }}>
            <Card
              onClick={() => handleCardClick(card.type)}
              sx={{
                height: "100%",
                cursor: "pointer",
                border: activeCard === card.id ? `2px solid ${cardColor}` : "2px solid transparent",
                backgroundColor: activeCard === card.id ? cardLightColor : "background.paper",
                transition: "0.3s",
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 3, backgroundColor: cardLightColor }
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: "50%", backgroundColor: activeCard === card.id ? cardColor : cardLightColor, color: activeCard === card.id ? '#fff' : cardColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.cloneElement(card.icon, { color: 'inherit' })}
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h5" fontWeight="bold">{card.value}</Typography>
                  <Typography variant="subtitle1">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.subtitle}</Typography>
                  <Typography variant="caption" color="text.disabled">{card.duration}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1565c0' }}>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell key={headCell.id} sx={{ fontWeight: 'bold', color: 'white' }} sortDirection={orderBy === headCell.id ? order : false}>
                  {headCell.sortable ? (
                    <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleRequestSort(headCell.id)} sx={{ color: 'white', '&.Mui-active': { color: 'white' } }}>
                      {headCell.label}
                    </TableSortLabel>
                  ) : headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.adminId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleView(row.adminId)}><VisibilityIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(row.adminId)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.adminId)}><DeleteIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={e => handleMenuOpen(e, row.id)}><MoreVertIcon fontSize="small" /></IconButton>
                    <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ elevation: 3, sx: { borderRadius: 2, minWidth: 180, mt: 1 } }}>
                      <MenuItem onClick={() => handleStatusChange(row.adminId, 'available')}>
                        <ListItemIcon><CheckCircleIcon sx={{ color: 'green' }} fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Active" />
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(row.adminId, 'deactivated')}>
                        <ListItemIcon><CancelIcon sx={{ color: 'orange' }} fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Inactive" />
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(row.adminId, 'blacklisted')}>
                        <ListItemIcon><BlockIcon sx={{ color: 'red' }} fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Blacklisted" />
                      </MenuItem>
                    </Menu>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}><TableCell colSpan={5} /></TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </TableContainer>


    </Box>
  );
};

export default UserCard;