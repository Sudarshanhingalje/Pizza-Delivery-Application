import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import OrderHistory from './components/user/OrderHistory';
import OrderStatus from './components/user/OrderStatus';
import Base from './components/user/PizzaBuilder/Base';
import PizzaBuilder from './components/user/PizzaBuilder/PizzaBuilder';
import Summary from './components/user/PizzaBuilder/Summary';
import Checkout from './components/user/PizzaBuilder/Checkout';
import DashboardAdmin from './components/admin/DashboardAdmin';
import AdminRoute from './components/admin/AdminRoute';
import DashboardUser from './components/user/DashboardUser';
import ResetPassword from './components/auth/ResetPassword';
import AboutUs from './components/auth/About';
import ContactUs from './components/auth/Contact';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />

                <Route path="/" element={<Login />} />
                <Route path="/Dashboarduser" element={<DashboardUser />} />
                <Route path="/Forgot-Password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/PizzaBuilder" element={<PizzaBuilder />} />
                <Route path="/summary" element={<Summary />} />

                <Route path="/pizza-builder/base" element={<Base />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/order-status" element={<OrderStatus />} />

                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin-dashboard" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
