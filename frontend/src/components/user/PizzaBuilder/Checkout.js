// Checkout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();

    const redirectToDashboard = () => {
        navigate('/Dashboarduser');
    };

    return (
        <div className="checkout-wrapper">
            <video autoPlay loop muted className="background-video">
                <source src="/images/88242-602915695_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h2 className="checkout-header">Thank You!</h2>
            <p className="checkout-message">Your order has been placed successfully.</p>
            <button className="action-button" onClick={redirectToDashboard}>
                Let's Build More Pizza..!
            </button>
        </div>
    );
};

export default Checkout;
