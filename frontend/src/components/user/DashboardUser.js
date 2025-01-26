import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory"; 
import "./DashboardUser.css";

const DashboardUser = () => {

  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const navigate = useNavigate();


  const toggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
  };

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-header-title">🍕 Your Pizza House</h1>
      <p className="welcome-text">Ready to craft your perfect slice of happiness?</p>

      <div className="dashboard-buttons">

        <button
          className="user-button user-button-create"
          onClick={() => navigate('/PizzaBuilder')}
        >
          Create Your Perfect Pizza
        </button>

        <button
          className="user-button user-button-history"
          onClick={toggleOrderHistory}
        >
          Your Pizza History
        </button>
      </div>

      <button
        className="user-button home-button"
        onClick={() => navigate('/')}
      >
        Back to Pizza Home
      </button>

      {showOrderHistory && (
        <div className="order-history-container">
          <h2 className="order-history-header">Your Pizza Journey</h2>
          <p className="history-subtitle">Every delicious moment, remembered</p>

          <OrderHistory />

          <button
            className="close-order-history-btn"
            onClick={toggleOrderHistory}
          >
            Close History
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
