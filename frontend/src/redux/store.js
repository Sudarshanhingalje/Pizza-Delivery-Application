import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './slices/pizzaSlice';
import authReducer from './slices/authSlice'; // Importing other reducers

const store = configureStore({
  reducer: {
    pizza: pizzaReducer,  // Adding pizza slice to the store
    auth: authReducer,    // Add your auth slice here
  },
});

export default store;
