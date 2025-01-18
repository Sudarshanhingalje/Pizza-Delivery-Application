import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RazerpayPayment } from '../../../services/razerpay';
import './Summary.css';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');

    const { base, sauce, cheese, veggies } = location.state || {};
    const total = (base?.price || 0) + (sauce?.price || 0) + (cheese?.price || 0) + veggies.reduce((sum, veg) => sum + (veg.price || 0), 0);

    const handleCheckout = () => {
        if (!name || !address || !pincode) {
            alert('Please fill in all required fields');
            return;
        }
        RazerpayPayment(total, (response) => {
            if (response && response.razorpay_payment_id) {
                alert('Payment Successful! Order Placed.');
                navigate('/checkout');
            } else {
                alert('Payment Failed! Please try again.');
            }
        });
    };

    return (
        <div className="summary-container">
            <h1>Order Summary</h1>
            <div className="summary-item">
                <img src={base?.image} alt={base?.name} className="summary-image" />
                <p><strong>Base:</strong> {base?.name || 'Not selected'} - ₹{base?.price || 0}</p>
            </div>
            <div className="summary-item">
                <img src={sauce?.image} alt={sauce?.name} className="summary-image" />
                <p><strong>Sauce:</strong> {sauce?.name || 'Not selected'} - ₹{sauce?.price || 0}</p>
            </div>
            <div className="summary-item">
                <img src={cheese?.image} alt={cheese?.name} className="summary-image" />
                <p><strong>Cheese:</strong> {cheese?.name || 'Not selected'} - ₹{cheese?.price || 0}</p>
            </div>
            <div className="summary-item">
                {veggies.map((veg) => (
                    <div key={veg.name} className="summary-sub-item">
                        <img src={veg.image} alt={veg.name} className="summary-image" />
                        <p>{veg.name} (₹{veg.price})</p>
                    </div>
                ))}
            </div>
            <h3>Total: ₹{total}</h3>
            <div className="address-container">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="pincode">Pincode</label>
                <input
                    type="text"
                    id="pincode"
                    placeholder="Enter your pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
            </div>
            <button onClick={handleCheckout} className="checkout-button">
                Proceed to Payment
            </button>
        </div>
    );
};

export default Summary;
