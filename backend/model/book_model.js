const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  username: String,
  event:{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
  address: String,
  time: String,
  date: String,
  mobileNo : Number,
  totalAmount: Number,
  paymentMethod: String,
  status: { type: String, default: 'Pending' },
  orderedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('book', orderSchema);
