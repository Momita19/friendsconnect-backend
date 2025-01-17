const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, index: true},
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique:true }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  interests: [{ type: String }],

  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);