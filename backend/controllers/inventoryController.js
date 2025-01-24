// controllers/inventoryController.js

const Inventory = require('../models/Inventory');
const nodemailer = require('nodemailer');


const sendLowStockNotification = async (item) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // your email
            pass: process.env.EMAIL_PASS,  // your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,  // admin email
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

setInterval(checkStockLevels, 60 * 60 * 1000); 

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

        if (item.stock <= item.threshold) {
            await sendLowStockNotification(item);
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
};


exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};
