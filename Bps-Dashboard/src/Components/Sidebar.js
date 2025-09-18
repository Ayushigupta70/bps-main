import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
    Toolbar,
    AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../Components/SidebarData';

const drawerWidth = 240;

const Sidebar = ({ children }) => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const userRole = localStorage.getItem('userRole');

    const toggleDrawer = () => setMobileOpen(!mobileOpen);

    const drawerContent = (
        <Box>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    BPS
                </Typography>
            </Box>
            <Divider />
            <List>
                {sidebarItems
                    .filter(item => !(userRole === 'supervisor' && item.label === 'Manage User'))
                    .map((item, index) => {
                        const isActive = location.pathname === item.route;
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.route}
                                    sx={{
                                        backgroundColor: isActive ? 'primary.main' : 'transparent',
                                        color: isActive ? 'white' : 'black',
                                        '&:hover': {
                                            backgroundColor: isActive ? 'primary.dark' : '#e0e0e0',
                                        },
                                    }}
                                    onClick={() => isMobile && toggleDrawer()}
                                >
                                    <ListItemIcon sx={{ color: isActive ? 'white' : 'black', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label}
                                        sx={{ pb: index === item.length - 1 ? 2 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>
        </Box >
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar for mobile */}
            {isMobile && (
                <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {userRole} Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            {/* Drawer */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={toggleDrawer}
                ModalProps={{ keepMounted: true }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f5f5f5',
                        borderRight: '1px solid #ccc',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Page Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: isMobile ? 7 : 0,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
