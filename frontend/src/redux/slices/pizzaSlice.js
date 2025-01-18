import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: {
    base: null,     // Pizza base (e.g., thin crust, thick crust)
    sauce: null,    // Sauce (e.g., marinara, white sauce)
    cheese: null,   // Cheese (e.g., mozzarella, cheddar)
    veggies: [],    // Veggies (e.g., mushrooms, olives, peppers)
    meats: [],      // Meats (e.g., chicken, pepperoni)
  },
  totalPrice: 0,  // Price of the pizza, calculated based on ingredients
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    // Add ingredient (such as sauce, cheese, etc.)
    addIngredient: (state, action) => {
      const { type, value } = action.payload;

      // Add ingredient to the state (e.g., add a sauce or cheese)
      if (type === 'veggies' || type === 'meats') {
        state.ingredients[type].push(value);  // Add to array (for multiple options)
      } else {
        state.ingredients[type] = value;  // Replace with a single value (e.g., base, sauce)
      }

      // Update the total price based on the added ingredient
      state.totalPrice += action.payload.price;
    },

    // Remove ingredient (like removing a veggie or cheese)
    removeIngredient: (state, action) => {
      const { type, value } = action.payload;

      if (type === 'veggies' || type === 'meats') {
        // Remove the ingredient from the array (e.g., veggie or meat)
        const index = state.ingredients[type].indexOf(value);
        if (index > -1) {
          state.ingredients[type].splice(index, 1);  // Remove from the array
        }
      } else {
        // For single ingredients like base or sauce, set to null
        state.ingredients[type] = null;
      }

      // Update the total price by subtracting the price of the removed ingredient
      state.totalPrice -= action.payload.price;
    },

    // Reset pizza to initial state (e.g., clear all ingredients)
    resetPizza: (state) => {
      state.ingredients = initialState.ingredients;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

// Export actions to be used in components
export const { addIngredient, removeIngredient, resetPizza } = pizzaSlice.actions;

// Export the reducer to be used in the store
export default pizzaSlice.reducer;
