import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import OrderHistory from './components/user/OrderHistory';
import OrderStatus from './components/user/OrderStatus';
import Base from './components/user/PizzaBuilder/Base';
import PizzaBuilder from './components/user/PizzaBuilder/PizzaBuilder';
import Summary from './components/user/PizzaBuilder/Summary';
import Checkout from './components/user/PizzaBuilder/Checkout';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Forgot-Password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/PizzaBuilder" element={<PizzaBuilder />} />
                <Route path="/summary" element={<Summary />} />

                <Route path="/pizza-builder/base" element={<Base />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/order-status" element={<OrderStatus />} />

                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
};

export default App;
// Repeat similar patterns for other files like Dashboard.js, PizzaBuilder components, admin components, etc.
// Additional Redux slices and services can be implemented as per the requirements.

// Add "@babel/plugin-proposal-private-property-in-object" to devDependencies to resolve babel-preset-react-app issues.