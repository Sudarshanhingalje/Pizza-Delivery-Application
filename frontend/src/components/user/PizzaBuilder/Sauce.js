import React, { useState } from 'react';
import './Sauce.css';

const Sauce = ({ onSauceSelect }) => {
    const sauces = [
        { name: 'Tomato', price: 50, image: require('../../../assets/sauce/tomato.png') },
        { name: 'Pesto', price: 70, image: require('../../../assets/sauce/pesto.png') },
        { name: 'Barbecue', price: 60, image: require('../../../assets/sauce/barbecue.png') },
        { name: 'Alfredo', price: 80, image: require('../../../assets/sauce/alfredo.png') },
        { name: 'Spicy Marinara', price: 65, image: require('../../../assets/sauce/spicy-marinara.png') },
    ];
    const [selectedSauce, setSelectedSauce] = useState('');

    const handleSauceChange = (sauce) => {
        setSelectedSauce(sauce.name);
        onSauceSelect({ name: sauce.name, price: sauce.price, image: sauce.image });
    };

    return (
        <div className="sauce-container">
            <h2>Select Your Sauce</h2>
            <div className="sauce-options">
                {sauces.map((sauce) => (
                    <div
                        key={sauce.name}
                        className={`sauce-card ${selectedSauce === sauce.name ? 'selected' : ''}`}
                        onClick={() => handleSauceChange(sauce)}
                    >
                        <img src={sauce.image} alt={sauce.name} className="sauce-image" />
                        <h3>{sauce.name}</h3>
                        <p>₹{sauce.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sauce;
