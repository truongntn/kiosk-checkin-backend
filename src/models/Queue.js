const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  position: { type: Number, required: true },
  checkInTime: { type: Date, default: Date.now },
  estimatedWaitTime: { type: Number },
});

module.exports = mongoose.model('Queue', queueSchema);