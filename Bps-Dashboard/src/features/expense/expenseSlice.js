import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { EXPENSES_API } from '../../utils/api';


const BASE_URL = EXPENSES_API;

export const addExpenses = createAsyncThunk(
    'addExpenses/expenses', async (data, thunkApi) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            }

            const response = await axios.post(`${BASE_URL}/createExpenses`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to create Data');
        }
    }

)
export const getAllExpenses = createAsyncThunk(
    'getAllExpenses/expenses', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/getExpenses`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message)
        }
    }
)
export const viewedExpenseById = createAsyncThunk(
    'getExpense/expense', async (invoiceNo, thunkApi) => {
        try {

            const res = await axios.get(`${BASE_URL}/expense/${invoiceNo}`);
            console.log("res", res);

            return res.data.message;
        }
        catch (err) {
            console.log(err.response?.data?.message)
            return thunkApi.rejectWithValue(err.response?.data?.message)
        }
    }
)
export const updateByInvoiceNo = createAsyncThunk(
    'updateExpenses/expenses', async ({ invoiceNo, data }, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/expense/${invoiceNo}`, data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return res.data.message
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message);
        }
    }

)
const initialState = {
    list: [],
    form: {
        date: dayjs(),
        invoiceNo: '',
        title: '',
        details: '',
        amount: '',
        taxAmount: '',
        totalAmount: '',
        document: null,
    },
    status: 'idle',
    error: null,
    viewedExpenses: null,

};
const expenseSlice = createSlice(
    {
        name: 'expenses',
        initialState,
        reducers: {
            setFormField: (state, action) => {
                const { field, value } = action.payload;
                state.form[field] = value;
            },
            resetForm: (state) => {
                state.form = initialState.form;
            },
            addExpense: (state, action) => {
                state.list.push(action.payload);
            },
            setExpenses: (state, action) => {
                state.list = action.payload;
            },
            clearViewedExpenses: (state) => {
                state.viewedExpenses = null
            },
        },
        extraReducers: (builder) => {
            (builder)
                .addCase(addExpenses.pending, (state) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(addExpenses.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.error = null;
                })
                .addCase(addExpenses.rejected, (state, action) => {
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getAllExpenses.pending, (state, action) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(getAllExpenses.fulfilled, (state, action) => {
                    state.loading = true;
                    state.list = action.payload
                })
                .addCase(getAllExpenses.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(viewedExpenseById.pending, (state, action) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(viewedExpenseById.fulfilled, (state, action) => {
                    state.loading = false;
                    const payload = action.payload;
                    state.form = {
                        date: payload.date || '',
                        invoiceNo: payload.invoiceNo || '',
                        title: payload.title || '',
                        details: payload.details || '',
                        amount: payload.amount || '',
                        taxAmount: payload.taxAmount || '',
                        totalAmount: payload.totalAmount || '',
                        document: payload.document,
                    }
                })
                .addCase(viewedExpenseById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(updateByInvoiceNo.pending, (state) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(updateByInvoiceNo.fulfilled, (state, action) => {
                    state.loading = false;
                    state.status = 'succeeded';
                    state.error = null;

                    const updatedExpense = action.payload;
                    state.list = state.list.map(expense => expense.invoiceNo === updatedExpense.invoiceNo ? updatedExpense : expense);
                    if (state.viewedExpenses?.invoiceNo === updatedExpense.invoiceNo) {
                        state.viewedExpenses = updatedExpense;
                    }
                    const payload = action.payload;
                    state.form = {
                        date: payload.date || '',
                        invoiceNo: payload.invoiceNo || '',
                        title: payload.title || '',
                        details: payload.details || '',
                        amount: payload.amount || '',
                        taxAmount: payload.taxAmount || '',
                        totalAmount: payload.totalAmount || '',
                        document: payload.document,
                    }
                })
                .addCase(updateByInvoiceNo.rejected, (state, action) => {
                    state.loading = null;
                    state.error = action.payload;
                })
        }
    }


)
export const { setFormField, resetForm, addExpense, setExpenses, clearViewedExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;