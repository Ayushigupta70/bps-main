import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout';
import Dashboard from '../Pages/Admin/Dashboard';
import Users from '../Pages/Admin/Users';
import BookingCard from '../Pages/Admin/Booking/BookingCard';
import ContactCard from '../Pages/Admin/Contact/ContactCard';
import CustomerCard from '../Pages/Admin/Customer/CustomerCard';
import DeliveryCard from '../Pages/Admin/Delivery/DeliveryCard';
import DriverCard from '../Pages/Admin/Driver/DriverCard';
import VehicleCard from '../Pages/Admin/Vehicle/VehicleCard';
import TrackerCard from '../Pages/Admin/Tracker/TrackerCard';
import QuotationCard from '../Pages/Admin/Quotation/QuotationCard';
import LedgerCard from '../Pages/Admin/Ledger/LedgerCard';
import UserCard from '../Pages/Admin/Manage User/UserCard';
import StationCard from '../Pages/Admin/Manage Station/StationCard';
import StationForm from '../Pages/Admin/Manage Station/Form/StationForm';
import CustomerForm from '../Pages/Admin/Customer/Form/CustomerForm';
import CustomerView from '../Pages/Admin/Customer/Form/CustomerView';
import DriverForm from '../Pages/Admin/Driver/Form/DriverForm';
import ViewDriver from '../Pages/Admin/Driver/Form/ViewDriver';
import EditDriver from '../Pages/Admin/Driver/Form/EditDriver';
import StationView from '../Pages/Admin/Manage Station/Form/StationView';
import EditStation from '../Pages/Admin/Manage Station/Form/EditStation';
import BookingForm from '../Pages/Admin/Booking/Form/BookingForm';
import QuotationForm from '../Pages/Admin/Quotation/Form/QuotationForm';
import CustomerUpdate from '../Pages/Admin/Customer/Form/CustomerUpdate';
import VehicleForm from '../Pages/Admin/Vehicle/Form/VehicleForm';
import ViewBooking from '../Pages/Admin/Booking/Form/ViewBooking';
import EditBooking from '../Pages/Admin/Booking/Form/EditBooking';
import ViewVehicle from '../Pages/Admin/Vehicle/Form/ViewVehicle';
import EditVehicle from '../Pages/Admin/Vehicle/Form/EditVehicle';
import ViewQuotation from '../Pages/Admin/Quotation/Form/ViewQuotation';
import EditQuotations from '../Pages/Admin/Quotation/Form/EditQuotation';
import LedgerHistory from '../Pages/Admin/LedgerHistory/LedgerHistory';
import ExpensesCard from '../Pages/Admin/Expenses/ExpensesCard';
import UserForm from '../Pages/Admin/Manage User/Form/UserForm';
import EditUser from '../Pages/Admin/Manage User/Form/EditUser';
import ViewUser from '../Pages/Admin/Manage User/Form/ViewUser';
import BookingReport from '../Pages/Admin/BookingReport/bookingReport';
import { getTokenExpiration } from '../utils/auth';
import ViewBookingByDate from '../Components/ViewBookingByDate';
import PanddingList from '../Pages/Admin/PanddingList/PanddingList';
import Cashbook from '../Pages/Admin/Cashbook/Cashbook';
import StaffCrad from '../Pages/Admin/Staff/StaffCrad';
import StaffForm from '../Pages/Admin/Staff/Form/StaffForm';
import QcustomerCard from '../Pages/Admin/Qcustomer/QcustomerCard';
import QcustomerForm from '../Pages/Admin/Qcustomer/Form/QcustomerForm';
import QcustomerView from '../Pages/Admin/Qcustomer/Form/QcustomerView';
import QcustomerUpdate from '../Pages/Admin/Qcustomer/Form/QcustomerUpdate';
import LedgerResults from '../Pages/Admin/LedgerHistory/LedgerResults';
import ViewQuotationBtDate from '../Components/ViewQuotationByDate';
import BBooking from '../Pages/Admin/BBooking/Form/Bbooking';
import QBooking from '../Pages/Admin/QBooking/Form/Qbooking';
import Bin from '../Pages/Admin/Bin/Bin';

const MainRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem("authToken");
    const isAuthenticated = token !== null;
    const [role, setRole] = useState(localStorage.getItem("userRole"));

    // Extract role from URL if present
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleFromQuery = params.get("role");
        if (roleFromQuery) {
            localStorage.setItem("userRole", roleFromQuery);
            setRole(roleFromQuery);
        }
    }, [location]);

    // Handle token expiration and logout
    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = "http://localhost:3000";
        } else {
            const expirationTime = getTokenExpiration(token);
            const currentTime = Date.now();

            if (expirationTime && expirationTime <= currentTime) {
                handleLogout();
            } else if (expirationTime) {
                const timeout = expirationTime - currentTime;
                const timer = setTimeout(() => {
                    handleLogout();
                }, timeout);

                return () => clearTimeout(timer); // cleanup on unmount
            }
        }
    }, [isAuthenticated, token]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        alert("Session expired. You have been logged out.");
        window.location.href = "http://localhost:5173/login";
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contact" element={<ContactCard />} />
                <Route path="/customer" element={<CustomerCard />} />
                <Route path="/delivery" element={<DeliveryCard />} />
                <Route path="/qcustomer" element={<QcustomerCard />} />

                {/* Manage Vehicle */}
                <Route path="/vehicle" element={<VehicleCard />} />
                <Route path="/vehicleform" element={<VehicleForm />} />
                <Route path="/vehicleview/:vehicleId" element={<ViewVehicle />} />
                <Route path="/editvehicle/:vehicleId" element={<EditVehicle />} />

                <Route path="/invoice" element={<TrackerCard />} />

                {/* Ledger */}
                <Route path="/ladger" element={<LedgerCard />} />
                <Route path="/ladgerhsitory" element={<LedgerHistory />} />
                <Route path="/ladgerinvoice" element={<LedgerResults />} />
                <Route path="/expenses" element={<ExpensesCard />} />

                {/* Station */}
                <Route path="/station" element={<StationCard />} />
                <Route path="/stationform" element={<StationForm />} />
                <Route path="/stationview/:stationId" element={<StationView />} />
                <Route path="/editstation/:stationId" element={<EditStation />} />

                {/* Customer */}
                <Route path="/customerform" element={<CustomerForm />} />
                <Route path="/customerview/:customerId" element={<CustomerView />} />
                <Route path="/customerupdate/:customerId" element={<CustomerUpdate />} />

                {/* QCustomer */}
                <Route path="/qcustomerform" element={<QcustomerForm />} />
                <Route path="/qcustomerview/:customerId" element={<QcustomerView />} />
                <Route path="/qcustomerupdate/:customerId" element={<QcustomerUpdate />} />

                {/* Driver */}
                <Route path="/driver" element={<DriverCard />} />
                <Route path="/driverform" element={<DriverForm />} />
                <Route path="/viewdriver/:driverId" element={<ViewDriver />} />
                <Route path="/editdriver/:driverId" element={<EditDriver />} />

                {/* Booking */}
                <Route path="/booking" element={<BookingCard />} />
                <Route path="/booking/new" element={<BookingForm />} />
                <Route path="/booking/:bookingId" element={<ViewBooking />} />
                <Route path="/editbooking/:bookingId" element={<EditBooking />} />
                <Route path="/booking-summary/:fromDate/:toDate" element={<ViewBookingByDate />} />

                {/* Quotation */}
                <Route path="/quotation" element={<QuotationCard />} />
                <Route path="/quotationform" element={<QuotationForm />} />
                <Route path="/viewquotation/:bookingId" element={<ViewQuotation />} />
                <Route path="/updatequotation/:bookingId" element={<EditQuotations />} />
                <Route path="/quotation-summary/:fromDate/:toDate" element={<ViewQuotationBtDate />} />

                {/* Pandding List */}
                <Route path="/pandding-list" element={<PanddingList />} />

                {/* Report */}
                <Route path="/booking-report" element={<BookingReport />} />

                {/*B-Booking*/}
                <Route path="/bbooking" element={<BBooking />} />

                {/*Q-Booking*/}
                <Route path="/qbooking" element={<QBooking />} />

                {/* Bin */}
                <Route path="/bin" element={<Bin />} />

                {/* Users (Admin Only) */}
                {role !== 'supervisor' && (
                    <>
                        <Route path="/users" element={<UserCard />} />
                        <Route path="/userform" element={<UserForm />} />
                        <Route path="/viewuser/:adminId" element={<ViewUser />} />
                        <Route path="/edituser/:adminId" element={<EditUser />} />
                        {/* Cashbook */}
                        <Route path='/cashbook' element={<Cashbook />} />
                        {/* Staff */}
                        <Route path='/staff' element={<StaffCrad />} />
                        <Route path='/staffform' element={<StaffForm />} />
                    </>
                )}
            </Routes>
        </DashboardLayout>
    );
};

export default MainRoute;
