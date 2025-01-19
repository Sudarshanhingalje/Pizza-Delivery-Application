const express = require('express');
const { getInventory, updateStock } = require('../controllers/inventoryController');
const router = express.Router();

// Route to get inventory
router.get('/', getInventory);

// Route to update stock
router.put('/update', updateStock);

module.exports = router;
