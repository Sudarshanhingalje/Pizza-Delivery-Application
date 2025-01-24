import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RazerpayPayment } from '../../../services/razerpay';
import Swal from 'sweetalert2';
import './Summary.css';
import axios from 'axios';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState('');

    const { base, sauce, cheese, veggies } = location.state || {};
    const total = (base?.price || 0) + (sauce?.price || 0) + (cheese?.price || 0) + veggies.reduce((sum, veg) => sum + (veg.price || 0), 0);

    const validatePincode = (value) => {
        if (!/^\d{6}$/.test(value)) {
            setPincodeError('Pincode must be exactly 6 digits');
            return false;
        }
        setPincodeError('');
        return true;
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value;


        if (/^\d{0,6}$/.test(value)) {
            setPincode(value);


            if (value.length === 6) {
                validatePincode(value);
            } else {
                setPincodeError('');
            }
        }
    };

    const handleCheckout = () => {
        if (!name || !address || !pincode) {
            alert('Please fill in all required fields');
            return;
        }
        if (!validatePincode(pincode)) {
            return;
        }


        RazerpayPayment(total, async (response) => {
            if (response && response.razorpay_payment_id) {
                const orderData = {
                    user: name,
                    address,
                    pincode,
                    items: [
                        { itemName: base?.name, quantity: 1 },
                        { itemName: sauce?.name, quantity: 1 },
                        { itemName: cheese?.name, quantity: 1 },
                        ...veggies.map((veg) => ({ itemName: veg.name, quantity: 1 })),
                    ],
                };

                console.log('Order Data being sent to backend:', orderData);

                try {
                    const response = await axios.post('http://localhost:2000/api/orders/place', orderData);
                    console.log('Backend Response:', response.data);

                    Swal.fire({
                        imageUrl: 'images/Animated+Gift.gif',
                        imageWidth: 400,
                        imageHeight: 400,
                        background: 'rgba(0, 0, 0, 0)',
                        showConfirmButton: false,
                        timer: 3000,


                    }).then(() => {
                        navigate('/checkout');
                    });
                } catch (error) {
                    console.error('Backend Error:', error.response?.data || error.message);
                }
            } else {
                Swal.fire({
                    title: 'Payment Failed!',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
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
                    onChange={handlePincodeChange}
                />
                {pincodeError && <p style={{ color: 'red' }}>{pincodeError}</p>}
            </div>
            <button onClick={handleCheckout} className="checkout-button">
                Proceed to Payment
            </button>
        </div>
    );
};

export default Summary;
