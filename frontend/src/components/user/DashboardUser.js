// DashboardUser.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory"; // Assuming OrderHistory is a separate component
import "./DashboardUser.css";

const DashboardUser = () => {
  // State for toggling the display of the order history
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  
  // Using useNavigate for navigation in react-router
  const navigate = useNavigate();

  // Toggle the visibility of order history section
  const toggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
  };

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-header-title">🍕 Your Pizza House</h1>
      <p className="welcome-text">Ready to craft your perfect slice of happiness?</p>

      <div className="dashboard-buttons">
        {/* Navigate to PizzaBuilder page */}
        <button 
          className="user-button user-button-create" 
          onClick={() => navigate('/PizzaBuilder')}
        >
          Create Your Perfect Pizza
        </button>

        {/* Toggle the order history section */}
        <button 
          className="user-button user-button-history" 
          onClick={toggleOrderHistory}
        >
          Your Pizza History
        </button>
      </div>

      {/* Home button that navigates back to the homepage */}
      <button 
        className="user-button home-button" 
        onClick={() => navigate('/')}
      >
        Back to Pizza Home
      </button>

      {/* Order history section */}
      {showOrderHistory && (
        <div className="order-history-container">
          <h2 className="order-history-header">Your Pizza Journey</h2>
          <p className="history-subtitle">Every delicious moment, remembered</p>
          
          {/* OrderHistory Component for displaying the order list */}
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
