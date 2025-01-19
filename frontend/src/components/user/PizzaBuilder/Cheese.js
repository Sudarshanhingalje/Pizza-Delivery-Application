import React, { useState } from 'react';
import './Cheese.css';

const Cheese = ({ onCheeseSelect }) => {
    const cheeses = [
        { name: 'Mozzarella', price: 50, image: require('../../../assets/cheese/mozzarella.png') },
        { name: 'Cheddar', price: 60, image: require('../../../assets/cheese/cheddar.png') },
        { name: 'Parmesan', price: 70, image: require('../../../assets/cheese/parmesan.png') },
        { name: 'Gouda', price: 65, image: require('../../../assets/cheese/gouda.png') },
        { name: 'Feta', price: 55, image: require('../../../assets/cheese/feta.png') },
    ];
    const [selectedCheese, setSelectedCheese] = useState('');

    const handleCheeseChange = (cheese) => {
        setSelectedCheese(cheese.name);
        onCheeseSelect({ name: cheese.name, price: cheese.price, image: cheese.image });
    };

    return (
        <div className="cheese-container">
            <h2>Select Your Cheese</h2>
            <div className="cheese-options">
                {cheeses.map((cheese) => (
                    <div
                        key={cheese.name}
                        className={`cheese-card ${selectedCheese === cheese.name ? 'selected' : ''}`}
                        onClick={() => handleCheeseChange(cheese)}
                    >
                        <img src={cheese.image} alt={cheese.name} className="cheese-image" />
                        <h3>{cheese.name}</h3>
                        <p>₹{cheese.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cheese;
