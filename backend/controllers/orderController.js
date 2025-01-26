const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

exports.placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { user, address, pincode, items } = req.body;

        if (!user || !address || !pincode || !items.length) {
            throw new Error('Invalid order data. All fields are required.');
        }

        for (const item of items) {
            const inventoryItem = await Inventory.findOne({ itemName: item.itemName });

            if (!inventoryItem) {
                throw new Error(`Item ${item.itemName} not found in inventory.`);
            }

            if (inventoryItem.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${item.itemName}. Requested: ${item.quantity}, Available: ${inventoryItem.stock}`);
            }
            await Inventory.updateOne(
                { itemName: item.itemName },
                { $inc: { stock: -item.quantity } },
                { session }
            );

        
            const updatedStock = inventoryItem.stock - item.quantity;
            if (updatedStock < inventoryItem.threshold) {
                await sendLowStockNotification(inventoryItem);
            }
        }

        const order = new Order({ user, address, pincode, items, status: 'Order Received' });
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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
        res.status(500).json({ error: 'Failed to delete order' });
    }
};


exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('items');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
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
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('items');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

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
        to: process.env.ADMIN_EMAIL,  
        subject: `Low Stock Alert: ${item.itemName}`,
        text: `The stock for ${item.itemName} is below the threshold. Current stock: ${item.stock}. Please restock the item as soon as possible.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Low stock notification sent for ${item.itemName}`);
    } catch (error) {
        console.error('Error sending low stock notification:', error);
    }
};
const checkStockLevels = async () => {
    try {
        
        const items = await Inventory.find();

     
        items.forEach((item) => {
            if (item.stock < item.threshold) {
                sendLowStockNotification(item);  
            }
        });
    } catch (error) {
        console.error('Error checking stock levels:', error);
    }
};
setInterval(checkStockLevels, 24 * 60 * 60 * 1000);//everyday it will check stock and update it
