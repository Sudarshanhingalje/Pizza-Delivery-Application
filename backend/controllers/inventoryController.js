const Inventory = require('../models/Inventory');
const nodemailer = require('nodemailer');

// Send low stock notification
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
        text: `The stock for ${item.itemName} (${item.category}) is below the threshold. Current stock: ${item.stock}.`,
    };

    await transporter.sendMail(mailOptions);
};

// Update inventory stock
exports.updateStock = async (req, res) => {
    try {
        const { itemName, quantity } = req.body;

        const item = await Inventory.findOneAndUpdate(
            { itemName },
            { $inc: { stock: -quantity } },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Check if stock is below threshold and send notification
        if (item.stock <= item.threshold) {
            await sendLowStockNotification(item);
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
};

// Fetch inventory
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};
