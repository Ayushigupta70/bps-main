// src/features/location/locationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStates = createAsyncThunk('location/fetchStates', async () => {
    const res = await axios.get('http://localhost:8000/api/v2/state/states');
    
    return res.data; // make sure response format matches
});

export const fetchCities = createAsyncThunk('location/fetchCities', async (stateName) => {
    const encodedState = encodeURIComponent(stateName);
    const res = await axios.get(`http://localhost:8000/api/v2/state/cities/${encodedState}`);
   
    return res.data; 
});

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        states: [],
        cities: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCities: (state) => {
            state.cities = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.states = action.payload;
                state.loading = false;
            })
            .addCase(fetchStates.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.cities = action.payload;
                state.loading = false;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export const { clearCities } = locationSlice.actions;
export default locationSlice.reducer;
