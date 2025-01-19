const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [Object],
    totalAmount: Number,
    status: { type: String, default: 'Order Received' },
    status: { type: String, enum: ['Received', 'In Kitchen', 'Sent to Delivery'], default: 'Received' },

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
