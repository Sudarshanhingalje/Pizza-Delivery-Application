// File: Checkout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();  

    const handleRedirect = () => {
        navigate('/');  
    };

    return (
        <div className="checkout-container">
            <h2>Thank You!</h2>
            <p>Your order has been placed successfully.</p>
            
            {/* Button that navigates to the Login page */}
            <button className="pay-button" onClick={handleRedirect}>
                Let's Built More Pizza..!
            </button>
        </div>
    );
};

export default Checkout;
