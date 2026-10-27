const express = require('express');
const marketData = require('../services/marketData');

const router = express.Router();

router.get('/prices', (req, res) => res.json(marketData.getAllPrices()));
router.get('/price/:symbol', (req, res) => {
  const p = marketData.getCurrentPrice(req.params.symbol);
  if (!p) return res.status(404).json({ error: 'Symbol not found' });
  res.json(p);
});
router.get('/historical', (req, res) => {
  const { symbol = 'EURUSD', timeframe = '1h', limit = 500 } = req.query;
  res.json(marketData.getHistoricalData(symbol, timeframe, parseInt(limit)));
});
router.get('/symbols', (req, res) => res.json(marketData.symbols));

module.exports = router;