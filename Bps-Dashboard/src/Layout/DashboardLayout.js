import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import AppBarHeader from '../Components/AppBarHeader';

const DashboardLayout = ({ children }) => (
    <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
            <AppBarHeader />
            <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
    </Box>
);

export default DashboardLayout;
