import React from 'react';
import './OrderStatus.css';

const OrderStatus = () => {
    const orderStatus = [
        { id: 1, status: 'Preparing', time: '10:00 AM' },
        { id: 2, status: 'Baking', time: '10:15 AM' },
        { id: 3, status: 'Out for Delivery', time: '10:45 AM' },
    ];

    return (
        <div className="order-status">
            <h2>Order Status</h2>
            <ul>
                {orderStatus.map((order) => (
                    <li key={order.id}>
                        <span>{order.status}</span>
                        <span>{order.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderStatus;
