import React from "react";
import "./Dashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";

const DashboardUser = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const fetchOrders = async () => {
          const result = await axios.get('http://localhost:2000/api/orders');
          setOrders(result.data);
      };

      fetchOrders();
  }, []);

  return (
      <div className="user-dashboard">
          <h1>User Dashboard</h1>
          <h2>Your Orders</h2>
          <ul>
              {orders.map(order => (
                  <li key={order._id}>
                      <div>
                          <span>Order ID: {order._id}</span>
                          <span>Status: {order.status}</span>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default DashboardUser;
