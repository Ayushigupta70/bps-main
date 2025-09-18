import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_API } from '../utils/api'

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    role: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_API}/login`, credentials);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Login failed' });
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${AUTH_API}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Failed to fetch profile' });
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.message.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                const userProfile = action.payload.message;
                state.user = userProfile;
                state.role = userProfile.role;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload?.message || 'Failed to fetch profile';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
