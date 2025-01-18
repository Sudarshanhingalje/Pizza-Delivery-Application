import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/admin/orders');
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`/api/admin/orders/${orderId}`, { status });
            fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    return (
        <div className="orders">
            <h2>Manage Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => updateOrderStatus(order.id, 'In the Kitchen')}>
                                    In the Kitchen
                                </button>
                                <button onClick={() => updateOrderStatus(order.id, 'Sent to Delivery')}>
                                    Sent to Delivery
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
