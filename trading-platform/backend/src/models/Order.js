const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  type: { type: String, enum: ['market', 'limit', 'stop'], required: true },
  side: { type: String, enum: ['buy', 'sell'], required: true },
  volume: { type: Number, required: true },
  price: Number,
  stopLoss: Number,
  takeProfit: Number,
  status: {
    type: String,
    enum: ['pending', 'filled', 'cancelled', 'rejected'],
    default: 'pending',
  },
  executedPrice: Number,
  executedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);