import React, { useEffect, useRef, useState } from 'react';
import {
    Box, Typography, Button, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Paper, Modal
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoicesByFilter } from '../../../features/booking/bookingSlice';
import { useLocation } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import InvoicePDF from '../../../Components/InvoicePdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const LedgerResults = () => {
    const { state: filters } = useLocation();
    const dispatch = useDispatch();
    const { data: customers } = useSelector((state) => state.bookings);

    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const componentRef = useRef();
    const invoiceRef = useRef();

    useEffect(() => {
        if (filters) {
            dispatch(fetchInvoicesByFilter(filters));
        }
    }, [dispatch, filters]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleInvoicePrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: 'Invoice',
        onAfterPrint: () => setSelectedInvoice(null),
    });

    // ✅ only download/share invoice as PDF
    const handleSharePDF = async () => {
        const input = invoiceRef.current;
        try {
            const canvas = await html2canvas(input, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // trigger browser download
            pdf.save(`invoice-${selectedInvoice?.bookingId || 'download'}.pdf`);
        } catch (error) {
            console.error('PDF generation error:', error);
        }
    };

    // ✅ Flatten customers -> invoices and add serial numbers
    let serial = 1;
    const allInvoices = customers?.flatMap((cust) =>
        cust.invoices?.map((invoice) => ({
            sno: serial++,
            date: new Date(invoice.bookingDate || invoice.billDate).toLocaleDateString(),
            customerName: cust.customerName,
            vchType: invoice.vchType,
            vchNo: invoice.invoiceNo || invoice.bookingId,
            debit: invoice.debit,
            credit: invoice.credit,
        }))
    ) || [];

    // ✅ Totals
    const totalDebit = allInvoices.reduce((sum, row) => sum + (row.debit || 0), 0);
    const totalCredit = allInvoices.reduce((sum, row) => sum + (row.credit || 0), 0);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Ledger Results
                </Typography>
                <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
                    Print
                </Button>
            </Box>

            <TableContainer component={Paper} ref={componentRef}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1565c0' }}>
                            <TableCell sx={{ color: 'white' }}>S.No</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Particulars</TableCell>
                            <TableCell sx={{ color: 'white' }}>Vch Type</TableCell>
                            <TableCell sx={{ color: 'white' }}>Vch No.</TableCell>
                            <TableCell sx={{ color: 'white' }}>Debit Amount</TableCell>
                            <TableCell sx={{ color: 'white' }}>Credit Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allInvoices.map((row) => (
                            <TableRow key={row.sno}>
                                <TableCell>{row.sno}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.vchType}</TableCell>
                                <TableCell>{row.vchNo}</TableCell>
                                <TableCell>{row.debit}</TableCell>
                                <TableCell>{row.credit}</TableCell>
                            </TableRow>
                        ))}

                        {/* ✅ Totals row */}
                        <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                            <TableCell colSpan={5} align="right">Total</TableCell>
                            <TableCell>{totalDebit}</TableCell>
                            <TableCell>{totalCredit}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Invoice Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '95vh',
                    overflowY: 'auto',
                    bgcolor: 'white',
                    p: 4
                }}>
                    {selectedInvoice && (
                        <InvoicePDF
                            ref={invoiceRef}
                            invoice={selectedInvoice}
                            bookingId={selectedInvoice?.bookingId}
                            onClose={() => setOpenModal(false)}
                            onPrint={handleInvoicePrint}
                            onShare={handleSharePDF}
                        />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default LedgerResults;
