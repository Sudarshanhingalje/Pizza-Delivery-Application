import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const pizzaSteps = [
    {
      step: "1. Choose a Base",
      description: "Select a pizza base from 5 available options.",
    },
    {
      step: "2. Choose a Sauce",
      description: "Pick your favorite sauce from our 5 options.",
    },
    {
      step: "3. Add Cheese",
      description: "Choose the type of cheese you like best.",
    },
    {
      step: "4. Add Veggies",
      description: "Add your preferred veggies from a variety of options.",
    },
    {
      step: "5. Review & Checkout",
      description: "Review your order and proceed to secure payment.",
    },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>

      <div className="dashboard-summary">
        <h2>Pizza Builder Process</h2>
        <div className="pizza-builder-steps">
          {pizzaSteps.map((step, index) => (
            <div key={index} className="step-box">
              <h3>{step.step}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-stats">
        <h2>Your Order Statistics</h2>
        <div className="stat-box">
          <h3>Total Orders</h3>
          <p>25</p>
        </div>
        <div className="stat-box">
          <h3>Pending Orders</h3>
          <p>3</p>
        </div>
        <div className="stat-box">
          <h3>Completed Orders</h3>
          <p>22</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
