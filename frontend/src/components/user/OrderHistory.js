import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderHistory.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const result = await axios.get("http://localhost:2000/api/orders/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(result.data);
            } catch (error) {
                console.error("Error fetching orders:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading your order history...</p>;
    }

    return (
        <div className="o-history">
            <h2>Your Order History</h2>
            {orders.length > 0 ? (
                <ul className="o-list">
                    {orders.map((order) => (
                        <li key={order._id} className="o-item">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Items:</strong></p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>{item.itemName} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
