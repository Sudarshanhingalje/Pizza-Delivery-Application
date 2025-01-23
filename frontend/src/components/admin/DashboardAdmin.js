import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import './Dashboardadmin.css';

const DashboardAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchOrders = async () => {
        try {
            const result = await axios.get('/orders');
            setOrders(result.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error.response?.data || error.message);
        }
    };


    const fetchInventory = async () => {
        try {
            const result = await axios.get('/inventory');
            setInventory(result.data);
        } catch (error) {
            console.error('Failed to fetch inventory:', error.response?.data || error.message);
        }
    };


    useEffect(() => {
        fetchOrders();
        fetchInventory();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setLoading(true);

            if (newStatus === 'Sent to Delivery') {

                await axios.delete(`/orders/${orderId}`);
                console.log(`Order ${orderId} deleted from database`);


                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            } else {

                await axios.put('/orders/update-status', { orderId, status: newStatus });
                console.log(`Order ${orderId} status updated to ${newStatus}`);

                await fetchOrders();
                await fetchInventory();
            }
        } catch (error) {
            console.error('Failed to update order status or delete order:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Base', 'Sauce', 'Cheese', 'Veggies'];

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>


            <h2>Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order._id} className="order-item">
                            <div>
                                <p><strong>Order ID:</strong> {order._id}</p>
                                <p><strong>Name:</strong> {order.user}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Pincode:</strong> {order.pincode}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Ordered Items:</strong></p>
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.itemName}>
                                            {item.itemName} - Qty: {item.quantity}
                                        </li>
                                    ))}
                                </ul>

                                <p><strong>Total Payment:</strong> ₹
                                    {order.items.reduce((acc, item) => acc + item.quantity * (inventory.find(i => i.itemName === item.itemName)?.price || 0), 0)}
                                </p>

                                <p><strong>Actual Paid:</strong> ₹{order.totalPrice}</p>
                            </div>
                            <div className="order-actions">
                                <button
                                    onClick={() => handleStatusChange(order._id, 'In Kitchen')}
                                    disabled={order.status === 'In Kitchen'}
                                >
                                    In Kitchen
                                </button>
                                <button
                                    onClick={() => handleStatusChange(order._id, 'Sent to Delivery')}
                                    disabled={order.status === 'Sent to Delivery'}
                                >
                                    Sent to Delivery
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}


            <h2>Inventory</h2>
            {categories.map((category) => {
                const categoryItems = inventory.filter((item) => item.category === category);
                const totalStock = categoryItems.reduce((acc, item) => acc + item.stock, 0);

                return (
                    <div key={category} className="inventory-category">
                        <h3>{category}</h3>
                        <p><strong>Total Available:</strong> {totalStock}</p>
                        <ul>
                            {categoryItems.map((item) => (
                                <li key={item._id}>
                                    <p><strong>{item.itemName}</strong></p>
                                    <p>Stock: {item.stock}</p>
                                    <p>Threshold: {item.threshold}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardAdmin;
