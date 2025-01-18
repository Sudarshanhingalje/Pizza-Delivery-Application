import React from 'react';
import './Inventory.css';

const Inventory = () => {
    const items = [
        { id: 1, name: 'Pizza Base', quantity: 50 },
        { id: 2, name: 'Cheese', quantity: 20 },
        { id: 3, name: 'Veggies', quantity: 30 },
    ];

    return (
        <div className="inventory">
            <h2>Inventory</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
