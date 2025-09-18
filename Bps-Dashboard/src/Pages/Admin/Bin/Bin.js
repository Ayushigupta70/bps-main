import React, { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreIcon from '@mui/icons-material/Restore';

const Bin = ({ dataObj = {} }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'pickupLocation', direction: 'asc' });

    // Convert object to array once using useMemo
    const dataArray = useMemo(() => Object.values(dataObj), [dataObj]);

    // Sorting logic using useMemo for performance
    const sortedItems = useMemo(() => {
        return [...dataArray].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (!aValue || !bValue) return 0;

            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'asc'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue.toString().localeCompare(bValue.toString())
                : bValue.toString().localeCompare(aValue.toString());
        });
    }, [dataArray, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <DeleteOutlineIcon sx={{ fontSize: 50, color: '#ff6b6b', mr: 2 }} />
                    <Typography variant="h4" fontWeight="bold">
                        Recycle Bin
                    </Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                {['pickupLocation', 'receiverName', 'dropLocation', 'contact', 'date'].map((key) => (
                                    <TableCell key={key}>
                                        <TableSortLabel
                                            active={sortConfig.key === key}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort(key)}
                                        >
                                            {key === 'pickupLocation'
                                                ? 'Pick Up'
                                                : key === 'receiverName'
                                                    ? 'Receiver Name'
                                                    : key === 'dropLocation'
                                                        ? 'Drop'
                                                        : key.charAt(0).toUpperCase() + key.slice(1)}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedItems.length ? (
                                sortedItems.map((item, index) => (
                                    <TableRow key={item.id || index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.pickupLocation}</TableCell>
                                        <TableCell>{item.receiverName}</TableCell>
                                        <TableCell>{item.dropLocation}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => console.log('Restore item', item.id)}
                                            >
                                                <RestoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No deleted items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Bin;
