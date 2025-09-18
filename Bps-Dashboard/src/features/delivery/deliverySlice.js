import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELIVERY_API, WHATSAPP_API } from '../../utils/api';


const BASE_URL = DELIVERY_API;


export const assignDeliveries = createAsyncThunk(
  'delivery/assignDeliveries',
  async ({ bookingIds, quotationIds, driverName, vehicleModel }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/assign`, {
        bookingIds,
        quotationIds,
        driverName,
        vehicleModel,
      });
      return response.data.data;
    } catch (error) {
      console.log("error", error.response?.data?.message);
      return rejectWithValue(

        error.response?.data?.message || 'Failed to assign deliveries'
      );
    }
  }
);

export const finalDeliveryList = createAsyncThunk(
  'finalDelivery/list', async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/final/list`);
      return res.data.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.message?.data);
    }
  }
)
export const finalDeliveryMail = createAsyncThunk(
  'finalDelivery/mail', async (orderId, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/send-booking-email/${orderId}`);
      return res.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.message?.data);
    }
  }
)
export const finalDeliveryWhatsApp = createAsyncThunk(
  'finalDelivery/whatsapp', async (orderId, thunkApi) => {
    try {
      const res = await axios.post(`${WHATSAPP_API}/send-final-delivery/${orderId}`);
      return res.data;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.message?.data);
    }
  }
)
const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(assignDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(finalDeliveryList.pending, (state) => {
        state.loading = true;
        state.false = null
      })
      .addCase(finalDeliveryList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload
      })
      .addCase(finalDeliveryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(finalDeliveryMail.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(finalDeliveryMail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null
      })
      .addCase(finalDeliveryMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(finalDeliveryWhatsApp.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(finalDeliveryWhatsApp.fulfilled, (state) => {
        state.loading = false;
        state.error = null
      })
      .addCase(finalDeliveryWhatsApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ;
  },
});


export default deliverySlice.reducer;
