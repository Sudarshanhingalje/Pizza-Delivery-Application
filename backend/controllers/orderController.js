const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Helper: Send low-stock email notification
const sendLowStockNotification = async (item) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Low Stock Alert: ${item.itemName}`,
        text: `The stock for ${item.itemName} is below the threshold. Current stock: ${item.stock}`,
    };

    await transporter.sendMail(mailOptions);
};

// Place an order and update inventory
exports.placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { user, address, pincode, items } = req.body;

        // Log the user name for debugging
        console.log('Placing order for user:', user);

        if (!user || !address || !pincode || !items.length) {
            throw new Error('Invalid order data. All fields are required.');
        }

        console.log('Order Data Received:', { user, address, pincode, items });

        for (const item of items) {
            const inventoryItem = await Inventory.findOne({ itemName: item.itemName });
            console.log(`Checking inventory for item: ${item.itemName}`, inventoryItem);

            if (!inventoryItem) {
                throw new Error(`Item ${item.itemName} not found in inventory.`);
            }

            if (inventoryItem.stock < item.quantity) {
                throw new Error(
                    `Insufficient stock for ${item.itemName}. Requested: ${item.quantity}, Available: ${inventoryItem.stock}`
                );
            }

            // Update inventory
            await Inventory.updateOne(
                { itemName: item.itemName },
                { $inc: { stock: -item.quantity } },
                { session }
            );

            // Notify if stock falls below the threshold
            if (inventoryItem.stock - item.quantity < inventoryItem.threshold) {
                console.log(`Low stock for item ${item.itemName}. Sending notification...`);
                await sendLowStockNotification(inventoryItem);
            }
        }

        // Save the order
        const order = new Order({ user, address, pincode, items, status: 'Order Received' });
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log('Order placed successfully.');
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};



exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

