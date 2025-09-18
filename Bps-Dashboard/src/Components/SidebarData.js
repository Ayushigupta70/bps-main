// sidebarData.js (or define inside Sidebar.js)
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const sidebarItems = [
    { label: 'Dashboard', route: '/', icon: <DashboardIcon /> },
    { label: 'Manage Booking', route: '/booking', icon: <BookOnlineIcon /> },
    { label: 'Manage Delivery', route: '/delivery', icon: <LocalShippingIcon /> },
    { label: 'Manage Vehicle', route: '/vehicle', icon: <DirectionsCarIcon /> },
    { label: 'Manage Driver', route: '/driver', icon: <PersonIcon /> },
    { label: 'Manage Customer', route: '/customer', icon: <SupportAgentIcon /> },
    { label: 'Manage Qcustomer', route: '/qcustomer', icon: <PeopleAltIcon /> },
    { label: 'Invoice', route: '/invoice', icon: <MapIcon /> },
    { label: 'Quotation', route: '/quotation', icon: <RequestQuoteIcon /> },
    { label: 'Ledger', route: '/ladger', icon: <AccountBalanceIcon /> },
    { label: 'Ledger History', route: '/ladgerhsitory', icon: <AccountBalanceIcon /> },
    { label: 'Manage User', route: '/users', icon: <PeopleIcon /> },
    { label: 'Manage Station', route: '/station', icon: <LocationOnIcon /> },
    { label: 'Manage Expenses', route: '/expenses', icon: <EditNoteIcon /> },
    { label: 'Contact', route: '/contact', icon: <ContactPageIcon /> },
    { label: 'Booking Report', route: '/booking-report', icon: <BookOnlineIcon /> },
    { label: 'Pending List', route: '/pandding-list', icon: <AccountBalanceIcon /> },
    { label: 'B-Booking', route: '/bbooking', icon: <BookOnlineIcon /> },
    { label: 'Q-Booking', route: '/qbooking', icon: <BookOnlineIcon /> },
    { label: 'Bin', route: '/bin', icon: <DeleteForeverIcon /> }

    // { label: 'Cashbook', route: '/cashbook', icon: <MenuBookIcon /> },
    // { label: 'Manage Staff', route: '/staff', icon: <PeopleAltIcon /> },
];
