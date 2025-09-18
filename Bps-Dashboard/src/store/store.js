import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/Location/locationSlice';
import stationReducer from '../features/stations/stationSlice';
import customerReducer from '../features/customers/customerSlice'
import qcustomerReducer from '../features/qcustomers/qcustomerSlice'
import driverReducer from '../features/Driver/driverSlice'
import bookingReducer from '../features/booking/bookingSlice'
import quotationReducer from '../features/quotation/quotationSlice'
import vehicleReducer from '../features/vehicle/vehicleSlice'
import deliveryReducer from '../features/delivery/deliverySlice'
import UserReducer from '../features/user/userSlice'
import ExpenseReducer from '../features/expense/expenseSlice'
import CustomerLedgerReducer from '../features/customerLedger/customerLedgerSlice'
import ContactReducer from '../features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    stations: stationReducer,
    location: locationReducer,
    customers: customerReducer,
    qcustomers: qcustomerReducer,
    drivers: driverReducer,
    bookings: bookingReducer,
    quotations: quotationReducer,
    vehicles: vehicleReducer,
    deliveries: deliveryReducer,
    users: UserReducer,
    expenses: ExpenseReducer,
    ledger: CustomerLedgerReducer,
    contact: ContactReducer,
  },
});
