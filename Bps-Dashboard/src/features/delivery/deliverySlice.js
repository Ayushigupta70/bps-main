import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELIVERY_API, WHATSAPP_API } from '../../utils/api';


const BASE_URL = DELIVERY_API;


export const assignDeliveries = createAsyncThunk(
  'delivery/assignDeliveries',
  async ({ bookingIds, quotationIds, driverId, vehicleModel }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/assign`, {
        bookingIds,
        quotationIds,
        driverId,
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
export const finalizeDelivery = createAsyncThunk(
  'delivery/finalizeDelivery', async (orderId, thunkApi) => {
    try {
      const res = await axios.put(`${BASE_URL}/finalize/${orderId}`);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.message?.data);
    }
  }
)

export const driverAvailabile = createAsyncThunk(
  'driver/available', async (deliveryType, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/driver?type=${deliveryType}`)
      return res.data.message;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.message?.data);
    }
  }
)
export const VehicleAvailabile = createAsyncThunk(
  'vehicle/available', async (deliveryType, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/vehicle?type=${deliveryType}`)
      return res.data.message.availableVehicles;
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
    driver: [],
    vehicle: [],

    loading: false,
    error: null,

  },
  reducers: {
  },
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
      .addCase(finalizeDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(finalizeDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.finalizedDelivery = action.payload;
      })
      .addCase(finalizeDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(driverAvailabile.fulfilled, (state, action) => {
        state.loading = false;
        state.driver = action.payload
      })
      .addCase(VehicleAvailabile.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicle = action.payload
      })
      ;
  },
});

export default deliverySlice.reducer;
