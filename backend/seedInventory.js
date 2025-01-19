const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Inventory = require('./models/Inventory'); // Adjust the path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        const items = [
            { itemName: "Thin Crust", stock: 50, threshold: 20, category: "Base" },
            { itemName: "Thick Crust", stock: 50, threshold: 20, category: "Base" },
            { itemName: "Cheese Burst", stock: 50, threshold: 20, category: "Base" },
            { itemName: "Whole Wheat Crust", stock: 50, threshold: 20, category: "Base" },
            { itemName: "Gluten-Free Crust", stock: 50, threshold: 20, category: "Base" },
            { itemName: "Mozzarella", stock: 30, threshold: 20, category: "Cheese" },
            { itemName: "Cheddar", stock: 30, threshold: 20, category: "Cheese" },
            { itemName: "Parmesan", stock: 30, threshold: 20, category: "Cheese" },
            { itemName: "Gouda", stock: 30, threshold: 20, category: "Cheese" },
            { itemName: "Feta", stock: 30, threshold: 20, category: "Cheese" },
            { itemName: "Tomato", stock: 40, threshold: 20, category: "Sauce" },
            { itemName: "Pesto", stock: 40, threshold: 20, category: "Sauce" },
            { itemName: "Barbecue", stock: 40, threshold: 20, category: "Sauce" },
            { itemName: "Alfredo", stock: 40, threshold: 20, category: "Sauce" },
            { itemName: "Spicy Marinara", stock: 40, threshold: 20, category: "Sauce" },
            { itemName: "Onions", stock: 70, threshold: 20, category: "Veggies" },
            { itemName: "Capsicum", stock: 70, threshold: 20, category: "Veggies" },
            { itemName: "Mushrooms", stock: 70, threshold: 20, category: "Veggies" },
            { itemName: "Olives", stock: 70, threshold: 20, category: "Veggies" },
            { itemName: "Jalapeños", stock: 70, threshold: 20, category: "Veggies" },
        ];


        // Clear existing inventory
        await Inventory.deleteMany({});
        console.log('Inventory cleared.');

        // Insert new inventory data
        await Inventory.insertMany(items);
        console.log('Inventory seeded successfully.');

        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        mongoose.connection.close();
    });
