import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { QUOTATION_API, WHATSAPP_API } from '../../utils/api';

const BASE_URL = QUOTATION_API;

export const createBooking = createAsyncThunk(

  'bookings/createBooking', async (data, { rejectWithValue }) => {

    try {
      const res = await axios.post(`${BASE_URL}`, data)
      return res.data.data
    }
    catch (err) {
      console.log('Error creating booking:', err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
)
// quotationsSlice.js
export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async (bookingId, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/${bookingId}`);
      return bookingId; // This should be used to remove it from the state
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete the booking"
      );
    }
  }
);

//booking request.
export const fetchBookingRequest = createAsyncThunk(
  'booking/bookingRequestCount',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/booking-request-list`);
      return res.data.data.deliveries;
    } catch (error) {
      console.error("Error in fetchBookingRequest:", error);
      return thunkApi.rejectWithValue(error.response?.data?.message || "Error fetching bookings");
    }
  }
);


//active booking.
export const fetchActiveBooking = createAsyncThunk(
  'booking/activeBooking', async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/active-list`)
      return {
        activeDeliveries: res.data.data.totalActiveDeliveries,
        deliveries: res.data.data.deliveries,
      };
    }
    catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Active Deliveries ");
    }
  }
)
//cancelled booking
export const fetchCancelledBooking = createAsyncThunk(
  'booking.cancelledCount', async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/cancelled-list`)
      return { cancelledCount: res.data.data.totalCancelledDeliveries }
    }
    catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Cancelled Booking");
    }
  }
)

export const viewBookingById = createAsyncThunk(
  '/booking/viewBookingById', async (bookingId, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/search/${bookingId}`)
      return res?.data?.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.message || 'f');
    }

  }
)

export const updateBookingById = createAsyncThunk(
  'booking/update',
  async ({ bookingId, data }, thunkApi) => {
    try {
      const res = await axios.put(`${BASE_URL}/${bookingId}`, data);
      return res?.data?.data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || 'Failed to update booking'
      );
    }
  }
);

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
export const sendBookingEmail = createAsyncThunk(
  'sendBooking/mail', async (bookingId, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/send-Booking-Email/${bookingId}`);
      return res.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to send booking Id');
    }
  }
)
export const sendWhatsAppMsg = createAsyncThunk(
  'bookingMail/whatsApp', async (bookingId, thunkApi) => {
    try {
      const res = await axios.post(`${WHATSAPP_API}/send-booking-Quotation/${bookingId}`);
      return res.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err?.response?.data?.message);
    }
  }
)
export const getQuotationBookingSummaryByDate = createAsyncThunk(
  'booking/getBookingSummary', async ({ fromDate, toDate }, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/booking-summary-date`, { fromDate, toDate });
      return res.data.bookings;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }

  }
)
export const fetchIncomingQuotations = createAsyncThunk(
  'quotation/fetchIncomingQuotations',
  async ({ fromDate, toDate }, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/qincoming`, { fromDate, toDate });
      return res.data.data; // backend sends { success, count, data }
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch incoming quotations'
      );
    }
  }
);
const initialState = {
  list: [],
  list2: [],
  quotationsList: [],
  requestCount: 0,
  activeDeliveriesCount: 0,
  cancelledDeliveriesCount: 0,
  totalRevenue: 0,


  loading: false,
  viewedBooking: null,
  status: 'idle',
  error: null,

  form: {
    firstName: "",
    lastName: "",
    startStationName: null,
    endStation: null,
    locality: "",
    quotationDate: "",
    proposedDeliveryDate: "",
    fromCustomerName: "",
    fromAddress: "",
    fromState: "",
    fromCity: "",
    fromPincode: "",
    toCustomerName: "",
    toAddress: "",
    toState: "",
    toCity: "",
    toPincode: "",
    amount: "",
    sgst: "",
    additionalCmt: "",
    productDetails: [
      {
        name: "",
        quantity: "",
        price: "",
        weight: "",
      },
    ],
    addComment: "",
    billTotal: "",
    sgst: "",
    grandTotal: "",
  },
};
const quotationSlice = createSlice({
  name: 'quotation',
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
        console.log("Deleted ID from API response:", action.payload);
        console.log("Before deletion, list:", state.list);

        state.loading = false;
        state.list = state.list.filter(booking => booking.bookingId !== action.payload);

        console.log("After deletion, list:", state.list);
      })

      .addCase(fetchBookingRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ Make sure payload is an array
        state.requestCount = action.payload?.length || 0;
      })
      .addCase(fetchBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchActiveBooking.fulfilled, (state, action) => {
        state.activeDeliveriesCount = action.payload.activeDeliveries;
        state.list = action.payload.deliveries;
      })
      .addCase(fetchCancelledBooking.fulfilled, (state, action) => {
        state.cancelledDeliveriesCount = action.payload.cancelledCount;
        state.list = action.payload.deliveries || [];
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
      .addCase(viewBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      .addCase(sendBookingEmail.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(sendBookingEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null
      })
      .addCase(sendBookingEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(sendWhatsAppMsg.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(sendWhatsAppMsg.fulfilled, (state) => {
        state.loading = false;
        state.error = null
      })
      .addCase(sendWhatsAppMsg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(getQuotationBookingSummaryByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.list2 = action.payload;
      })
      .addCase(fetchIncomingQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomingQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.quotationsList = action.payload;
      })
      .addCase(fetchIncomingQuotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
})
export const { setFormField, resetForm, addBooking, setBooking, clearViewedBooking } = quotationSlice.actions;
export default quotationSlice.reducer;