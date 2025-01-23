const express = require('express');
const { placeOrder, updateOrderStatus, getOrders,deleteOrder,getOrdersByUser} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getOrders);
router.post('/place', placeOrder);
router.put('/update-status', authMiddleware, updateOrderStatus);
router.delete('/:id', deleteOrder); 
router.get('/user', authMiddleware, getOrdersByUser);
module.exports = router;