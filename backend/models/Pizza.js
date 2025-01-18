const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Pizza', pizzaSchema);
