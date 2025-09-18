import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CUSTOMERS_API, FILES_BASE_URL } from '../../utils/api';

const BASE_URL = CUSTOMERS_API;

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.post(`${BASE_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchActiveCustomer = createAsyncThunk(
  'customers/fetchActiveCustomer',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/active-list`)
      return res.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Active Customer");
    }
  }
);

export const fetchActiveCustomerCount = createAsyncThunk(
  'customers/fetchActiveCustomerCount',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/active-count`);
      return { activeCount: res.data.message.activeCount };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.data || "Failed to fetch Active Customer Count");
    }
  }
);

export const fetchBlackListedCustomer = createAsyncThunk(
  'customers/fetchBlackListedCustomer',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/blacklisted-list`)
      return res.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Blacklisted Customer");
    }
  }
);

export const fetchBlackListedCustomerCount = createAsyncThunk(
  'customers/fetchBlackListedCustomerCount',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/blacklisted-count`);
      return { blacklistCount: res.data.message.blacklistedCount };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.data || "Failed to fetch Blacklisted Customer Count");
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId, thunkApi) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${customerId}`);
      return customerId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Customer");
    }
  }
);

export const viewCustomerById = createAsyncThunk(
  'customers/viewCustomer',
  async (customerId, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/${customerId}`);
      return res.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed fetch the Customer");
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/updatedCustomer',
  async ({ customerId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${customerId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateStatusActivate = createAsyncThunk(
  'customers/activate', async (customerId, thunkApi) => {
    try {
      const res = await axios.patch(`${BASE_URL}/status/activate/${customerId}`);
      return res.data.message
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to update Status');
    }
  }
)
export const updateStatusBacklist = createAsyncThunk(
  'customers/blacklisted', async (customerId, thunkApi) => {
    try {
      const res = await axios.patch(`${BASE_URL}/status/blacklist/${customerId}`);
      return res.data.message;
    }
    catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to update Status');
    }
  }
)

const initialState = {
  list: [],
  activeCount: 0,
  blacklistCount: 0,
  form: {
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    address: '',
    state: '',
    city: '',
    district: '',
    pincode: '',
    gstNumber: '',
    idProof: '',
    stateCode:'',
    idPhoto: null,
    customerPhoto: null
  },
  status: 'idle',
  error: null,
  viewedCustomer: null,
  loading: false
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    addCustomers: (state, action) => {
      state.list.push(action.payload);
    },
    setCustomers: (state, action) => {
      state.list = action.payload;
    },
    clearViewedCustomer: (state) => {
      state.viewedCustomer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.loading = false;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchActiveCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchActiveCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlackListedCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlackListedCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBlackListedCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchActiveCustomerCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveCustomerCount.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCount = action.payload.activeCount;
      })
      .addCase(fetchActiveCustomerCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlackListedCustomerCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlackListedCustomerCount.fulfilled, (state, action) => {
        state.loading = false;
        state.blacklistCount = action.payload.blacklistCount;
      })
      .addCase(fetchBlackListedCustomerCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(customer => customer.customerId !== action.payload);
      })
      .addCase(viewCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.form = {
          firstName: payload.firstName || '',
          middleName: payload.middleName || '',
          lastName: payload.lastName || '',
          contactNumber: payload.contactNumber || '',
          email: payload.emailId || '',
          address: payload.address || '',
          state: payload.state || '',
          city: payload.city || '',
          district: payload.district || '',
          pincode: payload.pincode || '',
          gstNumber: payload.gstNumber || '',
          idProof: payload.idProof || '',
          stateCode:payload.stateCode || '',
          idPhoto: payload.idProofPhoto
            ? `${FILES_BASE_URL}/${payload.idProofPhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
            : null,
          customerPhoto: payload.customerProfilePhoto
            ? `${FILES_BASE_URL}/${payload.customerProfilePhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
            : null
        };
      })
      .addCase(viewCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.error = null;

        // Update customer in list
        const updatedCustomer = action.payload;
        state.list = state.list.map(customer =>
          customer.customerId === updatedCustomer.customerId ? updatedCustomer : customer
        );

        // Update viewed customer if it's the same one
        if (state.viewedCustomer?.customerId === updatedCustomer.customerId) {
          state.viewedCustomer = updatedCustomer;
        }

        // Update form fields
        const payload = action.payload;
        state.form = {
          firstName: payload.firstName || '',
          middleName: payload.middleName || '',
          lastName: payload.lastName || '',
          contactNumber: payload.contactNumber || '',
          email: payload.emailId || '',
          address: payload.address || '',
          state: payload.state || '',
          city: payload.city || '',
          district: payload.district || '',
          pincode: payload.pincode || '',
          gstNumber: payload.gstNumber || '',
          idProof: payload.idProof || '',
          idPhoto: payload.idProofPhoto
            ? `${FILES_BASE_URL}/${payload.idProofPhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
            : null,
          customerPhoto: payload.customerProfilePhoto
            ? `${FILES_BASE_URL}/${payload.customerProfilePhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
            : null
        };
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatusActivate.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(updateStatusActivate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const index = state.list.findIndex(v => v._id === updatedCustomer._id);
        if (index !== -1) {
          state.list[index] = updatedCustomer;
        }
      })
      .addCase(updateStatusActivate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(updateStatusBacklist.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(updateStatusBacklist.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const index = state.list.findIndex(v => v._id === updatedCustomer._id);
        if (index !== -1) {
          state.list[index] = updatedCustomer
        }
      })
      .addCase(updateStatusBacklist.rejected, (state, action) => {
        state.loading = false;
        state.list = action.payload
      })
      ;

  }
});

export const {
  setFormField,
  resetForm,
  addCustomers,
  setCustomers,
  clearViewedCustomer
} = customerSlice.actions;

export default customerSlice.reducer;