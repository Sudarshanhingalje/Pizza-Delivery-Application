import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/Dashboarduser');
    };

    return (
        <div className="checkout-container">
            <video autoPlay loop muted className="background-video">
                <source src="/images/88242-602915695_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h2>Thank You!</h2>
            <p>Your order has been placed successfully.</p>
            <button className="pay-button" onClick={handleRedirect}>
                Let's Build More Pizza..!
            </button>
        </div>
    );
};

export default Checkout;