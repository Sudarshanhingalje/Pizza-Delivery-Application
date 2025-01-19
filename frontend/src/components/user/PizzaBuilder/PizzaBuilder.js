import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from './Base';
import Sauce from './Sauce';
import Cheese from './Cheese';
import Veggies from './Veggies';
import './PizzaBuilder.css';

const PizzaBuilder = () => {
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedSauce, setSelectedSauce] = useState(null);
    const [selectedCheese, setSelectedCheese] = useState(null);
    const [selectedVeggies, setSelectedVeggies] = useState([]);
    const navigate = useNavigate();

    const handleSummary = () => {
        navigate('/summary', {
            state: {
                base: selectedBase,
                sauce: selectedSauce,
                cheese: selectedCheese,
                veggies: selectedVeggies,
            },
        });
    };

    return (
        <div className="pizza-builder">
            <h1>Build Your Pizza</h1>
            <Base onSelectBase={setSelectedBase} />
            <Sauce onSauceSelect={setSelectedSauce} />
            <Cheese onCheeseSelect={setSelectedCheese} />
            <Veggies onVeggiesSelect={setSelectedVeggies} />
            <button onClick={handleSummary} className="summary-button">
                Summary
            </button>
        </div>
    );
};

export default PizzaBuilder;
