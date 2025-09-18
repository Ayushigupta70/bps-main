import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CONTACT_API } from '../../utils/api';

const BASE_URL = CONTACT_API

export const createContact = createAsyncThunk(
    'createContact/contact', async (data, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/create`, data);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to create Contact');
        }
    }
)

export const getAllContact = createAsyncThunk(
    'getAllContact/contact', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}`)
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to Fetch All Contact');
        }
    }
)

export const viewContact = createAsyncThunk(
    'viewContact/contact', async (contactNumber, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/${contactNumber}`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err?.response?.data?.message || 'Failed to view Contact');
        }
    }
)
export const updateContact = createAsyncThunk(
    'updateContact/update', async (contact, thunkApi) => {
        try {
            const { contactNumber, ...data } = contact;
            const res = await axios.put(`${BASE_URL}/${contactNumber}`, data);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to update contact')
        }
    }
)
export const deleteContact = createAsyncThunk(
    'deleteContact/contact', async (contactNumber, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/${contactNumber}`);
            return contactNumber;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to delete Contact');
        }
    }
)

const initialState = {
    list: [],
    form: {
        name: '',
        contactNumber: '',
        email: '',
        address: '',
    },
    status: 'idle',
    error: null,
    viewedContact: null,
    loading: false
};

const contactSlice = createSlice(
    {
        name: 'contact',
        initialState,
        reducers: {
            setFormField: (state, action) => {
                const { field, value } = action.payload;
                state.form[field] = value;
            },
            resetForm: (state) => {
                state.form = initialState.form;
            },
            addContact: (state, action) => {
                state.list.push(action.payload);
            },
            setContact: (state, action) => {
                state.list = action.payload;
            },
            clearViewedContact: (state) => {
                state.viewedContact = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(createContact.pending, (state) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(createContact.fulfilled, (state) => {
                    state.loading = false;
                    state.status = 'succeeded';
                    state.error = null;
                })
                .addCase(createContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(getAllContact.fulfilled, (state, action) => {
                    state.loading = false;
                    state.list = action.payload;
                })
                .addCase(getAllContact.pending, (state) => {
                    state.loading = true;
                    state.error = null
                })
                .addCase(getAllContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(deleteContact.fulfilled, (state, action) => {
                    state.list = state.list.filter(contact => contact.contactNumber !== action.payload);
                })
                .addCase(viewContact.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(viewContact.fulfilled, (state, action) => {
                    state.loading = false;
                    const payload = action.payload;
                    state.form = {
                        name: payload.name || '',
                        contactNumber: payload.contactNumber || '',
                        email: payload.email || '',
                        address: payload.address || '',
                    }

                })
                .addCase(viewContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(updateContact.pending, (state, action) => {
                    state.loading = true;
                    state.error = action.payload;
                })
                .addCase(updateContact.fulfilled, (state, action) => {
                    state.loading = false;
                    state.status = 'succeeded';
                    state.error = null;


                    const updatedContact = action.payload;
                    state.list = state.list.map(contact =>
                        contact.contactNumber === updatedContact.contactNumber ? updatedContact : contact
                    );
                    if (state.viewedContact?.contactNumber === updatedContact.contactNumber) {
                        state.viewedContact = updatedContact;
                    }
                    const payload = action.payload;
                    state.form = {
                        name: payload.name || '',
                        contactNumber: payload.contactNumber || '',
                        email: payload.email || '',
                        address: payload.address || '',
                    }
                })
                .addCase(updateContact.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload
                });
        }
    }
)
export const {
    setFormField,
    resetForm,
    addContact,
    setContact,
    clearViewedContact
} = contactSlice.actions;
export const selectContactList = (state) => state.contact.list;

export default contactSlice.reducer;