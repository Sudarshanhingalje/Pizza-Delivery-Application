const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: {
        type: String,
        enum: ['Order Received', 'In Kitchen', 'Sent to Delivery'], 
        default: 'Order Received',
    },
    createdAt: { type: Date, default: Date.now },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
