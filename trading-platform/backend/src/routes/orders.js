const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const tradingEngine = require('../services/tradingEngine');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const order = await tradingEngine.placeOrder({ userId: req.userId, ...req.body });
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId, status: 'pending' });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.status = 'cancelled';
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;