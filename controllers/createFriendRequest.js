const User = require('../models/User');

const createFriendRequest = async (req, res) => {
  const { targetUserId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(targetUserId);
    console.log("user:", user);
    console.log("targetUser:", targetUser);

    if (!targetUser) {
        return res.status(400).json({ message: 'Target user not found' });
      }
  
      if (user.sentRequests.includes(targetUserId)) {
        return res.status(400).json({ message: 'Friend request already sent' });
      }

    user.sentRequests.push(targetUserId);
    targetUser.friendRequests.push(req.user.id);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = createFriendRequest;
