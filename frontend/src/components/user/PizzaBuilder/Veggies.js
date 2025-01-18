// File: Veggies.js
import React, { useState } from 'react';
import './Veggies.css';

const Veggies = ({ onVeggiesSelect }) => {
    const veggies = [
        { name: 'Onions', price: 20, image: require('../../../assets/veggies/onions.png') },
        { name: 'Capsicum', price: 25, image: require('../../../assets/veggies/capsicum.png') },
        { name: 'Mushrooms', price: 30, image: require('../../../assets/veggies/mushrooms.png') },
        { name: 'Olives', price: 40, image: require('../../../assets/veggies/olives.png') },
        { name: 'Jalapeños', price: 35, image: require('../../../assets/veggies/jalapenos.png') },
    ];

    const [selectedVeggies, setSelectedVeggies] = useState([]);

    const handleVeggiesChange = (veggie) => {
        const updatedVeggies = selectedVeggies.find((v) => v.name === veggie.name)
            ? selectedVeggies.filter((v) => v.name !== veggie.name)
            : [...selectedVeggies, veggie];
        setSelectedVeggies(updatedVeggies);
        onVeggiesSelect(updatedVeggies.map((veg) => ({ name: veg.name, price: veg.price, image: veg.image })));
    };

    return (
        <div className="veggies-container">
            <h2>Select Your Veggies</h2>
            <div className="veggie-options">
                {veggies.map((veggie) => (
                    <div
                        key={veggie.name}
                        className={`veggie-card ${selectedVeggies.some((v) => v.name === veggie.name) ? 'selected' : ''}`}
                        onClick={() => handleVeggiesChange(veggie)}
                    >
                        <img src={veggie.image} alt={veggie.name} className="veggie-image" />
                        <h3>{veggie.name}</h3>
                        <p>₹{veggie.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Veggies;
