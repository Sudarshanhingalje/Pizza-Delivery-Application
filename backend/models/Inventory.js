const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  stock: { type: Number, required: true },
  threshold: { type: Number, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);
