import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); 
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrders(storedOrders);
    }, []);
    const handleRedirect = () => {
        navigate('/');  // Navigate to the Login page when button is clicked
    };

    return (
        <div className="order-history">
            <h2>Order History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.items}</td>
                                <td>{order.total}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="pay-button" onClick={handleRedirect}>
                Let's Built More Pizza..!
            </button>
        </div>
    );
};

export default OrderHistory;
