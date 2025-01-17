const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['requested', 'accepted'], default: 'requested' },
});

module.exports = mongoose.model('Friend', friendSchema);
