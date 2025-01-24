import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory";
import "./DashboardUser.css";

const DashboardUser = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="user-dashboard">
      <h1>🍕 Your Pizza House</h1>
      <p className="welcome-text">
        Ready to craft your perfect slice of happiness?
      </p>
      
      <div className="dashboard-buttons">
        <button
          className="dashboarduser-button"
          onClick={() => navigate('/PizzaBuilder')}
        >
          Create Your Perfect Pizza
        </button>
        <button
          className="dashboarduser-button"
          onClick={() => setShowOrderHistory(true)}
        >
          Your Pizza History
        </button>
      </div>
      
      <button
        className="dashboarduser-button home-button"
        onClick={() => navigate('/')}
      >
        Back to Pizza Home
      </button>

      {showOrderHistory && (
        <div className="order-history-container">
          <h2>Your Pizza Journey</h2>
          <p className="history-subtitle">Every delicious moment, remembered</p>
          <OrderHistory />
        </div>
      )}
    </div>
  );
};

export default DashboardUser;