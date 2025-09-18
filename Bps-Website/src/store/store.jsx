import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/loginSlice';
import locationReducer from '../features/Location/locationSlice';
import stationReducer from '../features/stations/stationSlice';
import bookingReducer from '../features/booking/bookingSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        stations: stationReducer,
        location: locationReducer,
        bookings: bookingReducer,
    },
});

export default store;