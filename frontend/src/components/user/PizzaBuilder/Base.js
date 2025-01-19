import React, { useState } from 'react';
import './Base.css';

const Base = ({ onSelectBase }) => {
    const bases = [
        { name: 'Thin Crust', price: 150, image: require('../../../assets/base/thin-crust.png') },
        { name: 'Thick Crust', price: 200, image: require('../../../assets/base/thick-crust.png') },
        { name: 'Cheese Burst', price: 250, image: require('../../../assets/base/cheese-burst.png') },
        { name: 'Whole Wheat Crust', price: 180, image: require('../../../assets/base/whole-wheat-crust.png') },
        { name: 'Gluten-Free Crust', price: 220, image: require('../../../assets/base/gluten-free-crust.png') },
    ];
    const [selectedBase, setSelectedBase] = useState('');

    const handleBaseChange = (base) => {
        setSelectedBase(base.name);
        onSelectBase({ name: base.name, price: base.price, image: base.image });
    };

    return (
        <div className="base-container">
            <h2>Select Your Base</h2>
            <div className="base-options">
                {bases.map((base) => (
                    <div
                        key={base.name}
                        className={`base-card ${selectedBase === base.name ? 'selected' : ''}`}
                        onClick={() => handleBaseChange(base)}
                    >
                        <img src={base.image} alt={base.name} className="base-image" />
                        <h3>{base.name}</h3>
                        <p>₹{base.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Base;
