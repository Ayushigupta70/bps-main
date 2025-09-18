import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATIONS_API } from '../../utils/api';

const BASE_URL = STATIONS_API;

export const createStation = createAsyncThunk(
    'stations/createStation',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/create`, data);
            return response.data.message;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchStations = createAsyncThunk(
    'stations/fetchStations', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/getAllStations`);
            return res.data.message;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Stations");
        }
    }
);
export const deleteStation = createAsyncThunk(
    'stations/deleteStation', async (stationId, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete/${stationId}`);
            return stationId
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Stations");
        }
    }
);

export const searchStationByName = createAsyncThunk(
    'stations/searchByName', async (stationName, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/name/${stationName}`);
            const data = res.data.data;
            return Array.isArray(data) ? data : [data];
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Stations");
        }
    }
)

export const getStationById = createAsyncThunk(
    'stations/viewStation', async (stationId, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/searchById/${stationId}`)
            return res.data.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to view Stations");
        }
    }
)
//update Station
export const updateStationById = createAsyncThunk(
    'station/updateStation', async ({ stationId, data }, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/update/${stationId}`, data)
            return res.data.message
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to Update Stations");
        }
    }
)

const initialState = {
    list: [],
    form: {
        stationName: '',
        contact: '',
        email: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
    },
    status: 'idle',
    error: null,
    viewedStation: null,
};

const stationSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setFormField: (state, action) => {
            const { field, value } = action.payload;
            state.form[field] = value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        addStation: (state, action) => {
            state.list.push(action.payload);
        },
        setStations: (state, action) => {
            state.list = action.payload;
        },
        clearViewedStation: (state) => {
            state.viewedStation = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createStation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createStation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchStations.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchStations.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(fetchStations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteStation.fulfilled, (state, action) => {
                state.list = state.list.filter(station => station.stationId !== action.payload);
            })
            .addCase(searchStationByName.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(searchStationByName.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            //view Station 
            .addCase(getStationById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getStationById.fulfilled, (state, action) => {
                state.loading = false;
                state.viewedStation = action.payload;
                state.form = {
                    ...state.form,
                    ...action.payload
                }
            })
            .addCase(getStationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            //updateStation
            .addCase(updateStationById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateStationById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;

                const updatedStation = action.payload;
                const index = state.list.findIndex(station => station.stationId === updatedStation.stationId);
                if (index !== -1) {
                    state.list[index] = updatedStation;
                }


                state.form = initialState.form;
                state.viewedStation = null;
            })
            .addCase(updateStationById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            ;
    },
});


export const { setFormField, resetForm, addStation, setStations, clearViewedStation } = stationSlice.actions;

export default stationSlice.reducer;