const Inventory = require('../models/Inventory');

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
