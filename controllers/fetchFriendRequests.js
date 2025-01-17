const User = require('../models/User');

const fetchFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friendRequests', 'username email');
    console.log('Friend requests:', user.friendRequests);  // Debug log
    res.status(200).json({ friendRequests: user.friendRequests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = fetchFriendRequests;
