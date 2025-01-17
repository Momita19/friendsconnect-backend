const addFriend = async (req, res) => {
    const { requesterId } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const requester = await User.findById(requesterId);
  
      if (!requester || !user.friendRequests.includes(requesterId)) {
        return res.status(400).json({ message: "Invalid request" });
      }
  
      // Update friends list
      user.friends.push(requesterId);
      requester.friends.push(req.user.id);
  
      // Remove from requests
      user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
      requester.sentRequests = requester.sentRequests.filter(id => id.toString() !== req.user.id);
  
      await user.save();
      await requester.save();
  
      res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  