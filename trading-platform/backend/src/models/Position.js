const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  side: { type: String, enum: ['buy', 'sell'], required: true },
  volume: { type: Number, required: true },
  openPrice: { type: Number, required: true },
  currentPrice: Number,
  stopLoss: Number,
  takeProfit: Number,
  pnl: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  openedAt: { type: Date, default: Date.now },
  closedAt: Date,
  closePrice: Number,
});

module.exports = mongoose.model('Position', positionSchema);