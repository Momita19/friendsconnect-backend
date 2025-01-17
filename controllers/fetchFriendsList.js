const User = require('../models/User');

const fetchFriendsList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username email');
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = fetchFriendsList;


