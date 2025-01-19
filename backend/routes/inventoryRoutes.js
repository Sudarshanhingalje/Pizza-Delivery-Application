const express = require('express');
const { getInventory, updateStock } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getInventory);
router.put('/update', authMiddleware, updateStock);
module.exports = router;