const express = require('express');
const auth = require('../middleware/auth');
const Position = require('../models/Position');
const tradingEngine = require('../services/tradingEngine');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.userId, status: 'open' }).sort({ openedAt: -1 });
    res.json(positions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/history', auth, async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.userId, status: 'closed' }).sort({ closedAt: -1 });
    res.json(positions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const pos = await tradingEngine.closePosition(req.params.id, req.userId);
    res.json(pos);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;