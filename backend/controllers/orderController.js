const Inventory = require('../models/Inventory');

exports.placeOrder = async (req, res) => {
  const { items } = req.body; // Array of { itemName, quantity }
  for (let item of items) {
    await Inventory.findOneAndUpdate(
      { itemName: item.itemName },
      { $inc: { stock: -item.quantity } }
    );
  }
  res.status(200).send('Order placed and stock updated.');
};

exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(order);
  };
  