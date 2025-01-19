const Inventory = require('../models/Inventory');
const nodemailer = require('nodemailer');

// Function to fetch all inventory items
exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};

// Function to update stock
exports.updateStock = async (req, res) => {
    try {
        const { itemName, quantity } = req.body;
        const item = await Inventory.findOneAndUpdate(
            { itemName },
            { $inc: { stock: -quantity } },
            { new: true }
        );

        // Check stock threshold and send notification
        if (item && item.stock <= item.threshold) {
            await sendLowStockNotification(item);
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
};

// Helper function to send low-stock email notification
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
        subject: 'Low Stock Alert',
        text: `The stock for ${item.itemName} is below the threshold.`,
    };

    await transporter.sendMail(mailOptions);
};
