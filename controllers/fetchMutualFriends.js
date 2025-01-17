const User = require('../models/User');

const fetchMutualFriends = async (req, res) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username email');
    const targetUser = await User.findById(id).populate('friends', 'username email');

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const mutualFriends = user.friends.filter(friend =>
      targetUser.friends.some(targetFriend => targetFriend.id === friend.id)
    );

    res.status(200).json({ mutualFriends });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = fetchMutualFriends;
