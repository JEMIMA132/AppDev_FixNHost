import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Homepage from "./components/HomeContent/Homepage";
import Login from "./components/LoginContents/Login";
import Signup from "./components/LoginContents/Signup";
import LandingPage from "./components/LoginContents/Landingpage";
import Services from "./components/ServicesContent/Services";
import AboutUs from "./components/Abouts/AboutUs";
import ContactUs from "./components/Contacts/ContactUs";
import Policy from "./components/Dropdowns/Policy";
import Terms from "./components/Dropdowns/Terms";
import Faqs from "./components/Dropdowns/Faqs";
import Become from "./components/Becomes/Become";
import Choose from "./components/ServicesContent/Choose";
import Profile from "./components/Profiles/Profile";
import VendorProfile from "./components/VendorPage/VendorProfile";
import AdminDashboard from "./components/AdminContent/AdminDashboard";
import Dashboard from "./components/AdminContent/Dashboard";
import Users from "./components/AdminContent/Users";
import Customers from "./components/AdminContent/Customers";
import HostVendors from "./components/AdminContent/HostVendors";
import FixVendors from "./components/AdminContent/FixVendors";
import AdminBookings from "./components/AdminContent/AdminBookings";
import Transactions from "./components/AdminContent/Transactions";
import Reviews from "./components/AdminContent/Reviews";
import Reports from "./components/AdminContent/Reports";
import LiveChat from "./components/AdminContent/LiveChat";
import AdminSettings from "./components/AdminContent/AdminSettings";
import AccountSettings from "./components/AdminContent/AccountSettings";
// Admin Dashboard Components
const Products = () => <div>Products Management</div>;
const Orders = () => <div>Orders Management</div>;
const ReturnRequests = () => <div>Return Requests Management</div>;
const Inventory = () => <div>Inventory Management</div>;
const Customer = () => <div>Customer Management</div>;
const Inbox = () => <div>Inbox Management</div>;
const CustomerSupport = () => <div>Customer Support</div>;


// Placeholder components for FixVendor and HostVendor
const FixVendor = () => <div>FixVendor component goes here</div>;
const HostVendor = () => <div>HostVendor component goes here</div>;

// Import Vendor Dashboard Components
import VDashboard from "./components/VendorDashboard/VDashboard";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";

// Placeholder components for vendor dashboard
const VendorServices = () => <div>Vendor Services Management</div>;
const VendorBookings = () => <div>Vendor Booking Requests</div>;
const VendorReviews = () => <div>Vendor Reviews Management</div>;
const VendorPortfolio = () => <div>Vendor Portfolio Management</div>;
const VendorTransactions = () => <div>Vendor Transactions</div>;
const VendorReports = () => <div>Vendor Reports</div>;
const VendorMessages = () => <div>Vendor Messages</div>;
const VendorSettings = () => <div>Vendor Settings</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login & Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Pages */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/homepage" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-services" element={<Terms />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/become" element={<Become />} />

        {/* Service Selection Route */}
        <Route path="/choose/:type/:id" element={<Choose />} />

        {/* Vendor Routes */}
        <Route path="/vendor-registration" element={<VendorProfile />} />
        <Route path="/fix-vendor" element={<FixVendor />} />
        <Route path="/host-vendor" element={<HostVendor />} />

        {/* Profile Page */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<Orders />} />
          <Route path="returns" element={<ReturnRequests />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customer" element={<Customer />} />
          <Route path="users" element={<Users />} />
          <Route path="customers" element={<Customers />} />
          <Route path="vendors/fix-vendors" element={<FixVendors />} />
          <Route path="vendors/host-vendors" element={<HostVendors />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reports" element={<Reports />} />
          <Route path="live-chat" element={<LiveChat />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="customer-support" element={<CustomerSupport />} />
          <Route path="settings" element={<Navigate to="settings/account" replace />} />
          <Route path="settings/account" element={<AccountSettings />} />
          <Route path="settings/admin" element={<AdminSettings />} />
        </Route>

        {/* Vendor Dashboard */}
        <Route path="/vendor-dashboard" element={
          <ProtectedRoute>
            <VDashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="services/list" element={<VendorServices />} />
          <Route path="services/add" element={<VendorServices />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="reviews" element={<VendorReviews />} />
          <Route path="portfolio" element={<VendorPortfolio />} />
          <Route path="transactions" element={<VendorTransactions />} />
          <Route path="reports" element={<VendorReports />} />
          <Route path="messages" element={<VendorMessages />} />
          <Route path="settings" element={<VendorSettings />} />
        </Route>

        {/* Protected Route Example */}
        <Route path="/protected-home" element={<Homepage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// Mount the React App
if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
