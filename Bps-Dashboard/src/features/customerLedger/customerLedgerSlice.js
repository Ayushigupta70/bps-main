import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ledgerSlice_API } from '../../utils/api';

const BASE_URL = ledgerSlice_API

/** Fetch all generated invoices */
export const allLedger = createAsyncThunk('ledger/all', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${BASE_URL}/all`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }
});

/** Preview invoices (Booking or Quotation) by customer and date range */
export const previewInvoices = createAsyncThunk(
    'ledger/previewInvoices',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/preview`, payload);
            return res.data;
        } catch (err) {
            console.error("Preview Invoices Error", err.response?.data || err.message);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to preview invoices');
        }
    }
);

/** Generate invoices by marking them as generated */
export const generateInvoices = createAsyncThunk(
    'ledger/generateInvoices',
    async ({ bookingIds }, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/generate`, {
                bookingIds,

            });
            return res.data;
        } catch (err) {
            console.log(err.response?.data?.message);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to generate invoices');
        }
    }
);

export const sendInvoices = createAsyncThunk(
    'sendInvoices/invoices',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/send-invoice`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to send invoice');
        }
    }
);

const ledgerSlice = createSlice({
    name: 'ledger',
    initialState: {
        invoices: [],
        preview: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearLedgerError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // All Generated
            .addCase(allLedger.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allLedger.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(allLedger.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Preview
            .addCase(previewInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.preview = [];
            })
            .addCase(previewInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.preview = action.payload;
            })
            .addCase(previewInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Generate
            .addCase(generateInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(generateInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(generateInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendInvoices.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(sendInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || 'Invoice sent successfully';
            })
            .addCase(sendInvoices.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { clearLedgerError, clearSuccessMessage } = ledgerSlice.actions;

export default ledgerSlice.reducer;