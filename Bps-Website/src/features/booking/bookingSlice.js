import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BOOKINGS_API } from '../../utils/api';

const BASE_URL = BOOKINGS_API;

export const createBooking = createAsyncThunk(

    'bookings/createBooking', async (data, { rejectWithValue }) => {
        console.log('Data being sent to create booking:', data);
        try {
            const res = await axios.post(`${BASE_URL}/public`, data)
            return res.data.booking
        }
        catch (err) {
            console.log('Error creating booking:', err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)
export const deleteBooking = createAsyncThunk(
    '/booking/deleteBooking', async (bookingId, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete/${bookingId}`)
            return bookingId;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the booking");
        }
    }
)
export const bookingRequestCount = createAsyncThunk(
    'booking/bookingRequestCount', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/booking-list?type='request`)
            return { requestCount: res.data.count }
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Booking request count");
        }
    }
)
export const activeBookingCount = createAsyncThunk(
    'booking/activeCount', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/bookings/count/active`)
            return { activeDeliveries: res.data.activeDeliveries }
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To Active Deliveries count");
        }
    }
)
export const cancelledBookingCount = createAsyncThunk(
    'booking.cancelledCount', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/bookings/count/cancelled`)
            return { cancelledCount: res.data.cancelledCount }
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To Cancelled Booking  count");
        }
    }
)
export const fetchBookingsByType = createAsyncThunk(
    'bookings/fetchByType',
    async (type, { rejectWithValue }) => {
        console.log('Fetching bookings of type:', type)
        try {
            const response = await axios.get(`${BASE_URL}/booking-list?type=${type}`);
            console.log('Booking list response:', response.data); // Log the response
            return { type, data: response.data.data };
        } catch (err) {
            console.log('Error fetching bookings:', err);
            return rejectWithValue({ type, error: err.response?.data?.message || err.message });
        }
    }
);
export const viewBookingById = createAsyncThunk(
    '/booking/viewBookingById', async (bookingId, thunkApi) => {
        try {
            console.log("booking", bookingId);
            const res = await axios.get(`${BASE_URL}/${bookingId}`)
            console.log("booking", res)
            return res.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'f');
        }

    }
)
export const updateBookingById = createAsyncThunk(
    'booking/update', async ({ bookingId, data }, thunkApi) => {
        try {

            const res = await axios.put(`${BASE_URL}/${bookingId}`, data)
            return res.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'failed to update booking')
        }
    }
)
export const revenueList = createAsyncThunk(
    'revenueList/booking', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/revenue-list`);
            return {
                totalRevenue: res.data.totalRevenue,
                revenueList: res.data.data
            }
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'failed to view totalReveunue')
        }
    }

)
export const cancelBooking = createAsyncThunk(
    'cancel/booking', async (bookingId, thunkApi) => {
        try {
            const res = await axios.patch(`${BASE_URL}/${bookingId}/cancel`)
            return res.data.booking;

        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message);
        }
    }
)
const initialState = {
    list: [],
    requestCount: 0,
    activeDeliveriesCount: 0,
    cancelledDeliveriesCount: 0,
    totalRevenue: 0,

    form: {
        startStation: "",
        endStation: "",
        bookingDate: null,
        deliveryDate: null,
        customerSearch: "",
        firstName: "",
        middleName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        senderName: "",
        senderLocality: "",
        fromCity: "",
        senderGgt: "",
        fromState: "",
        senderPincode: "",
        receiverName: "",
        receiverLocality: "",
        receiverGgt: "",
        toState: "",
        toCity: "",
        toPincode: "",
        items: [
            {
                receiptNo: "",
                refNo: "",
                insurance: "",
                vppAmount: "",
                toPay: "",
                weight: "",
                amount: "",
            },
        ],
        addComment: "",
        freight: "",
        ins_vpp: "",
        billTotal: "",
        cgst: "",
        sgst: "",
        igst: "",
        grandTotal: "",
    },
    status: 'idle',
    error: null,
    viewedbooking: null,
};
const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setFormField: (state, action) => {
            const { field, value } = action.payload;
            state.form[field] = value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        addBooking: (state, action) => {
            state.list.push(action.payload);
        },
        setBooking: (state, action) => {
            state.list = action.payload;
        },
        clearViewedBooking: (state) => {
            state.viewedBooking = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //for booking.
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.list.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //for deleting
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(booking => booking.bookingId !== action.payload);
            })
            //fetching list 
            .addCase(fetchBookingsByType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBookingsByType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.data
            })
            .addCase(fetchBookingsByType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error;
            })

            .addCase(bookingRequestCount.fulfilled, (state, action) => {
                state.requestCount = action.payload.requestCount;
            })
            .addCase(activeBookingCount.fulfilled, (state, action) => {
                state.activeDeliveriesCount = action.payload.activeDeliveries;
            })
            .addCase(cancelledBookingCount.fulfilled, (state, action) => {
                state.cancelledDeliveriesCount = action.payload.cancelledCount;
            })
            //view booking
            .addCase(viewBookingById.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(viewBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.viewedBooking = action.payload;
                state.form = {
                    ...state.form,
                    ...action.payload
                };
            })
            .addCase(viewBookingById.rejected, (state) => {
                state.loading = false;
                state.error = null
            })
            .addCase(updateBookingById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateBookingById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                const updatedBooking = action.payload
                const index = state.list.findIndex(booking => booking.bookingId === updatedBooking.bookingId);
                if (index !== -1) {
                    state.list[index] = updatedBooking;
                }

                state.form = initialState.form
            })
            //totalReveune
            .addCase(revenueList.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(revenueList.fulfilled, (state, action) => {
                state.loading = false;
                state.totalRevenue = action.payload.totalRevenue;
                state.revenueList = action.payload.revenueList;
            })
            .addCase(revenueList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            ;
    }
})
export const { setFormField, resetForm, addBooking, setBooking, clearViewedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;