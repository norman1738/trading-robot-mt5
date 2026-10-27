const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  account: {
    balance: { type: Number, default: 10000 },
    equity: { type: Number, default: 10000 },
    margin: { type: Number, default: 0 },
    freeMargin: { type: Number, default: 10000 },
    leverage: { type: Number, default: 100 },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('User', userSchema);